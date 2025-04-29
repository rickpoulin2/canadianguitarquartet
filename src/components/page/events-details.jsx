import React, { useEffect, useState, useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Collapse, Accordion, AccordionContext, useAccordionButton } from 'react-bootstrap'

import { getEventAnchor } from './entry-link'
import EventCard from './event-card'
import EventBody from './event-body'

import './events-details.scss'


const EventsDetails = ({ obj }) => {
  const [openPanels, setOpenPanels] = useState({})
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
            contentful_id
            ...ContentfulEventSummary
            ...ContentfulEventBody
          }
        }
      }`)


  const setOpenAccordion = (e) => {
    const eventKey = e.currentTarget.getAttribute('data-eventkey')
    console.log(eventKey)
    const newPanels = {}
    newPanels[eventKey] = !openPanels[eventKey]
    setOpenPanels(newPanels)
  }
  const toggleAccordion = (e) => {
    const eventKey = e.currentTarget.getAttribute('data-eventkey')
    console.log(eventKey)
    const newPanels = { ...openPanels }
    newPanels[eventKey] = !newPanels[eventKey]
    setOpenPanels(newPanels)
  }

  let summaryIndex = -1
  const eventSummaries = eventData.data?.nodes?.map((e) => {
    if (e.node_locale !== obj.node_locale) {
      return ""
    }
    summaryIndex++
    const anchor = getEventAnchor(e)
    return <li key={e.id}><EventCard triggerAs='button' obj={e} controls={'#' + anchor} eventKey={e.contentful_id} onClick={setOpenAccordion} /></li>
  })

  const eventDetails = eventData.data?.nodes?.map((e) => {
    if (e.node_locale !== obj.node_locale) {
      return ""
    }
    const anchor = getEventAnchor(e)
    const isActive = openPanels[e.contentful_id] === true
    return (
      <div key={"deets" + e.id} className={`event ${isActive ? 'active' : ''}`} id={anchor}>
        <h2 className={`accordion-header ${isActive ? 'active' : ''}`}>
          <button onClick={toggleAccordion} data-eventkey={e.contentful_id}>
            <EventCard key={e.id} obj={e} triggerAs='div' showTime={true} />
          </button>
        </h2>
        <Collapse in={isActive} id={`body-${anchor}`}>
          <div className="event-body">
            <EventBody obj={e} />
          </div>
        </Collapse>
      </div>
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
        <div className="events-list" id="events-list">
          {eventDetails}
        </div>
      </div>
    </>
  )
}

export default EventsDetails

export const query = graphql`
  fragment ContentfulBlockEventsDetails on ContentfulBlockEventsDetails {
    node_locale
    styles
  }
`