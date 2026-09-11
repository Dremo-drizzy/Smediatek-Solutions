import { sendMail } from "./mailer.js";
import { confirmationEmail } from "../emails/confirmationEmail.js";
import { notificationEmail } from "../emails/notificationEmail.js";

// Fire-and-forget: a submission should still succeed even if email sending
// fails or is slow, so neither call here is awaited by its caller.
export const notifyNewSubmission = ({ resourceLabel, submitterEmail, submitterName, fields }) => {
  sendMail({ to: submitterEmail, ...confirmationEmail(resourceLabel, submitterName) }).catch((error) => {
    console.error(`❌ Failed to send confirmation email for ${resourceLabel}:`, error.message);
  });

  sendMail({ to: process.env.ADMIN_EMAIL, ...notificationEmail(resourceLabel, fields) }).catch((error) => {
    console.error(`❌ Failed to send notification email for ${resourceLabel}:`, error.message);
  });
};
