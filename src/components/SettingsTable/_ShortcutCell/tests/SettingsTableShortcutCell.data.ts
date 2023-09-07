import { SettingsTableShortcutCellProps } from "../SettingsTableShortcutCell";
import { vi } from "vitest";

const initialItem = {
  canEdit: false,
  id: "",
  shortcut: "",
  title: "",
  url: ""
};

export const initialProps: SettingsTableShortcutCellProps = {
  commands: [initialItem, initialItem],
  handleSelectValueChange: vi.fn(),
  item: initialItem,
  itemIndex: 0
};
