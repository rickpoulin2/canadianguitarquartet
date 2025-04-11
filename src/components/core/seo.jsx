import * as React from 'react'
import { graphql } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'

const Seo = ({ children, lang = 'en', title, description = '', siteData }) => {
  let siteTitle = siteData?.siteTitle;
  if (title) {
    siteTitle = `${title} | ` + siteTitle;
  }

  let image = getSrc(siteData?.siteIcon);
  if (image == null) {
    image = siteData?.siteIcon?.file.url;
  }

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

export const query = graphql`
  fragment Seo on ContentfulSiteGlobals {
    siteTitle
    siteIcon {
      gatsbyImageData(layout:FIXED)
      file {
        url
      }
    }
  }
`