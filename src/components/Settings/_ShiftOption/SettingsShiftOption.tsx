import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

type SettingsShiftOptionProps = {
  handleShiftSettingsChange: (value: boolean) => void;
  useShift: boolean;
};

const SettingsShiftOption = ({
  handleShiftSettingsChange,
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
      <Switch checked={useShift} onCheckedChange={handleShiftSettingsChange} />
    </div>
  );
};

export default SettingsShiftOption;
