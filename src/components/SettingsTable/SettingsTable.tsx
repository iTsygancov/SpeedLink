import SettingsTableAddButton from "./_AddButton/SettingsTableAddButton";
import SettingsTableAlertDialog from "./_AlertDialog/SettingsTableAlertDialog";
import SettingsTableEditCell from "./_EditCell/SettingsTableEditCell";
import SettingsTableHeader from "./_Header/SettingsTableHeader";
import SettingsTableSearch from "./_Search/SettingsTableSearch";
import SettingsTableShortcutCell from "./_ShortcutCell/SettingsTableShortcutCell";
import SettingsTableTitleCell from "./_TitleCell/SettingsTableTitleCell";
import SettingsTableUrlCell from "./_UrlCell/SettingsTableUrlCell";
import { Table, TableBody, TableRow } from "@/components/ui/table";
import "@/index.css";
import { useShortcuts } from "@/lib/hooks/useShortcuts";
import { cn } from "@/lib/utils";
import { SearchX } from "lucide-react";

const SettingsTable = () => {
  const {
    commands,
    currentCommand,
    filteredCommands,
    highlightedId,
    initialCommand,
    isDialogOpen,
    isInEditMode,
    searchValue,
    sortBy,
    setCurrentCommand,
    setIsDialogOpen,
    setSearchValue,
    handleAddNewShortCut,
    handleChangeShortcut,
    handleCloseEditShortcuts,
    handleDeleteShortcut,
    handleEditShortcuts,
    handleSaveShortcut,
    handleSelectValueChange,
    handleSort
  } = useShortcuts();

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
            <TableRow
              className={cn(
                highlightedId === item.id
                  ? "bg-secondary transition-colors hover:bg-secondary"
                  : ""
              )}
              key={item.id}
            >
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
                handleCloseEditShortcuts={handleCloseEditShortcuts}
                handleEditShortcuts={handleEditShortcuts}
                handleSaveShortcut={handleSaveShortcut}
                isInEditMode={isInEditMode}
                item={item}
                itemIndex={itemIndex}
                setCurrentCommand={setCurrentCommand}
                setIsDialogOpen={setIsDialogOpen}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredCommands.length === 0 && (
        <p className='mt-8 flex w-full items-center justify-center gap-4 text-lg text-muted-foreground'>
          <SearchX />
          Nothing found
        </p>
      )}
      {!searchValue && (
        <SettingsTableAddButton
          handleAddNewShortCut={handleAddNewShortCut}
          disabled={isInEditMode}
        />
      )}
      <SettingsTableAlertDialog
        currentCommand={currentCommand}
        initialCommand={initialCommand}
        isDialogOpen={isDialogOpen}
        handleDeleteShortcut={handleDeleteShortcut}
        setIsDialogOpen={setIsDialogOpen}
        setCurrentCommand={setCurrentCommand}
      />
    </>
  );
};

export default SettingsTable;
