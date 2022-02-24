import React from "react"
import { CategorySelector } from "../common/category"
import { PostList } from "./postList"
import { useCategory } from "../../hooks/categoryState"
import { getMapValues } from "../../util/mapUtil"

export const Index = ({ posts }) => {
  const [category] = useCategory()
  return (
    <main className="blog-posts">
      <h2>投稿</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "1rem",
          width: "100%",
        }}
      >
        <div style={{ flexShrink: "0" }}>カテゴリー:</div>
        <div style={{ display: "flex", flexDirection: "row", flexGrow: "1" }}>
          {getMapValues(category).some(isSelected => isSelected) ? (
            <CategorySelector />
          ) : (
            <div
              style={{
                color: "grey",
                margin: "0px 3px",
                textAlign: "center",
                width: "100%",
              }}
            >
              カテゴリーが選択されていません
            </div>
          )}
        </div>
      </div>
      <PostList posts={posts} />
    </main>
  )
}
