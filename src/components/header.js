import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"

import { CategoryTagButtonList } from "./category"
import { useCategories } from "../category/categoryState"

config.autoAddCss = false

export default function Header() {
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
      <Introduction data={data} />
      <Category />
    </header>
  )
}

function Introduction({ data }) {
  return (
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
      <a
        href="https://twitter.com/Furafrafrfr"
        target="_blank"
        rel="noopner noreferrer"
      >
        @Furafrafrfr
      </a>
    </section>
  )
}

function Category() {
  const [isDisplayed, setIsDisplayed] = React.useState(true)
  const [categories, setCategories] = useCategories()

  return (
    <section>
      <h3 style={{ textAlign: "center" }}>
        <buton
          type="button"
          onClick={() => setIsDisplayed(!isDisplayed)}
          style={{
            backgroundColor: "white",
            border: "none",
            fontSize: "inherit",
            fontWeight: "inherit",
          }}
        >
          カテゴリー一覧
          <FontAwesomeIcon
            icon={isDisplayed ? faChevronDown : faChevronLeft}
            style={{ margin: "0 0.5rem", opacity: "0.5" }}
          />
        </buton>
      </h3>

      <div style={{ display: isDisplayed ? "block" : "none" }}>
        <button
          className="reset"
          onClick={() =>
            Array.from(categories.keys()).forEach(
              category => categories.get(category) && setCategories(category)
            )
          }
        >
          リセット
        </button>
        <CategoryTagButtonList style={{marginTop:"15px"}}/>
      </div>
    </section>
  )
}
