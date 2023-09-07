import { vi } from "vitest";

const initialItem = {
  canEdit: false,
  id: "",
  shortcut: "",
  title: "",
  url: ""
};

export const initialProps = {
  handleChangeShortcut: vi.fn(),
  item: initialItem,
  itemIndex: 0
};
