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
    shortcuts,
    currentShortcut,
    filteredShortcuts,
    highlightedId,
    initialShortcut,
    isDialogOpen,
    isInEditMode,
    searchValue,
    sortBy,
    setCurrentShortcut,
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
          {filteredShortcuts.map((item, itemIndex) => (
            <TableRow
              className={cn(
                highlightedId === item.id
                  ? "bg-secondary transition-colors hover:bg-secondary"
                  : ""
              )}
              key={item.id}
            >
              <SettingsTableShortcutCell
                shortcuts={shortcuts}
                handleSelectValueChange={handleSelectValueChange}
                item={item}
              />
              <SettingsTableUrlCell
                handleChangeShortcut={handleChangeShortcut}
                item={item}
              />
              <SettingsTableTitleCell
                handleChangeShortcut={handleChangeShortcut}
                item={item}
              />
              <SettingsTableEditCell
                handleCloseEditShortcuts={handleCloseEditShortcuts}
                handleEditShortcuts={handleEditShortcuts}
                handleSaveShortcut={handleSaveShortcut}
                isInEditMode={isInEditMode}
                item={item}
                itemIndex={itemIndex}
                setCurrentShortcut={setCurrentShortcut}
                setIsDialogOpen={setIsDialogOpen}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredShortcuts.length === 0 && (
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
        currentShortcut={currentShortcut}
        initialShortcut={initialShortcut}
        isDialogOpen={isDialogOpen}
        handleDeleteShortcut={handleDeleteShortcut}
        setIsDialogOpen={setIsDialogOpen}
        setCurrentShortcut={setCurrentShortcut}
      />
    </>
  );
};

export default SettingsTable;
