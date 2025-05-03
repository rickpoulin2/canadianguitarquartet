import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Accordion, Col } from 'react-bootstrap'
import Scrollspy from 'react-scrollspy'
import BlogEntry from './blog-entry'
import EntryLink from './entry-link'

import './blog-entries.scss'

const BlogEntries = ({ obj }) => {
    const blogData = useStaticQuery(
        graphql`
      query AllBlogEntries {
        dataEN: allContentfulBlogEntry(
          sort: {publishedDate: DESC},
          filter: {
            node_locale: {eq:"en"},
            title: {ne:null},
            publishedDate: {ne:null},
            content: { raw: {ne:null} }
        }) {
          nodes {
            ...ContentfulBlogEntry
          }
        }
        dataFR: allContentfulBlogEntry(
          sort: {publishedDate: DESC},
          filter: {
            node_locale: {eq:"fr"},
            title: {ne:null},
            publishedDate: {ne:null},
            content: { raw: {ne:null} }
        }) {
          nodes {
            ...ContentfulBlogEntry
          }
        }
      }`)

    const data = obj.node_locale === "fr" ? blogData.dataFR : blogData.dataEN
    //const showNav = data.nodes?.length > 3
    const showNav = true

    let entries = data.nodes?.map((i) =>
        <BlogEntry key={i.id} obj={i} showAbbreviated={false} backToTop={true} />
    )
    let nav = <></>
    if (showNav) {
        const anchors = []
        let navEntries = data.nodes?.map((i) => {
            anchors.push(`entry${i.tag}`)
            return <BlogLink key={i.id} obj={i} />
        })
        nav =
            <Col md="3" className="blog-nav">
                <h2>On this page</h2>

                <Scrollspy as="nav" items={anchors} className="blog-index list-group" currentClassName="active">
                    {navEntries}
                </Scrollspy>

                <nav aria-label="Blog navigation" class="blog-pagination">
                    <ul class="pagination">
                        <li class="page-item disabled">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </Col>
    }

    if (!(data.nodes?.length > 0)) {
        const nothingMessage = obj.node_locale === "fr" ? <p>Aucun article publié, revenez plus tard!</p> : <p>Nothing here yet! Check back soon.</p>
        entries =
            <Col>
                {nothingMessage}
            </Col>
    }
    return (
        <>
            {nav}
            <Col md="9" className="blog-entries">
                {entries}
            </Col>
        </>
    )
}

export default BlogEntries


const BlogLink = ({ obj }) => (
    <EntryLink type="ContentfulBlogEntry" slug={obj.tag} locale={obj.node_locale} className="list-group-item list-group-item-action">
        <span>{obj.title}</span>
        <span className="badge text-bg-secondary">{obj.publishedDate}</span>
    </EntryLink>
)

export const query = graphql`
  fragment ContentfulBlockBlogEntries on ContentfulBlockBlogEntries {
    __typename
    node_locale
  }
`