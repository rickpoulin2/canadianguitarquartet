import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Card, Row, Col } from 'react-bootstrap'
import RichText from './richtext'
import MyLink from './mylink'

import './content-card.scss'

const ContentCard = ({ obj }) => {
  if (obj == null)
    return
  if (obj.cardType == null || obj.content == null)
    return

  const styles = "cmp content-card " + (obj.styles ? obj.styles : "")
  const heading = obj.fancyHeading ? <h2 className="bar"><span>{obj.fancyHeading}</span></h2> : ""
  const image = obj.image?.gatsbyImageData ? <GatsbyImage image={obj.image.gatsbyImageData} alt={obj.image.description} /> : ""
  const cardClass = obj.cardType === "no-border" ? obj.cardType : "text-bg-" + obj.cardType
  const buttonClass = "btn btn-lg btn-outline-" + (obj.cardType === "tertiary" || obj.cardType === "light" ? "dark" : "light")
  const buttons = obj.buttons?.map((btn, i, arr) => {
    return <MyLink key={btn.id} obj={btn} addClasses={buttonClass} />
  });

  if (image) {
    return (
      <div className={styles}>
        <Card className={cardClass}>
          <Card.Body>
            <Row>
              <Col sm="4">
                {image}
              </Col>
              <Col sm="8">
                {heading}
                <RichText data={obj.content} />
                {buttons}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    )
  }

  return (
    <div className={styles}>
      <Card className={cardClass}>
        <Card.Body>
          {heading}
          <RichText data={obj.content} />
          {buttons}
        </Card.Body>
      </Card>
    </div>
  )
}

export default ContentCard

export const query = graphql`
  fragment ContentfulBlockContentCard on ContentfulBlockContentCard {
    styles
    cardType
    fancyHeading
    image {
      description
      gatsbyImageData(width:550)
    }
    content {
      ...RichText
    }
    buttons {
      ... MyLink
    }
  }
`