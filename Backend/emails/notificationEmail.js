import { emailLayout } from "./layout.js";

const escapeHtml = (value) =>
  String(value ?? "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// fields: plain object of { "Display Label": value }, rendered in insertion order.
export const notificationEmail = (resourceLabel, fields) => ({
  subject: `New ${resourceLabel}`,
  html: emailLayout(`
    <p>A new ${resourceLabel} was just submitted:</p>
    <table style="width: 100%; border-collapse: collapse;">
      ${Object.entries(fields)
        .map(
          ([label, value]) => `
            <tr>
              <td style="padding: 6px 8px; border-bottom: 1px solid #dee2e6; font-weight: bold; vertical-align: top; white-space: nowrap;">${escapeHtml(label)}</td>
              <td style="padding: 6px 8px; border-bottom: 1px solid #dee2e6;">${escapeHtml(Array.isArray(value) ? value.join(", ") : value)}</td>
            </tr>
          `
        )
        .join("")}
    </table>
  `),
});
