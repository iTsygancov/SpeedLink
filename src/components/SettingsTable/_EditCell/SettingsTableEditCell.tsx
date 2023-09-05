import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { Shortcut } from "@/types";
import { Check, MoreHorizontal, X } from "lucide-react";

type SettingsTableEditCellProps = {
  handleCloseEditShortcuts: () => void;
  handleEditShortcuts: (item: Shortcut, itemIndex: number) => void;
  handleSaveShortcut: (item: Shortcut, itemIndex: number) => void;
  isInEditMode: boolean;
  item: Shortcut;
  itemIndex: number;
  setCurrentCommand: (item: Shortcut) => void;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
};

const SettingsTableEditCell = ({
  handleCloseEditShortcuts,
  handleEditShortcuts,
  handleSaveShortcut,
  item,
  itemIndex,
  isInEditMode,
  setCurrentCommand,
  setIsDialogOpen
}: SettingsTableEditCellProps) => {
  return (
    <TableCell className='p-0 pr-4 text-right'>
      {item.canEdit ? (
        <>
          <Button
            className='mr-4 h-7 px-4'
            onClick={() => handleSaveShortcut(item, itemIndex)}
            size='sm'
          >
            <Check size={16} />
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='h-7 px-4'
            onClick={handleCloseEditShortcuts}
          >
            <X size={16} />
          </Button>
        </>
      ) : (
        <>
          {!isInEditMode && (
            <DropdownMenu>
              <DropdownMenuTrigger className='focus-within:outline-offset-2 focus-within:outline-primary'>
                <MoreHorizontal size={24} className='cursor-pointer ' />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => handleEditShortcuts(item, itemIndex)}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='text-red-500'
                  onClick={() => {
                    setCurrentCommand(item);
                    setIsDialogOpen(true);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </>
      )}
    </TableCell>
  );
};

export default SettingsTableEditCell;
