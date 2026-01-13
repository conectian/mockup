import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CreditsState {
  balance: number;
  unlockedRFPs: string[];

  spendCredits: (amount: number, rfpId: string) => boolean;
  addCredits: (amount: number) => void;
  isRFPUnlocked: (rfpId: string) => boolean;
}

export const useCreditsStore = create<CreditsState>()(
  persist(
    (set, get) => ({
      balance: 150,
      unlockedRFPs: [],

      spendCredits: (amount, rfpId) => {
        const { balance, unlockedRFPs } = get();
        if (balance < amount) return false;

        set({
          balance: balance - amount,
          unlockedRFPs: [...unlockedRFPs, rfpId],
        });
        return true;
      },

      addCredits: (amount) =>
        set((state) => ({
          balance: state.balance + amount,
        })),

      isRFPUnlocked: (rfpId) => get().unlockedRFPs.includes(rfpId),
    }),
    {
      name: "conectian-credits",
    }
  )
);
