import admin from 'firebase-admin';
// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Handle multiline keys
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}



const adminDb = admin.firestore();
const realTimeDb = admin.database();



export { adminDb , realTimeDb };
