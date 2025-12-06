'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  messageId?: string;
  messageData?: {
    id: string;
    subject: string;
    content: string;
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
    };
  };
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const lastNotificationIdRef = useRef<string | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch('/api/notifications');
      const data = await response.json();

      if (data.success) {
        const newNotifications = data.data as Notification[];
        
        // Check if there are new notifications
        if (newNotifications.length > 0) {
          const latestId = newNotifications[0].id;
          
          // If this is a new notification (not the first load)
          if (lastNotificationIdRef.current && latestId !== lastNotificationIdRef.current) {
            // Find new notifications
            const newOnes = newNotifications.filter(
              (n) => !notifications.some((existing) => existing.id === n.id)
            );
            
            // Show browser notification for new ones
            if (newOnes.length > 0 && 'Notification' in window && Notification.permission === 'granted') {
              newOnes.forEach((notif) => {
                new Notification(notif.title, {
                  body: notif.message,
                  icon: '/favicon.ico',
                });
              });
            }
          }
          
          lastNotificationIdRef.current = latestId;
        }
        
        setNotifications(newNotifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, [notifications]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Initial fetch
    fetchNotifications();

    // Start polling every 5 seconds
    pollingIntervalRef.current = setInterval(() => {
      fetchNotifications();
    }, 5000);

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [fetchNotifications]);

  return {
    notifications,
    isLoading,
    removeNotification,
    clearNotifications,
    refetch: fetchNotifications,
  };
}
