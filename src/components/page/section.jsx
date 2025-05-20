import React from 'react'
import { Container, Row } from 'react-bootstrap'

const Section = ({ as = "section", id, styles, children, inline }) => {
  const Tag = as ? as : "section"
  return (
    <Tag id={id} className={styles} style={inline}>
      <Container>
        <Row>
          {children}
        </Row>
      </Container>
    </Tag>)
}

export default Section