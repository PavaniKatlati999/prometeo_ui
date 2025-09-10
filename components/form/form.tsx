import React, { useState } from 'react'
import "./styles.scss"

/**
* A Form component to manage input fields, validation, and submission.
 * Supports controlled/uncontrolled fields, nested inputs, and customizable layout.
 * Useful for any kind of user input or data submission interface.
 *  */


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
