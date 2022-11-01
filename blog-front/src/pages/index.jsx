import React from "react";
import { graphql } from "gatsby";

import "../styles/style.css";
import { Index } from "../components/index/Index";
import { Head } from "../components/common/head";

const Home = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <>
      <Head
        title={data.site.siteMetadata.title}
        description={data.site.siteMetadata.description}
        lang={data.site.siteMetadata.lang}
        siteUrl={data.site.siteMetadata.siteUrl}
        pageUrl={data.site.siteMetadata.siteUrl}
        avatar={data.file}
      />
      <Index posts={posts} />
    </>
  );
};

export default Home;

export const query = graphql`
  query MyQuery {
    site {
      siteMetadata {
        siteUrl
        description
        lang
        title
      }
    }
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          frontmatter {
            category
            date(formatString: "YYYY-MM-DD")
            slug
            title
          }
        }
      }
    }
    file(name: { eq: "header_icon" }) {
      childImageSharp {
        gatsbyImageData(height: 600, width: 600)
      }
    }
  }
`;
