import React from "react"
import { Helmet } from "react-helmet"
import { getSrc } from "gatsby-plugin-image"

export const Head = ({
  title,
  description,
  lang,
  siteUrl,
  pageUrl,
  avatar,
}) => {
  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={pageUrl} />

      <meta name="og:title" content={title} />
      <meta name="og:type" content="website" />
      <meta name="og:url" content={pageUrl} />
      <meta name="og:image" content={`${siteUrl}${getSrc(avatar)}`} />
      <meta name="og:images:type" content="image/png" />
      <meta name="twitter:card" content="summary" />
    </Helmet>
  )
}
