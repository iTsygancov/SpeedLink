import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { TableCell } from "@/components/ui/table";
import { cn, alphanumericKeysArray } from "@/lib/utils";
import { Command } from "@/types";
import { v4 as uuidv4 } from "uuid";

type SettingsTableShortcutCellProps = {
  commands: Command[];
  handleSelectValueChange: (value: string, itemIndex: number) => void;
  item: Command;
  itemIndex: number;
};

const SettingsTableShortcutCell = ({
  commands,
  handleSelectValueChange,
  item,
  itemIndex
}: SettingsTableShortcutCellProps) => {
  const disabledKeys = commands.map(
    (item) => item.shortcut[item.shortcut.length - 1]
  );

  return (
    <TableCell className='flex items-center gap-2 font-medium'>
      <Badge
        variant='outline'
        className={cn(
          "select-none rounded",
          item.canEdit && "bg-slate-100 text-gray-300"
        )}
        key={uuidv4()}
      >
        Alt
      </Badge>
      <Badge
        variant='outline'
        className={cn(
          "select-none rounded",
          item.canEdit && "bg-slate-100 text-gray-300"
        )}
        key={uuidv4()}
      >
        Shift
      </Badge>
      {item.canEdit ? (
        <Select
          key={item.id}
          onValueChange={(value) => handleSelectValueChange(value, itemIndex)}
          value={item.shortcut}
        >
          <SelectTrigger
            className='flex h-auto w-auto items-center gap-0.5 rounded border px-2.5 py-0.5 text-xs'
            icon={item.canEdit}
          >
            <SelectValue placeholder={item.shortcut || ""} />
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
        <Badge variant='outline' className='select-none rounded' key={uuidv4()}>
          {item.shortcut}
        </Badge>
      )}
    </TableCell>
  );
};

export default SettingsTableShortcutCell;
