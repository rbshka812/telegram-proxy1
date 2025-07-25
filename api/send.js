export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const message = `👤 Новая заявка\nФИО: ${name}\n📞 Телефон: ${phone}`;
  const token = "7958372133:AAF9v8LZKOJiYf5XkQzES3VgSU4WkVTA5hg";
  const chatId = "7958372133";

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    const tgData = await tgRes.json();

    if (!tgRes.ok) {
      return res.status(500).json({ error: "Failed to send message", details: tgData });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Request error", details: error.message });
  }
}
