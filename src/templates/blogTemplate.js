import React from "react"
import { graphql, Link, navigate, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import { CategoryTagButtonList } from "../components/category"
import Head from "../components/head"
import {
  HatenaShareButton,
  HatenaIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share"
import "@fontsource/source-code-pro"
import { CategoryScope } from "../category/categoryState"

export default function Template({ location, data, pageContext }) {


  let contentfulBlogPost = data.contentfulBlogPostV2

  let handleSelectedCategoryChange = cat => {
    navigate("/", { state: { category: cat.catName } })
  }

  let url = `${data.site.siteMetadata.siteUrl}${location.pathname}`
  return (
    <React.Fragment>
      <Head
        title={contentfulBlogPost.title}
        description={contentfulBlogPost.content.content}
        siteUrl={contentfulBlogPost.slug}
      />
      <CategoryScope categories={initialCategories}>
        <Layout>
          <main>
            <Link to="/" style={{ color: "black" }}>
              Home
            </Link>
            <article>
              <div className="content-header">
                <div className="content-meta">
                  <h1 className="title">{contentfulBlogPost.title}</h1>
                  <time dateTime={contentfulBlogPost.date}>
                    {contentfulBlogPost.date}
                  </time>
                </div>
                <CategoryTagButtonList>
                  <span>カテゴリ:</span>
                </CategoryTagButtonList>
              </div>
              <div
                className="main-text"
                dangerouslySetInnerHTML={{
                  __html: contentfulBlogPost.content.childMarkdownRemark.html,
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
        </Layout>
      </CategoryScope>
    </React.Fragment>
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
