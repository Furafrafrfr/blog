import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { Container, Paper, Fab, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { KeyboardArrowUp } from "@mui/icons-material";

import { Header } from "./common/header";
import { Footer } from "./common/footer";
import { backToTop } from "../util/backToTop";

export const App = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
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
  `);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  let fabBottom = matches ? 16 : 32;
  let fabRight = matches ? 16 : 64;
  let width = matches ? "100%" : "70%";

  const headerImage = getImage(
    data.allFile.edges.filter(({ node }) => node.name === "header_image")[0]
      .node
  );

  return (
    <>
      <Container fixed>
        <Paper sx={{ maxWidth: "lg", pb: 2 }}>
          <div id="scroll-top-anchor" />
          <GatsbyImage image={headerImage} alt="aaa" />
          <Box width="90%" m="auto">
            <Header />
            <Box display="flex" justifyContent="space-between">
              <Box width={width} m="auto">
                <div>{children}</div>
              </Box>
            </Box>
            <Box display="flex" justifyContent="center">
              <Footer />
            </Box>
          </Box>
        </Paper>
      </Container>
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: fabBottom, right: fabRight }}
        onClick={() => backToTop()}
      >
        <KeyboardArrowUp />
      </Fab>
    </>
  );
};
