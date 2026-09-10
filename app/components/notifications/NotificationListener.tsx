// app/components/notifications/NotificationListener.tsx
'use client';

import { useEffect, useState } from 'react';
import { onMessage, getToken, Messaging } from 'firebase/messaging';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import { getMessagingInstance } from '@/lib/firebase';
import apiClient from '@/lib/api/client';

export default function NotificationListener() {
  const { user } = useAuth();
  const [notif, setNotif] = useState<{ title: string; body: string } | null>(null);

  useEffect(() => {
    if (!user) return;
    let unsubscribe: (() => void) | undefined;

    const setup = async (messaging: Messaging) => {
      // Request permission
      try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return;

        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });
        if (token) {
          try {
            await apiClient.post('/users/fcm-token', { fcmToken: token });
          } catch {
            // silent
          }
        }
      } catch {
        // FCM unavailable — non-fatal
      }

      unsubscribe = onMessage(messaging, (payload) => {
        setNotif({
          title: payload.notification?.title || 'New notification',
          body: payload.notification?.body || '',
        });
      });
    };

    (async () => {
      const messaging = await getMessagingInstance();
      if (messaging) await setup(messaging);
    })();

    return () => unsubscribe?.();
  }, [user]);

  return (
    <Snackbar
      open={!!notif}
      autoHideDuration={6000}
      onClose={() => setNotif(null)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        severity="info"
        variant="filled"
        onClose={() => setNotif(null)}
        sx={{ borderRadius: 3, boxShadow: 4 }}
      >
        {notif?.title && <AlertTitle sx={{ fontWeight: 600 }}>{notif.title}</AlertTitle>}
        {notif?.body}
      </Alert>
    </Snackbar>
  );
}