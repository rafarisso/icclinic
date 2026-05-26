import { create } from "zustand";
import type { Notification, User } from "@/types";

interface AppStore {
  user: User | null;
  isLoading: boolean;
  notifications: Notification[];
  setUser: (user: User | null) => void;
  markNotificationsRead: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  isLoading: false,
  notifications: [{ id: "n-1", title: "Pré-cuidados disponíveis", read: false }],
  setUser: (user) => set({ user }),
  markNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        read: true
      }))
    }))
}));
