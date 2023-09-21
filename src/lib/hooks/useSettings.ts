import { useSettingsStore } from "@/lib/store/settingsStore";
import { PostAction } from "@/types";
import { useState } from "react";

export const useSettings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { settings, updateSettings } = useSettingsStore();
  const [useShift, setUseShift] = useState<boolean>(settings.useShift);
  const [postAction, setPostAction] = useState<PostAction>(settings.postAction);

  const handleShiftSettingsChange = () => {
    setUseShift(!useShift);
  };

  const handleSelectValueChange = (value: PostAction) => {
    setPostAction(value);
  };

  const handleCancel = () => {
    setTimeout(() => {
      setUseShift(settings.useShift);
      setPostAction(settings.postAction);
    }, 100);
    setIsDialogOpen(false);
  };

  const handleSave = () => {
    updateSettings({
      ...settings,
      useShift: useShift,
      postAction: postAction
    });
    setIsDialogOpen(false);
  };

  return {
    isDialogOpen,
    postAction,
    settings,
    useShift,
    setIsDialogOpen,
    handleShiftSettingsChange,
    handleSelectValueChange,
    handleCancel,
    handleSave
  };
};
