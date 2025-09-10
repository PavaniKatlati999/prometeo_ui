import React from 'react'
import Tooltip from '../tooltip'
import "./styles.scss"

/**
*  * A Select component for dropdown selection of single or multiple values.
 * Supports search, disabled state, custom options, and controlled/uncontrolled behavior.
 * Ideal for forms and filters.
*/
function useOutsideAlerter(ref, setToggle) {
  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setToggle(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])
}

export default (props) => {
  const { mode = "single" } = props
  if (mode === "single") return <SingleSelectDropdown {...props} />
  if (mode === "multi") return <MultiSelectDropdown {...props} />
}

/**
 * @description A reusable MultiSelectDropdown component to display a dropdown with multiple selection options.
 * @component
 * @param {MultiSelectProp} props - The properties for the MultiSelectDropdown component.
 * @returns {JSX.Element} The MultiSelectDropdown component.
 */

export const MultiSelectDropdown = ({ options, value, placeholder, style, handleChange, disabled, handleOutsideClick }: MultiSelectProp) => {

  const wrapperRef = React.useRef(null)
  const [selected, setSelected] = React.useState(Array.isArray(value) ? value : [])
  const [isFirstRender, setIsFirstRender] = React.useState(true)
  const [hasSelectionChanged, setHasSelectionChanged] = React.useState(false)
  const [toggle, setToggle] = React.useState(false)

  // Update the selected state when the `value` prop changes
  React.useEffect(() => {
    setSelected(Array.isArray(value) ? value : [])
  }, [value])

  useOutsideAlerter(wrapperRef, setToggle)

  React.useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
    } else if (!toggle && handleOutsideClick && hasSelectionChanged) {
      handleOutsideClick(selected)
      setHasSelectionChanged(false)
    }
  }, [toggle, hasSelectionChanged])

  const getToolTipText = (val) => {
    const text = options.find(item => item.value === val)
    return text ? text.label : val
  }

  const onChange = React.useCallback(({ value }) => {
    const newArray = [...selected]
    setHasSelectionChanged(true)
    if (newArray.includes(value)) {
      const updatedArray = newArray.filter(item => item !== value)
      if (handleChange) { handleChange(updatedArray) }
      setSelected(updatedArray)
    } else {
      newArray.push(value)
      if (handleChange) { handleChange(newArray) }
      setSelected(newArray)
    }
  }, [selected])

  const getCount = () => {
    return Math.ceil(320 / 100) - 2
  }

  const getUI = (val) => {
    return <span key={val} className="ui__select_dropdown__selected-item">
      <Tooltip content={getToolTipText(val)}><span>{val.length > 7 ? `${val.slice(0, 5)}...` : val}</span></Tooltip>
    </span>
  }

  return (
    <div className={`ui__select_dropdown ${disabled ? 'disabled bg-light cursor-not-allowed' : ''}`} ref={wrapperRef} style={style}>
      <div className={`ui__select_dropdown__selected`} onClick={() => setToggle(!toggle)}>
        {selected.length > 0 ? (
          selected.length <= getCount() ? selected.map((val) => getUI(val)) : (
            <span>
              {selected.slice(0, getCount()).map((val) => getUI(val))}
              <span className="px-2"> & {selected.length - getCount()} more... </span>
            </span>
          )
        ) : (<span>{placeholder}</span>)}
      </div>

      <div className="ui__select_dropdown__arrow">
        {toggle ? (<img src="/icons/ArrowDropUp.svg" />) : (<img src="/icons/ArrowDropDown.svg" />)}
      </div>

      {toggle && (
        <ul className="ui__select_dropdown__options">
          {options.map((option) => {
            const isSelected = selected.includes(option.value)
            return (
              <li
                className={`ui__select_dropdown__option ${isSelected ? 'selected' : ''}`}
                key={option.value}
                onClick={() => !disabled && onChange({ value: option.value })}
              >
                <input type="checkbox" checked={isSelected} readOnly />
                <span>{option.label}</span>
              </li>
            )
          })}
        </ul>
      )}

    </div>
  )
}

/**
 * @description A reusable SingleSelectDropdown component to display a dropdown with a single selection option.
 * @component
 * @param {SingleSelectProp} props - The properties for the SingleSelectDropdown component.
 * @returns {JSX.Element} The SingleSelectDropdown component.
 */

export const SingleSelectDropdown = ({ options, value, placeholder, style, handleChange, disabled, tooltipTitle, tooltipPosition = 'top' }: SingleSelectProp) => {
  const wrapperRef = React.useRef(null)
  const [selected, setSelected] = React.useState(value || null)
  const [toggle, setToggle] = React.useState(false)

  // Update the selected state when the `value` prop changes
  React.useEffect(() => {
    setSelected(value)
  }, [value])

  useOutsideAlerter(wrapperRef, setToggle)

  const onChange = React.useCallback((option) => {
    setSelected(option.value)
    if (handleChange) handleChange(option.value)
    setToggle(false)
  }, [handleChange])

  return (
    <div className={`ui__select_dropdown ${disabled ? 'disabled bg-light cursor-not-allowed' : ''}`} ref={wrapperRef} style={style}>
      <div className="ui__select_dropdown__selected single_select" onClick={() => !disabled && setToggle(!toggle)}>
        <Tooltip direction={tooltipPosition} content={tooltipTitle || ''}>
          {<span>{value ? value : placeholder}</span>}
        </Tooltip>
      </div>
      <div className="ui__select_dropdown__arrow">
        {toggle ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            role="img"
            aria-label="Collapse"
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon--up"
          >
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            role="img"
            aria-label="Expand"
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon--down"
          >
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
          </svg>
        )}
      </div>

      {toggle && (
        <ul className="ui__select_dropdown__options">
          {options.map((option) => (
            <li
              className={`ui__select_dropdown__option ${selected === option.value ? 'selected' : ''}`}
              key={option.value}
              onClick={() => !disabled && onChange(option)}
            >
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
