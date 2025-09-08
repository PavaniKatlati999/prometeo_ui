import React, { useState } from 'react'
import "./styles.scss"

/**
 * @description A reusable Form component to handle form submissions and input changes.
 * @component
 * @param {FormProps} props - The properties for the Form component.
 * @returns {JSX.Element} The Form component.
 */


const Form: React.FC<FormProps> = ({ onSubmit, className, children }) => {
  const [values, setValues] = useState<{ [key: string]: any }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(values)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className  || 'default-form'}>
     {React.Children.map(children, (child) => {
  if (React.isValidElement(child)) {
    return React.cloneElement(child, {
      ...child.props,
      onChange: handleChange,
      value: values[child.props.name],
    })
  }
  return child;
})}
    </form>
  )
}

export default Form;
