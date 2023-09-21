export type SortByColumn = "shortcut" | "title" | "url";
export type SortByDirection = "asc" | "desc";
export type Theme = "dark" | "light" | "system";
export type PostAction =
  | "Open in background"
  | "Jump to tab"
  | "Close & Jump to tab";

export type HeaderColumn = {
  column: SortByColumn;
  label: string;
  width: string;
};

export type Settings = {
  theme: Theme;
  useShift: boolean;
  postAction: PostAction;
};

export type Shortcut = {
  canEdit: boolean;
  id: string;
  shortcut: string;
  title: string;
  url: string;
};

export type ShortcutsStorage = {
  shortcuts: Shortcut[];
};

export type SortBy = {
  column: SortByColumn;
  direction: SortByDirection;
};

export type Storage = {
  speedlink: {
    shortcuts: Shortcut[];
    settings: Settings;
  };
};

export type Message = {
  action: string;
  url: string;
  key: string;
  postAction: PostAction;
};
