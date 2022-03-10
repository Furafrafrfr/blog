import React from "react"
import {  Typography } from "@mui/material"
import { Box } from "@mui/system"
import { PostList } from "./postList"

export const Index = ({ posts }) => {
  return (
    <>
      <Typography component="h2" variant="h2s" my={1}>投稿</Typography>
      <Box>
        <PostList posts={posts}/>
      </Box>
    </>
  )
}
