import { Command, ShortcutsStorage } from "@/types";

const mockStorage: ShortcutsStorage = {
  shortcuts: [
    {
      canEdit: false,
      id: "1",
      shortcut: "1",
      title: "Google",
      url: "https://google.com"
    },
    {
      canEdit: false,
      id: "2",
      shortcut: "2",
      title: "Facebook",
      url: "https://facebook.com"
    }
  ]
};

const updateMockData = (data: Command[]) => {
  mockStorage.shortcuts = data;
};

export { mockStorage, updateMockData };
