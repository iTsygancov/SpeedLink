import { Check, MoreHorizontal, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "./components/ui/alert-dialog";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./components/ui/dropdown-menu";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./components/ui/table";
import "./index.css";
import { cn, generateAlphanumericKeysArray } from "./lib/utils";
import { Command } from "./types";

const App = () => {
  const initialCommand = {
    canEdit: true,
    id: uuidv4(),
    shortcut: ["Alt", "Shift", "-"],
    title: "",
    url: ""
  };
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentCommand, setCurrentCommand] = useState<Command>(initialCommand);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const disabledKeys = commands.map(
    (item) => item.shortcut[item.shortcut.length - 1]
  );
  const alphanumericKeysArray = generateAlphanumericKeysArray();

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
      const data = await chrome.storage.sync.get(["shortcuts"]);
      setCommands(data.shortcuts || []);
      setIsSaved(false);
    };
    getData();
  }, [isSaved]);

  const handleAddNewShortCut = () => {
    const newState = [...commands].map((item) => {
      return { ...item, canEdit: false };
    });
    if (!newState[newState.length - 1].shortcut.includes("-")) {
      newState.push(initialCommand);
      setCommands(newState);
      setCurrentCommand(initialCommand);
    }
  };

  const handleSaveShortcut = (itemIndex: number) => {
    const newCommands = [...commands];
    if (!newCommands[itemIndex].shortcut.includes("-")) {
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
        .filter((item) => !item.shortcut.includes("-"));
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

  return (
    <div className='container mx-auto py-12'>
      <h1 className='mb-8 text-4xl font-bold'>SpeedLink shortcuts</h1>
      <Table className='w-full'>
        <TableHeader>
          <TableRow>
            <TableHead className='min-w-[200px]'>Shortcut</TableHead>
            <TableHead className='min-w-[500px]'>URL</TableHead>
            <TableHead className='min-w-[350px]'>Title</TableHead>
            <TableHead className='w-[350px]'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {commands.map((item, itemIndex) => (
            <TableRow key={item.id} className=''>
              <TableCell className='flex items-center gap-2 font-medium'>
                {item.shortcut.map((key, keyIndex) =>
                  keyIndex !== item.shortcut.length - 1 ? (
                    <Badge
                      variant='outline'
                      className={cn(
                        "select-none rounded",
                        item.canEdit && "bg-slate-100 text-gray-300"
                      )}
                      key={uuidv4()}
                    >
                      {key}
                    </Badge>
                  ) : item.canEdit ? (
                    <Select
                      key={item.id}
                      onValueChange={(value) => {
                        setCommands((prevData) => {
                          const newState = [...prevData];
                          const newItem = { ...newState[itemIndex] };
                          newItem.shortcut[newItem.shortcut.length - 1] =
                            value.toUpperCase();
                          newState[itemIndex] = newItem;
                          return newState;
                        });
                      }}
                      value={key}
                    >
                      <SelectTrigger
                        className='flex h-auto w-auto items-center gap-0.5 rounded border px-2.5 py-0.5 text-xs'
                        icon={item.canEdit}
                      >
                        <SelectValue placeholder={key || ""} />
                      </SelectTrigger>
                      <SelectContent className='max-h-[280px]'>
                        {alphanumericKeysArray.map((el) => {
                          return (
                            <SelectItem
                              value={el}
                              key={el}
                              disabled={disabledKeys.includes(el)}
                            >
                              {el}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge
                      variant='outline'
                      className='select-none rounded'
                      key={uuidv4()}
                    >
                      {key}
                    </Badge>
                  )
                )}
              </TableCell>
              <TableCell className='break-all p-0 px-4'>
                {item.canEdit ? (
                  <Input
                    value={item.url}
                    name='url'
                    onChange={(event) => handleChangeShortcut(event, itemIndex)}
                  />
                ) : (
                  item.url || "-"
                )}
              </TableCell>
              <TableCell className='p-0 pl-4 text-left'>
                {item.canEdit ? (
                  <Input
                    value={item.title}
                    name='title'
                    onChange={(event) => handleChangeShortcut(event, itemIndex)}
                  />
                ) : (
                  item.title || "-"
                )}
              </TableCell>
              <TableCell className='p-0 pr-4 text-right'>
                {item.canEdit ? (
                  <>
                    <Button
                      className='mr-4 h-7 px-4'
                      onClick={() => handleSaveShortcut(itemIndex)}
                      size='sm'
                    >
                      <Check size={16} />
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      className='h-7 px-4'
                      onClick={handleCloseEditShortcuts}
                    >
                      <X size={16} />
                    </Button>
                  </>
                ) : (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal size={24} className='cursor-pointer' />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => handleEditShortcuts(item, itemIndex)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='text-red-500'
                          onClick={() => {
                            setCurrentCommand(item);
                            setIsDialogOpen(true);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialog open={isDialogOpen}>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your shortcut.
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
                            onClick={() =>
                              handleDeleteShortcut(currentCommand.id)
                            }
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='mt-6 text-left'>
        <Button
          className='flex items-center gap-2'
          variant='secondary'
          onClick={handleAddNewShortCut}
        >
          <Plus />
          Add new shortcut
        </Button>
      </div>
    </div>
  );
};

export default App;
