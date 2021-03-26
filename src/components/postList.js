import React, { Fragment } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Post from "./post"

import { getSelectedCat } from "../categoryController"
import Root from "../categoryTree"

export default function PostList(props) {
  const data = useStaticQuery(graphql`
    {
      allContentfulBlogPost(sort: { order: DESC, fields: date }) {
        edges {
          node {
            slug
            date(formatString: "YYYY-MM-DD")
            title
            category
            eyecatch {
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
        }
      }
    }
  `)

  return (
    <Fragment>
      {data.allContentfulBlogPost.edges.map((edge, index) => {
        let dispaly = false

        if (props.selectedCategory.length === 0) {
          dispaly = true
        } else {
          dispaly = props.selectedCategory.every(selected =>
            getSelectedCat(edge.node.category, Root).findIndex(
              listed => listed === selected
            ) >= 0
              ? true
              : false
          )
        }

        return (
          <Post
            pageData={edge.node}
            key={index}
            childStyle={{ display: dispaly ? "" : "none" }}
          />
        )
      })}
    </Fragment>
  )
}
