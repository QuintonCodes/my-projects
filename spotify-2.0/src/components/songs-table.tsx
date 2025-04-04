import { cn } from "@/lib/utils";
import { ArrowUpDown, Filter } from "lucide-react";

export type SongsTableProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SongsTable({ children, className }: SongsTableProps) {
  return (
    <div className={cn("px-6 backdrop-blur-md", className)}>{children}</div>
  );
}

type HeaderProps = {
  children: React.ReactNode;
  gridTemplate?: string;
};

SongsTable.Header = function SongsTableHeader({
  children,
  gridTemplate,
}: HeaderProps) {
  return (
    <div
      className={cn(
        "grid gap-4 px-5 py-2 text-sm text-zinc-400 border-b border-white/5",
        gridTemplate ? gridTemplate : "grid-cols-[20px_16px_2.5fr_1fr_50px]"
      )}
    >
      {children}
    </div>
  );
};

type HeaderCellProps = {
  children: React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  className?: string;
};

SongsTable.HeaderCell = function SongsTableHeaderCell({
  children,
  sortable,
  filterable,
  className,
}: HeaderCellProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 cursor-pointer select-none",
        className
      )}
    >
      <span>{children}</span>
      {sortable && <ArrowUpDown className="w-4 h-4 text-neutral-400" />}
      {filterable && <Filter className="w-4 h-4 text-neutral-400" />}
    </div>
  );
};

type BodyProps = {
  children: React.ReactNode;
};

SongsTable.Body = function SongsTableBody({ children }: BodyProps) {
  return <div className="py-4 space-y-2">{children}</div>;
};

type RowProps = {
  children: React.ReactNode;
  gridTemplate?: string;
  onClick?: () => void;
};

SongsTable.Row = function SongsTableRow({
  children,
  onClick,
  gridTemplate,
}: RowProps) {
  return (
    <div
      onClick={onClick}
      className={`group grid gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md cursor-pointer ${
        gridTemplate ? gridTemplate : "grid-cols-[20px_16px_2.5fr_1fr_50px]"
      }`}
    >
      {children}
    </div>
  );
};

type CellProps = {
  children: React.ReactNode;
  className?: string;
};

SongsTable.Cell = function SongsTableCell({ children, className }: CellProps) {
  return <div className={cn(className)}>{children}</div>;
};
