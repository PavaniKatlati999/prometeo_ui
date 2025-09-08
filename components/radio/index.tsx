import React from "react"
import './styles.scss'

/**
 * @description A reusable Radio component to display a radio button.
 * @component
 * @param {IRadio} props - The properties for the Radio component.
 * @returns {JSX.Element} The Radio component.
 */


const Radio = (props: IRadio) => {
  const { label, id, name, checked, onChange, value, disabled } = props

  return (
    <div className="ui__radio">
      <span><input type="radio" id={id} name={name} checked={checked} onChange={onChange} value={value} disabled={disabled}/></span>
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default Radio
