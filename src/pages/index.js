import React from "react"
import { graphql } from "gatsby"
import "../styles/style.css"
import Page from "../components/layout"
import PostList from "../components/postList"
import { CategoryTagButtonList } from "../components/category"
import Head from "../components/head"
import { useCategories, CategoryScope } from "../category/categoryState"

export default function Home({ location, data }) {
  let selected = location.state && location.state.category

  let initialCategories = new Map()
  data.blogContext.category.forEach(key => initialCategories.set(key, false))

  if (selected)
    for (let cat of location.state.category) initialCategories.set(cat, true)

  return (
    <React.Fragment>
      <Head siteUrl="/" />
      <CategoryScope categories={initialCategories}>
        <App />
      </CategoryScope>
    </React.Fragment>
  )
}

function App() {
  const [categories] = useCategories()
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
          <div>カテゴリー：</div>
          {Array.from(categories.keys()).some(key => categories.get(key)) ? (
            <CategoryTagButtonList showOnlySelected={true} />
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
