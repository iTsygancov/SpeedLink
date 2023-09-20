import { getFromStorage } from "../storage";
import { Settings } from "@/types";
import { create } from "zustand";

type SettingsStore = {
  settings: Settings | null;
  getSettings: () => void;
  updateSettings: (newSettings: Settings) => void;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: null,
  getSettings: async () => {
    const data = await getFromStorage("speedlink");
    set({ settings: data.speedlink.settings });
  },
  updateSettings: (newSettings: Settings) => set({ settings: newSettings })
}));
