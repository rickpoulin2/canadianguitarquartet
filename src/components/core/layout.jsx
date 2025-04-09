import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './variables.scss'
import './global.scss'

import { useStaticQuery, graphql } from 'gatsby'
import Header from './header'
import Footer from './footer'

const Layout = (props) => {
  const { children } = props
  /*
  const { allContentfulSiteGlobals, siteBuildMetadata } = useStaticQuery(
    graphql`
      query SiteGlobalsQuery {
        allContentfulSiteGlobals(limit: 1, sort: {siteTitle: ASC}) {
          nodes {
            ... Header
            ... Footer
          }
        }
        siteBuildMetadata {
          buildTime
        }
      }`)
      */

  const allContentfulSiteGlobals = null;
  const { siteBuildMetadata } = useStaticQuery(
    graphql`
      query SiteGlobalsQuery {
        siteBuildMetadata {
          buildTime
        }
      }`)
  //const siteData = allContentfulSiteGlobals?.nodes[0];
  const siteData = {
    siteHeading: "Canadian Guitar Quartet",
    langLinkText: "Français",
    copyrightLine: "©2025 Canadian Guitar Quartet"
  }

  return (
    <>
      <Header navItems={siteData?.headerNavigation}
        siteLogo={siteData?.siteLogo}
        siteHeading={siteData?.siteHeading}
        langLinkText={siteData?.langLinkText} />
      <main>{children}</main>
      <Footer copyrightLine={siteData?.copyrightLine}
        content={siteData?.footerContent}
        navItems={siteData?.footerNavigation}
        buildTime={siteBuildMetadata.buildTime} />
      <script src="/js/bootstrap.min.js"></script>
    </>
  )
}

export default Layout