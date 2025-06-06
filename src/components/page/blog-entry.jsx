import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { BLOCKS } from '@contentful/rich-text-types'
import RichText from './richtext'

import './blog-entry.scss'

const BlogEntry = ({ obj, showAbbreviated = true, backToTop = false }) => {
  const htmlid = `entry${obj.tag}`
  const heading = showAbbreviated ? <h3>{obj.title}</h3> : <h2 className="bar"><span>{obj.title}</span></h2>
  const toplink = backToTop ? <div className="top-link"><a href="#top-of-page">Back to top <i className="fas fa-caret-up"></i></a></div> : ""
  const image = (!showAbbreviated && obj.image?.gatsbyImageData) ? <GatsbyImage className="entry-image" image={obj.image.gatsbyImageData} alt={obj.image.description} /> : ""

  let sawParagraph = false
  const abbreviatedOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        if (!sawParagraph) {
          sawParagraph = true
          return <p>{children}</p>
        }
        return ""
      },
    }
  }
  const longOptions = {
  }


  return (
    <div className="blog-entry" id={htmlid}>
      {heading}
      <p className="subtitle"><span className="badge text-bg-secondary">{obj.publishedDate}</span> &ndash; {obj.author}</p>
      {image}
      <RichText data={obj.content} addOptions={showAbbreviated ? abbreviatedOptions : longOptions} />
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
    image {
      gatsbyImageData(width:250)
      description
    }
    publishedDate(formatString: "MMM DD, YYYY")
    tag: publishedDate(formatString: "YYYYMMDD")
    content {
      ...RichText
    }
  }
`