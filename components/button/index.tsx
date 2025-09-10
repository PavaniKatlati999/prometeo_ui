import React from 'react'
import './styles.scss'

/**
 *  A reusable Button component to perform actions
 * @description A reusable Button component to perform actions.
 * @component
 * @param {ButtonProps} props - The properties for the Button component.
 * @returns {JSX.Element} The Button component.
 */

const Button: React.FC<ButtonProps> = ({
  type = 'default',
  size = 'middle',
  onClick,
  title,
  disabledTitle,
  disabled = false,
  loading = false,
  color,
  icon,
  iconSrc,
  iconPos,
  iconStyle,
  className = '',
  children,
  id,
  text,
  alt,
  style
}) => {
  const buttonClass = `${icon || iconSrc ? "d-flex" : ""} btn mb-2 ${type} ${size} ${disabled ? 'disabled' : ''} ${loading ? 'loading' : ''} ${className}`
  const customStyle = { ...style, ...(color ? { backgroundColor: color, borderColor: color } : {}) }

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      title={disabled ? disabledTitle : title}
      disabled={disabled || loading}
      style={customStyle}
      id={id}
    >
      {loading ? (<span className="spinner"></span>) : (
        <>
          {iconPos === 'left' && (icon || iconSrc) && (
            <span className="btn-icon">
              {iconSrc ? <img src={iconSrc} style={iconStyle} alt={alt} /> : icon}
            </span>
          )}
          {text ? <span>{text}</span> : children}
          {iconPos === 'right' && (icon || iconSrc) && (
            <span className="btn-icon">
              {iconSrc ? <img src={iconSrc} style={iconStyle} alt="icon" /> : icon}
            </span>
          )}
        </>
      )}
    </button>
  )
}

export default Button
