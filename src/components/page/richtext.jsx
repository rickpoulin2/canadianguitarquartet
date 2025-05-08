import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { INLINES, MARKS } from '@contentful/rich-text-types'
import { OutboundLink } from 'gatsby-plugin-google-gtag'
import AppContext from '../core/app-context'
import EntryLink from './entry-link'

const RichText = ({ data, addOptions }) => {
  const locale = useContext(AppContext).locale
  if (data == null)
    return

  const rtOptions = {
    renderMark: {
      [MARKS.ITALIC]: (text) => {
        return <em>{text}</em>
      },
      [MARKS.BOLD]: (text) => {
        return <strong>{text}</strong>
      },
      ...addOptions?.renderMark
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => {
        return <OutboundLink href={node.data.uri} target="_blank" rel="noreferrer">{children}</OutboundLink>
      },
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        const target = node.data.target
        return <EntryLink locale={locale} type={target.__typename} slug={target.slug ? target.slug : target.tag}>{children}</EntryLink>
      },
      ...addOptions?.renderNode
    }
  }
  return <>{renderRichText(data, rtOptions)}</>
}

export default RichText

export const query = graphql`
  fragment RichText on RichText {
    raw
    references {
      __typename
      ... on ContentfulPage {
        contentful_id
        slug: url
      }
      ... on ContentfulBlogEntry {
        contentful_id
        tag: publishedDate(formatString: "YYYYMMDD")
      }
      ... on ContentfulAsset {
        contentful_id
        description
        gatsbyImageData(width:250)
      }
    }
  }
`