export const emailLayout = (bodyHtml) => `
  <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #212529;">
    <div style="background: #0d6efd; padding: 20px 24px; border-radius: 8px 8px 0 0;">
      <h1 style="color: #fff; margin: 0; font-size: 20px;">SmediaTek Solutions</h1>
    </div>
    <div style="border: 1px solid #dee2e6; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
      ${bodyHtml}
    </div>
    <p style="color: #6c757d; font-size: 12px; margin-top: 16px; text-align: center;">
      SmediaTek Solutions · Lagos, Nigeria
    </p>
  </div>
`;
