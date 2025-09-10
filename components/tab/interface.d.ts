
export interface TabItem {
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabUIProps {
  items: TabItem[];
  defaultActive?: number;
  onChange?: (index: number) => void;
  className?: string;
}
