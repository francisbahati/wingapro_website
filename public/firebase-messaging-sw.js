// Give the service worker access to Firebase Messaging.
importScripts('https://www.gstatic.com/firebasejs/10.18.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.18.0/firebase-messaging-compat.js');

// Your Firebase config (replace with your own)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/images/wingapro.webp',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});