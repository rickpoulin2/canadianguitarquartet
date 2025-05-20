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
  const siteData = data?.siteData?.nodes[0]

  let id = ""
  if (props.pageContext?.slug != null) {
    id = props.pageContext?.slug.toLowerCase().replace(/\s/g, "-")
  }

  return (
    <>
      <div id={id} className="page-wrap">
        <Header siteData={siteData} altPage={props.pageContext.altSlug} />
        {children}
        <Footer siteData={siteData}
          buildTime={siteBuildMetadata.buildTime} />
      </div>
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