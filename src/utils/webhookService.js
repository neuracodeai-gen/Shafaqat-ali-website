// Webhook service for sending verification codes via n8n
// Uses the n8n webhook URL for email delivery

const WEBHOOK_URL = 'https://n8n-production-182e.up.railway.app/webhook/email';

export const sendVerificationEmail = async (verificationCode, username, email) => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        verificationcode: verificationCode,
        username: username,
        email: email,
        Product: 'Shafaqat Portfolio',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false, error: error.message };
  }
};
