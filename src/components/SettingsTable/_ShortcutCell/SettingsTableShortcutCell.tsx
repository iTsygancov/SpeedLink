import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { TableCell } from "@/components/ui/table";
import useOperatingSystem from "@/lib/hooks/useOS";
import { useSettingsStore } from "@/lib/store/settingsStore";
import { alphanumericKeysArray, cn } from "@/lib/utils";
import { Shortcut } from "@/types";

export type SettingsTableShortcutCellProps = {
  commands: Shortcut[];
  handleSelectValueChange: (value: string, itemIndex: number) => void;
  item: Shortcut;
  itemIndex: number;
};

const SettingsTableShortcutCell = ({
  commands,
  handleSelectValueChange,
  item,
  itemIndex
}: SettingsTableShortcutCellProps) => {
  const { settings } = useSettingsStore();
  const os = useOperatingSystem();

  const renderKey = () => {
    switch (os) {
      case "MacOS":
        return "Option";
      default:
        return "Alt";
    }
  };

  const disabledKeys = commands.map(
    (item) => item.shortcut[item.shortcut.length - 1]
  );

  return (
    <TableCell className='flex items-center gap-2 font-medium'>
      <Badge
        variant='outline'
        className={cn(
          "select-none rounded",
          item.canEdit && "bg-muted opacity-75"
        )}
      >
        {renderKey()}
      </Badge>
      {settings?.useShift && (
        <Badge
          variant='outline'
          className={cn(
            "select-none rounded",
            item.canEdit && "bg-muted opacity-75"
          )}
        >
          Shift
        </Badge>
      )}
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
        <Badge
          variant='outline'
          className='w-8 select-none justify-center rounded'
        >
          {item.shortcut}
        </Badge>
      )}
    </TableCell>
  );
};

export default SettingsTableShortcutCell;
