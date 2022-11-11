import React, { useState } from "react";
import { Link } from "gatsby";
import { CategoryList } from "../common/category";
import { Card, Box, Typography } from "@mui/material";
import { useIsUpBreakpoint } from "../../hooks/style";
import type { MarkdownFmNode } from "../../types/postData";

type PostListProps = {
  posts: MarkdownFmNode[];
};

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <Post
          key={post.node.frontmatter.slug}
          pageData={post.node.frontmatter}
        />
      ))}
    </>
  );
};

type PostProps = {
  pageData: Frontmatter;
};

const Post: React.FC<PostProps> = ({ pageData }) => {
  const [mouseEnter, setMouseEnter] = useState(false);
  const matches = useIsUpBreakpoint("md");

  return (
    <Link to={pageData.slug} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          display: "flex",
          flexFlow: "column no-wrap",
          alignItems: "center",
          mb: 3,
          mx: "auto",
        }}
        raised={mouseEnter}
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
      >
        <Box my={0} mx={3} py={3}>
          <Typography
            component="h3"
            fontSize={matches ? "1.5rem" : "1.25rem"}
            mb={1}
          >
            {pageData.title}
          </Typography>
          <Box mb={1}>
            <Typography component="time" variant="body2">
              {pageData.date}
            </Typography>
          </Box>
          <CategoryList category={pageData.category} />
        </Box>
      </Card>
    </Link>
  );
};
