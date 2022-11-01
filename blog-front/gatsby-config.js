/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
let config = {
  /* Your site config here */
  siteMetadata: {
    title: "ぐちろぐ",
    description: "ぐっちーのブログ",
    lang: "ja",
    siteUrl: "https://furafrafrfr.github.io",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GOOGLE_ANALYTICS_GTAG],
        gtagConfig: {
          anomyzize_ip: true,
        },
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../content`,
        name: "content",
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMaker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: true,
            },
          },{
            resolve:`gatsby-remark-images`
          }
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ぐちろぐ`,
        short_name: `ぐちろぐ`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#939393`,
        display: `standalone`,
        icon: `static/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-material-ui`,
    `gatsby-theme-material-ui`,
  ],
};

module.exports = config;
