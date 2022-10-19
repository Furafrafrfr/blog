import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import {
  Chip,
} from "@mui/material";
import { Link } from "gatsby";
import { createCategoryPath } from "../../util/createCategoryPath";

config.autoAddCss = false;

export const CategoryList = ({ category }) => {
  return (
    <>
      {category.map((key) => (
        <Link
          key={key}
          to={createCategoryPath(key)}
          style={{ textDecoration: "none" }}
        >
          <Chip
            variant="outlined"
            label={key}
            clickable
            sx={{
              mr: 1,
            }}
          />
        </Link>
      ))}
    </>
  );
};
