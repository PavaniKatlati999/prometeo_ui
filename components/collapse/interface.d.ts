export interface CollapsePanelProps {
  header: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
}
