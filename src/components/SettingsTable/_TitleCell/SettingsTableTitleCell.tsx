import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";
import { Shortcut } from "@/types";

export type SettingsTableTitleCellProps = {
  item: Shortcut;
  itemIndex: number;
  handleChangeShortcut: (
    event: React.ChangeEvent<HTMLInputElement>,
    itemIndex: number
  ) => void;
};

const SettingsTableTitleCell = ({
  item,
  itemIndex,
  handleChangeShortcut
}: SettingsTableTitleCellProps) => {
  return (
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
  );
};

export default SettingsTableTitleCell;
