import React from "react";
import { graphql } from "gatsby";

import "@fontsource/source-code-pro";

import { Article } from "../components/blog/Article";
import { Head } from "../components/common/head";

export default function BlogTemplate({ location, data }) {
  let frontmatter = data.mdx.frontmatter;
  let url = `${data.site.siteMetadata.siteUrl}${location.pathname}`;

  return (
    <>
      <Head
        title={frontmatter.title.concat("|ぐちろぐ")}
        description={data.site.siteMetadata.description}
        lang={data.site.siteMetadata.lang}
        siteUrl={data.site.siteMetadata.siteUrl}
        pageUrl={url}
        avatar={data.file}
      />
      <Article frontmatter={frontmatter} body={data.mdx.body} url={url} />
    </>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        description
        lang
        siteUrl
        title
      }
    }
    file(name: { eq: "header_icon" }) {
      childImageSharp {
        gatsbyImageData(height: 600, width: 600)
      }
    }
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        category
        title
        slug
        date(formatString: "YYYY-MM-DD")
      }
      body
    }
  }
`;
