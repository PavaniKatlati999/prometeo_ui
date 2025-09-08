interface FormProps {
  form?: any
  name?: string
  layout?: 'vertical' | 'horizontal'
  style?: CSSProperties
  autoComplete?: 'on' | 'off'
  labelAlign?: 'left' | 'center' | 'right'
  size?: 'small' | 'default' | 'large'
  disabled?: boolean
  className?: string
  onKeyPress?: React.KeyboardEventHandler<HTMLFormElement>
  children: ReactNode
}


interface FormProps {
  onSubmit?: (values: { [key: string]: any }) => void
  className?: string
  children: React.ReactNode
}

interface FormItemProps {
  label?: string
  required?: boolean
  style?: CSSProperties
  className?: string
  name?: string
  rules?: Array<(value: any) => Promise<void>>
  validateTrigger?: 'onChange' | 'onBlur'
  initialValue?: any
  children: ReactNode
  error?: string
  helperText?: string
  validate?: (value: string) => boolean
}
interface FormProps {
  form?: any
  name?: string
  layout?: 'vertical' | 'horizontal'
  style?: CSSProperties
  autoComplete?: 'on' | 'off'
  labelAlign?: 'left' | 'center' | 'right'
  size?: 'small' | 'default' | 'large'
  disabled?: boolean
  className?: string
  onKeyPress?: React.KeyboardEventHandler<HTMLFormElement>
  children: ReactNode
}
