import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Col } from 'react-bootstrap'
import Scrollspy from 'react-scrollspy'
import AppContext from '../core/app-context'
import BlogEntry from './blog-entry'
import EntryLink from './entry-link'

import './blog-entries.scss'

const BlogEntries = ({ obj }) => {
    const context = useContext(AppContext)
    if (context == null || !(context.lastPage > 0)) {
        console.error("blog entries component used on non-blog page")
        return <></>
    }
    console.log("entries", context)

    const locale = obj.node_locale
    //const data = obj.node_locale === "fr" ? blogData.dataFR : blogData.dataEN
    const data = context.entries
    const showNav = data.length > 3 || context.lastPage > 1


    let entries = data.map((i) =>
        <BlogEntry key={i.id} obj={i} showAbbreviated={false} backToTop={true} />
    )
    let nav = <></>
    let pageNav = <></>
    if (showNav) {
        const anchors = []
        const navEntries = data.map((i) => {
            anchors.push(`entry${i.tag}`)
            return <div key={i.id} className="list-group-item list-group-item-action"><BlogLink obj={i} /></div>
        })
        if (context.lastPage > 1) {
            console.log(context)
            const pageEntries = []
            pageEntries.push(
                <li key="page-prev" className={`page-item ${context.thisPage === 1 ? "disabled" : ""}`} >
                    <EntryLink type="ContentfulPage" slug={context.linkSlugs[locale].blogPage} data={{ page: context.thisPage - 1 }} className="page-link"><span aria-label="Next" aria-hidden="true">&laquo;</span></EntryLink>
                </li>
            )
            for (let i = 1; i <= context.lastPage; i++) {
                pageEntries.push(
                    <li key={"page-" + i} className={`page-item ${i === context.thisPage ? "active" : ""}`}>
                        <EntryLink type="ContentfulPage" slug={context.linkSlugs[locale].blogPage} data={{ page: i }} className="page-link">{i}</EntryLink>
                    </li>
                )
            }
            pageEntries.push(
                <li key="page-next" className={`page-item ${context.thisPage === context.lastPage ? "disabled" : ""}`}>
                    <EntryLink type="ContentfulPage" slug={context.linkSlugs[locale].blogPage} data={{ page: context.thisPage + 1 }} className="page-link"><span aria-label="Next" aria-hidden="true">&raquo;</span></EntryLink>
                </li>
            )
            pageNav = (
                <nav aria-label="Blog navigation" className="blog-pagination">
                    <ul className="pagination">
                        {pageEntries}
                    </ul>
                </nav>
            )
        }
        nav =
            <Col lg="4" xxl="3" className="blog-sidebar">
                <div className="blog-nav">
                    <h2>On this page</h2>
                    <Scrollspy componentTag="nav" items={anchors} className="blog-index list-group" currentClassName="active">
                        {navEntries}
                    </Scrollspy>
                    {pageNav}
                </div>
            </Col>
    }

    if (!(data.length > 0)) {
        const nothingMessage = obj.node_locale === "fr" ? <p>Aucun article publié, revenez plus tard!</p> : <p>Nothing here yet! Check back soon.</p>
        entries =
            <Col>
                {nothingMessage}
            </Col>
    }
    return (
        <>
            {nav}
            <Col lg="" className="blog-entries">
                {entries}
                {pageNav}
            </Col>
        </>
    )
}

export default BlogEntries


const BlogLink = ({ obj }) => (
    <a href={"#entry" + obj.tag}>
        <span>{obj.title}</span>
        <span className="badge text-bg-secondary">{obj.publishedDate}</span>
    </a>
)

export const query = graphql`
  fragment ContentfulBlockBlogEntries on ContentfulBlockBlogEntries {
    __typename
    node_locale
  }
`