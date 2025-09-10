import React, { ReactNode, useEffect } from "react";
import "./styles.scss";
/**
 * A Drawer component for sliding panels from any side of the screen.
 * Supports closable header, mask overlay, customizable width/height, and dynamic content.
 * Ideal for side menus, settings panels, or contextual panels.
 */

const DrawerUI: React.FC<DrawerUIProps> = ({
  open,
  onClose,
  placement = "right",
  size = 300,
  closable = true,
  maskClosable = true,
  children,
}) => {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const handleMaskClick = () => {
    if (maskClosable) onClose();
  };

  return (
    <>
      {open && <div className="ui__drawer-mask" onClick={handleMaskClick} />}
      <div
        className={`ui__drawer ui__drawer--${placement} ${open ? "open" : ""}`}
        style={{
          width: placement === "left" || placement === "right" ? size : "100%",
          height: placement === "top" || placement === "bottom" ? size : "100%",
        }}
      >
        {closable && (
          <button className="ui__drawer-close" onClick={onClose}>
            ✕
          </button>
        )}
        <div className="ui__drawer-content">{children}</div>
      </div>
    </>
  );
};

export default DrawerUI;
