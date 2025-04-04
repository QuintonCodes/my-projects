import { create } from "zustand";

interface AuthStoreProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAuthStore = create<AuthStoreProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
