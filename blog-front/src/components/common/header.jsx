import React from "react";
import { getSrc } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";
import { Box } from "@mui/system";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

import { Avatar, useTheme, useMediaQuery } from "@mui/material";
import { Typography } from "@mui/material";

config.autoAddCss = false;

export const Header = () => {
  const data = useStaticQuery(graphql`
    {
      allFile(filter: { name: { eq: "header_icon" } }) {
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

  const headerAvatarSrc = getSrc(
    data.allFile.edges.filter(({ node }) => node.name === "header_icon")[0].node
  );

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      my={2}
      mx="auto"
    >
      <Avatar
        src={headerAvatarSrc}
        sx={{
          width: matches ? "5rem" : "7rem",
          height: matches ? "5rem" : "7rem",
        }}
      />
      <Box mx={2}>
        <Typography component="h1" variant="h1s" my={1}>
          ぐっちー
        </Typography>
        <Typography component="p" variant={"body2"}>
          経済学部の大学生をやっています。ゲームをしたり本を読んだりプログラミングをしたりしています。C#とかReactとかGatsby.jsが好きです。
        </Typography>
      </Box>
    </Box>
  );
};
