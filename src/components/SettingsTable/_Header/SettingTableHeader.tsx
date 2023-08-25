import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SortBy, SortByColumn } from "@/types";
import { ArrowDownNarrowWide, ArrowUpWideNarrow } from "lucide-react";

type SettingsTableHeaderProps = {
  handleSort: (column: SortByColumn) => void;
  sortBy: SortBy;
};

const SettingsTableHeader = ({
  handleSort,
  sortBy
}: SettingsTableHeaderProps) => {
  const renderSortIndicator = (column: SortByColumn) => {
    const isAscending = sortBy.column === column && sortBy.direction === "asc";
    const ArrowIcon = isAscending ? ArrowDownNarrowWide : ArrowUpWideNarrow;

    return <ArrowIcon size={16} />;
  };

  const renderSortableHeader = (column: SortByColumn, label: string) => {
    return (
      <TableHead
        className='min-w-[200px] cursor-pointer '
        onClick={() => handleSort(column)}
      >
        <div className='flex items-center gap-2'>
          <span className='select-none hover:underline'>{label}</span>
          {sortBy.column === column && renderSortIndicator(column)}
        </div>
      </TableHead>
    );
  };

  return (
    <TableHeader>
      <TableRow>
        {renderSortableHeader("shortcut", "Shortcut")}
        {renderSortableHeader("url", "URL")}
        {renderSortableHeader("title", "Title")}
        <TableHead className='w-[350px]'></TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default SettingsTableHeader;
