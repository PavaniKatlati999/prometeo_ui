import React, { ChangeEvent, FocusEvent, InputHTMLAttributes, useState, useRef, useEffect } from 'react';
import './styles.scss';

/**
 *
 * A reusable Checkbox component for single selection, supporting checked,
 * defaultChecked, disabled, and indeterminate states. It can be controlled
 * or uncontrolled, and provides onChange, onBlur, and onFocus event handlers.
 *
 */
const Checkbox: React.FC<CheckboxProps> = ({
  autoFocus,
  checked,
  defaultChecked,
  disabled,
  indeterminate,
  onChange,
  onBlur,
  onFocus,
  ...rest
}) => {
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked || false);

  const inputRef = useRef<HTMLInputElement>(null);

  // 🔑 Apply indeterminate state directly on the DOM node
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    if (checked === undefined) {
      setInternalChecked(e.target.checked);
    }
  };

  return (
    <label className={`custom-checkbox ${disabled ? "disabled" : ""}`}>
      <input
        ref={inputRef}
        type="checkbox"
        autoFocus={autoFocus}
        checked={checked !== undefined ? checked : internalChecked}
        disabled={disabled}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        {...rest}
      />
      <span className="checkmark"></span>
      <span className="label-text">{rest.title}</span>
      {indeterminate && <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '1px solid #ccc' }}></span>}
    </label>
  );
};


const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  defaultValue = [],
  disabled = false,
  name,
  options = [],
  value,
  onChange
}) => {
  const [internalValue, setInternalValue] = useState<(string | number)[]>(defaultValue);

  const currentValue = value !== undefined ? value : internalValue;

  const handleCheckboxChange = (optionValue: string | number) => {
    const nextValue = currentValue.includes(optionValue)
      ? currentValue.filter(val => val !== optionValue)
      : [...currentValue, optionValue];

    if (value === undefined) {
      setInternalValue(nextValue);
    }
    if (onChange) {
      onChange(nextValue);
    }
  };

  const renderOptions = () => {
    return options.map((option) => {
      let opt: Option;
      if (typeof option === 'string' || typeof option === 'number') {
        opt = { label: option, value: option };
      } else {
        opt = option;
      }

      return (
        <label key={opt.value}>
          <Checkbox
            checked={currentValue.includes(opt.value)}
            disabled={disabled || opt.disabled}
            onChange={() => handleCheckboxChange(opt.value)}
            name={name} // Ensure name is used
          />
          {opt.label}
        </label>
      );
    });
  };

  return <div>{renderOptions()}</div>;
};

export { Checkbox, CheckboxGroup };
