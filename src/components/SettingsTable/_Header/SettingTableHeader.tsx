import { headerColumns } from "./SettingsTableHeader.data";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
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

  const renderSortableHeader = (
    column: SortByColumn,
    label: string,
    cellWidth: string
  ) => (
    <TableHead
      className={cn("cursor-pointer", cellWidth)}
      onClick={() => handleSort(column)}
    >
      <div className='flex items-center gap-2'>
        <span className='select-none hover:underline'>{label}</span>
        {sortBy.column === column && renderSortIndicator(column)}
      </div>
    </TableHead>
  );

  return (
    <TableHeader>
      <TableRow>
        {headerColumns.map(({ column, label, width }) =>
          renderSortableHeader(column, label, width)
        )}
        <TableHead className='w-[350px]' />
      </TableRow>
    </TableHeader>
  );
};

export default SettingsTableHeader;
