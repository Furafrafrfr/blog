import React from "react";
import { Head } from "../components/common/head";
import { graphql } from "gatsby";
import { CategoryPage } from "../components/category/categoryPage";

const CategoryTemplate = ({ data, pageContext }) => {
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
      <CategoryPage posts={posts} category={pageContext.category}/>

    </>
  );
};

export const query = graphql`
  query ($category: [String]) {
    site {
      siteMetadata {
        siteUrl
        description
        lang
        title
      }
    }
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }, filter: {frontmatter: {category: {in: $category}}}) {
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

export default CategoryTemplate;
