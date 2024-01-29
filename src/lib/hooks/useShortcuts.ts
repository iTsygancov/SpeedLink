import { useToast } from "@/components/ui/use-toast";
import "@/index.css";
import {
  getFromStorage,
  sendMessageToStorage,
  updateShorcutsStorage
} from "@/lib/storage";
import { Shortcut, SortBy, SortByColumn } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TOAST_VISIBILITY_DURATION = 2500;

export const useShortcuts = () => {
  const initialShortcut = {
    canEdit: true,
    id: uuidv4(),
    shortcut: "",
    title: "",
    url: ""
  };
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [currentShortcut, setCurrentShortcut] =
    useState<Shortcut>(initialShortcut);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>({
    column: "shortcut",
    direction: "asc"
  });
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const { toast } = useToast();
  const isInEditMode = shortcuts.some((item) => item.canEdit);

  const filteredShortcuts = useMemo(() => {
    const normalizedSearchValue = searchValue.toLowerCase();

    const filtered = shortcuts.filter(
      (item) =>
        item.shortcut.toLowerCase().includes(normalizedSearchValue) ||
        item.title.toLowerCase().includes(normalizedSearchValue) ||
        item.url.toLowerCase().includes(normalizedSearchValue) ||
        item.canEdit
    );

    const sortingColumn = sortBy.column;
    const sortingDirection = sortBy.direction === "asc" ? 1 : -1;

    const sorted = [...filtered].sort((a, b) => {
      if (a.canEdit && !b.canEdit) {
        return 1;
      }
      return (
        a[sortingColumn].localeCompare(b[sortingColumn]) * sortingDirection
      );
    });

    return isInEditMode ? filtered : sorted;
  }, [shortcuts, searchValue, sortBy, isInEditMode]);

  useEffect(() => {
    const listenToKeyDown = async (event: KeyboardEvent) => {
      const storage = await getFromStorage("speedlink");
      const useShift = storage.speedlink.settings.useShift;
      if (
        useShift &&
        event.altKey &&
        event.shiftKey &&
        !event.code.includes("Alt")
      ) {
        sendMessageToStorage(event);
      } else if (!useShift && event.altKey && !event.code.includes("Alt")) {
        sendMessageToStorage(event);
      }
    };
    document.addEventListener("keydown", listenToKeyDown);

    return () => {
      document.removeEventListener("keydown", listenToKeyDown);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await getFromStorage("speedlink");

      setShortcuts(
        data.speedlink.shortcuts.sort((a: Shortcut, b: Shortcut) =>
          a.shortcut.localeCompare(b.shortcut)
        )
      );
      setIsSaved(false);
    };
    getData();
  }, [isSaved]);

  const handleSort = (column: SortByColumn) => {
    const newSortBy = { ...sortBy };
    if (newSortBy.column === column) {
      newSortBy.direction = newSortBy.direction === "asc" ? "desc" : "asc";
    } else {
      newSortBy.column = column;
      newSortBy.direction = "asc";
    }
    setSortBy(newSortBy);
  };

  const handleAddNewShortCut = () => {
    const newState = [...shortcuts].map((item) => {
      return { ...item, canEdit: false };
    });
    if (newState[newState.length - 1]?.shortcut !== "") {
      newState.push(initialShortcut);
      setShortcuts(newState);
      setCurrentShortcut(initialShortcut);
    }
  };

  const handleSaveShortcut = (item: Shortcut) => {
    const newShortcuts = [...shortcuts];
    if (item.shortcut !== "") {
      item.canEdit = false;
      updateShorcutsStorage(newShortcuts);

      if (currentShortcut.shortcut !== item.shortcut) {
        toast({
          title: "Shortcut Added",
          description: "Your new shortcut has been successfully added.",
          duration: TOAST_VISIBILITY_DURATION
        });
        setHighlightedId(item.id);
        setTimeout(() => {
          setHighlightedId(null);
        }, 1000);
      } else {
        toast({
          title: "Shortcut Edited",
          description: "Changes to your shortcut have been saved.",
          duration: TOAST_VISIBILITY_DURATION
        });
      }
      setCurrentShortcut(initialShortcut);
      setIsSaved(true);
    }
  };

  const handleEditShortcuts = (item: Shortcut) => {
    setCurrentShortcut(item);
    setShortcuts((prevState) => {
      const newState = [...prevState]
        .map((item) => {
          return { ...item, canEdit: false };
        })
        .filter((item) => item.shortcut !== "");
      Object.values(newState).forEach((value) => {
        if (value.id === item.id) {
          value.canEdit = true;
        }
      });
      return newState;
    });
  };

  const handleCloseEditShortcuts = () => {
    if (
      currentShortcut.title === initialShortcut.title &&
      currentShortcut.url === initialShortcut.url &&
      currentShortcut.shortcut === initialShortcut.shortcut
    ) {
      const newShortcuts = [...shortcuts];
      newShortcuts.pop();
      updateShorcutsStorage(newShortcuts);
    } else {
      setCurrentShortcut(initialShortcut);
    }
    setIsSaved(true);
  };

  const handleDeleteShortcut = (id: string) => {
    const newShortcuts = [...shortcuts].filter((item) => item.id !== id);
    updateShorcutsStorage(newShortcuts);
    toast({
      title: "Shortcut Deleted",
      description: "The selected shortcut has been removed.",
      duration: TOAST_VISIBILITY_DURATION
    });
    setCurrentShortcut(initialShortcut);
    setIsDialogOpen(false);
    setIsSaved(true);
  };

  const handleChangeShortcut = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: Shortcut
  ) => {
    const { name, value } = event.target;
    setShortcuts((prevState) => {
      const newState = [...prevState];
      Object.values(newState).forEach((shortcut) => {
        if (shortcut.id === item.id) {
          shortcut[name] = value;
        }
      });
      return newState;
    });
  };

  const handleSelectValueChange = (value: string, item: Shortcut) => {
    setShortcuts((prevData) => {
      const newState = [...prevData];
      Object.values(newState).forEach((shortcut) => {
        if (shortcut.id === item.id) {
          shortcut.shortcut = value.toUpperCase();
        }
      });
      return newState;
    });
  };

  return {
    shortcuts,
    currentShortcut,
    filteredShortcuts,
    highlightedId,
    initialShortcut,
    isDialogOpen,
    isInEditMode,
    isSaved,
    searchValue,
    sortBy,
    setCurrentShortcut,
    setHighlightedId,
    setIsDialogOpen,
    setIsSaved,
    setSearchValue,
    handleAddNewShortCut,
    handleChangeShortcut,
    handleCloseEditShortcuts,
    handleDeleteShortcut,
    handleEditShortcuts,
    handleSaveShortcut,
    handleSelectValueChange,
    handleSort
  };
};
