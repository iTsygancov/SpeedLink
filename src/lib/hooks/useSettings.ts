import { getFromStorage, updateSettingsStorage } from "../storage";
import { Settings } from "@/types";
import { useEffect, useState } from "react";

const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    theme: "system",
    useShift: true
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await getFromStorage("speedlink");
      setSettings(data.speedlink.settings);
      setIsSaved(false);
    };
    getData();
  }, [isSaved]);

  const updateSettings = (newSettings: Settings) => {
    updateSettingsStorage(newSettings);
    setIsSaved(true);
  };

  return { settings, updateSettings };
};

export default useSettings;
