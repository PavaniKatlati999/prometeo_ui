interface TagProps {
  children?: React.ReactNode;
  color?: string;
  icon?: React.ReactNode;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  status?: "success" | "processing" | "error" | "warning" | "default" | "waiting" | "stop";
  onClose?: () => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLSpanElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLSpanElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}
