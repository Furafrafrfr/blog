import React from "react"
import { graphql } from "gatsby"

import "@fontsource/source-code-pro"

import { App } from "../components/App"
import { Article } from "../components/blog/Article"

export default function Wrapper({ location, data }) {
  let frontmatter = data.markdownRemark.frontmatter

  let initialCategory = new Map(
    data.blogContext.category.map(key => [key, false])
  )
  let url = `${data.site.siteMetadata.siteUrl}${location.pathname}`

  return (
    <App
      pageData={{}}
      siteData={data.site.siteMetadata}
      avatar={data.file.childImageSharp.original}
      initialCategory={initialCategory}
    >
      <Article frontmatter={frontmatter} html={data.markdownRemark.html} url={url}/>
    </App>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        description
        lang
        siteUrl
        title
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
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        category
        title
        slug
        date(formatString: "YYYY-MM-DD")
      }
      html
    }
    blogContext {
      category
    }
  }
`
