import { create } from "zustand";

interface CounterStore {
  counter: number;
  increment: () => void;
  reset: () => void;
}

const useCounterStore = create<CounterStore>((set) => ({
  counter: 0,
  increment: () => set((store) => ({ counter: store.counter + 1 })), // no need to spread the object, zustand merges it by itself
  reset: () => set(() => ({ counter: 0 })),
}));

export default useCounterStore;
