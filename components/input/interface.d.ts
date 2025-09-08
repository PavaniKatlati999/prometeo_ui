interface InputProps {
  id?: string
  defaultValue?: string | number
  value?: string | number
  placeholder?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  validationStatus?: string
  helperText?: string
  className?: string
  style?: React.CSSProperties
  type?: string
  name?: string
  required?: boolean
  readOnly?: boolean
  minLength?: number
  maxLength?: number
  showPasswordToggle?: boolean
  passwordToggleIcon?: JSX.Element
}
