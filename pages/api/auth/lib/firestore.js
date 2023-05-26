import { initFirestore } from "@next-auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { getFirestore } from "firebase/firestore";
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

export const firestore = initFirestore();

const app = initializeApp({
  apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: NEXT_PUBLIC_FIREBASE_APP_ID,
});

const db = getFirestore(app);

export default db;

// export const auth = getAuth(firestore);
