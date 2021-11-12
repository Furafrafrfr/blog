import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import { CategoryTagList } from "./category"
import { useCategories } from "../category/categoryState"
import {keysArray, valuesArray} from "../util/mapUtil"

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
  let { nodes } = data.allContentfulBlogPostV2

  //categoriesでvalueが全てfalseの場合noSelectedをtrueに
  let valueArray = valuesArray(categories)
  let noSelected = valueArray.every(val => !val)

  if (noSelected) {
    //全て表示
    return nodes.map(({ content }, index) => (
      <Post pageData={content.childMarkdownRemark.frontmatter} key={index} />
    ))
  }

  //選ばれたカテゴリを全て含むものだけ表示
  let selectedCategory = keysArray(categories).filter(key => categories.get(key))
  let filteredNodes = nodes.filter(({ content }) =>
    selectedCategory.every(category =>
      content.childMarkdownRemark.frontmatter.category.includes(category)
    )
  )

  return filteredNodes.map(({ content }, index) => (
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
