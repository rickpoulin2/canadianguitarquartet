import React, { useRef } from 'react'
import { graphql } from 'gatsby'
import { Button, Card } from 'react-bootstrap';
import NetlifyForm from './netlify-form';
import RichText from './richtext'
import FormField from './form-field';

import './contact-form.scss'

// should use a framework but meh
const i18n = {
  'en': {
    email: "Email address",
    emailHelp: "We'll never share your email with anyone else.",
    name: "Your name",
    message: "Message",
  },
  'fr': {
    email: "Votre courriel",
    emailHelp: "Nous ne partagerons jamais votre courriel.",
    name: "Votre nom",
    message: "Message",
  },
}

const ContactForm = ({ obj }) => {
  const clz = "contact-form " + (obj.styles ? obj.styles : "col")
  const submitRef = useRef()
  const modSubmitData = formData => {
    if (formData.get("newsletterSignup") !== "Yes") {
      formData.append("newsletterSignup", "No")
    }
  }
  let labels = i18n[obj.node_locale === 'fr' ? 'fr' : 'en'];

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
              lang={obj.node_locale === 'fr' ? 'fr' : 'en'}
              submitRef={submitRef}
              successHeading={obj.successHeading}
              errorHeading={obj.errorHeading}
              successContent={obj.successBody}
              errorContent={obj.errorBody}
              modSubmitData={modSubmitData}>
              <FormField name="email" type="email" label={labels.email} helpText={labels.emailHelp} required={true} />
              <FormField name="name" type="text" label={labels.name} />
              <FormField name="message" type="textarea" label={labels.message} required={true} />
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
    node_locale
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