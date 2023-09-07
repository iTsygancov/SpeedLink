import { SettingsTableEditCellProps } from "../SettingsTableEditCell";
import { vi } from "vitest";

const initialItem = {
  canEdit: true,
  id: "",
  shortcut: "",
  title: "",
  url: ""
};

export const initialProps: SettingsTableEditCellProps = {
  handleCloseEditShortcuts: vi.fn(),
  handleEditShortcuts: vi.fn(),
  handleSaveShortcut: vi.fn(),
  isInEditMode: false,
  item: initialItem,
  itemIndex: 0,
  setCurrentCommand: vi.fn(),
  setIsDialogOpen: vi.fn()
};
