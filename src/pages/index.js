import React, { useState } from "react"
import "../styles/style.css"
import Page from "../components/layout"
import PostList from "../components/postList"
import { PostCategoryList } from "../components/category"
import Root from "../categoryTree"
import Head from "../components/head"

export default function Home({ location }) {
  let stateCategory

  if (location.state) {
    stateCategory = Root.searchByCatName(location.state.category)
  }

  const [selectedCategory, setSelectedCategory] = useState(
    stateCategory !== undefined
      ? stateCategory !== null
        ? [stateCategory]
        : []
      : []
  )

  let handleSelectedCategoryChange = category => {
    let index = selectedCategory.findIndex(
      scat => scat.catName === category.catName
    )
    if (index === -1) {
      setSelectedCategory(selectedCategory.concat([category]))
    } else {
      setSelectedCategory(
        selectedCategory.filter((scat, arrIndex) => arrIndex !== index)
      )
    }
  }

  let resetSelectedCategory = () => {
    setSelectedCategory([])
  }

  return (
    <React.Fragment>
      <Head siteUrl="/" />
      <Page
        selectedCategory={selectedCategory}
        onSelectedCategoryChange={handleSelectedCategoryChange}
        reset={resetSelectedCategory}
      >
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
            {selectedCategory.length >= 1 ? (
              <PostCategoryList
                category={selectedCategory}
                onSelectedCategoryChange={handleSelectedCategoryChange}
                bgColor
                cross
              />
            ) : (
              <div
                style={{ color: "grey", margin: "3px auto", height: "1.5rem" }}
              >
                カテゴリーが選択されていません
              </div>
            )}
          </div>
          <PostList selectedCategory={selectedCategory} />
        </main>
      </Page>
    </React.Fragment>
  )
}
