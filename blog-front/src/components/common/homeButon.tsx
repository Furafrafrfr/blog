import React from "react";
import { Button } from "gatsby-theme-material-ui";
import HomeIcon from "@mui/icons-material/Home";

export const HomeButton: React.FC = () => {
  return (
    <Button to="/" variant="text">
      <HomeIcon />
      Home
    </Button>
  );
};
