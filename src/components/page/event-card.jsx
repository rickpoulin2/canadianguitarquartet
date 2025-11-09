import React from 'react'
import { graphql } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-gtag'
import EntryLink from './entry-link'

import './event-card.scss'

const dateNow = new Date()

const EventCard = ({ obj, hide, triggerAs = 'div', sidecar, onClick, controls, eventKey }) => {
  if (obj == null)
    return <div className={`event-card event-blank ${hide ? 'event-hidden' : ''}`}></div>
  if (obj.eventName == null || obj.eventDateTime == null)
    return

  const eventDateTime = new Date(obj.eventDateTime)
  const dtLocale = obj.node_locale === 'fr' ? 'fr-CA' : 'en-CA'
  const month = new Intl.DateTimeFormat(dtLocale, { month: 'short' }).format(eventDateTime)
  const day = new Intl.DateTimeFormat(dtLocale, { day: 'numeric' }).format(eventDateTime)

  let eventClass = "event-card"
  if (eventDateTime.getTime() < dateNow.getTime()) {
    eventClass += " event-old"
  }
  if (hide) {
    eventClass += " event-hidden"
  }
  const location = obj.eventLocation ? <p className="location">{obj.eventLocation}</p> : ""

  let side = ""
  if (sidecar === 'tickets' && obj.ticketsLink != null) {
    const ticketsLabel = obj.node_locale === 'fr' ? 'Billets' : 'Tickets'
    side =
      <OutboundLink
        target="_blank"
        rel="noreferrer"
        className="link"
        href={obj.ticketsLink}><i className="fas fa-ticket"></i> {ticketsLabel}</OutboundLink>
  }
  if (sidecar === 'showtime') {
    side =
      <div className="show-time">
        <span>{obj.node_locale === 'fr' ? obj.eventTimeFr : obj.eventTimeEn}</span>
        <span>{obj.node_locale === 'fr' ? 'heure locale' : 'local time'}</span>
      </div>
  }

  const triggerContents = <>
    <time dateTime={obj.eventDateTime}>
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
    triggerProps['aria-controls'] = controls
    triggerProps['aria-expanded'] = false
  }
  if (eventKey != null) {
    triggerProps['data-eventkey'] = eventKey
  }
  if (onClick != null) {
    triggerProps.onClick = onClick
  }
  const trigger = triggerAs === 'EntryLink' || triggerAs === 'link'
    ? EntryLink({ type: 'ContentfulEvent', locale: obj.node_locale, slug: obj.eventName, data: obj, children: triggerContents, ...triggerProps })
    : React.createElement(triggerAs, triggerProps, triggerContents)

  return (
    <div className={eventClass}>
      {trigger}
      {side}
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
    eventTimeEn: eventDateTime(formatString: "h:mmA")
    eventTimeFr: eventDateTime(formatString: "H:mm")
    eventLocation
    ticketsLink
  }
`