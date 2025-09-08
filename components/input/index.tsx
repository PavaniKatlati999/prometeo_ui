import React, { ChangeEvent, useEffect, useState } from 'react'
import './styles.scss'

/**
 * @description A reusable Input component to handle user input.
 * @component
 * @param {InputProps} props - The properties for the Input component.
 * @returns {JSX.Element} The Input component.
 */

const Input: React.FC<InputProps> = ({
  id,
  defaultValue = '',
  value,
  placeholder,
  onChange,
  onBlur,
  disabled = false,
  helperText,
  className = '',
  style = {},
  type = 'text',
  name,
  required = false,
  readOnly = false,
  minLength,
  maxLength,
  showPasswordToggle = false
}) => {

  const [inputValue, setInputValue] = useState<string | number>(value || defaultValue)
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  useEffect(() => {
    setInputValue(value || defaultValue)
  }, [value, defaultValue])

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); //  updates local state so typing works
    if (onChange) onChange(e); //  still calls parent handler
  };

  const togglePasswordVisibility = (event: React.MouseEvent) => {
    event.preventDefault()
    setIsPasswordShown(!isPasswordShown)
  }

  return (
    <div className="input__wrapper" style={{ position: 'relative' }}>
      <input
        id={id}
        type={isPasswordShown ? 'text' : type}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        value={inputValue}
        className={`input ${type}-input ${className} ${helperText ? 'input-error' : ''}`}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        style={style}
        required={required}
        readOnly={readOnly}
      />
      {showPasswordToggle && type === 'password' && (
        <button className="eye" onClick={togglePasswordVisibility} type="button" >
          {isPasswordShown ? (
            <img src="/svgs/visibility cross.svg" alt="visibility-icon" width='15' height='15' />
          ) : (
            <img src="/svgs/visibility.svg" alt="visibility-cross-icon" width='15' height='15' />
          )}
        </button>
      )}
    </div>
  )
}

export default Input
