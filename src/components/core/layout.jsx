import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './variables.scss'
import './global.scss'

import { useStaticQuery, graphql } from 'gatsby'
import Header from './header'
import Footer from './footer'

const Layout = (props) => {
  const { children, data } = props
  const { siteBuildMetadata } = useStaticQuery(
    graphql`
      query SiteGlobalsQuery {
        siteBuildMetadata {
          buildTime
        }
      }`)
  const siteData = data?.siteData?.nodes[0];

  return (
    <>
      <Header siteData={siteData} altPage={props.pageContext.altSlug} />
      <main>{children}</main>
      <Footer siteData={siteData}
        buildTime={siteBuildMetadata.buildTime} />
      <script src="/js/bootstrap.min.js"></script>
    </>
  )
}

export default Layout

export const query = graphql`
  fragment Layout on ContentfulSiteGlobals {
    ... Header
    ... Footer
  }
`