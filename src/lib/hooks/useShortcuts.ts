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
  const initialCommand = {
    canEdit: true,
    id: uuidv4(),
    shortcut: "",
    title: "",
    url: ""
  };
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [currentCommand, setCurrentCommand] =
    useState<Shortcut>(initialCommand);
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

  const filteredCommands = useMemo(() => {
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

    return sorted;
  }, [shortcuts, searchValue, sortBy]);

  useEffect(() => {
    const listenToKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.shiftKey && event.code) {
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
      newState.push(initialCommand);
      setShortcuts(newState);
      setCurrentCommand(initialCommand);
    }
  };

  const handleSaveShortcut = (item: Shortcut, itemIndex: number) => {
    const newCommands = [...shortcuts];
    if (newCommands[itemIndex].shortcut !== "") {
      newCommands[itemIndex].canEdit = false;
      updateShorcutsStorage(newCommands);

      if (currentCommand.shortcut !== item.shortcut) {
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
      setCurrentCommand(initialCommand);
      setIsSaved(true);
    }
  };

  const handleEditShortcuts = (item: Shortcut, index: number) => {
    setCurrentCommand(item);
    setShortcuts((prevState) => {
      const newState = [...prevState]
        .map((item) => {
          return { ...item, canEdit: false };
        })
        .filter((item) => item.shortcut !== "");
      newState[index].canEdit = true;
      return newState;
    });
  };

  const handleCloseEditShortcuts = () => {
    if (
      currentCommand.title === initialCommand.title &&
      currentCommand.url === initialCommand.url &&
      currentCommand.shortcut === initialCommand.shortcut
    ) {
      const newCommands = [...shortcuts];
      newCommands.pop();
      updateShorcutsStorage(newCommands);
    } else {
      setCurrentCommand(initialCommand);
    }
    setIsSaved(true);
  };

  const handleDeleteShortcut = (id: string) => {
    const newCommands = [...shortcuts].filter((item) => item.id !== id);
    updateShorcutsStorage(newCommands);
    toast({
      title: "Shortcut Deleted",
      description: "The selected shortcut has been removed.",
      duration: TOAST_VISIBILITY_DURATION
    });
    setCurrentCommand(initialCommand);
    setIsDialogOpen(false);
    setIsSaved(true);
  };

  const handleChangeShortcut = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemIndex: number
  ) => {
    const { name, value } = event.target;
    setShortcuts((prevState) => {
      const newState = [...prevState];
      newState[itemIndex] = {
        ...newState[itemIndex],
        [name]: value
      };
      return newState;
    });
  };

  const handleSelectValueChange = (value: string, itemIndex: number) => {
    setShortcuts((prevData) => {
      const newState = [...prevData];
      const newItem = { ...newState[itemIndex] };
      newItem.shortcut = value.toUpperCase();
      newState[itemIndex] = newItem;
      return newState;
    });
  };

  return {
    commands: shortcuts,
    currentCommand,
    filteredCommands,
    highlightedId,
    initialCommand,
    isDialogOpen,
    isInEditMode,
    isSaved,
    searchValue,
    sortBy,
    setCurrentCommand,
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
