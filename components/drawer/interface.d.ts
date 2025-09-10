
export interface DrawerUIProps {
  open: boolean; // whether the drawer is visible
  onClose: () => void; // callback when closing
  placement?: "left" | "right" | "top" | "bottom"; // drawer position
  size?: number | string; // width/height of drawer
  closable?: boolean; // show close button
  children?: ReactNode; // drawer content
  maskClosable?: boolean; // close on backdrop click
}
