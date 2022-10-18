import React from "react";
import { useCategory } from "../../hooks/categoryState";
import { getMapKeys } from "../../util/mapUtil";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import {
  Checkbox,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
config.autoAddCss = false;

export const CategorySelector = () => {
  const { category, toggleCategory } = useCategory();

  return (
    <List>
      {getMapKeys(category).map((key) => (
        <ListItem dense sx={{ pl: 0 }} key={key}>
          <ListItemButton onClick={() => toggleCategory(key)} key={key}>
            <Checkbox checked={category.get(key)} sx={{ px: 0.5, py: 0 }} />
            <ListItemText>{key}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export const CategoryList = ({ category }) => {
  return (
    <Box my={2}>
      {category.map((key) => (
        <Chip variant="outlined" label={key} key={key} sx={{ mr: 1 }} />
      ))}
    </Box>
  );
};
