import React from "react";
import "./styles.scss";
import { IRadio } from "./interface";
/**
 * * A Radio component for single-choice selection within a group.
 * Supports controlled/uncontrolled usage, disabled state, and custom labels.
 * @component
 * @param {IRadio} props - The properties for the Radio component.
 * @returns {JSX.Element} The Radio component.
 */
const Radio: React.FC<IRadio> = ({
  label,
  id,
  name,
  checked,
  onChange,
  value,
  disabled,
}) => {
  return (
    <label
      className={`ui__radio ${disabled ? "disabled" : ""}`}
      htmlFor={id}
    >
      <input
        type="radio"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
      <span className="custom-radio"></span>
      <span className="radio-label">{label}</span>
    </label>
  );
};

export default Radio;
