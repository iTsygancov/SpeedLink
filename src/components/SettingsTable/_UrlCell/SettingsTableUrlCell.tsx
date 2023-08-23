import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";
import { Command } from "@/types";

type SettingsTableUrlCellProps = {
  handleChangeShortcut: (
    event: React.ChangeEvent<HTMLInputElement>,
    itemIndex: number
  ) => void;
  item: Command;
  itemIndex: number;
};

const SettingsTableUrlCell = ({
  handleChangeShortcut,
  item,
  itemIndex
}: SettingsTableUrlCellProps) => {
  return (
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
  );
};

export default SettingsTableUrlCell;
