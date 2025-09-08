interface ButtonProps {
  type?: 'primary' | 'secondary' | 'default' | 'dashed' | 'text' | 'link' | 'light'
  size?: 'small' | 'middle' | 'large'
  onClick?: any
  title?: string
  disabledTitle?: string
  id?: string
  text?: any
  disabled?: any
  loading?: boolean
  color?: string
  icon?: React.ReactNode
  iconSrc?: any
  iconPos?: 'left' | 'right'
  alt?: any
  iconStyle?: React.CSSProperties
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}
