import React from "react"
import { Typography, useMediaQuery } from "@mui/material"
import { Box } from "@mui/system"
import { PostList } from "./postList"
import { useTheme } from "@mui/material"
import { Button } from "gatsby-theme-material-ui"

export const Index = ({ posts, onFilterClick }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography component="h2" variant="h2s" my={1}>
          投稿
        </Typography>
        <div>{matches || <Button variant="outlined" onClick={onFilterClick}>フィルタ</Button>}</div>
      </Box>
      <Box>
        <PostList posts={posts} />
      </Box>
    </>
  )
}
