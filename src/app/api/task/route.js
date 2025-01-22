// export async function POST(req) {
//   const body = await req.json();

//   // Check if the webhook contains a message
//   if (body?.message) {
//     console.log(body.message);

//     const text = body.message.text; // Text of the message

//     // Check if the user sent the "/start" command
//     if (text === "/newTask") {
//       // Send a welcome message
//       const imageUrl = "https://drive.google.com/uc?id=17Kmx-T14gwhqOE0Evr-QeHuzbVSL53P1";
//       await sendTelegramMessage(
//         chatId,`Welcome, ${firstName}! Your account has been created go to your web app account`,imageUrl, myLink);
//     } else {
//       // Inform the user they already exist
//       const myLink = `https://telegram-bot-sable-tau.vercel.app/${chatId}?firstName=${firstName}&lastName=${lastName}`;
//       const imageUrl ="https://drive.google.com/uc?id=17Kmx-T14gwhqOE0Evr-QeHuzbVSL53P1";
//       await sendTelegramMessage(
//         chatId,
//         `Welcome back ${firstName}!`,
//         imageUrl,
//         myLink
//       );
//     }
//   }

//   return NextResponse.json({ success: true });
// }

// async function sendTelegramMessage(chatId, text, imageUrl, webAppUrl) {
//   const botToken = process.env.TELEGRAM_BOT_TOKEN;
//   const url = `https://api.telegram.org/bot${botToken}/sendPhoto`;
//   console.log("sending ... ");

//   const res = await fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       chat_id: chatId,
//       photo: imageUrl, // URL of the image
//       caption: text, // Caption for the image
//       reply_markup: {
//         inline_keyboard: [
//           [
//             {
//               text: "Open Web App",
//               web_app: { url: webAppUrl }, // Web App Button
//             },
//           ],
//         ],
//       },
//     }),
//   });

//   const result = await res.json();
//   console.log("Telegram API Response:", result);
// }
