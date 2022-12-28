import React from "react";
import { graphql, PageProps } from "gatsby";

import "../styles/style.css";
import { Index } from "../components/index/Index";
import { Head } from "../components/common/head";
import { getImage } from "gatsby-plugin-image";

const Home = ({ data }: PageProps<Queries.HomeQuery>) => {
  const posts = data.allMarkdownRemark.edges;
  const frontmatter = posts
    .filter((val): val is NonNullable<typeof val> => !!val)
    .map(({ node: { frontmatter: data } }) => ({
      title: data?.title || "null",
      slug: data?.slug || "/404",
      date: data?.date || "",
      category:
        data?.category?.filter(
          (val): val is NonNullable<typeof val> => !!val
        ) || [],
    }));

  return (
    <>
      <Head
        title={data.site?.siteMetadata?.title || undefined}
        description={data.site?.siteMetadata?.description || undefined}
        lang={data.site?.siteMetadata?.lang || undefined}
        siteUrl={data.site?.siteMetadata?.siteUrl || ""}
        pageUrl={data.site?.siteMetadata?.siteUrl || ""}
        avatar={getImage(data.file?.childImageSharp || null)}
      />
      <Index posts={frontmatter} />
    </>
  );
};

export default Home;

export const query = graphql`
  query Home {
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
