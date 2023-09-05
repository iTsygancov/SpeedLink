import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Shortcut } from "@/types";

type SettingsTableAlertDialogProps = {
  currentCommand: Shortcut;
  initialCommand: Shortcut;
  isDialogOpen: boolean;
  handleDeleteShortcut: (id: string) => void;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  setCurrentCommand: (item: Shortcut) => void;
};

const SettingsTableAlertDialog = ({
  currentCommand,
  initialCommand,
  isDialogOpen,
  handleDeleteShortcut,
  setIsDialogOpen,
  setCurrentCommand
}: SettingsTableAlertDialogProps) => {
  const handleCancelClick = () => {
    setCurrentCommand(initialCommand);
    setIsDialogOpen(false);
  };

  const handleDeleteClick = () => {
    handleDeleteShortcut(currentCommand.id);
  };

  return (
    <AlertDialog open={isDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            shortcut.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancelClick}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteClick}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SettingsTableAlertDialog;
