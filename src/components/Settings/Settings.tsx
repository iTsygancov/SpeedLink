import SettingsPostActionOption from "./_PostActionOption/SettingsPostActionOption";
import SettingsShiftOption from "./_ShiftOption/SettingsShiftOption";
import SettingsSmartTabs from "./_SmartTab/SettingsSmartTab";
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
import { useSettings } from "@/lib/hooks/useSettings";
import { Settings as SettingsIcon } from "lucide-react";

type SettingsProps = {
  className?: string;
};

const Settings = ({ className }: SettingsProps) => {
  const {
    isDialogOpen,
    settingsState,
    handleCancel,
    handleSave,
    handleSelectChange,
    handleSwitchChange,
    setIsDialogOpen
  } = useSettings();

  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger
        asChild
        className={className}
        onClick={() => setIsDialogOpen(true)}
      >
        <Button variant='outline' size='icon'>
          <SettingsIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:text-white' />
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
        <div className='mb-6'>
          <SettingsShiftOption
            handleSwitchChange={handleSwitchChange}
            useShift={settingsState.useShift}
          />
          <SettingsSmartTabs
            handleSwitchChange={handleSwitchChange}
            useSmartTabs={settingsState.smartTabs}
          />
          <SettingsPostActionOption
            handleSelectChange={handleSelectChange}
            postAction={settingsState.postAction}
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
