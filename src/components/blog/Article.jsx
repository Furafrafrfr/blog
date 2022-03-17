import React from "react"
import { Button } from "gatsby-theme-material-ui"
import "@fontsource/source-code-pro"

import { CategoryList } from "../common/category"
import { Typography, Box } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"

import { TwitterShareButton } from "../common/twitterButton"
import { CopyTextButton } from "../common/copy"

export const Article = ({ frontmatter, html }) => {
  let url = `https://furafrafrfr.github.io/${frontmatter.slug}`
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
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="nowrap"
        alignItems="center"
        justifySelf="center"
      >
        <Box mr={2}>
          <Typography variant="body1">この投稿をシェア:</Typography>
        </Box>
        <Box mr={2}>
          <TwitterShareButton text={frontmatter.title} url={url} />
        </Box>
        <Box>
          <CopyTextButton text={url} />
        </Box>
      </Box>
    </main>
  )
}
