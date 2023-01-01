import React from "react";
import { graphql, PageProps, HeadFC } from "gatsby";

import "@fontsource/source-code-pro";

import { Article } from "../components/blog/Article";
import { Head as SEO } from "../components/common/head";

const BlogTemplate: React.FC<PageProps<Queries.BlogPageQuery>> = function ({
  data,
}) {
  const frontmatter = data.markdownRemark?.frontmatter;

  return (
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
  );
};

export default BlogTemplate;

export const Head: HeadFC = ({ location }) => (
  <SEO pathname={location.pathname} />
);

export const pageQuery = graphql`
  query BlogPage($slug: String!) {
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
