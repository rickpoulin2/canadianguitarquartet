import React from 'react'
import { Form } from 'react-bootstrap'

const FormField = ({ name, label, helpText, required = false, type = "text", rows = 5, children }) => {
  const eHelp = helpText ? <Form.Text id={name + "Help"}>{helpText}</Form.Text> : null

  const addProps = {
    name: name
  }
  if (required) {
    addProps.required = true
  }
  if (helpText) {
    addProps['aria-describedby'] = name + "Help";
  }

  let eInput = null;
  if (type === "textarea") {
    eInput = <Form.Control as="textarea" rows={rows} {...addProps}></Form.Control>
  } else if (type === "select") {
    eInput = (
      <Form.Select defaultValue="" {...addProps}>
        <option value="" disabled>- Please select an option -</option>
        {children}
      </Form.Select>)
  } else {
    eInput = <Form.Control type={type} {...addProps} />
  }

  return (
    <Form.Group className="field" controlId={name}>
      <Form.Label className={required ? "label-required" : ""}>{label}</Form.Label>
      {eInput}
      {eHelp}
    </Form.Group>
  )
}

export default FormField