import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useSettingsStore } from "@/lib/store/settingsStore";
import { Settings as SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";

type SettingsProps = {
  className?: string;
};

const Settings = ({ className }: SettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings } = useSettingsStore();
  const [useShift, setUseShift] = useState<boolean>(true);

  useEffect(() => {
    if (settings) {
      setUseShift(settings.useShift);
    }
  }, [settings]);

  const handleShiftSettingsChange = () => {
    setUseShift(!useShift);
  };

  const handleCancel = () => {
    setTimeout(() => {
      if (settings) {
        setUseShift(settings.useShift);
      }
    }, 100);
    setIsOpen(false);
  };

  const handleSave = () => {
    if (settings) {
      updateSettings({ ...settings, useShift: useShift });
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger
        asChild
        className={className}
        onClick={() => setIsOpen(true)}
      >
        <Button variant='outline' size='icon'>
          <SettingsIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all  dark:text-white' />
          <span className='sr-only'>Toggle settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Make changes to your settings here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center justify-between py-4'>
          <div className='flex items-center'>
            Use{" "}
            <Badge
              variant='outline'
              className='mx-2 mt-0.5 select-none rounded'
            >
              Shift
            </Badge>
            key as a modifier
          </div>
          <Switch
            checked={useShift}
            onCheckedChange={handleShiftSettingsChange}
          />
        </div>
        <DialogFooter>
          <Button variant='secondary' onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
