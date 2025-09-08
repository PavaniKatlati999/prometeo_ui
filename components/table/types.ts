export interface Column<T> {
  key: keyof T;
  title: string;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  fixed?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  onDataChange?: (data: T[]) => void;
  loading?: boolean;
  selectable?: boolean;
  editable?: boolean;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: string | null;
  direction: SortDirection;
}

export interface FilterConfig {
  [key: string]: string;
}
