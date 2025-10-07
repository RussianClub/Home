// firebaseConfig.js  (Firebase JS SDK v8 - compatibility with your existing HTML)
var firebaseConfig = {
    apiKey: "AIzaSyDlEY_2bDv25T5GTCzTEk7sQIZrAxh5irc",
    authDomain: "russian-club.firebaseapp.com",
    databaseURL: "https://russian-club-default-rtdb.firebaseio.com",
    projectId: "russian-club",
    storageBucket: "russian-club.appspot.com",
    messagingSenderId: "1096848291195",
    appId: "1:1096848291195:web:2c8c12e9c6c913f83210c7",
    measurementId: "G-5M46DNJ1YP"
};

// Initialize Firebase (v8)
if (!window.firebase || !firebase.initializeApp) {
    console.error("Firebase v8 SDK not loaded. Make sure you included v8 <script> tags in HTML.");
} else {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }

    // Optional: set globals for convenience (so your rajni.html can use `firebase.auth()` and `firebase.firestore()`)
    window.auth = firebase.auth();
    window.db = firebase.firestore();

    // Optional: enable persistence (catch errors)
    firebase.firestore().enablePersistence()
      .catch((err) => {
        console.warn("Persistence error:", err && err.code);
      });
}