require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

var contentful = require("contentful")
var fmParser = require("front-matter")

let category_cache = null

exports.onCreatePage = async ({ page, actions }) => {
  if (category_cache == null) {
    let client = contentful.createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    })

    let entries = await client.getEntries({ content_type: "blogPostV2" })
    if (entries.errors) {
      console.log(errors)
    } else {
      let categories = new Map()
      entries.items.forEach(({ fields: { content } }) => {
        let {
          attributes: { category },
        } = fmParser(content)
        category.forEach(str => categories.set(str, false))
      })

      actions.deletePage(page)
      actions.createPage({
        ...page,
        context: {
          ...page.context,
          categories: Array.from(categories.keys()),
        },
      })
    }
  }
}

//記事ページ生成
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

  result.data.allContentfulBlogPostV2.edges.forEach(({ node }) => {
    node.content.childMarkdownRemark.frontmatter.category.forEach(category =>
      initialCategories.set(category, false)
    )
  })

  result.data.allContentfulBlogPostV2.edges.forEach(({ node }) => {
    createPage({
      path: node.content.childMarkdownRemark.frontmatter.slug,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        slug: node.content.childMarkdownRemark.frontmatter.slug,
        categories: Array.from(initialCategories.keys()),
      },
    })
  })
}
