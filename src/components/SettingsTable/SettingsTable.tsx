import SettingsTableAddButton from "./_AddButton/AddButton";
import SettingsTableEditCell from "./_EditCell/SettingsTableEditCell";
import SettingsTableHeader from "./_Header/SettingTableHeader";
import SettingsTableSearch from "./_Search/SettingsTableSearch";
import SettingsTableShortcutCell from "./_ShortcutCell/SettingTableShortcutCell";
import SettingsTableTitleCell from "./_TitleCell/SettingsTableTitleCell";
import SettingsTableUrlCell from "./_UrlCell/SettingsTableUrlCell";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Table, TableBody, TableRow } from "@/components/ui/table";
import "@/index.css";
import { Command, SortBy, SortByColumn } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const SettingsTable = () => {
  const initialCommand = {
    canEdit: true,
    id: uuidv4(),
    shortcut: "",
    title: "",
    url: ""
  };
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentCommand, setCurrentCommand] = useState<Command>(initialCommand);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>({
    column: "shortcut",
    direction: "asc"
  });

  const filteredCommands = useMemo(() => {
    const normalizedSearchValue = searchValue.toLowerCase();

    const filtered = commands.filter(
      (item) =>
        item.shortcut.toLowerCase().includes(normalizedSearchValue) ||
        item.title.toLowerCase().includes(normalizedSearchValue) ||
        item.url.toLowerCase().includes(normalizedSearchValue) ||
        item.canEdit
    );

    const sortingColumn = sortBy.column;
    const sortingDirection = sortBy.direction === "asc" ? 1 : -1;

    const sorted = [...filtered].sort(
      (a, b) =>
        a[sortingColumn].localeCompare(b[sortingColumn]) * sortingDirection
    );

    return sorted;
  }, [commands, searchValue, sortBy]);

  useEffect(() => {
    const listenToKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.shiftKey && event.code) {
        chrome.runtime.sendMessage({
          action: "openUrl",
          url: window.location.href,
          key: event.code
        });
      }
    };
    document.addEventListener("keydown", listenToKeyDown);

    return () => {
      document.removeEventListener("keydown", listenToKeyDown);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await chrome.storage.sync.get("shortcuts");
      setCommands(
        data.shortcuts.sort(
          (a: Command, b: Command) => a.shortcut.localeCompare(b.shortcut) || []
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
    const newState = [...commands].map((item) => {
      return { ...item, canEdit: false };
    });
    if (newState[newState.length - 1]?.shortcut !== "") {
      newState.push(initialCommand);
      setCommands(newState);
      setCurrentCommand(initialCommand);
    }
  };

  const handleSaveShortcut = (itemIndex: number) => {
    const newCommands = [...commands];
    if (newCommands[itemIndex].shortcut !== "") {
      newCommands[itemIndex].canEdit = false;
      chrome.storage.sync.set({
        shortcuts: newCommands
      });
      setCurrentCommand(initialCommand);
      setIsSaved(true);
    }
  };

  const handleEditShortcuts = (item: Command, index: number) => {
    setCurrentCommand(item);
    setCommands((prevState) => {
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
    if (currentCommand.title === initialCommand.title) {
      const newData = [...commands];
      newData.pop();
      chrome.storage.sync.set({
        shortcuts: newData
      });
    } else {
      setCurrentCommand(initialCommand);
    }
    setIsSaved(true);
  };

  const handleDeleteShortcut = (id: string) => {
    const newCommands = [...commands].filter((item) => item.id !== id);
    chrome.storage.sync.set({
      shortcuts: newCommands
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
    setCommands((prevState) => {
      const newState = [...prevState];
      newState[itemIndex] = {
        ...newState[itemIndex],
        [name]: value
      };
      return newState;
    });
  };

  const handleSelectValueChange = (value: string, itemIndex: number) => {
    setCommands((prevData) => {
      const newState = [...prevData];
      const newItem = { ...newState[itemIndex] };
      newItem.shortcut = value.toUpperCase();
      newState[itemIndex] = newItem;
      return newState;
    });
  };

  return (
    <>
      <SettingsTableSearch
        handleSearch={setSearchValue}
        searchValue={searchValue}
      />
      <Table className='w-full'>
        <SettingsTableHeader handleSort={handleSort} sortBy={sortBy} />
        <TableBody>
          {filteredCommands.map((item, itemIndex) => (
            <TableRow key={item.id}>
              <SettingsTableShortcutCell
                commands={commands}
                handleSelectValueChange={handleSelectValueChange}
                item={item}
                itemIndex={itemIndex}
              />
              <SettingsTableUrlCell
                handleChangeShortcut={handleChangeShortcut}
                item={item}
                itemIndex={itemIndex}
              />
              <SettingsTableTitleCell
                handleChangeShortcut={handleChangeShortcut}
                item={item}
                itemIndex={itemIndex}
              />
              <SettingsTableEditCell
                currentCommand={currentCommand}
                handleCloseEditShortcuts={handleCloseEditShortcuts}
                handleDeleteShortcut={handleDeleteShortcut}
                handleEditShortcuts={handleEditShortcuts}
                handleSaveShortcut={handleSaveShortcut}
                initialCommand={initialCommand}
                isDialogOpen={isDialogOpen}
                item={item}
                itemIndex={itemIndex}
                setCurrentCommand={setCurrentCommand}
                setIsDialogOpen={setIsDialogOpen}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!searchValue && (
        <SettingsTableAddButton handleAddNewShortCut={handleAddNewShortCut} />
      )}
      <AlertDialog open={isDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              shortcut.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setCurrentCommand(initialCommand);
                setIsDialogOpen(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteShortcut(currentCommand.id)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SettingsTable;
