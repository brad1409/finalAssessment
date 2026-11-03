import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyCHgg-pSAbPqdI0ZU2QTc1aZ9YxLfWxjyU",
  authDomain: "final-c1863.firebaseapp.com",
  projectId: "final-c1863",
  storageBucket: "final-c1863.firebasestorage.app",
  messagingSenderId: "131381370590",
  appId: "1:131381370590:web:c040962c65947124eeec4f",
  measurementId: "G-FF3C1N6NZZ"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
} else try {
  auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
} catch (error) {
  if (error.code === 'auth/already-initialized') auth = getAuth(app);
  else throw error;
}
const db = getFirestore(app);
export { auth, db };
