import React from 'react'
import { graphql } from 'gatsby'
//import Hero from '../components/hero'
//import Video from '../components/video'
import ContentCard from './content-card'
//import BlogEntries from './blog-entry'
//import BlogLatest from './blog-latest'
import ComponentGroup from './component-group'
import ContactForm from './contact-form'
import ImageCard from './image'
import ImageGallery from './gallery'
import EventsUpcoming from './events-upcoming'
import EventsDetails from './events-details'

const PageComponent = ({ obj }) => {
    const type = obj.__typename

    if (type === 'ContentfulBlockGroup')
        return <ComponentGroup obj={obj} />
    if (type === 'ContentfulBlockContentCard')
        return <ContentCard obj={obj} />
    if (type === 'ContentfulBlockImage')
        return <ImageCard obj={obj} />
    if (type === 'ContentfulBlockImageGallery')
        return <ImageGallery obj={obj} />
    if (type === 'ContentfulBlockContactForm')
        return <ContactForm obj={obj} />
    if (type === 'ContentfulBlockEventsUpcoming')
        return <EventsUpcoming obj={obj} />
    if (type === 'ContentfulBlockEventsDetails')
        return <EventsDetails obj={obj} />

    console.log("unknown block: " + type)
    return <div className="col-12 card text-bg-danger">unknown block: {type}</div>
}

export default PageComponent

export const query = graphql`
    fragment PageComponent on Node {
        __typename
        id
        ...ContentfulBlockContentCard
        ...ContentfulBlockImage
        ...ContentfulBlockImageGallery
        ...ContentfulBlockContactForm
        ...ContentfulBlockEventsUpcoming
        ...ContentfulBlockEventsDetails
    }
`