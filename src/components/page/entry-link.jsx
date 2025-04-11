import React, { useContext } from 'react'
import { Link } from 'gatsby'
import AppContext from '../core/app-context';

const EntryLink = ({ title, type, locale, slug, className, activeClass, onClick, children }) => {
    const linkSlugs = useContext(AppContext).linkSlugs

    let href = null
    if (type === "ContentfulPage")
        href = `/${locale}/${slug}/`
    if (type === "ContentfulBlogEntry")
        href = `/${locale}/${linkSlugs.blogPage}/#entry${slug}`

    if (href == null) {
        console.log(`unknown link type ${type} for slug ${slug}`)
        return <>{children}</>
    }

    return <Link to={href} className={className} activeClassName={activeClass} title={title} onClick={onClick}>{children}</Link>
}

export default EntryLink