import React, { useContext } from 'react'
import { Link } from 'gatsby'
import AppContext from '../core/app-context'

const EntryLink = ({ title, type, locale, slug, data, className, activeClass, onClick, children }) => {
    const linkSlugs = useContext(AppContext).linkSlugs

    let href = null

    if (type === "ContentfulPage")
        href = `/${locale}/${slug}/`
    if (type === "ContentfulBlogEntry")
        href = `/${locale}/${linkSlugs.blogPage}/#entry${slug}`
    if (type === "ContentfulEvent")
        href = `/${locale}/${linkSlugs.eventsPage}/#${getEventAnchor(data)}`

    if (href == null) {
        console.log(`unknown link type ${type} for slug ${slug}`)
        return <>{children}</>
    }

    //console.log("meow link", type, slug, data, href)
    return <Link to={href} className={className} activeClassName={activeClass} title={title} onClick={onClick}>{children}</Link>
}

export default EntryLink

const getEventAnchor = (event) => {
    if (event == null) {
        return ""
    }
    return event.eventName.toLowerCase().replace(/\s/g, "-") + '--' + event.eventDate
}

export { getEventAnchor }