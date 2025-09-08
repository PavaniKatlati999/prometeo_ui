import { ColumnDef } from "@tanstack/react-table";

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
}



interface ColumnType {
  key: string;
  title: string | React.ReactElement;
  sorting?: "number" | "string" | "datetime" | "date" | "time";
  resize?: boolean;
  ellipse?: boolean;
  width?: number;
  dataIndex: string;
  isFrozen?: boolean;
}

interface PaginationType {
  onChange: (pageNumber: number) => void;
  pageSize: number;
  page: number;
  total: number;
}

interface DataTableStructure<T> {
  enableGlobalSearch?: boolean;
  enableFilter?: boolean;
  enableInfiniteScroll?: boolean;
  columns: ColumnType[];
  dataSource: T[];
  isServerSide?: boolean;
  fetchFromServer?: (page?: number, pageSize?: number) => Promise<T[]>;
  pagination?: PaginationType;
  pageSize?: number               // optional: for pagination
  total?: number
}
