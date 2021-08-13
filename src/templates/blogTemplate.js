import React, { useEffect } from "react"
import { graphql, Link, navigate } from "gatsby"
import Layout from "../components/layout"
import { CategoryTagList } from "../components/category"
import Head from "../components/head"
import {
  HatenaShareButton,
  HatenaIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share"
import "@fontsource/source-code-pro"
import { CategoryScope } from "../category/categoryState"
import { useCategories } from "../category/categoryState"

export default function Wrapper({ location, data, pageContext }) {
  let frontmatter =
    data.contentfulBlogPostV2.content.childMarkdownRemark.frontmatter

  let initialCategories = new Map(
    pageContext.categories.map(key => [key, false])
  )
  console.log(pageContext.categories)
  let url = `${data.site.siteMetadata.siteUrl}${location.pathname}`

  return (
    <React.Fragment>
      <Head
        title={frontmatter.title}
        description=""
        siteUrl={frontmatter.slug}
      />
      <CategoryScope categories={initialCategories}>
        <Layout>
          <Template
            frontmatter={frontmatter}
            html={data.contentfulBlogPostV2.content.childMarkdownRemark.html}
            url={url}
          />
        </Layout>
      </CategoryScope>
    </React.Fragment>
  )
}

function Template({ frontmatter, html, url }) {
  const [categories] = useCategories()

  useEffect(() => {
    let keys = Array.from(categories.keys())
    let filtered = keys.filter(key => categories.get(key))
    if (filtered.length > 0)
      navigate("/", {
        state: {
          category: filtered[0],
        },
      })
  })
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
          <CategoryTagList category={frontmatter.category}>
            <span>カテゴリ:</span>
          </CategoryTagList>
        </div>
        <div
          className="main-text"
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        ></div>
      </article>
      <div className="share-button">
        この記事をシェア：
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

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    contentfulBlogPostV2(
      content: { childMarkdownRemark: { frontmatter: { slug: { eq: $slug } } } }
    ) {
      content {
        childMarkdownRemark {
          frontmatter {
            category
            date(formatString: "YYYY-MM-DD")
            slug
            title
          }
          html
        }
      }
    }
  }
`
