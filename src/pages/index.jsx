import React from "react"
import { graphql } from "gatsby"
import { useTheme } from "@mui/system"
import { Box, Typography, useMediaQuery } from "@mui/material"

import "../styles/style.css"
import { CategoryDialog } from "../components/common/categoryDialog"
import { Index } from "../components/index/Index"
import { Head } from "../components/common/head"

const Home = ({ data }) => {
  let posts = data.allMarkdownRemark.edges
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <>
      <Head
        title={data.site.siteMetadata.title}
        description={data.site.siteMetadata.description}
        lang={data.site.siteMetadata.lang}
        avatar={data.file.childImageSharp.original}
      />
      <Index posts={posts} />
      {matches && <CategoryDialog />}
    </>
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
    file(name: { eq: "header_icon" }) {
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
