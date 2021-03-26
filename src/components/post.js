import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { getSelectedCat } from "../categoryController"
import Root from "../categoryTree"
import PostCategoryList from "./rowCategoryList"

export default function Post(props) {
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
