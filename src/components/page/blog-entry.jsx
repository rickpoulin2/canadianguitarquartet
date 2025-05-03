import React from 'react'
import { graphql } from 'gatsby'
import RichText from './richtext'

const BlogEntry = ({ obj, showAbbreviated = true, backToTop = false }) => {
  const htmlid = `entry${obj.tag}`
  const heading = showAbbreviated ? <h3>{obj.title}</h3> : <h2 className="bar"><span>{obj.title}</span></h2>
  const toplink = backToTop ? <div class="top-link"><a href="#top-of-page">Back to top <i class="fas fa-caret-up"></i></a></div> : ""

  return (
    <div className="blog-entry" id={htmlid}>
      {heading}
      <p class="subtitle"><span class="badge text-bg-secondary">{obj.publishedDate}</span> &ndash; {obj.author}</p>
      <RichText data={obj.content} />
      {toplink}
    </div>)
}

export default BlogEntry

export const query = graphql`
  fragment ContentfulBlogEntry on ContentfulBlogEntry {
    __typename
    node_locale
    id
    title
    author
    publishedDate(formatString: "MMM DD, YYYY")
    tag: publishedDate(formatString: "YYYYMMDD")
    content {
      ...RichText
    }
  }
`