import React from "react"
import { graphql } from "gatsby"
import "../styles/style.css"
import Page from "../components/layout"
import PostList from "../components/postList"
import { SelectedCategoryList } from "../components/category"
import Head from "../components/head"
import { useCategory, CategoryScope } from "../category/categoryState"
import { getMapValues } from "../util/mapUtil"

export default function Home({ location, data }) {
  //カテゴリの設定
  let initialCategory = new Map()
  data.blogContext.category.forEach(key => initialCategory.set(key, false))

  //記事ページからカテゴリを指定されて飛んできたときにそのカテゴリをtrueな感じにする
  let selected = location.state && location.state.category
  if (selected)
    for (let cat of location.state.category) initialCategory.set(cat, true)

  return (
    <React.Fragment>
      <Head siteUrl="/" />
      <CategoryScope category={initialCategory}>
        <App />
      </CategoryScope>
    </React.Fragment>
  )
}

function App() {
  const [category] = useCategory()
  console.log(category)
  return (
    <Page>
      <main className="blog-posts">
        <h2>投稿</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "1rem",
          }}
        >
          <div>カテゴリー:</div>
          {getMapValues(category).some(isSelected => isSelected) ? (
            <SelectedCategoryList />
          ) : (
            <div
              style={{
                color: "grey",
                margin: "3px auto",
                height: "1.5rem",
              }}
            >
              カテゴリーが選択されていません
            </div>
          )}
        </div>
        <PostList />
      </main>
    </Page>
  )
}

export const query = graphql`
  query MyQuery {
    blogContext {
      category
    }
  }
`
