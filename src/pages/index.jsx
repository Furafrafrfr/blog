import React, { useState } from "react";
import { graphql } from "gatsby";
import { useTheme } from "@mui/system";
import { useMediaQuery } from "@mui/material";

import "../styles/style.css";
import { CategoryDialog } from "../components/common/categoryDialog";
import { Index } from "../components/index/Index";
import { Head } from "../components/common/head";

const Home = ({ data }) => {
  const posts = data.allMdx.edges;
  const [dialogOpen, setDialogOpen] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Head
        title={data.site.siteMetadata.title}
        description={data.site.siteMetadata.description}
        lang={data.site.siteMetadata.lang}
        siteUrl={data.site.siteMetadata.siteUrl}
        pageUrl={data.site.siteMetadata.siteUrl}
        avatar={data.file}
      />
      <Index posts={posts} onFilterClick={() => setDialogOpen(true)} />
      {matches && (
        <CategoryDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </>
  );
};

export default Home;

export const query = graphql`
  query MyQuery {
    site {
      siteMetadata {
        siteUrl
        description
        lang
        title
      }
    }
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          frontmatter {
            category
            date(formatString: "YYYY-MM-DD")
            slug
            title
          }
        }
      }
    }
    file(name: { eq: "header_icon" }) {
      childImageSharp {
        gatsbyImageData(height: 600, width: 600)
      }
    }
  }
`;
