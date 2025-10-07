import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification, NotificationState } from '@/types';

const initialState: NotificationState = {
  notifications: [
    {
      id: '1',
      title: 'Welcome to ShopHub Pro! 🎉',
      message: 'Explore our amazing collection of products',
      type: 'success',
      date: new Date().toISOString(),
      read: false,
    },
    {
      id: '2',
      title: 'Flash Sale Alert! ⚡',
      message: 'Up to 50% off on selected items. Limited time only!',
      type: 'warning',
      date: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      link: '/products',
    },
  ],
  unreadCount: 2,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.notifications.unshift(notification);
      if (!notification.read) {
        state.unreadCount += 1;
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(n => n.read = true);
      state.unreadCount = 0;
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
});

export const { 
  addNotification, 
  markAsRead, 
  markAllAsRead, 
  deleteNotification, 
  clearAllNotifications 
} = notificationSlice.actions;

export default notificationSlice.reducer;