import React from "react";
import "@fontsource/source-code-pro";
import { CategoryList } from "../common/category";
import { Typography, Box } from "@mui/material";
import { ShareButtons } from "../common/shareButtons";
import { HomeButton } from "../common/homeButon";

export const Article = ({ frontmatter, html }) => {
  let url = `https://furafrafrfr.github.io${frontmatter.slug}`;
  return (
    <main>
      <Box mb={1} sx={{ display: "flex", justifyContent: 'flex-end' }}>
        <HomeButton />
      </Box>
      <Box>
        <Typography component="h2" variant="h2s">
          {frontmatter.title}
        </Typography>
        <Typography variant="body2">{frontmatter.date}</Typography>
        <CategoryList category={frontmatter.category} />
      </Box>
      <Box component="main">
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
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
