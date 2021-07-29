import React from "react"
import { graphql, Link, navigate } from "gatsby"
import Layout from "../components/layout"
import RootCategory from "../categoryTree"
import { getSelectedCat } from "../categoryController"
import { PostCategoryList } from "../components/category"
import { GatsbyImage } from "gatsby-plugin-image"
import Head from "../components/head"
import {
  HatenaShareButton,
  HatenaIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share"
import "@fontsource/source-code-pro"

export default function Template({ location, data }) {
  let contentfulBlogPost = data.contentfulBlogPost

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
      <Layout
        pathname={location.pathname}
        category={RootCategory}
        selectedCategory={[]}
        onSelectedCategoryChange={handleSelectedCategoryChange}
      >
        <main>
          <Link to="/" style={{ color: "black" }}>
            Home
          </Link>
          <article>
            <div className="content-header">
              {contentfulBlogPost.eyecatch && (
                <figure style={{ margin: 0 }}>
                  <GatsbyImage
                    image={contentfulBlogPost.eyecatch.gatsbyImageData}
                    alt="アイキャッチ画像"
                    className="post-eyecatch"
                  />
                </figure>
              )}
              <div className="content-meta">
                <h1 className="title">{contentfulBlogPost.title}</h1>
                <time dateTime={contentfulBlogPost.date}>
                  {contentfulBlogPost.date}
                </time>
              </div>
              <PostCategoryList
                category={getSelectedCat(
                  contentfulBlogPost.category,
                  RootCategory
                )}
                onSelectedCategoryChange={handleSelectedCategoryChange}
                bgColor
              >
                <span>カテゴリ:</span>
              </PostCategoryList>
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
    </React.Fragment>
  )
}
export const pageQuery = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      category
      title
      date(formatString: "YYYY-MM-DD")
      slug
      eyecatch {
        gatsbyImageData(layout: CONSTRAINED)
      }
      content {
        childMarkdownRemark {
          html
        }
        content
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
