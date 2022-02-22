require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const contentful = require("contentful")
const fmParser = require("front-matter")
const fs = require("fs")

let env = process.env.NODE_ENV

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  //contentfulから記事取得
  let client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  let entries = await client.getEntries({ content_type: "blogPostV2" })
  if (entries.errors) {
    console.log(errors)
  } else {
    //使われているカテゴリを抜き出す
    let categories = new Map()
    entries.items.forEach(({ fields: { content } }) => {
      let {
        attributes: { category },
      } = fmParser(content)
      category.forEach(str => categories.set(str, false))
    })

    //developmentのとき
    if (env === "development") {
      let postsPath = `${__dirname}/src/posts`
      let files = fs
        .readdirSync(postsPath)
        .filter(fileOrDir => fs.statSync(`${postsPath}/${fileOrDir}`).isFile())
      files.forEach(fileName => {
        let file = fs.readFileSync(`${postsPath}/${fileName}`, {
          encoding: "utf-8",
        })
        let {
          attributes: { category },
        } = fmParser(file)
        category.forEach(str => categories.set(str, false))
      })
    }

    let data = { category: Array.from(categories.keys()) }

    createNode({
      ...data,
      id: createNodeId(`blog-category-data`),
      children: [],
      internal: {
        type: "BlogContext",
        contentDigest: createContentDigest(data),
      },
    })
  }
}

//記事ページ生成
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = require.resolve(`./src/templates/blogTemplate.js`)

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
              development
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
  if (env === "development") {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.slug,
        component: blogPostTemplate,
        context: {
          // additional data can be passed via context
          slug: node.frontmatter.slug,
        },
      })
    })
  } else {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.development == true) {
        createPage({
          path: node.frontmatter.slug,
          component: blogPostTemplate,
          context: {
            // additional data can be passed via context
            slug: node.frontmatter.slug,
          },
        })
      }
    })
  }
}
