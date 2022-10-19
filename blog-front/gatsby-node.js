require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const pathCreator = require("./src/util/createCategoryPath");

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  // 記事ページ生成
  const result = await graphql(`
    query MyQuery {
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

  const allMd = result.data.allMarkdownRemark;

  const blogPostTemplate = require.resolve(`./src/templates/blogTemplate.jsx`);
  allMd.edges.forEach(({ node }) => {
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
  const categoryList = [].concat(
    ...allMd.edges.map(({ node }) => node.frontmatter.category)
  );

  const categoryTemplate = require.resolve(
    "./src/templates/categoryTemplate.jsx"
  );
  categoryList.forEach((category) => {
    createPage({
      path: pathCreator.createCategoryPath(category),
      component: categoryTemplate,
      context: {
        category,
      },
    });
  });
};
