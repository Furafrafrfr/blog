import React from "react";
import { Box } from "@mui/system";
import { PostList } from "./postList";

type IndexProps = {
  posts: Frontmatter[];
};

export const Index: React.FC<IndexProps> = ({ posts }) => {
  return (
    <>
      <Box>
        <PostList posts={posts} />
      </Box>
    </>
  );
};
