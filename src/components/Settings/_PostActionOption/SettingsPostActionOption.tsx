import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { PostAction, Settings } from "@/types";
import { Info } from "lucide-react";

type SettingsPostActionOptionProps = {
  handleSelectValueChange: (value: PostAction) => void;
  postAction: PostAction;
  settings: Settings;
};

const postActionOptions: PostAction[] = [
  "Jump to tab",
  "Open in background",
  "Close & Jump to tab"
];

const SettingsPostActionOption = ({
  handleSelectValueChange,
  postAction,
  settings
}: SettingsPostActionOptionProps) => {
  return (
    <div className='flex items-center justify-between py-4'>
      <p className='flex items-center gap-3 text-sm'>
        Customize what happens after you launch a shortcut
        <Popover>
          <PopoverTrigger>
            <Info size={16} />
          </PopoverTrigger>
          <PopoverContent className='text-sm'>
            Customize what happens after you launch a shortcut on this page.
          </PopoverContent>
        </Popover>
      </p>
      <Select value={postAction} onValueChange={handleSelectValueChange}>
        <SelectTrigger className='flex h-auto w-auto items-center gap-0.5 rounded border px-2.5 py-0.5 text-sm'>
          <SelectValue placeholder={settings.postAction} />
        </SelectTrigger>
        <SelectContent className='max-h-[280px]'>
          {postActionOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SettingsPostActionOption;
