export interface ListItem {
  label: React.ReactNode;
  icon?: React.ReactNode; // optional icon per item
}

export interface ListUIProps {
  items?: { label: string; icon?: React.ReactNode }[];
  ordered?: boolean;
  icon?: React.ReactNode;
  spacing?: "xs" | "sm" | "md" | "lg";
  className?: string;
}
