import React, { useRef } from 'react'
import { graphql } from 'gatsby'
import { Button, Card } from 'react-bootstrap';
import NetlifyForm from './netlify-form';
import RichText from './richtext'
import FormField from './form-field';

import './contact-form.scss'

const ContactForm = ({ obj }) => {
  const clz = "contact-form " + (obj.styles ? obj.styles : "col")
  const submitRef = useRef()
  const modSubmitData = formData => {
    if (formData.get("newsletterSignup") !== "Yes") {
      formData.append("newsletterSignup", "No")
    }
  }

  return (
    <>
      <div className={clz}>
        <Card>
          <Card.Body>
            <div className="intro">
              <RichText data={obj.introContent} />
            </div>
            <NetlifyForm
              name="contact"
              submitRef={submitRef}
              successHeading={obj.successHeading}
              errorHeading={obj.errorHeading}
              successContent={obj.successBody}
              errorContent={obj.errorBody}
              modSubmitData={modSubmitData}>
              <FormField name="email" type="email" label="Email address" helpText="I'll never share your email with anyone else." required={true} />
              <FormField name="name" type="text" label="Your name" />
              <FormField name="message" type="textarea" label="Message" required={true} />
            </NetlifyForm>
            <div>
              <Button variant="primary" ref={submitRef}>{obj.submitButtonLabel}</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default ContactForm

export const query = graphql`
  fragment ContentfulBlockContactForm on ContentfulBlockContactForm {
    __typename
    styles
    introContent {
      ...RichText
    }
    submitButtonLabel
    successHeading
    successBody {
      ...RichText
    }
    errorHeading
    errorBody {
      ...RichText
    }
  }
`