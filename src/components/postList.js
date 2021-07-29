import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { PostCategoryList } from "./category"

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

  return data.allContentfulBlogPost.edges.map((edge, index) => {
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
  })
}

function Post(props) {
  let pageData = props.pageData

  return (
    <Link to={pageData.slug} className="post-link">
      <article className="post" style={props.childStyle}>
        {pageData.eyecatch && (
          <GatsbyImage
            image={pageData.eyecatch.gatsbyImageData}
            className="eyecatch"
            alt="アイキャッチ画像"
          />
        )}
        <div className="post-data">
          <div className="post-title">{pageData.title}</div>
          <PostCategoryList
            category={getSelectedCat(pageData.category, Root)}
            onSelectedCategoryChange={() => {}}
            bgColor
          ></PostCategoryList>

          <time dateTime={pageData.date} className="post-time">
            {pageData.date}
          </time>
        </div>
      </article>
    </Link>
  )
}
