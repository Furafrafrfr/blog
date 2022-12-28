import React from "react";
import { Head } from "../components/common/head";
import { graphql, PageProps } from "gatsby";
import { CategoryPage } from "../components/category/categoryPage";

type QueryResult = Override<Queries.CategoryQuery, ImageFileNode>;
type CategoryPageProps = Override<
  PageProps<QueryResult>,
  { pageContext: { category: string } }
>;

const CategoryTemplate: React.FC<CategoryPageProps> = ({
  data,
  pageContext,
}) => {
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
        siteUrl={
          data.site?.siteMetadata?.siteUrl || "https://furafrafrfr.github.io"
        }
        pageUrl={
          data.site?.siteMetadata?.siteUrl || "https://furafrafrfr.github.io"
        }
        avatar={data.file}
      />
      <CategoryPage posts={frontmatter} category={pageContext.category} />
    </>
  );
};

export const query = graphql`
  query Category($category: [String]) {
    site {
      siteMetadata {
        siteUrl
        description
        lang
        title
      }
    }
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
    file(name: { eq: "header_icon" }) {
      childImageSharp {
        gatsbyImageData(height: 600, width: 600)
      }
    }
  }
`;

export default CategoryTemplate;
