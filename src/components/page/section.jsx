import React from 'react'
import { Container, Row } from 'react-bootstrap'

const Section = ({ as = "section", id, styles, children }) => {
  const Tag = as ? as : "section"
  return (
    <Tag id={id} className={styles}>
      <Container>
        <Row>
          {children}
        </Row>
      </Container>
    </Tag>)
}

export default Section