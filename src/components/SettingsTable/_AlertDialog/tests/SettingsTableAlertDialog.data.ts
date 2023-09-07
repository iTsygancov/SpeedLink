import { SettingsTableAlertDialogProps } from "../SettingsTableAlertDialog";
import { vi } from "vitest";

const initialCommand = {
  canEdit: true,
  id: "",
  shortcut: "",
  title: "",
  url: ""
};

export const initialProps: SettingsTableAlertDialogProps = {
  currentCommand: initialCommand,
  initialCommand: initialCommand,
  isDialogOpen: false,
  handleDeleteShortcut: vi.fn(),
  setIsDialogOpen: vi.fn(),
  setCurrentCommand: vi.fn()
};
