import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Card } from 'react-bootstrap'
import MyLink from './mylink'

import './blog-latest.scss'
import BlogEntry from './blog-entry'

const BlogLatest = ({ obj }) => {
  const blogData = useStaticQuery(
    graphql`
      query LatestBlogEntries {
        dataEN: allContentfulBlogEntry(
          limit: 1,
          sort: { publishedDate: DESC },
          filter: {
            node_locale: {eq:"en"}
            title: {ne:null},
            publishedDate: {ne:null},
            content: { raw: {ne:null} }
        }) {
          nodes {
            ...ContentfulBlogEntry
          }
        }
        dataFR: allContentfulBlogEntry(
          limit: 1,
          sort: { publishedDate: DESC },
          filter: {
            node_locale: {eq:"fr"}
            title: {ne:null},
            publishedDate: {ne:null},
            content: { raw: {ne:null} }
        }) {
          nodes {
            ...ContentfulBlogEntry
          }
        }
      }`)

  const blogTitle = obj.heading
  let buttons = obj.buttons?.map((btn, i, arr) => {
    const cl = 'btn ' + (i === arr.length - 1 ? 'btn-outline-primary' : 'btn-outline-secondary')
    return <MyLink key={btn.id} obj={btn} addClasses={cl} />
  })

  const data = obj.node_locale === "fr" ? blogData.dataFR : blogData.dataEN
  let entries = data.nodes?.map((i) =>
    <BlogEntry key={i.id} obj={i} />
  )
  if (!(data.nodes?.length > 0)) {
    entries = obj.node_locale === "fr" ? <li>Aucun article publié, revenez plus tard!</li> : <li>Nothing here yet! Check back soon.</li>
    buttons = ""
  }
  return (
    <div className={"cmp block-latestnews " + obj.styles}>
      <Card>
        <Card.Body>
          <h2 className="bar"><span>{blogTitle}</span></h2>
          {entries}
          <div className="cta">
            {buttons}
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default BlogLatest

export const query = graphql`
  fragment ContentfulBlockBlogLatest on ContentfulBlockBlogLatest {
    node_locale
    heading
    styles
    buttons {
      ...MyLink
    }
  }
`