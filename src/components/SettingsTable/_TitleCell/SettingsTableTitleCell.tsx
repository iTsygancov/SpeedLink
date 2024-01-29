import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";
import { Shortcut } from "@/types";

export type SettingsTableTitleCellProps = {
  item: Shortcut;
  handleChangeShortcut: (
    event: React.ChangeEvent<HTMLInputElement>,
    item: Shortcut
  ) => void;
};

const SettingsTableTitleCell = ({
  item,
  handleChangeShortcut
}: SettingsTableTitleCellProps) => {
  return (
    <TableCell className='p-0 pl-4 text-left'>
      {item.canEdit ? (
        <Input
          value={item.title}
          name='title'
          onChange={(event) => handleChangeShortcut(event, item)}
        />
      ) : (
        item.title || "-"
      )}
    </TableCell>
  );
};

export default SettingsTableTitleCell;
