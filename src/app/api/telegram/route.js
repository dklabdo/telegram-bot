import { adminDb } from "../../../../lib/firebaseAdmin";
import admin from "firebase-admin";

import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  // Check if the webhook contains a message
  if (body?.message) {
    console.log(body.message);

    const chatId = body.message.chat.id; // Telegram user's chat ID
    const firstName = body.message.chat.first_name || "Unknown"; // User's first name
    const lastName = body.message.chat.last_name || ""; // Optional last name
    const username = body.message.chat.username || "No username"; // Telegram username
    const text = body.message.text; // Text of the message

    // Check if the user sent the "/start" command
    if (text.startsWith("/start")) {
      const userDoc = adminDb.collection("users").doc(chatId.toString());
      const userSnapshot = await userDoc.get();
      const referralCode = text.split(" ")[1];
      console.log(referralCode);

      // Check if the user is already in the database
      if (!userSnapshot.exists) {
        // Add the user to Firestore
        await userDoc.set({
          id: chatId,
          firstName,
          lastName,
          username,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        if (referralCode) {
          await rewardReferrer(referralCode, chatId);
        }

        // Send a welcome message
        const myLink = `https://telegram-bot-sable-tau.vercel.app/${chatId}?firstName=${firstName}&lastName=${lastName}`;
        const imageUrl =
          "https://drive.google.com/uc?id=17Kmx-T14gwhqOE0Evr-QeHuzbVSL53P1";
        await sendTelegramMessage(
          chatId,
          `Welcome, ${firstName}! Your account has been created go to your web app account`,
          imageUrl,
          myLink
        );
      } else {
        // Inform the user they already exist
        const myLink = `https://telegram-bot-sable-tau.vercel.app/${chatId}?firstName=${firstName}&lastName=${lastName}`;
        const imageUrl =
          "https://drive.google.com/uc?id=17Kmx-T14gwhqOE0Evr-QeHuzbVSL53P1";
        await sendTelegramMessage(
          chatId,
          `Welcome back ${firstName}!`,
          imageUrl,
          myLink
        );
      }
    }
  }

  return NextResponse.json({ success: true });
}

// Function to send messages back to the Telegram bot
async function sendTelegramMessage(chatId, text, imageUrl, webAppUrl) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const url = `https://api.telegram.org/bot${botToken}/sendPhoto`;
  console.log("sending ... ");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      photo: imageUrl, // URL of the image
      caption: text, // Caption for the image
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Open Web App",
              web_app: { url: webAppUrl }, // Web App Button
            },
          ],
        ],
      },
    }),
  });

  const result = await res.json();
  console.log("Telegram API Response:", result);
}



async function rewardReferrer(referrerId) {
  try {
    // Create a reference to the referring user's data in Realtime Database
    const referrerRef = admin.database().ref(`user/${referrerId}`);

    // Fetch the referring user's data
    const snapshot = await referrerRef.once('value');

    // Check if the referring user exists
    if (snapshot.exists()) {
      const referrerData = snapshot.val();

      // Update the referring user's score (e.g., +10 points)
      const newScore = referrerData.score  + 150;

      // Update the score in the database
      await referrerRef.update({ score: newScore });

      console.log(`Rewarded user ${referrerId} with 10 points. New score: ${newScore}`);
    } else {
      console.log(`Referring user ${referrerId} not found.`);
    }
  } catch (err) {
    console.error('Error rewarding referrer:', err);
  }
}

