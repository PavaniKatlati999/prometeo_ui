import React from "react";
import "./styles.scss";
/**
 * A List component for rendering a collection of items with optional headers, footers,
 * custom renderers, and selection. Ideal for menus, data lists, or item collections.
 */

const spacingMap = {
  xs: "8px",
  sm: "8px",
  md: "16px",
  lg: "16px",
};

const ListUI: React.FC<ListUIProps> = ({
  items = [],
  ordered = false,
  icon,
  spacing = "sm",
  className = "",
}) => {
  return (
    <ul
      className={`ui__list ${className}`}
      style={{ gap: spacingMap[spacing] }}
    >
      {items.map((item, index) => (
        <li key={index} className="ui__list-item">
          {ordered ? (
            <span className="ui__list-marker">{index + 1}.</span>
          ) : item.icon || icon ? (
            <span className="ui__list-marker">{item.icon || icon}</span>
          ) : (
            <span className="ui__list-marker">•</span>
          )}
          <span className="ui__list-label">{item.label}</span>
        </li>
      ))}
    </ul>
  );
};


export default ListUI;
