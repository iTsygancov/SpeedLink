export type Command = {
  canEdit: boolean;
  id: string;
  shortcut: string;
  title: string;
  url: string;
};

export type ShortcutsStorage = {
  [shortcuts: string]: Command[];
};

export type HeaderColumn = {
  column: SortByColumn;
  label: string;
  width: string;
};

export type SortByColumn = "shortcut" | "title" | "url";

export type SortByDirection = "asc" | "desc";

export type SortBy = {
  column: SortByColumn;
  direction: SortByDirection;
};
