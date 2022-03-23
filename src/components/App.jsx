import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import {
  Container,
  Paper,
  Typography,
  Fab,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Box } from "@mui/system"
import { KeyboardArrowUp } from "@mui/icons-material"

import { Header } from "./common/header"
import { Footer } from "./common/footer"
import { useCategory } from "../hooks/categoryState"
import { CategorySelector } from "./common/category"
import { backToTop } from "../util/backToTop"

export const App = ({ children }) => {
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

  let fabBottom = matches ? 16 : 32
  let fabRight = matches ? 16 : 64

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
      <Box w="100vw">
        <Container fixed>
          <Paper sx={{ maxWidth: "lg", pb:2}}>
            <div id="scroll-top-anchor" />
            <GatsbyImage image={headerImage} alt="aaa" />
            <Box width="90%" m="auto">
              <Header />
              <Box display="flex" justifyContent="space-between">
                <Box width={width}>
                  <div>{children}</div>
                </Box>
                <div>
                  {matches || (
                    <Box component="nav">
                      <Typography component="h2" variant="h2s" my={1}>
                        カテゴリ
                      </Typography>
                      <CategorySelector />
                    </Box>
                  )}
                </div>
              </Box>
              <Box display="flex" justifyContent="center">
                <Footer />
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: fabBottom, right: fabRight }}
        onClick={() => backToTop()}
      >
        <KeyboardArrowUp />
      </Fab>
    </>
  )
}
