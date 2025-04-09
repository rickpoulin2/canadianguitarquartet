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
  const siteData = allContentfulSiteGlobals?.nodes[0];

  return (
    <>
      <Header navItems={siteData?.headerNavigation}
        siteLogo={siteData?.siteLogo}
        siteHeadingStart={siteData?.siteHeadingStart}
        siteHeadingEnd={siteData?.siteHeadingEnd}
        buttonLink={siteData?.headerButtonLink} />
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