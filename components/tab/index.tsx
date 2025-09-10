import React, { useState } from "react";
import "./styles.scss";
import { TabUIProps } from "./interface";
/**
 * A Tab component to create tabbed navigation with multiple panels.
 * Supports controlled/uncontrolled selection, customizable headers, and dynamic content.
 * Ideal for content sections or dashboards.
 */


const TabUI: React.FC<TabUIProps> = ({
  items,
  defaultActive = 0,
  onChange,
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultActive);

  const handleClick = (index: number, disabled?: boolean) => {
    if (disabled) return;
    setActiveIndex(index);
    onChange?.(index);
  };

  return (
    <div className={`ui__tab ${className}`}>
      {/* Tab headers */}
      <div className="ui__tab-list">
        {items.map((tab, index) => (
          <button
            key={index}
            className={`ui__tab-button ${
              activeIndex === index ? "active" : ""
            } ${tab.disabled ? "disabled" : ""}`}
            onClick={() => handleClick(index, tab.disabled)}
            disabled={tab.disabled}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="ui__tab-content">
        {items[activeIndex]?.content}
      </div>
    </div>
  );
};

export default TabUI;
