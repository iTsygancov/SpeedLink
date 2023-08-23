import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type SettingsTableEditCellProps = {
  handleAddNewShortCut: () => void;
};

const SettingsTableAddButton = ({
  handleAddNewShortCut
}: SettingsTableEditCellProps) => {
  return (
    <div className='mt-6 text-left'>
      <Button
        className='flex items-center gap-2'
        variant='secondary'
        onClick={handleAddNewShortCut}
      >
        <Plus />
        Add new shortcut
      </Button>
    </div>
  );
};

export default SettingsTableAddButton;
