import React from "react"
import "./styles.scss"

/**
 *
 * A flexible and reusable Card component that displays content in a structured,
 * visually appealing container. The Card supports an image, header, body, footer,
 * and additional custom content, making it ideal for dashboards, profile cards,
 * product listings, or any content that benefits from a card layout.
 *
  */
const Card: React.FC<CardProps> = (props) => {
  const { className, style, imageUrl, title, body, footer, variant, onClick, extra, children } = props

  return (
    <div
      className={`card ${variant ? `card-${variant}` : ""} ${className}`}
      style={style}
      onClick={onClick}
    >
      {imageUrl && <img src={imageUrl} className="card-img-top" alt="Card image" style={props.imageStyle} />}
      {(title || extra) && (
        <div className="card-header">
          <div>{title}</div>
          <div>{extra}</div>
        </div>
      )}
      <div className="card-body">
        {body || children}
      </div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}

export default Card
