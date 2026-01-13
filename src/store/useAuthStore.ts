import { create } from "zustand";

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

export const useAuthStore = create<AuthState>((set) => ({
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
      // If tempRole was set, it should match the login type, but we'll assume login sets the final type
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      userType: null,
      tempRole: null,
      isOnboarded: false,
    }),

  completeOnboarding: () => set({ isOnboarded: true }),
}));
