import React from "react";
import { getSrc } from "gatsby-plugin-image";
import { useHeadQuery } from "../../hooks/useHeadQuery";

export const Head: React.FC<{ pathname: string }> = ({ pathname }) => {
  const data = useHeadQuery();

  const { title, description, siteUrl, ogpImg } = data;

  const pageUrl = siteUrl + pathname;
  return (
    <>
      <html lang={title || "ja-jp"} />
      <title>{title}</title>
      <meta name="description" content={description || "ぐっちーのブログ"} />
      <link rel="canonical" href={pageUrl} />

      <meta name="og:title" content={title || "ぐちろぐ"} />
      <meta name="og:type" content="website" />
      <meta name="og:url" content={pageUrl} />
      {siteUrl && ogpImg && (
        <meta name="og:image" content={siteUrl + getSrc(ogpImg)} />
      )}
      <meta name="og:images:type" content="image/png" />
      <meta name="twitter:card" content="summary" />
    </>
  );
};
