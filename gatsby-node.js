exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = require.resolve(`./src/templates/blogTemplate.js`)

  const result = await graphql(`
    {
      allContentfulBlogPostV2 {
        edges {
          node {
            content {
              childMarkdownRemark {
                frontmatter {
                  slug
                  category
                }
              }
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  let initialCategories = new Map()
  result.data.allContentfulBlogPostV2.edges.forEach(node =>
    node.content.childMarkdownRemark.frontmatter.category.forEach(category =>
      initialCategories.set(category, false)
    )
  )

  result.data.allContentfulBlogPostV2.edges.forEach(({ node }) => {
    createPage({
      path: node.content.childMarkdownRemark.frontmatter.slug,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        slug: node.content.childMarkdownRemark.frontmatter.slug,
        categories:initialCategories
      },
    })
  })
}
