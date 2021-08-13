import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import { CategoryTagList } from "./category"
import { useCategories } from "../category/categoryState"

export default function PostList(props) {
  const data = useStaticQuery(graphql`
    {
      allContentfulBlogPostV2(
        sort: {
          fields: content___childrenMarkdownRemark___frontmatter___date
          order: DESC
        }
      ) {
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

  //選択されているカテゴリが全てカテゴリに含まれている記事をfilter()で探す。何も選択されてない場合は全部表示。
  //それをmap()でPostにする
  return data.allContentfulBlogPostV2.nodes
    .filter(({ content }) =>
      Array.from(categories.values()).every(val => !val)
        ? true
        : Array.from(categories.keys()).filter(key=>categories.get(key)).every(key =>
            content.childMarkdownRemark.frontmatter.category.includes(key)
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
