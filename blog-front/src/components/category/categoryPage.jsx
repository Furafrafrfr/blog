import React from "react";
import { Box } from "@mui/system";
import { PostList } from "../index/postList";
import { HomeButton } from "../common/homeButon";
import { CategoryList } from "../common/category";

export const CategoryPage = ({ posts, category }) => {
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <CategoryList category={[category]} />
        <HomeButton />
      </Box>
      <Box>
        <PostList posts={posts} />
      </Box>
    </>
  );
};
