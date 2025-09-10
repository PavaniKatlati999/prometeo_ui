import React from "react";
import "./styles.scss";
import type { ListUIProps } from "./interface";

const spacingMap = {
  xs: "8px",
  sm: "16px",
  md: "24px",
  lg: "32px",
};
/**
 * A List component for rendering a collection of items with optional headers,
 * footers, custom renderers, and selection. Inspired by Ant Design's List.
 */
const ListUI: React.FC<ListUIProps> = ({
  header,
  footer,
  items = [],
  ordered = false,
  icon,
  spacing = "sm",
  className = "",
  bordered = false,
  size = "default", // 👈 added size
}) => {
  return (
    <div
      className={`ui__list-wrapper ${bordered ? "ui__list-bordered" : ""} ui__list-${size}`}
    >
      {header && <div className="ui__list-header">{header}</div>}

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

            <div className="ui__list-content">
              <div className="ui__list-title">{item.label}</div>
              {item.description && (
                <div className="ui__list-description">{item.description}</div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {footer && <div className="ui__list-footer">{footer}</div>}
    </div>
  );
};

export default ListUI;
