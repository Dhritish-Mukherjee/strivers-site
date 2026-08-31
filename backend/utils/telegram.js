const sendTelegramNotification = async (student) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Telegram bot token or chat ID is missing. Notification not sent.");
    return;
  }

  const message = `
🎉 <b>New Student Registered</b> 🎉

📧 <b>Email:</b> ${student.email}
📱 <b>Phone:</b> ${student.phone || 'N/A'}
📢 <b>Marketing Opt-in:</b> ${student.marketingOptIn ? 'Yes' : 'No'}
📅 <b>Date:</b> ${new Date(student.createdAt || Date.now()).toLocaleString()}
  `.trim();

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to send Telegram notification:', errorData);
    }
  } catch (error) {
    console.error('Error sending Telegram notification:', error.message);
  }
};

module.exports = {
  sendTelegramNotification,
};
