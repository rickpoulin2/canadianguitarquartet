import React, { useEffect, useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Accordion, AccordionContext, useAccordionButton } from 'react-bootstrap'

import { getEventAnchor } from './entry-link'
import EventCard from './event-card'
import EventBody from './event-body'

import './events-details.scss'

const EventsDetails = ({ obj }) => {
  const eventData = useStaticQuery(
    graphql`
      query AllEvents {
        data: allContentfulEvent(
          sort: { eventDateTime: ASC },
          filter: {
            eventName: {ne:null},
            eventDateTime: {ne:null}
        }) {
          nodes {
            id
            node_locale
            ...ContentfulEventSummary
            ...ContentfulEventBody
          }
        }
      }`)

  const eventSummaries = eventData.data?.nodes?.map((e) => {
    if (e.node_locale !== obj.node_locale) {
      return ""
    }
    return <li key={e.id}><EventCard triggerAs='button' obj={e} controls={"meow"} /></li>
  })

  let eventIndex = -1
  const eventDetails = eventData.data?.nodes?.map((e) => {
    if (e.node_locale !== obj.node_locale) {
      return ""
    }
    eventIndex++
    const anchor = getEventAnchor(e)
    return (
      <Accordion.Item key={"deet" + e.id} eventKey={eventIndex} className="event" id={anchor}>
        <ContextAwareAccordionHeader eventKey={eventIndex} eventObj={e} />
        <Accordion.Body className="event-body" id={`body-${anchor}`}>
          <EventBody obj={e} />
        </Accordion.Body>
      </Accordion.Item>
    )
  })

  const clz = obj.styles ? obj.styles : ""
  return (
    <>
      <div className={"events-index col-12 col-lg-4 " + clz}>
        <ul className="events-list">
          {eventSummaries}
        </ul>
      </div>
      <div className={"events-details col-12 col-lg-8 " + clz}>
        <Accordion className="events-list" id="events-list" alwaysOpen={true}>
          {eventDetails}
        </Accordion>
      </div>
    </>
  )
}

const ContextAwareAccordionHeader = ({ eventKey, callback, eventObj }) => {
  const { activeEventKey } = useContext(AccordionContext)
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  )
  let isActive = false
  if (activeEventKey != null && typeof (activeEventKey) === 'object') {
    isActive = activeEventKey.includes(eventKey)
  } else {
    isActive = activeEventKey == eventKey
  }
  return (
    <h2 className={`accordion-header ${isActive ? 'active' : ''}`}>
      <button onClick={decoratedOnClick}>
        <EventCard key={eventObj.id} obj={eventObj} triggerAs='div' showTime={true} />
      </button>
    </h2>
  )
}

export default EventsDetails

export const query = graphql`
  fragment ContentfulBlockEventsDetails on ContentfulBlockEventsDetails {
    node_locale
    styles
  }
`