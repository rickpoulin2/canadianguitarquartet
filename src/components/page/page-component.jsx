import React from 'react'
import { graphql } from 'gatsby'
import ContentCard from './content-card'
import ComponentGroup from './component-group'
import ContactForm from './contact-form'
import ImageCard from './image'
import ImageGallery from './gallery'
import EventsUpcoming from './events-upcoming'
import EventsDetails from './events-details'
import BlogEntries from './blog-entries'
import BlogLatest from './blog-latest'
import Video from './video'
import Hero from './hero'

const PageComponent = ({ obj, siteData }) => {
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
    if (type === 'ContentfulBlockBlogEntries')
        return <BlogEntries obj={obj} />
    if (type === 'ContentfulBlockBlogLatest')
        return <BlogLatest obj={obj} />
    if (type === 'ContentfulBlockVideo')
        return <Video obj={obj} />
    if (type === 'ContentfulBlockHero')
        return <Hero obj={obj} siteData={siteData} />

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
        ...ContentfulBlockBlogLatest
        ...ContentfulBlockBlogEntries
        ...ContentfulBlockVideo
        ...ContentfulBlockHero
    }
`