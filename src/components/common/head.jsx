import React from "react"
import { Helmet } from "react-helmet"

export const Head = ({ title, description, lang, siteUrl, avatar }) => {

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={siteUrl} />

      <meta name="og:title" content={title} />
      <meta name="og:type" content="website" />
      <meta name="og:url" content={siteUrl} />
      <meta name="og:image" content={avatar.src} />
      <meta name="og:images:type" content="image/png" />
      <meta name="og:image:width" content={avatar.width} />
      <meta name="og:image:height" content={avatar.height} />
      <meta name="twitter:card" content="summary" />
    </Helmet>
  )
}
