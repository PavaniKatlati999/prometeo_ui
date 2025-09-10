import React, { useEffect, useState } from 'react'
import Modal from '../modal'
import './styles.scss'

/**
 * A Result component to show status messages such as success, error, warning, or info.
 * Supports title, description, icon, and actions. Useful for feedback after operations.
 * @component
 * @param {ResultComponentProps} props - The properties for the Result component.
 * @returns {JSX.Element} The Result component.
 */

const Result = ({ icon, title, subtitle, extra, width, height, resultInsideModal = true }: ResultComponentProps) => {
  const [modalOpen, setModalOpen] = useState(true)

  const resultContent = (
    <div className="result-content">
      {icon && <div className="result-icon">{icon}</div>}
      <h2 className="result-title">{title}</h2>
      {subtitle && <p className="result-subtitle">{subtitle}</p>}
      {extra && <div className="result-extra">{extra}</div>}
    </div>
  )

  if (resultInsideModal) {
    return (
      <Modal
        open={modalOpen}
        footer={null}
        centered
        width={width || 400}
        height={height || 350}
        maskClosable={false}
        onCancel={()=>setModalOpen(false)}
      >
        {resultContent}
      </Modal>
    )
  } else {
    return resultContent
  }
}

export default Result
