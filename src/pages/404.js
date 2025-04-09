import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import AppContext from '../components/core/app-context'
import Seo from '../components/core/seo'
//import PageTitle from '../components/page-title'
//import PageComponent from '../components/page-component'
//import Section from '../components/section'

class PageTemplate extends React.Component {
  render() {
    return <div>404</div>
  }
  /*
  render() {
    const pageData = this.props.data.contentfulPage
    const titleBlock = get(pageData, 'hideTitle') ? '' : <PageTitle title={get(pageData, 'title')} />

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
        {titleBlock}
        {introBlock}
        {mainBlock}
      </AppContext.Provider>
    )
  }
    */
}

export default PageTemplate

/*
export const Head = ({ data }) => <Seo title={get(data, 'contentfulPage.title')} />

export const pageQuery = graphql`
  query ErrorPageBySlug {
    contentfulPage(url: { eq: "404" }) {
      id
      title
      hideTitle
      introContent {
        ...PageComponent
        ... on ContentfulComponentGroup {
          styles
          components:content {
            ...PageComponent
            ... on ContentfulComponentGroup {
              styles
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
          styles
          components:content {
            ...PageComponent
            ... on ContentfulComponentGroup {
              styles
              components:content {
                ...PageComponent
              }
            }
          }
        }
      }
    }
    links: contentfulSiteGlobals {
      blogPage { url }
      albumsPage { url }
      newsletterPage { url }
    }
  }
`
*/