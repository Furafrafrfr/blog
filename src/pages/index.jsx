import React from "react"
import { graphql } from "gatsby"
import "../styles/style.css"
import { App } from "../components/App"
import { Index } from "../components/index/Index"

const Home = ({ location, data }) => {
  let posts = data.allMarkdownRemark.edges

  return (
    <App
      pageData={{}}
      siteData={data.site.siteMetadata}
      avatar={data.file.childImageSharp.original}
    >
      <Index posts={posts} />
    </App>
  )
}

export default Home

export const query = graphql`
  query MyQuery {
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
    file(name: { eq: "newicon" }) {
      childImageSharp {
        original {
          src
          width
          height
        }
      }
    }
  }
`
