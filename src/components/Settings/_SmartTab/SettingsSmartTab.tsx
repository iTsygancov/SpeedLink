import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Info } from "lucide-react";

type SettingsSmartTabProps = {
  handleUseSmartTabChange: (value: boolean) => void;
  useSmartTab: boolean;
};

const SettingsSmartTabs = ({
  handleUseSmartTabChange,
  useSmartTab
}: SettingsSmartTabProps) => {
  return (
    <div className='flex items-center justify-between py-4'>
      <p className='flex items-center gap-3 text-sm'>
        Use Smart tabs
        <Popover>
          <PopoverTrigger>
            <Info size={16} />
          </PopoverTrigger>
          <PopoverContent className='text-sm'>
            When you open a shortcut, it will instantly switch to any matching
            tabs with the same URL, avoiding duplicate tabs.
          </PopoverContent>
        </Popover>
      </p>
      <Switch checked={useSmartTab} onCheckedChange={handleUseSmartTabChange} />
    </div>
  );
};

export default SettingsSmartTabs;
