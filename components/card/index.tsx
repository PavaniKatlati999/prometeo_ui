import React from "react"
import "./styles.scss"

/**
 * @description A reusable Card component to display content in a visually appealing way.
 * @component
 * @param {CardProps} props - The properties for the Card component.
 * @returns {JSX.Element} The Card component.
 */

const Card: React.FC<CardProps> = (props) => {
  const { className, style, imageUrl, title, body, footer, variant, onClick, extra, children, } = props

  return (
    <div
  className={`card ${variant ? `card-${variant}` : ""} ${className}`}
      style={style}
      onClick={onClick}
    >
      {imageUrl && <img src={imageUrl} className="card-img-top" alt="Card image" />}
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
