import React from "react";
import { getSrc } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";
import { Box } from "@mui/system";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

import { Avatar, useTheme, useMediaQuery } from "@mui/material";
import { Typography } from "@mui/material";

config.autoAddCss = false;

export const Header: React.FC = () => {
  const data = useStaticQuery<
    Override<Queries.HeaderQuery, ImageFileNode>
  >(graphql`
    query Header {
      file(name: { eq: "header_icon" }) {
        childImageSharp {
          gatsbyImageData
        }
        name
      }
    }
  `);

  const headerAvatarSrc = getSrc(data.file);

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
        <Typography
          component="h1"
          fontSize={theme.breakpoints.up("md") ? "2rem" : "1.75rem"}
          my={1}
        >
          ぐっちー
        </Typography>
        <Typography component="p" variant="body2">
          経済学部の大学生をやっています。ゲームをしたり本を読んだりプログラミングをしたりしています。C#とかReactとかGatsby.jsが好きです。
        </Typography>
      </Box>
    </Box>
  );
};
