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
import useSettings from "@/lib/hooks/useSettings";
import { Settings as SettingsIcon } from "lucide-react";
import { useState } from "react";

type SettingsProps = {
  className?: string;
};

const Settings = ({ className }: SettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings } = useSettings();
  const [useShift, setUseShift] = useState<boolean>(true);

  const handleShiftSettingsChange = () => {
    setUseShift(!useShift);
  };

  const handleCancel = () => {
    setTimeout(() => {
      setUseShift(settings.useShift);
    }, 100);
    setIsOpen(false);
  };

  const handleSave = () => {
    updateSettings({ ...settings, useShift: useShift });
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
