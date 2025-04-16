import React from 'react'
import { graphql } from 'gatsby'
//import Hero from '../components/hero'
//import Text from '../components/text'
//import Video from '../components/video'
//import ButtonBanner from '../components/button-banner'
import ContentCard from './content-card'
//import BlogEntries from './blog-entry'
//import BlogLatest from './blog-latest'
import ComponentGroup from './component-group'
import ContactForm from './contact-form'
import ImageCard from './image';
import EventsUpcoming from './events-upcoming'
//import CommissionCard from './commission-card'

const PageComponent = ({ obj }) => {
    const type = obj.__typename;

    if (type === 'ContentfulBlockGroup')
        return <ComponentGroup obj={obj} />
    if (type === 'ContentfulBlockContentCard')
        return <ContentCard obj={obj} />
    if (type === 'ContentfulBlockImage')
        return <ImageCard obj={obj} />
    if (type === 'ContentfulBlockContactForm')
        return <ContactForm obj={obj} />
    if (type === 'ContentfulBlockEventsUpcoming')
        return <EventsUpcoming obj={obj} />

    /*
    if (type === 'ContentfulComponentHero')
        return <Hero obj={obj} />
    if (type === 'ContentfulComponentText')
        return <Text obj={obj} />
    if (type === 'ContentfulComponentVideo')
        return <Video obj={obj} />
    if (type === 'ContentfulComponentButtonBanner')
        return <ButtonBanner obj={obj} />
    if (type === 'ContentfulComponentAlbumList')
        return <AlbumList obj={obj} />
    if (type === 'ContentfulComponentBlogEntries')
        return <BlogEntries obj={obj} />
    if (type === 'ContentfulComponentBlogLatest')
        return <BlogLatest obj={obj} />
    if (type === 'ContentfulComponentNewsletterLatest')
        return <NewsletterLatest obj={obj} />
    if (type === 'ContentfulComponentNewsletterList')
        return <NewsletterList obj={obj} />
    if (type === 'ContentfulComponentNewsletterSignup')
        return <NewsletterSignup obj={obj} />
    if (type === 'ContentfulComponentCommissionCard')
        return <CommissionCard obj={obj} />
    */

    console.log("unknown block: " + type);
    return <div className="col-12 card text-bg-danger">unknown block: {type}</div>
}

export default PageComponent

export const query = graphql`
    fragment PageComponent on Node {
        __typename
        id
        ...ContentfulBlockContentCard
        ...ContentfulBlockImage
        ...ContentfulBlockContactForm
        ...ContentfulBlockEventsUpcoming
    }
`