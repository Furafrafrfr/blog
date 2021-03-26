import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"

export default function Head(props) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          lang
          description
          siteUrl
        }
      }
      allFile(filter: { name: { eq: "unnamed" } }) {
        edges {
          node {
            childImageSharp {
              original {
                height
                src
                width
              }
            }
          }
        }
      }
    }
  `)

  const title = props.title
    ? `${props.title} | ${data.site.siteMetadata.title}`
    : data.site.siteMetadata.title
  const description = props.description || data.site.siteMetadata.description
  const siteUrl = props.siteUrl
    ? `${data.site.siteMetadata.siteUrl}${props.siteUrl}`
    : data.site.siteMetadata.siteUrl

  return (
    <Helmet>
      <html lang={data.site.siteMetadata.lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={siteUrl} />

      <meta name="og:title" content={title} />
      <meta name="og:type" content="website" />
      <meta
        name="og:image"
        content={`${data.site.siteMetadata.siteUrl}${data.allFile.edges[0].node.childImageSharp.original.src}`}
      />
      <meta name="og:url" content={siteUrl} />
      <meta name="og:images:type" content="image/png" />
      <meta
        name="og:image:width"
        content={`${data.allFile.edges[0].node.childImageSharp.original.width}`}
      />
      <meta
        name="og:image:height"
        content={`${data.allFile.edges[0].node.childImageSharp.original.height}`}
      />
      <meta name="twitter:card" content="summary"/>
    </Helmet>
  )
}
