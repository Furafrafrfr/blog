import React, { useState } from "react";
import { Link } from "gatsby";
import { CategoryList } from "../common/category";
import { Card, Box, Typography, Collapse } from "@mui/material";
import { TransitionGroup } from "react-transition-group";

export const PostList = (props) => {
  let { posts } = props;

  return posts.map((post) => <Post key={post.node.frontmatter.slug} pageData={post.node.frontmatter} />);
};

const Post = ({ pageData }) => {
  const [mouseEnter, setMouseEnter] = useState(false);

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
          <Typography component="h3" variant="h3s" mb={1}>
            {pageData.title}
          </Typography>
          <Box mb={1}>
            <Typography component="date" variant="body2">
              {pageData.date}
            </Typography>
          </Box>
          <CategoryList category={pageData.category} />
        </Box>
      </Card>
    </Link>
  );
};
