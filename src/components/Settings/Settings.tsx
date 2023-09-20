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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useSettingsStore } from "@/lib/store/settingsStore";
import { PostAction } from "@/types";
import { Settings as SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";

type SettingsProps = {
  className?: string;
};

const Settings = ({ className }: SettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings } = useSettingsStore();
  const [useShift, setUseShift] = useState<boolean>(true);
  const [postAction, setPostAction] = useState<PostAction | undefined>(
    settings?.postAction
  );

  useEffect(() => {
    if (settings) {
      setUseShift(settings.useShift);
    }
  }, [settings]);

  const handleShiftSettingsChange = () => {
    setUseShift(!useShift);
  };

  const handleSelectValueChange = (value: PostAction) => {
    if (settings) {
      setPostAction(value);
    }
  };

  const handleCancel = () => {
    setTimeout(() => {
      if (settings) {
        setUseShift(settings.useShift);
        setPostAction(settings.postAction);
      }
    }, 100);
    setIsOpen(false);
  };

  const handleSave = () => {
    if (settings) {
      updateSettings({
        ...settings,
        useShift: useShift,
        postAction: postAction!
      });
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
        <div>
          <div className='flex items-center justify-between py-4'>
            <div className='flex items-center text-sm'>
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
          <div className='flex items-center justify-between py-4'>
            <p className='text-sm'>
              Customize what happens after you launch a shortcut
            </p>
            <Select
              value={postAction}
              onValueChange={(value) =>
                handleSelectValueChange(value as PostAction)
              }
            >
              <SelectTrigger className='flex h-auto w-auto items-center gap-0.5 rounded border px-2.5 py-0.5 text-sm'>
                <SelectValue placeholder={settings?.postAction} />
              </SelectTrigger>
              <SelectContent className='max-h-[280px]'>
                <SelectItem value='Jump to tab'>Jump to tab</SelectItem>
                <SelectItem value='Open in background'>
                  Open in background
                </SelectItem>
                <SelectItem value='Close & Jump to tab'>
                  Close & Jump to tab
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
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
