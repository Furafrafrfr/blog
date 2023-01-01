/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
// @ts-check

import { GatsbyConfig } from "gatsby";

import dotenv from "dotenv";
import { toJstString } from "./src/util/toJstString";
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  /* Your site config here */
  graphqlTypegen: {
    typesOutputPath: "./src/types/gatsby-types.d.ts",
  },
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
          },
          {
            resolve: `gatsby-remark-images`,
          },
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
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
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: "/sitemaps",
        query: `{
          allSitePage {
            nodes {
              path
            }
          }
          allMarkdownRemark {
            nodes {
              frontmatter {
                date (formatString: "YYYY-MM-DD")
                slug
              }
            }
          }
          site {
            siteMetadata {
              siteUrl
            }
          }
        }
        `,

        resolvePages: ({
          allSitePage: { nodes: pages },
          allMarkdownRemark: { nodes: blogNodes },
        }: {
          allSitePage: {
            nodes: {
              path: string;
            }[];
          };
          allMarkdownRemark: {
            nodes: {
              frontmatter: {
                slug: string;
                date: string;
              };
            }[];
          };
        }) => {
          const mdMap = blogNodes.reduce<
            Record<string, { path: string; date?: string } | undefined>
          >((acc, { frontmatter }) => {
            acc[frontmatter.slug] = {
              path: frontmatter.slug,
              date: frontmatter.date,
            };
            return acc;
          }, {});

          return pages.map((page) => ({
            ...page,
            ...mdMap[page.path],
          }));
        },

        serialize: (page: { path: string; date?: string }) => {
          return {
            url: page.path,
            lastmod: page.date && toJstString(page.date),
          };
        },
      },
    },
  ],
};

module.exports = config;
