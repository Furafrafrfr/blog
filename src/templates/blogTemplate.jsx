import React from "react"
import { graphql } from "gatsby"

import "@fontsource/source-code-pro"

import { Article } from "../components/blog/Article"

export default function BlogTemplate({ location, data }) {
  let frontmatter = data.markdownRemark.frontmatter
  let url = `${data.site.siteMetadata.siteUrl}${location.pathname}`

  return (
    <>
      <Article
        frontmatter={frontmatter}
        html={data.markdownRemark.html}
        url={url}
      />
    </>
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
    file(name: { eq: "header_icon" }) {
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
  }
`
