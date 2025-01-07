import { adminDb } from '../../../../lib/firebaseAdmin';
import admin from 'firebase-admin';

import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();

  // Check if the webhook contains a message
  if (body?.message) {
    console.log(body.message);
    
    const chatId = body.message.chat.id; // Telegram user's chat ID
    const firstName = body.message.chat.first_name || 'Unknown'; // User's first name
    const lastName = body.message.chat.last_name || ''; // Optional last name
    const username = body.message.chat.username || 'No username'; // Telegram username
    const text = body.message.text; // Text of the message

    // Check if the user sent the "/start" command
    if (text === '/start') {
      const userDoc = adminDb.collection('users').doc(chatId.toString());
      const userSnapshot = await userDoc.get();

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

        // Send a welcome message
        await sendTelegramMessage(chatId, `Welcome, ${firstName}! Your account has been created.`);
      } else {
        // Inform the user they already exist
        await sendTelegramMessage(chatId, `Welcome back, ${firstName}!`);
      }
    }
  }

  return NextResponse.json({ success: true });
}

// Function to send messages back to the Telegram bot
async function sendTelegramMessage(chatId, text) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}
