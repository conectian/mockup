import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type UserType = "client" | "provider" | "admin" | null;
export type UserRole = UserType; // Alias for consistency

interface AuthState {
  isAuthenticated: boolean;
  userType: UserType;
  tempRole: UserType; // For role selection before registration
  isOnboarded: boolean;

  setTempRole: (role: UserType) => void;
  setRole: (role: UserType) => void;
  login: (type: UserType) => void;
  logout: () => void;
  completeOnboarding: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userType: null,
      tempRole: null,
      isOnboarded: false,

      setTempRole: (role) => set({ tempRole: role }),
      setRole: (role) => set({ userType: role }),

      login: (type) =>
        set({
          isAuthenticated: true,
          userType: type,
        }),

      logout: () =>
        set({
          isAuthenticated: false,
          userType: null,
          tempRole: null,
          isOnboarded: false,
        }),

      completeOnboarding: () => set({ isOnboarded: true }),
    }),
    {
      name: "auth-storage", // unique name
      storage: createJSONStorage(() => localStorage),
    }
  )
);
