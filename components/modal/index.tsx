import React from 'react'
import "./styles.scss"

/**
 *  A Modal component to display overlay dialogs with header, body, and footer.
 * Supports customizable size, closable options, mask, and dynamic content.
 * Ideal for confirmations, forms, or contextual information.
 * @component
 * @param {ModalProps} props - The properties for the Modal component.
 * @returns {JSX.Element} The Modal component.
 */

const Modal: React.FC<ModalProps> = ({
  title,
  className = '',
  id,
  style,
  open,
  onCancel,
  width = 480,
  height = 'auto',
  footer = null,
  centered = true,
  maskClosable = true,
  forceRender = false,
  isClosable = true,
  children,
}) => {

  if (!open && !forceRender) return null

  return (
    <div className={`custom-modal ${open ? 'open' : ''} ${className}`} id={id} style={style}>
      <div
        className="custom-modal-overlay"
        onClick={() => {
          if (maskClosable) onCancel()
        }}
      />
      <div
        className="custom-modal-container"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          margin: centered ? 'auto' : '0',
        }}
      >
        <div className="custom-modal-header">
          {title && <div>{title}</div>}
          {/* {isClosable && <button onClick={onCancel} className="close-btn"><img src="/icons/close.svg" alt="Close Icon" height={16} width={16} /></button>} */}
          {isClosable && (
  <button onClick={onCancel} className="close-btn" aria-label="Close">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </button>
)}

        </div>
        <div className="custom-modal-body">{children}</div>
        {footer && <div className="custom-modal-footer">{footer}</div>}
      </div>
    </div>
  )
}

export default Modal
