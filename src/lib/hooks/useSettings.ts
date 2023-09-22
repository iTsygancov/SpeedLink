import { useSettingsStore } from "@/lib/store/settingsStore";
import { PostAction, Settings } from "@/types";
import { useState } from "react";

export const useSettings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { settings, updateSettings } = useSettingsStore();
  const [settingsState, setSettingsState] = useState<Settings>({
    postAction: settings.postAction,
    smartTabs: settings.smartTabs,
    theme: settings.theme,
    useShift: settings.useShift
  });

  const handleSwitchChange = (name: keyof Settings, value: boolean) => {
    setSettingsState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (value: PostAction) => {
    setSettingsState((prevState) => ({
      ...prevState,
      postAction: value
    }));
  };

  const handleCancel = () => {
    setTimeout(() => {
      setSettingsState(settings);
    }, 100);
    setIsDialogOpen(false);
  };

  const handleSave = () => {
    updateSettings({
      ...settings,
      useShift: settingsState.useShift,
      postAction: settingsState.postAction,
      smartTabs: settingsState.smartTabs
    });
    setIsDialogOpen(false);
  };

  return {
    isDialogOpen,
    settingsState,
    handleCancel,
    handleSave,
    handleSelectChange,
    handleSwitchChange,
    setIsDialogOpen
  };
};
