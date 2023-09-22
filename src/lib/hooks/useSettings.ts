import { useSettingsStore } from "@/lib/store/settingsStore";
import { PostAction } from "@/types";
import { useState } from "react";

export const useSettings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { settings, updateSettings } = useSettingsStore();
  const [useShift, setUseShift] = useState<boolean>(settings.useShift);
  const [useSmartTabs, setUseSmartTabs] = useState<boolean>(settings.smartTabs);
  const [postAction, setPostAction] = useState<PostAction>(settings.postAction);

  const handleShiftSettingsChange = () => {
    setUseShift(!useShift);
  };

  const handleUseSmartTabChange = () => {
    setUseSmartTabs(!useSmartTabs);
  };

  const handleSelectValueChange = (value: PostAction) => {
    setPostAction(value);
  };

  const handleCancel = () => {
    setTimeout(() => {
      setUseShift(settings.useShift);
      setUseSmartTabs(settings.smartTabs);
      setPostAction(settings.postAction);
    }, 100);
    setIsDialogOpen(false);
  };

  const handleSave = () => {
    updateSettings({
      ...settings,
      useShift: useShift,
      postAction: postAction,
      smartTabs: useSmartTabs
    });
    setIsDialogOpen(false);
  };

  return {
    isDialogOpen,
    postAction,
    settings,
    useShift,
    useSmartTab: useSmartTabs,
    setIsDialogOpen,
    handleShiftSettingsChange,
    handleUseSmartTabChange,
    handleSelectValueChange,
    handleCancel,
    handleSave
  };
};
