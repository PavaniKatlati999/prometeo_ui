interface ModalProps {
  className?: string
  id?: string
  style?: React.CSSProperties
  title?: React.ReactNode
  open: boolean
  onCancel?: () => void
  width?: number | string
  height?: number | string
  footer?: React.ReactNode
  centered?: boolean
  maskClosable?: boolean
  forceRender?: boolean
  children: React.ReactNode
  isClosable?: boolean
}

interface ConfirmModalProps {
  id?: string,
  className?: string,
  title?: string | React.ReactNode
  icon?: React.ReactNode
  content?: React.ReactNode
  type?: "default" | "info" | "success" | "warning" | "delete" | "error"
  okText?: string
  okButtonClass?: any
  cancelText?: string
  okType?: "primary" | "danger" | "default"
  onOk?: () => void
  onCancel?: () => void
  showCancelButton?: boolean
  width?: any
  height?: any
  isClosable?: boolean
  root?: any // Add root prop here
}
