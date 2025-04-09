const path = require('path')

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
  union LinkableTypes = ContentfulPage | ContentfulAlbum | ContentfulBlogEntry | ContentfulNewsletter
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
  type ContentfulAlbum implements ContentfulEntry {
    title: String!
    slug: String!
    publishedDate: Date @dateformat(formatString: "YYYY-MM-DD")
    trackCount: Int
    collaboratorName: String
    collaboratorLink: String
    coverImage: ContentfulAsset @link(from: "coverImage___NODE")
    videoId: String
    linkYouTube: String
    linkSpotify: String
    linkBandcamp: String
    linkItchio: String
    linkItunes: String
    linkAmazon: String
    albumDescription: RichText
  }
  type ContentfulBlogEntry implements ContentfulEntry {
    title: String!
    publishedDate: Date @dateformat(formatString: "YYYY-MM-DD")
    content: RichText!
  }
  type ContentfulNewsletter implements ContentfulEntry {
    heading: String!
    url: String!
    publishedDate: Date @dateformat(formatString: "YYYY-MM-DD")
    bannerImage: ContentfulAsset @link(from: "bannerImage___NODE")
    tagLine: String
    bodyContent: RichText!
  }
  type ContentfulComponentText implements ContentfulEntry {
    styles: String
    fancyHeading: String
    dateTag: Date @dateformat(formatString: "YYYY-MM-DD")
    image: ContentfulAsset @link(from: "image___NODE")
    content: RichText
  }
  type ContentfulComponentContentCard implements ContentfulEntry {
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
  type ContentfulComponentGroup implements ContentfulEntry {
    styles: String
    structureType: String
    content: [ContentfulPageContent] @link(from: "content___NODE")
  }
  union ContentfulPageContent = ContentfulComponentGroup | ContentfulComponentText | ContentfulComponentHero | ContentfulComponentVideo | ContentfulComponentButtonBanner | ContentfulComponentContentCard | ContentfulComponentAlbumList | ContentfulComponentBlogEntries | ContentfulComponentBlogLatest | ContentfulComponentNewsletterLatest | ContentfulComponentNewsletterList | ContentfulComponentNewsletterSignup | ContentfulComponentContactForm | ContentfulComponentCommissionCard
  type ContentfulSiteGlobals implements ContentfulEntry {
    siteTitle: String!
    siteHeadingStart: String
    siteHeadingEnd: String!
    headerNavigation: [ContentfulLink] @link(from: "headerNavigation___NODE")
    headerButtonLink: ContentfulLink @link(from: "headerButtonLink___NODE")
    footerNavigation: [ContentfulLink] @link(from: "footerNavigation___NODE")
    siteIcon: ContentfulAsset @link(from: "siteIcon___NODE")
    siteLogo: ContentfulAsset @link(from: "siteLogo___NODE")
    siteBackground: ContentfulAsset @link(from: "siteBackground___NODE")
    footerContent: RichText
    copyrightLine: String
    blogPage: ContentfulPage @link(from: "blogPage___NODE")
    albumsPage: ContentfulPage @link(from: "albumsPage___NODE")
    newsletterPage: ContentfulPage @link(from: "newsletterPage___NODE")
  }
  type ContentfulPage implements ContentfulEntry {
    title: String!
    url: String!
    hideTitle: Boolean!
    introContent: [ContentfulPageContent] @link(from: "introContent___NODE")
    mainContent: [ContentfulPageContent] @link(from: "mainContent___NODE")
  }
  `);
}

/*
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

      createPage({
        path: pathTransform(item.url, slugs),
        component: template,
        context: {
          slug: item.url,
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
    (slug) => `/${slug}/`,
    `{
      items: allContentfulPage(
        filter: {
          title: {ne:null},
          url: {ne:null}
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
}
*/
