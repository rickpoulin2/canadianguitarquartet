import React, { useContext } from 'react'
import { Link } from 'gatsby'
import AppContext from '../core/app-context'

const EntryLink = ({ title, type, locale, slug, data, className, activeClass, onClick, children }) => {
    let context = useContext(AppContext)
    if (locale == null) {
        locale = context.locale
    }
    let href = null

    if (type === "ContentfulPage") {
        href = `/${locale}/${slug}/`
        if (data != null && data.page > 1) {
            href += data.page + "/"
        }
    }
    if (type === "ContentfulBlogEntry")
        href = `/${locale}/${context.linkSlugs[locale].blogPage}/#entry${slug}`
    if (type === "ContentfulEvent")
        href = `/${locale}/${context.linkSlugs[locale].eventsPage}/#${getEventAnchor(data)}`

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
    return event.eventName.toLowerCase().normalize("NFD").replace(/[\s']/g, "-").replace(/[^\-a-z0-9]/g, "") + '--' + event.eventDate
}

export { getEventAnchor }