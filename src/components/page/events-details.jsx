import React, { useEffect, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Collapse } from 'react-bootstrap'

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
    newPanels[eventKey] = true
    setOpenPanels(newPanels)
    document.querySelectorAll('.events-index .event-card button').forEach((e) => {
      if (e.getAttribute('data-eventkey') === eventKey) {
        e.parentElement.classList.add('active')
      } else {
        e.parentElement.classList.remove('active')
      }
    })
  }
  const toggleAccordion = (e) => {
    if (window.innerWidth >= 992) {
      return
    }
    const eventKey = e.currentTarget.getAttribute('data-eventkey')
    console.log(eventKey)
    const newPanels = { ...openPanels }
    newPanels[eventKey] = !newPanels[eventKey]
    setOpenPanels(newPanels)
  }
  useEffect(() => {
    // TODO: update actives

    let eventToOpen = null
    // select next available if on desktop
    if (window.innerWidth >= 992) {
      let firstActiveCard = document.querySelector(".events-details .event-card:not(.event-old)")
      if (firstActiveCard != null) {
        eventToOpen = firstActiveCard.parentElement.getAttribute('data-eventkey')
      }
    }

    if (window.location.hash != null && window.location.hash.startsWith("#")) {
      // open selected event
      document.querySelectorAll(".events-details .event").forEach(e => {
        if (e.getAttribute("id") === window.location.hash.substring(1)) {
          eventToOpen = e.querySelector("button").getAttribute('data-eventkey')
        }
      })
    }

    if (eventToOpen != null) {
      let x = {}
      x[eventToOpen] = true
      setOpenPanels(x)
    }
  }, [])

  const eventSummaries = eventData.data?.nodes?.map((e) => {
    if (e.node_locale !== obj.node_locale) {
      return ""
    }
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
            <EventCard key={e.id} obj={e} triggerAs='div' sidecar="showtime" />
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