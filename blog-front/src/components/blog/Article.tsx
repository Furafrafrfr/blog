import React from "react";
import "@fontsource/source-code-pro";
import { CategoryList } from "../common/category";
import { Typography, Box, useTheme } from "@mui/material";
import { ShareButtons } from "../common/shareButtons";
import { HomeButton } from "../common/homeButon";

type ArticleProps = {
  readonly frontmatter: DeepAllNullable<Frontmatter>;
  readonly html: string;
};

export const Article: React.FC<ArticleProps> = ({ frontmatter, html }) => {
  const url = `https://furafrafrfr.github.io${frontmatter.slug}`;
  const theme = useTheme();

  return (
    <main>
      <Box mb={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <HomeButton />
      </Box>
      <Box>
        <Typography
          component="h2"
          fontSize={theme.breakpoints.up("md") ? "1.75rem" : "1.5rem"}
        >
          {frontmatter.title}
        </Typography>
        <Typography variant="body2">{frontmatter.date}</Typography>
        <CategoryList
          category={
            (frontmatter.category?.filter((val) => val) as string[]) || []
          }
        />
      </Box>
      <Box component="main">
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </Box>
      <Box justifyContent="left" my={1}>
        <ShareButtons
          url={url}
          tweetText={frontmatter.title?.concat(" from ぐちろぐ") || "ぐちろぐ"}
        />
      </Box>
    </main>
  );
};
