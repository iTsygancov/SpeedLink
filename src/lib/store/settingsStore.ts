import { getFromStorage, updateSettingsStorage } from "../storage";
import { Settings } from "@/types";
import { create } from "zustand";

type SettingsStore = {
  settings: Settings | null;
  updateSettings: (newSettings: Settings) => void;
};

export const useSettingsStore = create<SettingsStore>((set) => {
  getFromStorage("speedlink").then((data) => {
    set({ settings: data.speedlink.settings });
  });

  return {
    settings: null,
    updateSettings: (newSettings: Settings) => {
      set({ settings: newSettings });
      updateSettingsStorage(newSettings);
    }
  };
});
