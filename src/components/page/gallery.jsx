import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Card } from 'react-bootstrap'
import RichText from './richtext'

import './gallery.scss'

const ImageGallery = ({ obj }) => {
  if (obj == null)
    return
  if (obj.cardType == null || obj.images == null)
    return

  const styles = "cmp gallery " + (obj.styles ? obj.styles : "")
  const heading = obj.fancyHeading == null ? "" : <h2 className="bar"><span>{obj.fancyHeading}</span></h2>

  let disclaimerCard = ""
  let pdfButton = ""
  if (obj.pdfButtonText != null && obj.pdfButtonFile != null) {
    pdfButton = <p><a className="btn btn-outline-light" href={obj.pdfButtonFile.file.url} target="_blank" download={obj.pdfButtonFile.file.fileName}>{obj.pdfButtonText}</a></p>
  }
  if (obj.disclaimerContent != null || pdfButton !== "") {
    const cardClass = obj.cardType === "no-border" ? obj.cardType : "text-bg-" + obj.cardType
    disclaimerCard =
      <Card className={"disclaimer " + cardClass}>
        <Card.Body>
          {heading}
          <RichText data={obj.disclaimerContent} />
          {pdfButton}
        </Card.Body>
      </Card>
  }

  const galleryCards = obj.images.map((i) => {
    return (
      <Card className="photo-item">
        <a href={i.file.url} target="_blank" download={i.file.fileName}>
          <GatsbyImage className="img-fluid" image={i.gatsbyImageData} alt={i.description} />
          <i className="fas fa-download"></i>
        </a>
      </Card>
    )
  })

  return (
    <div className={styles}>
      {disclaimerCard}
      {galleryCards}
    </div>
  )

}

export default ImageGallery

export const query = graphql`
  fragment ContentfulBlockImageGallery on ContentfulBlockImageGallery {
    styles
    cardType
    fancyHeading
    disclaimerContent {
      ...RichText
    }
    pdfButtonText
    pdfButtonFile {
      file {
        url
        fileName
      }
    }
    images {
      description
      gatsbyImageData(width:550)
      file {
        url
        fileName
      }
    }
  }
`