interface CardProps {
  className?: string
  style?: React.CSSProperties
  imageUrl?: string
  title?: React.ReactNode
  body?: React.ReactNode
  extra?: React.ReactNode
  footer?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
  onClick?: () => void
  children?: React.ReactNode
}
