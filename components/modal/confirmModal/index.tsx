// import Button from '@/components/button'
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import Modal from '..'
import "./styles.scss"
import Button from '../../button'
/**
 * @description A reusable ConfirmModal component to display a confirmation modal.
 * @component
 * @param {ConfirmModalProps} props - The properties for the ConfirmModal component.
 * @returns {JSX.Element} The ConfirmModal component.
 */

const getIcon = (type: string, icon) => {
  // Show different images based on modal type
  switch (type) {
    case "success":
      return <img src='/svgs/confirmModal-success.svg' width={96} height={96} />
    case "info":
      return <img src='/svgs/confirmModal-info.svg' width={96} height={96} />
    case "warning":
      return <img src='/svgs/confirmModal-warning.svg' width={96} height={96} />
    case "delete":
      return <img src='/svgs/confirmModal-delete.svg' width={96} height={96} />
    case "error":
      return <img src="/svgs/error.svg" width={96} height={96} />
    default:
      return icon ? <img src={icon} width={96} height={96} /> : null
  }
}

const getContent = (content) => {
  if (React.isValidElement(content)) return content
  return <p className='mt-1 text-center text-muted confirmation__custom__modal__content' dangerouslySetInnerHTML={{ __html: content }} />
}


const ConfirmModalComponent = ({
  id,
  className,
  title = "Confirm",
  content = "",
  type = "default",
  okText = "OK",
  cancelText = "Cancel",
  okType = "primary",
  icon = null,
  onOk,
  onCancel,
  showCancelButton = true,
  width = 450,
  height,
  isClosable = false,
  okButtonClass,
  root
}: ConfirmModalProps) => {
  const [visible, setVisible] = useState(true)

  const closeModal = () => {
    setVisible(false)
    setTimeout(() => {
      root.unmount()
      const confirmModalElement = document.getElementById('confirm-modal-container')
      if (confirmModalElement) {
        document.body.removeChild(confirmModalElement)
      }
    }, 300)
  }

  const handleOk = () => {
    if (onOk) onOk()
    closeModal()
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
    closeModal()
  }

  return (
    <Modal
      id={id}
      className={className}
      open={visible}
      onCancel={handleCancel}
      footer={
        <div className="d-flex justify-content-end">
          {showCancelButton && (
            <Button className="rounded-3 w-50" onClick={handleCancel} type="default" size="middle">{cancelText}</Button>
          )}
          <Button className={`mx-2 rounded-3 ${showCancelButton ? 'w-50' : 'w-100'} ${okType} ${okButtonClass}`} type="primary" size="middle" onClick={handleOk}>{okText}</Button>
        </div>
      }
      isClosable={isClosable}
      width={width ? width : 480}
      height={height}
      centered={true}
      maskClosable={false}
    >
      <div className="confirmation__custom__modal">
        <p className="confirmation__custom__modal__icon">{getIcon(type, icon)}</p>
        <h4 className="mt-3">{title}</h4>
        {getContent(content)}
      </div>
    </Modal>
  )
}

const ConfirmModal = (props: ConfirmModalProps) => {
  const div = document.createElement('div')
  div.id = 'confirm-modal-container'
  document.body.appendChild(div)

  const root = createRoot(div)
  root.render(<ConfirmModalComponent {...props} root={root} />)
}

export default ConfirmModal
