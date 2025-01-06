// pages/api/telegram.js
import {db} from "../../../lib/firebaseAdmin"
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    if (message == "/start") {
      const chatId = message.chat.id;
      const username = message.from.username || "unknown";

      try {
        // Save Telegram ID and username to Firestore
        await db.collection("users").doc(chatId.toString()).set({
          telegramId: chatId,
          username : username,
          
        });

        // Respond to the user via Telegram
        await axios.post(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            chat_id: chatId,
            text: "Your Telegram ID has been saved! nmot 3lik omri mwa777",
          }
        );

        return res.status(200).json({ success: true });
      } catch (error) {
        console.error("Error handling webhook:", error);
        return res.status(500).json({ success: false, error: error.message });
      }
    }
    return res.status(400).json({ success: false, error: "Invalid request" });
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
