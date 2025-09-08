interface BaseLayoutProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

interface LayoutProps extends BaseLayoutProps {
  hasSider?: boolean;
}

interface SiderProps extends BaseLayoutProps {
  width?: number;
  togglePosition?: string;
  collapsed?: boolean;
  collapsible?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}
