import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import { CategoryList } from "./category"
import { useCategory } from "../category/categoryState"
import { getMapKeys, getMapValues } from "../util/mapUtil"

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

  const [category] = useCategory()

  //選択されているカテゴリが全てカテゴリに含まれている記事をfilter()で探す。何も選択されてない場合は全部表示。
  //それをmap()でPostにする
  let { nodes } = data.allContentfulBlogPostV2

  //categoriesでvalueが全てfalseの場合noSelectedをtrueに
  let valueArray = getMapValues(category)
  let isAllSelected = valueArray.every(val => !val)

  if (isAllSelected) {
    //全て表示
    return nodes.map(({ content }, index) => (
      <Post pageData={content.childMarkdownRemark.frontmatter} key={index} />
    ))
  } else {
    //選ばれたカテゴリを全て含むものだけ表示
    let selectedCategory = getMapKeys(category).filter(key => category.get(key))
    let filteredNodes = nodes.filter(({ content }) =>
      selectedCategory.every(category =>
        content.childMarkdownRemark.frontmatter.category.includes(category)
      )
    )

    return filteredNodes.map(({ content }, index) => (
      <Post pageData={content.childMarkdownRemark.frontmatter} key={index} />
    ))
  }
}

function Post({ pageData }) {
  return (
    <Link to={pageData.slug} className="post-link">
      <article className="post">
        <div className="post-data">
          <div className="post-title">{pageData.title}</div>
          <CategoryList category={pageData.category} />

          <time dateTime={pageData.date} className="post-time">
            {pageData.date}
          </time>
        </div>
      </article>
    </Link>
  )
}
