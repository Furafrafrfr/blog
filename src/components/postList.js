import React from "react"
import { Link } from "gatsby"
import { CategoryList } from "./category"
import { useCategory } from "../category/categoryState"
import { getMapKeys, getMapValues } from "../util/mapUtil"

export default function PostList(props) {
  let { posts } = props

  const [allCategory] = useCategory()

  //選択されているカテゴリが全てカテゴリに含まれている記事をfilter()で探す。何も選択されてない場合は全部表示。
  //それをmap()でPostにする
  if (getMapValues(allCategory).some(val => val === true)) {
    return posts.map(({ node }) => (
      <Post pageData={node.frontmatter} key={node.frontmatter.slug} />
    ))
  } else {
    return posts
      .filter(({ node: { frontmatter: { category } } }) =>
        category.every(c =>
          getMapKeys(allCategory).some(category => category === c)
        )
      )
      .map(({ node }) => {
        return (
          <Post
            pageData={node.frontmatter}
            key={node.frontmatter.slug}
          />
        )
      })
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
