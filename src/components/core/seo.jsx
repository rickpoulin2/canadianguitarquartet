import * as React from 'react'
import get from 'lodash/get'
import { useStaticQuery, graphql } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'

const Seo = ({ children, description = '', lang = 'en', meta = [], title }) => {
  /*const { allContentfulSiteGlobals } = useStaticQuery(
    graphql`
  query metaQuery {
    allContentfulSiteGlobals(limit: 1, sort: {siteTitle: ASC}) {
      nodes {
        __typename
        siteTitle
        siteIcon {
          gatsbyImageData(layout:FIXED)
        }
      }
    }
  }`
  )*/
  const allContentfulSiteGlobals = {};
  const siteData = get(allContentfulSiteGlobals, 'nodes[0]');
  let siteTitle = siteData?.siteTitle;
  if (title) {
    siteTitle = `${title} | ` + siteTitle;
  }
  const image = getSrc(siteData?.siteIcon);

  return (
    <>
      <html lang={lang} />
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta name="og:title" content={siteTitle} />
      <meta name="og:description" content={description} />
      <meta name="og:type" content="website" />
      <meta name="og:image" content={image} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />

      <link rel="icon" href={image} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href="/css/fontawesome.min.css" />
      <link rel="stylesheet" href="/css/fa-solid.min.css" />
      <link rel="stylesheet" href="/css/fa-brands.min.css" />
      {children}
    </>
  )
}

export default Seo

