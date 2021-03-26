import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"

import RootCategory from "../categoryTree"
import TreeCategoryList from "./treeCategoryList"

export default function Header(props) {
  const data = useStaticQuery(graphql`
    {
      allFile(filter: { name: { eq: "unnamed" } }) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
        }
      }
    }
  `)
  return (
    <header className="header">
      <section className="me">
        <figure className="icon">
          <GatsbyImage
            image={data.allFile.edges[0].node.childImageSharp.gatsbyImageData}
            style={{ border: "3px solid grey", borderRadius: "50%" }}
            alt="アイコン"
          />
        </figure>
        <h2>ぐっちー</h2>
        <p>
          ぐっちーと言います。経済学部の大学生です。C#を使ってみたりWeb関連の勉強をしています。
          質問、指摘などがありましたらTwitterアカウントのほうまで
        </p>
        <a href="https://twitter.com/Furafrafrfr" target="_blank" rel="noopner noreferrer">@Furafrafrfr</a>
      </section>
      <CategoryWrapper
        reset={props.reset}
        category={RootCategory}
        selectedCategory={props.selectedCategory}
        onSelectedCategoryChange={props.onSelectedCategoryChange}
      />
    </header>
  )
}

function CategoryWrapper(props) {
  let [isDisplayed, setIsDisplayed] = React.useState(true)
  return (
    <section className="category-list tree">
      <h3 style={{textAlign:"center"}}>
        カテゴリー一覧
        <button
          className="display"
          onClick={() => setIsDisplayed(!isDisplayed)}
        >
          表示/非表示
        </button>
      </h3>
      <div style={{ display: isDisplayed ? "block" : "none" }}>
        <button className="reset" onClick={() => props.reset()}>
          リセット
        </button>
        <TreeCategoryList
          category={RootCategory}
          selectedCategory={props.selectedCategory}
          onSelectedCategoryChange={props.onSelectedCategoryChange}
        />
      </div>
    </section>
  )
}
