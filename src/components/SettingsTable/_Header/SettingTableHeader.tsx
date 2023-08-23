import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SettingsTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className='min-w-[200px]'>Shortcut</TableHead>
        <TableHead className='min-w-[500px]'>URL</TableHead>
        <TableHead className='min-w-[350px]'>Title</TableHead>
        <TableHead className='w-[350px]'></TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default SettingsTableHeader;
