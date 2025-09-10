import React from "react";
import "./styles.scss";


const statusColors = {
  success: "#52c41a",
  processing: "#1890ff",
  error: "#ff4d4f",
  warning: "#faad14",
  default: "#d9d9d9",
  waiting: "#fadb14",
  stop: "#722ed1",
};
/**
 * A Tags component to display labeled elements such as categories, keywords, or statuses.
 * Supports customizable colors, closable tags, and dynamic rendering from a list of values.
 * Ideal for filters, labels, and metadata display in UIs.
 */
const Tag: React.FC<TagProps> = ({
  children,
  color,
  icon,
  closable = false,
  closeIcon = "✕",
  status,
  onClose,
  draggable = false,
  onDragStart,
  onDrop,
  className,
  style,
}) => {
  const backgroundColor = status ? statusColors[status] : color || "gray";

  return (
    <span
      className={`tag ${className}`}
      style={{ backgroundColor, color: "#fff", ...style }}
      draggable={draggable}
      onDragStart={onDragStart}
      onDrop={onDrop}
    >
      {icon && <span className="tag-icon">{icon}</span>}
      {children}
      {closable && (
        <button onClick={onClose} className="tag-close" aria-label="Close">
          {closeIcon}
        </button>
      )}
    </span>
  );
};

export default Tag;
