import classnames from "classnames"
import React from "react"
import "./styles.scss"

/**
 * A Space component to manage spacing between elements horizontally or vertically.
 * Supports size and direction modifiers for flexible layouts. Useful for consistent
 * spacing in forms, toolbars, or grouped UI elements.
 */
const SpaceUI: React.FC<SpaceProps> = ({
  children,
  className,
  style = {},
  direction = "horizontal",
  size = "medium"
}) => {
  if (!children) return null

  return (
    <div
      className={classnames(
        className,
        "ui__space",
        `ui__space--${direction}`,
        `ui__space--${size}`
      )}
      style={style}
    >
      {children}
    </div>
  )
}

export default SpaceUI
