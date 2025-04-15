import React from 'react'
import { getSrc } from 'gatsby-plugin-image'
import { Container, Row, Col } from 'react-bootstrap'

import './page-title.scss'

const PageTitle = ({ title, asText, bg }) => {
  const heading = asText ? <p className="h1">{title}</p> : <h1><span>{title}</span></h1>
  const style = {};
  if (bg != null) {
    style.backgroundImage = `url("${getSrc(bg)}")`;
  }
  return (
    <section className="page-heading" style={style}>
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