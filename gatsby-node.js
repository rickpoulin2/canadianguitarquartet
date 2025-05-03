const path = require('path')

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
  union LinkableTypes = ContentfulPage | ContentfulBlogEntry
  type RichText {
    raw: String!
    references: [LinkableTypes] @link(from: "references___NODE")
  }
  type ContentfulLink implements ContentfulEntry {
    isInternal: Boolean!
    text: String!
    targetPage: LinkableTypes @link(from: "targetPage___NODE")
    targetLink: String
    icon: String
    styles: String
    hideText: Boolean
  }
  type ContentfulBlogEntry implements ContentfulEntry {
    title: String!
    publishedDate: Date @dateformat(formatString: "YYYY-MM-DD")
    content: RichText!
  }
  type ContentfulEvent implements ContentfulEntry {
    eventName: String!
    eventDateTime: Date! @dateformat(formatString: "YYYY-MM-DDTHH:mm")
    eventLocation: String
    ticketPricing: String
    ticketsLink: String
    image: ContentfulAsset @link(from: "image___NODE")
    eventDetails: RichText
  }
  type ContentfulBlockGroup implements ContentfulEntry {
    styles: String
    structureType: String
    content: [ContentfulPageContent] @link(from: "content___NODE")
  }
  type ContentfulBlockContentCard implements ContentfulEntry {
    styles: String
    fancyHeading: String
    cardType: String
    image: ContentfulAsset @link(from: "image___NODE")
    imageSizing: String
    content: RichText
    buttons: [ContentfulLink] @link(from: "buttons___NODE")
  }
  type ContentfulBlockImage implements ContentfulEntry {
    styles: String
    cardType: String
    image: ContentfulAsset @link(from: "image___NODE")
    link: ContentfulLink @link(from: "link___NODE")
  }
  type ContentfulBlockImageGallery implements ContentfulEntry {
    styles: String
    cardType: String
    fancyHeading: String
    disclaimerContent: RichText
    images: [ContentfulAsset] @link(from: "images___NODE")
    pdfButtonText: String
    pdfButtonFile: ContentfulAsset @link(from: "pdfButtonFile___NODE")
  }
  type ContentfulBlockEventsUpcoming implements ContentfulEntry {
    heading: String!
    styles: String
    maxItems: Int
    buttons: [ContentfulLink] @link(from: "buttons___NODE")
  }
  type ContentfulBlockEventsDetails implements ContentfulEntry {
    styles: String
  }
  type ContentfulBlockContactForm implements ContentfulEntry {
    styles: String
    introContent: RichText
    submitButtonLabel: String
    successHeading: String
    successBody: RichText
    errorHeading: String
    errorBody: RichText
  } 
  type ContentfulBlockBlogEntries implements ContentfulEntry {
    id: ID!
  }
  type ContentfulBlockBlogLatest implements ContentfulEntry {
    heading: String!
    styles: String
    buttons: [ContentfulLink] @link(from: "buttons___NODE")
  }
  type ContentfulSiteGlobals implements ContentfulEntry {
    siteTitle: String!
    headerNavigation: [ContentfulLink] @link(from: "headerNavigation___NODE")
    footerNavigation: [ContentfulLink] @link(from: "footerNavigation___NODE")
    siteIcon: ContentfulAsset @link(from: "siteIcon___NODE")
    siteLogo: ContentfulAsset @link(from: "siteLogo___NODE")
    languageToggleText: String!
    footerContent: RichText
    copyrightLine: String
    pageTitleBg: ContentfulAsset @link(from: "pageTitleBg___NODE")
    blogPage: ContentfulPage @link(from: "blogPage___NODE")
    eventsPage: ContentfulPage @link(from: "eventsPage___NODE")
  }
  union ContentfulPageContent = ContentfulBlockGroup | ContentfulBlockContentCard | ContentfulBlockImage | ContentfulBlockContactForm | ContentfulBlockEventsUpcoming | ContentfulBlockEventsDetails | ContentfulBlockImageGallery | ContentfulBlockBlogLatest | ContentfulBlockBlogEntries
  type ContentfulPage implements ContentfulEntry {
    title: String!
    url: String!
    hideTitle: Boolean!
    introContent: [ContentfulPageContent] @link(from: "introContent___NODE")
    mainContent: [ContentfulPageContent] @link(from: "mainContent___NODE")
  }
  `)
}

const findAltPage = (items, contentful_id, wantedLocale) => {
  if (items == null)
    return null
  for (let i = 0; i < items.length; i++) {
    if (items[i].contentful_id === contentful_id && items[i].node_locale === wantedLocale) {
      return items[i].url
    }
  }
  return null
}

createPageTypes = async (graphql, actions, reporter, template, pathTransform, query) => {
  const { createPage } = actions
  const results = await graphql(query)
  if (results.errors) {
    reporter.panicOnBuild(`Can't find Contentful results`, results.errors)
    return
  }
  const items = results.data.items.nodes
  const slugs = {}
  Object.getOwnPropertyNames(results.data.links).forEach(x => { slugs[x] = results.data.links[x].url })

  if (items.length > 0) {
    items.forEach((item, index) => {
      const previousPostSlug = index === 0 ? null : items[index - 1].url
      const nextPostSlug = index === items.length - 1 ? null : items[index + 1].url
      const otherLocale = item.node_locale !== "en" ? "en" : "fr"

      createPage({
        path: pathTransform(item.node_locale, item.url, slugs),
        component: template,
        context: {
          locale: item.node_locale,
          slug: item.url,
          altSlug: pathTransform(otherLocale, findAltPage(items, item.contentful_id, otherLocale), slugs),
          previousPostSlug,
          nextPostSlug,
          linkSlugs: slugs
        },
      })
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createPageTypes(graphql, actions, reporter,
    path.resolve('./src/templates/page.js'),
    (lang, slug) => (slug ? `/${lang}/${slug}/` : `/${lang}/`),
    `{
      items: allContentfulPage(
        filter: {
          title: {ne:null},
          url: {ne:null}
      }) {
        nodes {
          contentful_id
          node_locale
          url
        }
      }
      links: contentfulSiteGlobals {
        blogPage { url }
        eventsPage { url }
      }
    }`
  )

  /*
  await createPageTypes(graphql, actions, reporter,
    path.resolve('./src/templates/newsletter.js'),
    (slug, links) => `/${links.newsletterPage}/${slug}/`,
    `{
      items: allContentfulNewsletter(
          sort: { publishedDate: DESC },
          filter: {
            url: {ne:null},
            heading: {ne:null},
            bodyContent: { raw: {ne:null} },
            publishedDate: {ne:null},
            tagLine: {ne:null},
            bannerImage: { contentful_id: {ne:null} }
          }) {
        nodes {
          url
        }
      }
      links: contentfulSiteGlobals {
        blogPage { url }
        albumsPage { url }
        newsletterPage { url }
      }
    }`
  );
  */
}


/*

  type ContentfulComponentHero implements ContentfulEntry {
    heading: String
    styles: String
    body: RichText
    buttons: [ContentfulLink] @link(from: "buttons___NODE")
    portraitImage: ContentfulAsset @link(from: "portraitImage___NODE")
  }
  type ContentfulComponentVideo implements ContentfulEntry {
    title: String!
    styles: String
    cardType: String
    videoId: String
    backgroundImage: ContentfulAsset @link(from: "backgroundImage___NODE")
  }
*/