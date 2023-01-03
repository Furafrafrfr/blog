import React from "react";
import { Chip } from "@mui/material";
import { Link } from "gatsby";
import { createCategoryPath } from "../../util/createCategoryPath";

export const CategoryList: React.FC<{
  readonly category: readonly string[];
}> = ({ category }) => {
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
