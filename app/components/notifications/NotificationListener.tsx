// app/components/notifications/NotificationListener.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { onMessage, Messaging } from 'firebase/messaging';
import { getToken } from 'firebase/messaging';
import { getMessagingInstance } from '@/lib/firebase';
import { Snackbar, Alert } from '@mui/material';

export default function NotificationListener() {
  const { user } = useAuth();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const requestPermissionAndGetToken = async (messaging: Messaging) => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const currentToken = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          });
          if (currentToken) {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/fcm-token`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ fcmToken: currentToken }),
            });
            console.log('FCM token registered');
          }
        }
      } catch (error) {
        console.error('Error getting FCM token:', error);
      }
    };

    const initMessaging = async () => {
      const messaging = await getMessagingInstance();
      if (messaging) {
        await requestPermissionAndGetToken(messaging);
        const unsubscribe = onMessage(messaging, (payload) => {
          setMessage(payload.notification?.title || 'New notification');
        });
        return () => unsubscribe();
      }
    };

    const unsubscribePromise = initMessaging();
    return () => {
      unsubscribePromise?.then((unsub) => unsub?.());
    };
  }, [user]);

  return (
    <Snackbar
      open={!!message}
      autoHideDuration={6000}
      onClose={() => setMessage(null)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity="info" onClose={() => setMessage(null)}>
        {message}
      </Alert>
    </Snackbar>
  );
}