import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Settings } from "@/types";

type SettingsShiftOptionProps = {
  handleSwitchChange: (name: keyof Settings, value: boolean) => void;
  useShift: boolean;
};

const SettingsShiftOption = ({
  handleSwitchChange,
  useShift
}: SettingsShiftOptionProps) => {
  return (
    <div className='flex items-center justify-between py-4'>
      <div className='flex items-center text-sm'>
        Use{" "}
        <Badge variant='outline' className='mx-2 mt-0.5 select-none rounded'>
          Shift
        </Badge>
        key as a modifier
      </div>
      <Switch
        checked={useShift}
        onCheckedChange={(value) => handleSwitchChange("useShift", value)}
      />
    </div>
  );
};

export default SettingsShiftOption;
