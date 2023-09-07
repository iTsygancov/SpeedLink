import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export type SettingsTableSearchProps = {
  handleSearch: (value: string) => void;
  searchValue: string;
};

const SettingsTableSearch = ({
  handleSearch,
  searchValue
}: SettingsTableSearchProps) => {
  const handleClearSearch = () => {
    handleSearch("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  return (
    <div className='mb-4 flex items-center justify-center gap-4'>
      <div className='relative'>
        <Search
          className='absolute left-4 top-1/2 -translate-y-1/2 text-primary'
          size={16}
        />
        <Input
          className='w-[350px] pl-10'
          value={searchValue}
          onChange={handleInputChange}
          placeholder='Search'
        />
      </div>
      <Button variant='secondary' onClick={handleClearSearch}>
        Clear
      </Button>
    </div>
  );
};

export default SettingsTableSearch;
