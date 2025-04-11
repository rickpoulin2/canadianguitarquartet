import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import AppContext from '/src/components/core/app-context'
import Seo from '/src/components/core/seo'
import Layout from '/src/components/core/layout'
import PageTitle from '/src/components/core/page-title'
//import PageComponent from '../components/page-component'
import Section from '/src/components/page/section'

import ContentCard from '/src/components/page/content-card'

class PageTemplate extends React.Component {
  render() {
    const pageData = this.props.data?.pageData
    const titleBlock = get(pageData, 'hideTitle') ? '' : <PageTitle title={get(pageData, 'title')} />

    return (
      <AppContext.Provider value={this.props.pageContext}>
        {titleBlock}
        <Section>
          <ContentCard obj={{ cardType: "primary", content: "meow" }} />
        </Section>
      </AppContext.Provider>)
  }
  /*
  
      render() {
          const pageData = this.props.data.contentfulPage
  
          const introBlock = get(pageData, 'introContent')?.map((x) => (<PageComponent key={x.id} obj={x} />));
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
                  {introBlock}
                  {mainBlock}
              </AppContext.Provider>
          )
      }*/
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
    } 
    siteData: allContentfulSiteGlobals(limit: 1, filter: { node_locale: { eq: $locale }} sort: { siteTitle: ASC }) {
      nodes {
        ... Seo
        ... Layout
      }
    }
  }
`

/*
export const pageQuery = graphql`
  query PageBySlug(
    $slug: String!
  ) {
    contentfulPage(url: { eq: $slug }) {
      id
      title
      hideTitle
      introContent {
        ...PageComponent
        ... on ContentfulComponentGroup {
          id
          styles
          structureType
          components:content {
            ...PageComponent
            ... on ContentfulComponentGroup {
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
      mainContent {
        ...PageComponent
        ... on ContentfulComponentGroup {
            id
            styles
            structureType
            components:content {
            ...PageComponent
            ... on ContentfulComponentGroup {
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
  }
`
*/