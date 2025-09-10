import React, { useState } from "react";
import CollapseUI from "./CollapseUI";
import "./styles.scss";
/**
 *
 * A reusable CollapsePanel component to show or hide content sections with a toggle.
 * Supports controlled or uncontrolled state, custom headers, and collapsible content.
 * Ideal for FAQs, accordion lists, or expandable content areas.
 */


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
