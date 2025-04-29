import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

import RichText from './richtext'

//import './event-body.scss'

const dateNow = new Date()

const EventBody = ({ obj }) => {
  if (obj == null)
    return ""
  if (obj.eventName == null)
    return

  const ticketsLabel = obj.node_locale === 'fr' ? 'Billets' : 'Tickets'
  const ticketsButton = obj.ticketsLink == null ? "" :
    <OutboundLink
      target="_blank"
      rel="noreferrer"
      className="btn btn-secondary"
      href={obj.ticketsLink}><i className="fas fa-ticket"></i> {ticketsLabel}</OutboundLink>

  const isOld = new Date(obj.eventDateTime).getTime() < dateNow.getTime()
  const ticketCard = (isOld || (obj.ticketsLink == null && obj.ticketPricing == null)) ? "" :
    <div className="tickets card">
      <div className="card-body">
        <span>{obj.ticketPricing}</span>
        {ticketsButton}
      </div>
    </div>
  const image = obj.image?.gatsbyImageData ? <GatsbyImage image={obj.image.gatsbyImageData} alt={obj.image.description} /> : ""

  return (
    <>
      {ticketCard}
      {image}
      <RichText data={obj.eventDetails} />
    </>
  )
}

export default EventBody

export const query = graphql`
  fragment ContentfulEventBody on ContentfulEvent {
    node_locale
    eventDateTime(formatString: "YYYY-MM-DDTHH:mm")
    ticketPricing
    ticketsLink
    image {
      description
      gatsbyImageData(width:750)
    }
    eventDetails {
        ...RichText
    }
  }
`