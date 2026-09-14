// public/firebase-messaging-sw.js
// Firebase Cloud Messaging service worker for WingaPro.
// Reads config from /firebase-config.js (generated at build time).
'use strict';

importScripts('https://www.gstatic.com/firebasejs/10.18.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.18.0/firebase-messaging-compat.js');
importScripts('/firebase-config.js');

if (!self.FIREBASE_CONFIG || !self.FIREBASE_CONFIG.apiKey) {
  console.error(
    '[firebase-messaging-sw] FIREBASE_CONFIG missing or invalid. ' +
    'Check that NEXT_PUBLIC_FIREBASE_* env vars are set and that ' +
    'scripts/generate-firebase-config.js ran before build.'
  );
} else {
  self.firebase.initializeApp(self.FIREBASE_CONFIG);
  const messaging = self.firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    const title =
      (payload.notification && payload.notification.title) ||
      (payload.data && payload.data.title) ||
      'WingaPro';

    const body =
      (payload.notification && payload.notification.body) ||
      (payload.data && payload.data.body) ||
      '';

    const relatedOrderId = payload.data && payload.data.relatedOrderId;
    const notifTag = relatedOrderId ? `order-${relatedOrderId}` : undefined;

    self.registration.showNotification(title, {
      body,
      icon: '/images/wingapro.webp',
      badge: '/images/wingapro.webp',
      data: payload.data || {},
      tag: notifTag,
      renotify: Boolean(notifTag),
    });
  });

  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const data = event.notification.data || {};

    let target = '/dashboard';
    if (data.type === 'order_status' && data.relatedOrderId) {
      target = `/orders/${data.relatedOrderId}`;
    } else if (data.type === 'withdrawal' || data.type === 'wallet') {
      target = '/wallet';
    } else if (data.type === 'announcement') {
      target = '/notifications';
    }

    event.waitUntil(
      self.clients
        .matchAll({ type: 'window', includeUncontrolled: true })
        .then((clientList) => {
          for (const client of clientList) {
            if ('focus' in client && 'navigate' in client) {
              client.navigate(target);
              return client.focus();
            }
          }
          if (self.clients.openWindow) return self.clients.openWindow(target);
        })
    );
  });
}