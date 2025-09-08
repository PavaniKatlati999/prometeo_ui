import React, { useState } from "react";
import CollapseUI from "./CollapseUI";
import "./styles.scss";

export interface CollapsePanelProps {
  header: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

const CollapsePanel: React.FC<CollapsePanelProps> = ({
  header,
  children,
  defaultOpen = false,
  onToggle,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleClick = () => {
    const next = !isOpen;
    setIsOpen(next);
    onToggle?.(next);
  };

  return (
    <div className="ui__collapse-panel">
      <div className="ui__collapse-header" onClick={handleClick}>
        <span className="ui__collapse-arrow">{isOpen ? "▾" : "▸"}</span>
        {header}
      </div>
      <CollapseUI in={isOpen}>
        <div className="ui__collapse-content">{children}</div>
      </CollapseUI>
    </div>
  );
};

export default CollapsePanel;
