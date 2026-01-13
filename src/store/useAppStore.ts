import { create } from "zustand";
import { toast } from "sonner";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  timestamp: Date;
}

interface AppState {
  notifications: AppNotification[];
  addNotification: (
    title: string,
    message: string,
    type?: AppNotification["type"]
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  notifications: [],

  addNotification: (title, message, type = "info") => {
    const newNotification: AppNotification = {
      id: Math.random().toString(36).substring(7),
      title,
      message,
      type,
      read: false,
      timestamp: new Date(),
    };

    set((state) => ({
      notifications: [newNotification, ...state.notifications],
    }));

    // Trigger toast locally when adding notification
    if (type === "success") toast.success(title, { description: message });
    else if (type === "error") toast.error(title, { description: message });
    else if (type === "warning") toast.warning(title, { description: message });
    else toast.info(title, { description: message });
  },

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  clearNotifications: () => set({ notifications: [] }),
}));
