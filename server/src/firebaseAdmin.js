import admin from "firebase-admin";
import dotenv from "dotenv";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

dotenv.config();

let adminApp;

if (!admin.apps.length) {
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
    ? resolve(process.cwd(), process.env.FIREBASE_SERVICE_ACCOUNT_PATH)
    : null;

  if (serviceAccountPath && existsSync(serviceAccountPath)) {
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"));
    adminApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID || serviceAccount.project_id,
    });
  } else if (process.env.FIREBASE_PROJECT_ID) {
    adminApp = admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  } else {
    adminApp = admin.initializeApp();
  }
} else {
  adminApp = admin.app();
}

export const adminDb = admin.firestore(adminApp);
export const adminAuth = admin.auth(adminApp);
export const adminStorage = admin.storage(adminApp);
export default adminApp;
