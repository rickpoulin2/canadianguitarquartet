import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import AppContext from '/src/components/core/app-context'
import Seo from '/src/components/core/seo'
import PageTitle from '/src/components/core/page-title'
import PageComponent from '/src/components/page/page-component'
import Section from '/src/components/page/section'

class PageTemplate extends React.Component {
  render() {
    const pageData = this.props.data?.pageData
    const siteData = this.props.data?.siteData?.nodes[0]
    const titleBlock = get(pageData, 'hideTitle') ? '' : <PageTitle title={get(pageData, 'title')} bg={get(this, 'props.data.siteData.nodes[0].pageTitleBg')} />

    let introBlock = get(pageData, 'introContent')?.map((x) => (<PageComponent key={x.id} obj={x} siteData={siteData} />))
    if (pageData.introContent?.length > 0) {
      introBlock =
        <header className="content-first">
          {introBlock}
        </header>
    }
    let mainBlock = get(pageData, 'mainContent')?.map((x) => (<PageComponent key={x.id} obj={x} siteData={siteData} />))
    if (pageData.mainContent?.length > 0) {
      mainBlock =
        <main>
          <Section>
            {mainBlock}
          </Section>
        </main>
    }
    //console.log(pageData.id);
    //console.log(pageData.mainContent);

    return (
      <AppContext.Provider value={this.props.pageContext}>
        {titleBlock}
        {introBlock}
        {mainBlock}
      </AppContext.Provider>)
  }
}

export default PageTemplate

export const Head = ({ data }) => <Seo lang={get(data, 'pageData.node_locale')} title={get(data, 'pageData.title')} siteData={get(data, 'siteData.nodes[0]')} />

export const pageQuery = graphql`
  query PageBySlug(
    $slug: String!,
    $locale: String!
  ) {
    pageData: contentfulPage(url: { eq: $slug }, node_locale: { eq: $locale }) {
      contentful_id
      node_locale
      title
      hideTitle
      introContent {
        ...PageComponent
        ... on ContentfulBlockGroup {
            styles
            structureType
            components:content {
            ...PageComponent
            ... on ContentfulBlockGroup {
              styles
              structureType
              components:content {
                ...PageComponent
              }
            }
          }
        }
      }
      mainContent {
        ...PageComponent
        ... on ContentfulBlockGroup {
            styles
            structureType
            components:content {
            ...PageComponent
            ... on ContentfulBlockGroup {
              styles
              structureType
              components:content {
                ...PageComponent
              }
            }
          }
        }
      }
    } 
    siteData: allContentfulSiteGlobals(limit: 1, filter: { node_locale: { eq: $locale }} sort: { siteTitle: ASC }) {
      nodes {
        ... Seo
        ... Layout
        pageTitleBg {
          gatsbyImageData
        }
      }
    }
  }
`
