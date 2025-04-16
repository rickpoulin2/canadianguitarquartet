import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-gtag'
import EntryLink from './entry-link'

import './event-card.scss'

const dateNow = new Date();

const EventCard = ({ obj, hide }) => {
  const [open, setOpen] = useState(false)
  if (obj == null)
    return <li className="event event-blank"></li>
  if (obj.eventName == null || obj.eventDateTime == null)
    return

  const eventDateTime = new Date(obj.eventDateTime)
  const dtLocale = obj.node_locale === 'fr' ? 'fr-CA' : 'en-CA'
  const month = new Intl.DateTimeFormat(dtLocale, { month: 'short' }).format(eventDateTime)
  const day = new Intl.DateTimeFormat(dtLocale, { day: 'numeric' }).format(eventDateTime)

  let eventClass = eventDateTime.getTime() >= dateNow.getTime() ? 'event' : 'event-old'
  if (hide) {
    eventClass += " event-hidden"
  }
  const location = obj.eventLocation ? <p class="location">{obj.eventLocation}</p> : ""
  const ticketsLabel = obj.node_locale === 'fr' ? 'Billets' : 'Tickets'
  const tickets = obj.ticketsLink == null ? "" :
    <OutboundLink
      target="_blank"
      rel="noreferrer"
      className="link"
      href={obj.ticketsLink}><i class="fas fa-ticket"></i> {ticketsLabel}</OutboundLink>

  return (
    <li className={`${eventClass} event-summary`}>
      <EntryLink className="summary" type="ContentfulEvent" locale={obj.node_locale} slug={obj.eventName} data={obj}>
        <time datetime={obj.eventDateTime}>
          <span className="day">{day}</span>
          <span className="mth">{month}</span>
        </time>
        <div className="text">
          <p className="title">{obj.eventName}</p>
          {location}
        </div>
      </EntryLink>
      {tickets}
    </li>
  )
}

export default EventCard

export const query = graphql`
  fragment ContentfulEventSummary on ContentfulEvent {
    node_locale
    eventName
    eventDate: eventDateTime(formatString: "YYYY-MM-DD")
    eventDateTime(formatString: "YYYY-MM-DDTHH:mm")
    eventLocation
    ticketsLink
  }
`