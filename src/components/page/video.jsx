import React from 'react'
import { graphql } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'
import { Card } from 'react-bootstrap'

import './video.scss'

const Video = ({ obj }) => {
  if (obj == null)
    return
  if (obj.title == null || obj.cardType == null || obj.videoId == null)
    return

  const styles = "videocard " + (obj.styles ? obj.styles : "")
  const videoSrc = "https://www.youtube.com/embed/" + obj.videoId
  const cardStyles = obj.backgroundImage?.gatsbyImageData ? { backgroundImage: `url(${getSrc(obj.backgroundImage.gatsbyImageData)})` } : {}
  const cardClass = obj.cardType === "no-border" ? "no-border" : "text-bg-" + obj.cardType
  const embed = (<iframe src={videoSrc} title={obj.title}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen enablejsapi="1"></iframe>)

  if (obj.cardType === "none") {
    return (
      <div className={styles}>
        <div style={cardStyles}>
          {embed}
        </div>
      </div>
    )
  }

  return (
    <div className={styles}>
      <Card className={cardClass} style={cardStyles}>
        <Card.Body>
          <div>
            {embed}
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Video

export const query = graphql`
  fragment ContentfulBlockVideo on ContentfulBlockVideo {
    title
    styles
    cardType
    videoId
    backgroundImage {
      gatsbyImageData
    }
  }
`