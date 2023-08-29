import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useClipboard } from "@/lib/hooks/useClipboard";
import { Command } from "@/types";
import { Check, Clipboard } from "lucide-react";

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
  const { isCopied, copy } = useClipboard();

  return (
    <TableCell className='break-all p-0 px-4 py-2'>
      {item.canEdit ? (
        <Input
          value={item.url}
          name='url'
          onChange={(event) => handleChangeShortcut(event, itemIndex)}
        />
      ) : (
        <div className='flex items-center justify-between gap-8'>
          <a
            className='hover:underline'
            href={item.url}
            target='_blank'
            rel='noreferrer noopener'
          >
            {item.url}
          </a>
          <TooltipProvider>
            <Tooltip open={isCopied}>
              <TooltipTrigger className='p-2' onClick={() => copy(item.url)}>
                {isCopied ? <Check size={16} /> : <Clipboard size={16} />}
              </TooltipTrigger>
              <TooltipContent>
                <p>Copied to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </TableCell>
  );
};

export default SettingsTableUrlCell;
