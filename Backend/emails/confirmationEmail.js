import { emailLayout } from "./layout.js";

// resourceLabel: human-readable name of what was submitted, e.g. "contact message",
// "brand identity request", "livestream request", "training enrollment".
export const confirmationEmail = (resourceLabel, name) => ({
  subject: `We've received your ${resourceLabel}`,
  html: emailLayout(`
    <p>Hi ${name},</p>
    <p>Thanks for reaching out to SmediaTek Solutions! We've received your ${resourceLabel} and a member of our team will be in touch soon.</p>
    <p>In the meantime, feel free to reply to this email if you have any questions.</p>
    <p>— The SmediaTek Solutions team</p>
  `),
});
