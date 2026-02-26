import { create } from "zustand";

interface MessageState {
  shouldGoDown: boolean;
  setGoDown(shouldGoDown: boolean): void;
}

export const useMessageStore = create<MessageState>((set) => ({
  shouldGoDown: false,
  setGoDown(shouldGoDown) {
    set({ shouldGoDown });
  },
}));
