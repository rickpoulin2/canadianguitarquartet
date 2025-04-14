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
  const image = obj.image?.gatsbyImageData ? <GatsbyImage className="img-fluid" image={obj.image.gatsbyImageData} alt={obj.image.description} /> : ""
  const cardClass = obj.cardType === "no-border" ? obj.cardType : "text-bg-" + obj.cardType
  const buttonClass = "btn btn-outline-" + (obj.cardType === "light" ? "dark" : "light")
  const buttons = obj.buttons?.map((btn, i, arr) => {
    return <MyLink key={btn.id} obj={btn} addClasses={buttonClass} />
  });

  if (image) {
    // default == square
    let imgSize = { sm: 4 }
    let txtSize = { sm: 8 }
    if (obj.imageSizing === "landscape") {
      imgSize = { lg: 4 }
      txtSize = { lg: 8 }
    }
    if (obj.imageSizing === "portrait") {
      imgSize = { sm: 4, md: 3 }
      txtSize = { sm: 8, md: 9 }
    }

    return (
      <div className={styles}>
        <Card className={cardClass}>
          <Card.Body>
            <Row>
              <Col {...imgSize}>
                {image}
              </Col>
              <Col {...txtSize}>
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
      gatsbyImageData(width:750)
    }
    imageSizing
    content {
      ...RichText
    }
    buttons {
      ... MyLink
    }
  }
`