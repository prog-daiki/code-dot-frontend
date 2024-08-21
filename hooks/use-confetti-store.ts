import { create } from "zustand";

type ConfettiState = {
  isOpen: boolean;
};

type ConfettiActions = {
  onOpen: () => void;
  onClose: () => void;
};

type ConfettiStore = ConfettiState & ConfettiActions;

export const useConfettiStore = create<ConfettiStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
