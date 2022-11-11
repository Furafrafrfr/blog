import React from "react";
import { Helmet } from "react-helmet";
import { getSrc, ImageDataLike } from "gatsby-plugin-image";

type HeadProp = {
  title: string | undefined;
  description: string | undefined;
  lang: string | undefined;
  siteUrl: string;
  pageUrl: string;
  avatar: ImageDataLike | undefined;
};

export const Head: React.FC<HeadProp> = ({
  title,
  description,
  lang,
  siteUrl,
  pageUrl,
  avatar,
}) => {
  return (
    <Helmet>
      <html lang={lang || "ja-jp"} />
      <title>{title}</title>
      <meta name="description" content={description || "ぐっちーのブログ"} />
      <link rel="canonical" href={pageUrl} />

      <meta name="og:title" content={title || "ぐちろぐ"} />
      <meta name="og:type" content="website" />
      <meta name="og:url" content={pageUrl} />
      {avatar && (
        <meta name="og:image" content={`${siteUrl}${getSrc(avatar)}`} />
      )}
      <meta name="og:images:type" content="image/png" />
      <meta name="twitter:card" content="summary" />
    </Helmet>
  );
};
