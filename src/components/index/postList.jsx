import React from "react"
import { Link } from "gatsby"
import { CategoryList } from "../common/category"
import { useCategory } from "../../hooks/categoryState"
import { getMapKeys, getMapValues } from "../../util/mapUtil"
import { Card, Box, Typography, Collapse } from "@mui/material"
import { TransitionGroup } from "react-transition-group"

export const PostList = props => {
  let { posts } = props

  const { category } = useCategory()

  //選択されているカテゴリが全てカテゴリに含まれている記事をfilter()で探す。何も選択されてない場合は全部表示。
  //それをmap()でPostにする
  let filteredPosts = []
  if (getMapValues(category).some(val => val === true)) {
    let selectedCategory = getMapKeys(category).filter(key => category.get(key))
    filteredPosts = posts.filter(({ node }) =>
      selectedCategory.every(selected =>
        node.frontmatter.category.includes(selected)
      )
    )
  } else {
    filteredPosts = posts
  }

  return (
    <TransitionGroup>
      {filteredPosts.map(post => (
        <Collapse key={post.node.frontmatter.slug}>
          <div>
            <Post pageData={post.node.frontmatter} />
          </div>
        </Collapse>
      ))}
    </TransitionGroup>
  )
}

const Post = ({ pageData }) => {
  return (
    <Link to={pageData.slug} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          minHeight: 175,
          display: "flex",
          flexFlow: "column no-wrap",
          alignItems: "center",
          mb: 3,
          mx: "auto",
        }}
      >
        <Box my={0} mx={3}>
          <Typography component="h3" variant="h3s">
            {pageData.title}
          </Typography>
          <Typography variant="body2">{pageData.date}</Typography>
          <CategoryList category={pageData.category} />
        </Box>
      </Card>
    </Link>
  )
}
