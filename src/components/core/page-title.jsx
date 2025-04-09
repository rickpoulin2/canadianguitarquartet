import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import './page-title.scss'

const PageTitle = ({ title, asText }) => {
  const heading = asText ? <p className="h1">{title}</p> : <h1><span>{title}</span></h1>
  return (
    <section className="page-heading">
      <Container>
        <Row>
          <Col>
            {heading}
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default PageTitle