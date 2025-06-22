import { create } from "zustand";

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: "message" | "order" | "price_drop" | "general";
}

interface NotificationsStore {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, "id">) => void;
  removeNotification: (id: string) => void;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New message from seller",
    message: "TechTraders responded to your inquiry about Samsung Galaxy S22",
    time: "2 hours ago",
    unread: true,
    type: "message",
  },
  {
    id: "2",
    title: "Price drop alert",
    message: "Mountain Bike - Trek is now R5,500 (was R6,500)",
    time: "1 day ago",
    unread: true,
    type: "price_drop",
  },
  {
    id: "3",
    title: "Order shipped",
    message: "Your order #12345 has been shipped and is on its way",
    time: "2 days ago",
    unread: false,
    type: "order",
  },
  {
    id: "4",
    title: "New favourite available",
    message: "A similar item to your favourites is now available",
    time: "3 days ago",
    unread: false,
    type: "general",
  },
];

export const useNotificationsStore = create<NotificationsStore>((set) => ({
  notifications: mockNotifications,
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      ),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        unread: false,
      })),
    })),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        { ...notification, id: Date.now().toString() },
        ...state.notifications,
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    })),
}));
