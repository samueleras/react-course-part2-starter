import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

interface AuthStore {
  user: string;
  login: (userName: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: "",
  login: (userName) => set(() => ({ user: userName })), // no need to spread the object, zustand merges it by itself
  logout: () => set(() => ({ user: "" })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("Auth Store", useAuthStore);

export default useAuthStore;
