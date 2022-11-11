import React from "react";
import { Box } from "@mui/system";
import { PostList } from "./postList";
import { MarkdownFmNode } from "../../types/postData";

type IndexProps = {
  posts: MarkdownFmNode[];
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
