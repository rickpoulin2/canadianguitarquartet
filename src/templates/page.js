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
    const titleBlock = get(pageData, 'hideTitle') ? '' : <PageTitle title={get(pageData, 'title')} bg={get(this, 'props.data.siteData.nodes[0].pageTitleBg')} />

    let mainBlock = get(pageData, 'mainContent')?.map((x) => (<PageComponent key={x.id} obj={x} />));
    if (pageData.mainContent?.length > 0) {
      mainBlock =
        <Section>
          {mainBlock}
        </Section>
    }
    //console.log(pageData.id);
    //console.log(pageData.mainContent);

    return (
      <AppContext.Provider value={this.props.pageContext}>
        {titleBlock}
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
      mainContent {
        ...PageComponent
        ... on ContentfulBlockGroup {
            id
            styles
            structureType
            components:content {
            ...PageComponent
            ... on ContentfulBlockGroup {
              id
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
