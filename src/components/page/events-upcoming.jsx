import React, { useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import EventCard from './event-card'
import { Card, CardBody } from 'react-bootstrap'

import './events-upcoming.scss'

const today = new Date()
today.setHours(0)
today.setMinutes(0)

const EventsUpcoming = ({ obj }) => {
  const eventData = useStaticQuery(
    graphql`
      query UpcomingEvents {
        data: allContentfulEvent(
          sort: { eventDateTime: ASC },
          filter: {
            eventName: {ne:null},
            eventDateTime: {ne:null}
        }) {
          nodes {
            id
            node_locale
            ts: eventDateTime(formatString: "YYYY-MM-DDTHH:mm")
            ...ContentfulEventSummary
          }
        }
      }`)

  let eventCount = 0
  const events = eventData.data?.nodes?.map((e) => {
    console.log(today, e.eventDateTime, new Date(e.eventDateTime))
    if (e.node_locale !== obj.node_locale || today.getTime() > new Date(e.eventDateTime).getTime()) {
      return ""
    }
    eventCount++
    return <EventCard key={e.id} obj={e} hide={eventCount > obj.maxItems} />
  })

  const clz = "events-upcoming col " + (obj.styles ? obj.styles : "")
  const heading = obj.heading ? <h2 class="bar"><span>{obj.heading}</span></h2> : ""

  useEffect(() => {
    let thisMorning = new Date()
    thisMorning.setHours(0)
    thisMorning.setMinutes(0)
    thisMorning = thisMorning.getTime()
    document.querySelectorAll('.events-list').forEach((list) => {
      console.log(list)
      let listCount = 0
      let listMax = obj.maxItems
      list.querySelectorAll('.event').forEach((event) => {
        if (!event.classList.contains('event-blank')) {
          let eTime = new Date(event.querySelector('time').getAttribute('datetime')).getTime()
          if (thisMorning > eTime) {
            event.classList.add('event-hidden')
            return
          }
        }
        if (listCount < listMax) {
          event.classList.remove('event-hidden')
        } else {
          event.classList.add('event-hidden')
        }
        listCount++
      })
    })
  }, [obj.maxItems])

  console.log(eventCount, obj.maxItems)
  return (
    <div className={clz}>
      <Card className="no-border">
        <CardBody>
          {heading}
          <ul className="events-list">
            {events}
            <EventCard obj={null} hide={eventCount >= obj.maxItems} />
          </ul>
        </CardBody>
      </Card>
    </div>
  )
}

export default EventsUpcoming

export const query = graphql`
  fragment ContentfulBlockEventsUpcoming on ContentfulBlockEventsUpcoming {
    __typename
    node_locale
    heading
    styles
    maxItems
    buttons {
      ...MyLink
    }
  }
`