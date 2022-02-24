import React from "react"
import { Link } from "gatsby"
import {
  HatenaShareButton,
  HatenaIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share"
import "@fontsource/source-code-pro"

import { CategoryList } from "../common/category"

export const Article = ({ frontmatter, html, url }) => {
  return (
    <main>
      <Link to="/" style={{ color: "black" }}>
        Home
      </Link>
      <article>
        <div className="content-header">
          <div className="content-meta">
            <h1 className="title">{frontmatter.title}</h1>
            <time dateTime={frontmatter.date}>{frontmatter.date}</time>
          </div>
          <CategoryList category={frontmatter.category}>
            <span>カテゴリ:</span>
          </CategoryList>
        </div>
        <div
          className="main-text"
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        ></div>
      </article>
      <div className="share-button">
        この記事をシェア:
        <div>
          <TwitterShareButton url={url}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
        </div>
        <div>
          <HatenaShareButton url={url}>
            <HatenaIcon size={32} />
          </HatenaShareButton>
        </div>
      </div>
    </main>
  )
}
