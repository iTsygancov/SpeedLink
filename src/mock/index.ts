import { Shortcut, Storage } from "@/types";

const mockStorage: Storage = {
  speedlink: {
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
    ],
    settings: {
      theme: "system"
    }
  }
};

const updateMockData = (data: Shortcut[]) => {
  mockStorage.speedlink.shortcuts = data;
};

export { mockStorage, updateMockData };
