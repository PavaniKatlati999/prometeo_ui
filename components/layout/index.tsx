import React from "react";
import "./styles.scss";
/**
 * A Layout component to structure pages with optional header, footer, sidebar, and content sections.
 * Supports flexible layouts for dashboards, admin panels, and responsive pages.
 */

const Layout: React.FC<LayoutProps> = ({ hasSider, className, style, children }) => {
  const classes = ["custom-layout", className, hasSider ? "has-sider" : ""].join(" ").trim();
  return <div className={classes} style={style}>{children}</div>;
};

const Header: React.FC<BaseLayoutProps> = ({ className, style, children }) => {
  const classes = ["custom-header", className].join(" ").trim();
  return <div className={classes} style={style}>{children}</div>;
};

const Footer: React.FC<BaseLayoutProps> = ({ className, style, children }) => {
  const classes = ["custom-footer", className].join(" ").trim();
  return <div className={classes} style={style}>{children}</div>;
};

const Content: React.FC<BaseLayoutProps> = ({ className, style, children }) => {
  const classes = ["custom-content", className].join(" ").trim();
  return <div className={classes} style={style}>{children}</div>;
};

const Sider: React.FC<SiderProps> = ({
  width = 200,
  collapsed = false,
  collapsible = false,
  onCollapse,
  togglePosition = "top",
  className,
  style,
  children,
}) => {
  const classes = ["custom-sider", className, collapsed ? "collapsed" : "", collapsible ? "collapsible" : ""]
    .join(" ")
    .trim();

  const handleCollapse = () => {
    if (onCollapse && collapsible) {
      onCollapse(!collapsed);
    }
  };

  return (
    <div className={classes} style={{ ...style, width: collapsed ? 80 : width }}>
      {collapsible && (
        <div className={`sider-toggle sider-toggle-${togglePosition}`} onClick={handleCollapse}>
          {collapsed ? ">" : "<"}
        </div>
      )}
      {children}
    </div>
  );
};

export { Layout, Header, Footer, Content, Sider };
