type SortByColumn = "shortcut" | "title" | "url";
type SortByDirection = "asc" | "desc";
type Theme = "dark" | "light" | "system";
export type PostAction =
  | "Open in background"
  | "Jump to tab"
  | "Close & Jump to tab";

type HeaderColumn = {
  column: SortByColumn;
  label: string;
  width: string;
};

type Settings = {
  theme: Theme;
  useShift: boolean;
  postAction: PostAction;
};

type Shortcut = {
  canEdit: boolean;
  id: string;
  shortcut: string;
  title: string;
  url: string;
};

type ShortcutsStorage = {
  shortcuts: Shortcut[];
};

type SortBy = {
  column: SortByColumn;
  direction: SortByDirection;
};

type Storage = {
  speedlink: {
    shortcuts: Shortcut[];
    settings: Settings;
  };
};

export type {
  HeaderColumn,
  Settings,
  Shortcut,
  ShortcutsStorage,
  SortBy,
  SortByColumn,
  SortByDirection,
  Storage,
  Theme
};
