import { sendMail } from "./mailer.js";
import { confirmationEmail } from "../emails/confirmationEmail.js";
import { notificationEmail } from "../emails/notificationEmail.js";
import logger from "./logger.js";

// Fire-and-forget: a submission should still succeed even if email sending
// fails or is slow, so neither call here is awaited by its caller.
export const notifyNewSubmission = ({ resourceLabel, submitterEmail, submitterName, fields }) => {
  sendMail({ to: submitterEmail, ...confirmationEmail(resourceLabel, submitterName) }).catch((error) => {
    logger.error("Failed to send confirmation email", { resourceLabel, error: error.message });
  });

  sendMail({ to: process.env.ADMIN_EMAIL, ...notificationEmail(resourceLabel, fields) }).catch((error) => {
    logger.error("Failed to send notification email", { resourceLabel, error: error.message });
  });
};
