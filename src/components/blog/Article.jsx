import React from "react";
import { Button } from "gatsby-theme-material-ui";
import { MDXRenderer } from "gatsby-plugin-mdx";
import "@fontsource/source-code-pro";

import { CategoryList } from "../common/category";
import { Typography, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import { ShareButtons } from "../common/shareButtons";

export const Article = ({ frontmatter, body }) => {
  let url = `https://furafrafrfr.github.io${frontmatter.slug}`;
  return (
    <main>
      <Box mb={1}>
        <Button to="/" variant="text">
          <HomeIcon />
          Home
        </Button>
      </Box>
      <Box>
        <Typography component="h2" variant="h2s">
          {frontmatter.title}
        </Typography>
        <Typography variant="body2">{frontmatter.date}</Typography>
        <CategoryList category={frontmatter.category} />
      </Box>
      <Box component="main">
        <MDXRenderer>{body}</MDXRenderer>
      </Box>
      <Box justifyContent="left" my={1}>
        <ShareButtons
          url={url}
          tweetText={frontmatter.title.concat("from ぐちろぐ")}
        />
      </Box>
    </main>
  );
};
