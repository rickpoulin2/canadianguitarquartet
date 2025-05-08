const gatsbyQuery = `
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
{
  pages: allContentfulPage(
    filter: {
      title: {ne:null},
      url: {ne:null}
  }) {
    nodes {
      contentful_id
      node_locale
      url
    }
  }
  blogEntriesEN: allContentfulBlogEntry(
    sort: {publishedDate: DESC},
    filter: {
      node_locale: {eq:"en"},
      title: {ne:null},
      publishedDate: {ne:null},
      content: { raw:{ne:null} }
  }) {
    nodes {
      node_locale
      contentful_id
      ...ContentfulBlogEntry
    }
  }
  blogEntriesFR: allContentfulBlogEntry(
    sort: {publishedDate: DESC},
    filter: {
      node_locale: {eq:"fr"},
      title: {ne:null},
      publishedDate: {ne:null},
      content: { raw:{ne:null} }
  }) {
    nodes {
      node_locale
      contentful_id
      ...ContentfulBlogEntry
    }
  }
  linksEN: contentfulSiteGlobals(
    node_locale: {eq:"en"}
  ) {
    blogPage { url }
    eventsPage { url }
  }
  linksFR: contentfulSiteGlobals(
    node_locale: {eq:"fr"}
  ) {
    blogPage { url }
    eventsPage { url }
  }
}
`

module.exports = gatsbyQuery