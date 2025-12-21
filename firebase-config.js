// firebase-config.js
// Firebase Configuration and Initialization

// TODO: Replace with your Firebase project credentials
// Get these from: Firebase Console > Project Settings > Your Apps > Web App
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
let app;
let db;
let auth;

function initializeFirebase() {
  try {
    // Initialize Firebase App
    app = firebase.initializeApp(firebaseConfig);
    
    // Initialize Firestore
    db = firebase.firestore();
    
    // Initialize Authentication
    auth = firebase.auth();
    
    console.log('✅ Firebase initialized successfully');
    
    // Enable offline persistence
    db.enablePersistence()
      .catch((err) => {
        if (err.code === 'failed-precondition') {
          console.warn('⚠️ Persistence failed: Multiple tabs open');
        } else if (err.code === 'unimplemented') {
          console.warn('⚠️ Persistence not available in this browser');
        }
      });
    
    return true;
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
    return false;
  }
}

// Firestore Collections
const COLLECTIONS = {
  PROVIDERS: 'providers',
  CUSTOMERS: 'customers',
  REQUESTS: 'service_requests',
  REVIEWS: 'reviews',
  USERS: 'users'
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  initializeFirebase();
});
