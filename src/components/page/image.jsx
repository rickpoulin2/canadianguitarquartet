import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Card } from 'react-bootstrap'
import MyLink from './mylink'

import './image.scss'

const ImageCard = ({ obj }) => {
  if (obj == null)
    return
  if (obj.cardType == null || obj.image == null)
    return

  const styles = "cmp image-card " + (obj.styles ? obj.styles : "")
  const image = <GatsbyImage className="img-fluid" image={obj.image.gatsbyImageData} alt={obj.image.description} />
  const wrappedImage = obj.link == null ? image : <MyLink obj={obj.link}>{image}</MyLink>

  if (obj.cardType === "no-margins") {
    return (
      <div className={styles}>
        {wrappedImage}
      </div>
    )
  }

  const cardClass = obj.cardType === "no-border" ? obj.cardType : "text-bg-" + obj.cardType
  return (
    <div className={styles}>
      <Card className={cardClass}>
        <Card.Body>
          {wrappedImage}
        </Card.Body>
      </Card>
    </div>
  )

}

export default ImageCard

export const query = graphql`
  fragment ContentfulBlockImage on ContentfulBlockImage {
    styles
    cardType
    image {
      description
      gatsbyImageData(width:1400)
    }
    link {
      ... MyLink
    }
  }
`