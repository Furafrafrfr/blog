import React from "react";
import { getSrc } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";
import { Box } from "@mui/system";

import { Avatar, useTheme, useMediaQuery } from "@mui/material";
import { Typography } from "@mui/material";

export const Header: React.FC = () => {
  const data = useStaticQuery<Queries.HeaderQuery>(graphql`
    query Header {
      file(name: { eq: "header_icon" }) {
        childImageSharp {
          gatsbyImageData
        }
        name
      }
    }
  `);

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
      {data.file?.childImageSharp && (
        <Avatar
          src={getSrc(data.file.childImageSharp)}
          sx={{
            width: matches ? "5rem" : "7rem",
            height: matches ? "5rem" : "7rem",
          }}
        />
      )}
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
