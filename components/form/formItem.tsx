import React from 'react'
import "./styles.scss"

/**
 * @description A reusable FormItem component to render form labels, inputs, and error messages.
 * @component
 * @param {FormItemProps} props - The properties for the FormItem component.
 * @returns {JSX.Element} The FormItem component.
 */


const FormItem: React.FC<FormItemProps> = ({
  label,
  name,
  className,
  children,
  error,
  helperText,
  required,
  validate,
}) => {
  return (
    <div className={className || 'default-form-item'}>
      <label htmlFor={name}>{label}{required && <span className="required-text">*</span>} </label>
      {children}
      {helperText && <p className="helper-text">{helperText}</p>}
      {error && <p className="error-text">{error}</p>}
    </div>
  )
}

export default FormItem
