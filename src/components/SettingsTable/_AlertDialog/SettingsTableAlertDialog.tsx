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

export type SettingsTableAlertDialogProps = {
  currentShortcut: Shortcut;
  initialShortcut: Shortcut;
  isDialogOpen: boolean;
  handleDeleteShortcut: (id: string) => void;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  setCurrentShortcut: (item: Shortcut) => void;
};

const SettingsTableAlertDialog = ({
  currentShortcut,
  initialShortcut,
  isDialogOpen,
  handleDeleteShortcut,
  setIsDialogOpen,
  setCurrentShortcut
}: SettingsTableAlertDialogProps) => {
  const handleCancelClick = () => {
    setCurrentShortcut(initialShortcut);
    setIsDialogOpen(false);
  };

  const handleDeleteClick = () => {
    handleDeleteShortcut(currentShortcut.id);
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
