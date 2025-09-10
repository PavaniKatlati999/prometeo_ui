import React from "react";
import "./styles.scss";
import {TypographyUIProps} from "./interface";
/**
 *
 * A Typography component for managing text styles such as headings, paragraphs, and captions.
 * Supports customizable font size, weight, color, and alignment.
 * Ideal for consistent text formatting across the application.
 */

const TypographyUI: React.FC<TypographyUIProps> = ({
  variant = "paragraph",
  children,
  className = "",
  color,
  align = "left",
  italic = false,
  underline = false,
  strong = false,
}) => {
  const Tag =
    variant === "paragraph"
      ? "p"
      : variant === "caption"
      ? "span"
      : variant === "quote"
      ? "blockquote"
      : variant === "code"
      ? "code"
      : variant;

  return (
    <Tag
      className={`ui__typography ${variant} ${className}`}
      style={{
        color,
        textAlign: align,
        fontStyle: italic ? "italic" : undefined,
        textDecoration: underline ? "underline" : undefined,
        fontWeight: strong ? "bold" : undefined,
      }}
    >
      {children}
    </Tag>
  );
};

export default TypographyUI;
