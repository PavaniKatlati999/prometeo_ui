import React, { useState, useEffect, useCallback, useMemo, ReactNode, CSSProperties, useContext } from 'react'
import './style.scss'

// Form Component
const FormContext = React.createContext<any>(null)

export const Form: React.FC<FormProps> = ({
  form,
  name,
  layout = 'vertical',
  style,
  autoComplete = 'on',
  labelAlign = 'left',
  size = 'default',
  disabled = false,
  className,
  onKeyPress,
  children,
}) => {
  const formContext = useMemo(
    () => ({ layout, labelAlign, size, disabled, form }),
    [layout, labelAlign, size, disabled, form]
  )

  return (
    <form
      name={name}
      style={style}
      onKeyDown={onKeyPress}
      autoComplete={autoComplete}
      className={`custom-form ${className} ${layout} ${size}`}
    >
      <FormContext.Provider value={formContext}>{children}</FormContext.Provider>
    </form>
  )
}



// Form.Item Component
export const FormItem: React.FC<FormItemProps> = ({
  label,
  required = false,
  style,
  className,
  name,
  rules = [],
  validateTrigger = 'onChange',
  initialValue,
  children,
}) => {
  const [value, setValue] = useState(initialValue || '')
  const [error, setError] = useState<string | null>(null)
  const { disabled: formDisabled } = useContext(FormContext)

  const allRules = useMemo(() => {
    const validations = [...rules]
    if (required) {
      validations.unshift((value: any) => {
        if (!value) {
          return Promise.reject(new Error(`${label || 'This field'} is required.`))
        }
        return Promise.resolve()
      })
    }
    return validations
  }, [required, rules, label])

  const validate = useCallback(
    async (value: any) => {
      for (let rule of allRules) {
        try {
          await rule(value)
          setError(null)
        } catch (validationError: any) {
          setError(validationError.message)
          break
        }
      }
    },
    [allRules]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)
      if (validateTrigger === 'onChange') {
        validate(newValue)
      }

      if (React.isValidElement(children) && typeof children.props.onChange === 'function') {
        children.props.onChange(e)
      }
    },
    [validate, validateTrigger, children]
  )

  useEffect(() => {
    if (initialValue) {
      validate(initialValue)
    }
  }, [initialValue, validate])

  const hasProps = (element: any): element is React.ReactElement<{ value: any; onChange: any; disabled?: boolean; className?: string }> => {
    return element && typeof element.props === 'object'
  }

  const childElement = React.isValidElement(children) && hasProps(children)
    ? React.cloneElement(children, {
      onChange: handleChange,
      disabled: formDisabled,
      className: `${children.props.className || ''} ${error ? 'input-error' : ''}`,
    })
    : children

  return (
    <div className={`custom-form-item ${className}`} style={style}>
      {label && (
        <label className={`form-item-label ${required ? 'required' : ''}`}>
          {label}
        </label>
      )}
      <div className="form-item-input-wrapper">
        {childElement}
      </div>
      {error && <div className="form-item-error">{error}</div>}
    </div>
  )
}
