import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { CategoryTagList } from "./category"
import { useCategories } from "../category/categoryState"

export default function PostList(props) {
  const data = useStaticQuery(graphql`
    {
      allContentfulBlogPostV2 {
        nodes {
          content {
            childMarkdownRemark {
              frontmatter {
                category
                date(formatString: "YYYY-MM-DD")
                slug
                title
              }
            }
          }
        }
      }
    }
  `)

  const [categories] = useCategories()

  //選択されているカテゴリが全てカテゴリに含まれている記事をfilter()で探す
  //それをmap()でPostにする
  return data.allContentfulBlogPostV2.nodes
    .filter(({ content }) =>
      Array.from(categories.values()).every(val => !val)
        ? true
        : content.childMarkdownRemark.frontmatter.category.some(category =>
            categories.get(category)
          )
    )
    .map(({ content }, index) => (
      <Post pageData={content.childMarkdownRemark.frontmatter} key={index} />
    ))
}

function Post({ pageData }) {
  return (
    <Link to={pageData.slug} className="post-link">
      <article className="post">
        {pageData.eyecatch && (
          <GatsbyImage
            image={pageData.eyecatch.gatsbyImageData}
            className="eyecatch"
            alt="アイキャッチ画像"
          />
        )}
        <div className="post-data">
          <div className="post-title">{pageData.title}</div>
          <CategoryTagList category={pageData.category} />

          <time dateTime={pageData.date} className="post-time">
            {pageData.date}
          </time>
        </div>
      </article>
    </Link>
  )
}
