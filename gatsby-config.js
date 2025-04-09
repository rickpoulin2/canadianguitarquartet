require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  flags: { DEV_SSR: true },
  siteMetadata: {
    title: "Videogamecomposer",
    description: "francoisgerinlajoie.ca",
  },
  plugins: [
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          placeholder: "blurred",
          quality: "90",
          backgroundColor: "transparent"
        }
      }
    },
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        sassOptions: {
          api: "modern"
        }
      }
    },
    {
      resolve: "gatsby-plugin-recaptcha",
      options: {
        async: true,
        defer: true,
        args: `?onload=onloadCallback&render=explicit`
      }
    },
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: ["G-FBH76BETL3"],
      },
    },
    "gatsby-plugin-schema-export",
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST
      },
    },
  ],
};
