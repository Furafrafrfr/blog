import { graphql, useStaticQuery } from "gatsby";

export const useHeadQuery = () => {
  const query = useStaticQuery<Queries.HeadQuery>(graphql`
    query Head {
      site {
        siteMetadata {
          siteUrl
          description
          lang
          title
        }
      }
      file(name: { eq: "header_icon" }) {
        childImageSharp {
          gatsbyImageData(height: 600, width: 600)
        }
      }
    }
  `);

  return {
    ...query?.site?.siteMetadata,
    ogpImg: query.file?.childImageSharp || undefined,
  };
};
