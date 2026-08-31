const sendTelegramNotification = async (student) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIdsRaw = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatIdsRaw) {
    console.warn("Telegram bot token or chat ID is missing. Notification not sent.");
    return;
  }

  // Parse comma-separated chat IDs
  const chatIds = chatIdsRaw.split(',').map(id => id.trim()).filter(Boolean);

  const message = `
🎉 <b>New Student Registered</b> 🎉

👤 <b>Name:</b> ${student.name || 'N/A'}
📧 <b>Email:</b> ${student.email}
📱 <b>Phone:</b> ${student.phone || 'N/A'}
🎓 <b>College:</b> ${student.college || 'N/A'}
📆 <b>Graduation Year:</b> ${student.graduationYear || 'N/A'}
📢 <b>Marketing Opt-in:</b> ${student.marketingOptIn ? 'Yes' : 'No'}
📅 <b>Date:</b> ${new Date(student.createdAt || Date.now()).toLocaleString()}
  `.trim();

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const sendPromises = chatIds.map(async (chatId) => {
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
        console.error(`Failed to send Telegram notification to ${chatId}:`, errorData);
      } else {
        console.log(`✅ Telegram notification successfully sent to ${chatId}`);
      }
    });

    await Promise.allSettled(sendPromises);
  } catch (error) {
    console.error('Error sending Telegram notifications:', error.message);
  }
};

module.exports = {
  sendTelegramNotification,
};
