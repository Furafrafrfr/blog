import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { Container, Paper, Typography, useMediaQuery } from "@mui/material"
import { Box } from "@mui/system"

import { Header } from "./common/header"
import { Footer } from "./common/footer"
import { useCategory } from "../hooks/categoryState"
import { CategorySelector } from "./common/category"
import { useTheme } from "@emotion/react"

export const App = ({ children, pageData, siteData, avatar }) => {
  const data = useStaticQuery(graphql`
    {
      blogContext {
        category
      }
      allFile(filter: { name: { eq: "header_image" } }) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData
            }
            name
          }
        }
      }
    }
  `)

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down("md"))

  const { category, setCategory } = useCategory()

  const headerImage = getImage(
    data.allFile.edges.filter(({ node }) => node.name === "header_image")[0]
      .node
  )

  useEffect(() => {
    if (category.size === 0) {
      data.blogContext.category.forEach(category =>
        setCategory(category, false)
      )
    }
  }, [])

  let width = matches ? "100%" : "70%"

  return (
    <>
      <Container>
        <Paper sx={{ maxWidth: "lg" }}>
          <GatsbyImage image={headerImage} alt="aaa" />
          <Box width="90%" m="auto">
            <Header />
            <>
              <Box display="flex" justifyContent="space-between">
                <Box width={width}>
                  <>{children}</>
                </Box>
                {matches || (
                  <Box component="nav" width="25%">
                    <Typography component="h2" variant="h2s" m={1}>
                      カテゴリ
                    </Typography>
                    <CategorySelector />
                  </Box>
                )}
              </Box>
              <Footer />
            </>
          </Box>
        </Paper>
      </Container>
    </>
  )
}
