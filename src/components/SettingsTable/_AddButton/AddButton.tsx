import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type SettingsTableEditCellProps = {
  disabled?: boolean;
  handleAddNewShortCut: () => void;
};

const SettingsTableAddButton = ({
  disabled,
  handleAddNewShortCut
}: SettingsTableEditCellProps) => {
  return (
    <div className='mt-6 text-left'>
      <Button
        className='flex items-center gap-2'
        disabled={disabled}
        onClick={handleAddNewShortCut}
      >
        <Plus />
        Add new shortcut
      </Button>
    </div>
  );
};

export default SettingsTableAddButton;
