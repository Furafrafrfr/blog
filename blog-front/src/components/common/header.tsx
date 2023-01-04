import React from "react";
import { getSrc } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";
import { Box } from "@mui/system";

import { Avatar, useTheme, useMediaQuery } from "@mui/material";
import { Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";

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
    <Box display="flex" justifyContent="space-around" my={2} mx="auto">
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
        <Box display="flex" justifyContent="space-between">
          <Typography
            component="h1"
            fontSize={theme.breakpoints.up("md") ? "2rem" : "1.75rem"}
          >
            ぐっちー
          </Typography>
          <Box>
            <IconButton href="https://github.com/Furafrafrfr" target="_blank">
              <GitHubIcon sx={{ color: "#24292f" }} />
            </IconButton>
            <IconButton href="https://twitter.com/Furafrafrfr" target="_blank">
              <TwitterIcon sx={{ color: "#1D9BF0" }} />
            </IconButton>
          </Box>
        </Box>
        <Typography component="p" variant="body2">
          経済学部の大学生です。ゲームをしたり本を読んだりプログラミングをしたりしています。C#とかReactとかGatsby.jsが好きです。
        </Typography>
      </Box>
    </Box>
  );
};
