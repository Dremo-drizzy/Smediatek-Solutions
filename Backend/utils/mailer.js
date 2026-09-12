import nodemailer from "nodemailer";

// Built lazily on first send, not at import time: server.js loads dotenv
// after its route imports are evaluated, so RESEND_API_KEY isn't set yet
// when this module is first imported.
let transporter;
const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 465,
      secure: true,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
      },
    });
  }
  return transporter;
};

// Fire-and-forget by convention at the call site: a transactional email
// failing should never fail the request that triggered it.
export const sendMail = async ({ to, subject, html }) => {
  await getTransporter().sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
};
