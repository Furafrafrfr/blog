import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { Container, Paper, Fab, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { KeyboardArrowUp } from "@mui/icons-material";

import { Header } from "./common/header";
import { Footer } from "./common/footer";
import { backToTop } from "../util/backToTop";

type AppProps = {
  children: React.ReactNode;
};

export const App: React.FC<AppProps> = ({ children }) => {
  const data = useStaticQuery<Queries.AppQuery>(
    graphql`
      query App {
        file(name: { eq: "header_image" }) {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    `
  );

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const fabBottom = matches ? 16 : 32;
  const fabRight = matches ? 16 : 64;
  const width = matches ? "100%" : "70%";

  const headerImage = getImage(data.file?.childImageSharp || null);

  return (
    <>
      <Container fixed>
        <Paper sx={{ maxWidth: "lg", pb: 2 }}>
          <div id="scroll-top-anchor" />
          {headerImage && (
            <GatsbyImage image={headerImage} alt="header image" />
          )}
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
