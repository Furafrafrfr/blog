import React from "react";
import { graphql, PageProps } from "gatsby";

import "@fontsource/source-code-pro";

import { Article } from "../components/blog/Article";
import { Head } from "../components/common/head";

type QueryType = Override<Queries.BlogPageQuery, ImageFileNode>;

const BlogTemplate: React.FC<PageProps<QueryType>> = function ({
  location,
  data,
}) {
  const frontmatter = data.markdownRemark?.frontmatter;
  const url = `${data.site?.siteMetadata?.siteUrl}${location.pathname}`;

  return (
    <>
      <Head
        title={frontmatter?.title?.concat("｜ぐちろぐ")}
        description={data.site?.siteMetadata?.description || undefined}
        lang={data.site?.siteMetadata?.lang || undefined}
        siteUrl={
          data.site?.siteMetadata?.siteUrl || "https://furafrafrfr.github.io"
        }
        pageUrl={url}
        avatar={data.file}
      />
      <Article
        frontmatter={
          frontmatter || {
            title: "error occured",
            slug: "",
            category: [],
            date: "",
          }
        }
        html={data.markdownRemark?.html || ""}
      />
    </>
  );
};

export default BlogTemplate;

export const pageQuery = graphql`
  query BlogPage($slug: String!) {
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
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        category
        title
        slug
        date(formatString: "YYYY-MM-DD")
      }
      html
    }
  }
`;
