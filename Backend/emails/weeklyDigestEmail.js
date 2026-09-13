import { emailLayout } from "./layout.js";

// counts: array of { label, count }, in display order.
export const weeklyDigestEmail = (counts) => {
  const total = counts.reduce((sum, { count }) => sum + count, 0);

  return {
    subject: `Weekly Lead Digest — ${total} new lead${total === 1 ? "" : "s"}`,
    html: emailLayout(`
      <p>Here's your summary of new leads over the past 7 days:</p>
      <table style="width: 100%; border-collapse: collapse;">
        ${counts
          .map(
            ({ label, count }) => `
              <tr>
                <td style="padding: 6px 8px; border-bottom: 1px solid #dee2e6;">${label}</td>
                <td style="padding: 6px 8px; border-bottom: 1px solid #dee2e6; text-align: right; font-weight: bold;">${count}</td>
              </tr>
            `
          )
          .join("")}
        <tr>
          <td style="padding: 6px 8px;"><strong>Total</strong></td>
          <td style="padding: 6px 8px; text-align: right;"><strong>${total}</strong></td>
        </tr>
      </table>
    `),
  };
};
