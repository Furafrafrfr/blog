import { GatsbyNode } from "gatsby";
import dotenv from "dotenv";
import { createCategoryPath } from "./src/util/createCategoryPath";
import path from "node:path";

// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`,
// });

// const pathCreator = require("./src/util/createCategoryPath");
// const path = require("node:path");

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions;

  // 記事ページ生成
  const result = await graphql<Queries.GatsbyNodeQuery>(`
    query GatsbyNode {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              category
              slug
              date(formatString: "YYYY-MM-DD")
              title
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const allMd = result.data?.allMarkdownRemark;

  if (allMd) {
    const blogPostTemplate = path.resolve(`./src/templates/blogTemplate.tsx`);
    allMd.edges.forEach(({ node }) => {
      if (!node.frontmatter?.slug) return;
      createPage({
        path: node.frontmatter.slug,
        component: blogPostTemplate,
        context: {
          // additional data can be passed via context
          slug: node.frontmatter.slug,
        },
      });
    });

    // カテゴリ別ページ生成
    const categoryList: string[] = ([] as string[]).concat(
      ...allMd.edges.map(
        ({ node }) =>
          (node.frontmatter?.category?.filter((val) => val) as string[]) || []
      )
    );

    const categoryTemplate = path.resolve(
      "./src/templates/categoryTemplate.tsx"
    );
    categoryList.forEach((category) => {
      createPage({
        path: createCategoryPath(category),
        component: categoryTemplate,
        context: {
          category,
        },
      });
    });
  }
};

exports.createPages = createPages;
