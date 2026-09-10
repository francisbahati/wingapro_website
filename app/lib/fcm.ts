// app/lib/fcm.ts
import { getToken } from 'firebase/messaging';
import apiClient from './api/client';
import { getMessagingInstance } from './firebase';

export const FcmService = {
  async register() {
    if (typeof window === 'undefined') return;
    const messaging = await getMessagingInstance();
    if (!messaging) return;

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });
    if (!token) return;

    await apiClient.post('/users/fcm-token', { fcmToken: token });
  },
};