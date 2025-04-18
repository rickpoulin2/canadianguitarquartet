import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-gtag'
import EntryLink from './entry-link'

import './event-card.scss'

const dateNow = new Date()

const EventCard = ({ obj, hide, triggerAs = 'div', showTickets, showTime, onClick, controls }) => {
  const [open, setOpen] = useState(false)
  if (obj == null)
    return <li className={`event event-blank ${hide ? 'event-hidden' : ''}`}></li>
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
  const tickets = (!showTickets || obj.ticketsLink == null) ? "" :
    <OutboundLink
      target="_blank"
      rel="noreferrer"
      className="link"
      href={obj.ticketsLink}><i class="fas fa-ticket"></i> {ticketsLabel}</OutboundLink>
  const eventTime = !showTime ? "" :
    <div class="show-time">
      <span>2:30pm</span>
      <span>local time</span>
    </div>

  const triggerContents = <>
    <time datetime={obj.eventDateTime}>
      <span className="day">{day}</span>
      <span className="mth">{month}</span>
    </time>
    <div className="text">
      <p className="title">{obj.eventName}</p>
      {location}
    </div>
  </>
  const triggerProps = {
    className: 'summary'
  }
  if (controls != null) {
    triggerProps.ariaControls = controls
    triggerProps.ariaExpanded = false
  }
  if (onClick != null) {
    triggerProps.onClick = onClick
  }
  const trigger = triggerAs === 'EntryLink'
    ? EntryLink({ type: 'ContentfulEvent', locale: obj.node_locale, slug: obj.eventName, data: obj, children: triggerContents, ...triggerProps })
    : React.createElement(triggerAs, triggerProps, triggerContents)

  return (
    <div className={`${eventClass} event-summary`}>
      {trigger}
      {tickets}
      {eventTime}
    </div>
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