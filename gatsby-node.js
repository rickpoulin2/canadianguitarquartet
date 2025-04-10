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
  type ContentfulComponentText implements ContentfulEntry {
    styles: String
    fancyHeading: String
    dateTag: Date @dateformat(formatString: "YYYY-MM-DD")
    image: ContentfulAsset @link(from: "image___NODE")
    content: RichText
  }
  type ContentfulBlockContentCard implements ContentfulEntry {
    styles: String
    fancyHeading: String
    cardType: String
    image: ContentfulAsset @link(from: "image___NODE")
    content: RichText
    buttons: [ContentfulLink] @link(from: "buttons___NODE")
  }
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
  type ContentfulComponentButtonBanner implements ContentfulEntry {
    title: String!
    subtext: String
    styles: String
    cardType: String
    buttons: [ContentfulLink] @link(from: "buttons___NODE")
  }
  type ContentfulComponentAlbumList implements ContentfulEntry {
    id: ID!
    styles: String
  }
  type ContentfulComponentNewsletterList implements ContentfulEntry {
    id: ID!
    styles: String
  }
  type ContentfulComponentBlogEntries implements ContentfulEntry {
    id: ID!
  }
  type ContentfulComponentBlogLatest implements ContentfulEntry {
    heading: String
    styles: String
    buttons: [ContentfulLink] @link(from: "buttons___NODE")
  }
  type ContentfulComponentNewsletterLatest implements ContentfulEntry {
    heading: String
    styles: String
    trailingBlurb: RichText
    buttons: [ContentfulLink] @link(from: "buttons___NODE")
    signupButtonLabel: String
    signupForm: ContentfulComponentNewsletterSignup @link(from: "signupForm___NODE")
  }
  type ContentfulComponentNewsletterSignup implements ContentfulEntry {
    heading: String
    styles: String
    introContent: RichText
    submitButtonLabel: String
    successHeading: String
    successBody: RichText
    errorHeading: String
    errorBody: RichText
  }
  type ContentfulComponentContactForm implements ContentfulEntry {
    heading: String
    styles: String
    introContent: RichText
    availableTopics: [String!]
    showNewsletterSignup: Boolean
    submitButtonLabel: String
    successHeading: String
    successBody: RichText
    errorHeading: String
    errorBody: RichText
  }
  type ContentfulComponentCommissionCard implements ContentfulEntry {
    title: String!
    coverImage: ContentfulAsset @link(from: "coverImage___NODE")
    developer: String
    publisher: String
    releaseYear: String
    primaryLink: String
    steamLink: String
    itchioLink: String
    youTubeLink: String
    otherLink: String
  }
  type ContentfulBlockGroup implements ContentfulEntry {
    styles: String
    structureType: String
    content: [ContentfulPageContent] @link(from: "content___NODE")
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
    blogPage: ContentfulPage @link(from: "blogPage___NODE")
  }
  union ContentfulPageContent = ContentfulBlockGroup | ContentfulComponentText | ContentfulComponentHero | ContentfulComponentVideo | ContentfulComponentButtonBanner | ContentfulBlockContentCard | ContentfulComponentAlbumList | ContentfulComponentBlogEntries | ContentfulComponentBlogLatest | ContentfulComponentNewsletterLatest | ContentfulComponentNewsletterList | ContentfulComponentNewsletterSignup | ContentfulComponentContactForm | ContentfulComponentCommissionCard
  type ContentfulPage implements ContentfulEntry {
    title: String!
    url: String!
    hideTitle: Boolean!
    introContent: [ContentfulPageContent] @link(from: "introContent___NODE")
    mainContent: [ContentfulPageContent] @link(from: "mainContent___NODE")
  }
  `);
}

const findAltPage = (items, contentful_id, wantedLocale) => {
  if (items == null)
    return null
  for (let i = 0; i < items.length; i++) {
    if (items[i].contentful_id === contentful_id && items[i].node_locale === wantedLocale) {
      return items[i].url;
    }
  }
  return null;
}

createPageTypes = async (graphql, actions, reporter, template, pathTransform, query) => {
  const { createPage } = actions
  const results = await graphql(query)
  if (results.errors) {
    reporter.panicOnBuild(`Can't find Contentful results`, results.errors)
    return
  }
  const items = results.data.items.nodes;
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
      }
    }`
  );

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
