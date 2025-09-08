
interface MultiSelectProp {
  options: { value: string | number, label: string | number }[],
  value: any,
  placeholder: string | React.ReactNode,
  style?: React.CSSProperties,
  handleChange?: (item) => void,
  disabled?: boolean,
  handleOutsideClick?: (item) => void
}

interface SingleSelectProp {
  options: { value: string | number, label: string | number }[],
  value: any,
  placeholder: string | React.ReactNode,
  style?: React.CSSProperties,
  handleChange: (item: string | number) => void,
  disabled?: boolean,
  tooltipTitle?: any,
  tooltipPosition?: any,
}
