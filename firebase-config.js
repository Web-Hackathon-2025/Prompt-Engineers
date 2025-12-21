// Firebase Configuration and Initialization (Modular SDK v9)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

// Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhUUt_I_E9DW0qCn7XMQyO7aJv-GyEYCI",
  authDomain: "karigar-21ced.firebaseapp.com",
  projectId: "karigar-21ced",
  storageBucket: "karigar-21ced.firebasestorage.app",
  messagingSenderId: "927258761848",
  appId: "1:927258761848:web:cd33800a11401248ddab8d",
  measurementId: "G-4ZWE0SXT1S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log('✅ Firebase initialized successfully');

// Export for use in other modules
export { auth, db, app };
