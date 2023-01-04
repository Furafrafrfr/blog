import React from "react";
import { Head as SEO } from "../components/common/head";
import { graphql, HeadFC, PageProps } from "gatsby";
import { CategoryPage } from "../components/category/categoryPage";

const CategoryTemplate: React.FC<
  Override<
    PageProps<Queries.CategoryQuery>,
    { pageContext: { category: string } }
  >
> = ({ data, pageContext }) => {
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

  return <CategoryPage posts={frontmatter} category={pageContext.category} />;
};

export const Head: HeadFC = ({ location }) => (
  <SEO pathname={location.pathname} />
);

export const query = graphql`
  query Category($category: [String]) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { category: { in: $category } } }
    ) {
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

export default CategoryTemplate;
