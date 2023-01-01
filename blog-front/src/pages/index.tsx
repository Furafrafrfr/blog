import React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";

import "../styles/style.css";
import { Index } from "../components/index/Index";
import { Head as SEO } from "../components/common/head";

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
      <Index posts={frontmatter} />
    </>
  );
};

export default Home;

export const Head: HeadFC = ({ location }) => (
  <SEO pathname={location.pathname} />
);

export const query = graphql`
  query Home {
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
  }
`;
