import React from "react";
import { Box } from "@mui/system";
import { PostList } from "./postList";

export const Index = ({ posts }) => {
  return (
    <>
      <Box>
        <PostList posts={posts} />
      </Box>
    </>
  );
};
