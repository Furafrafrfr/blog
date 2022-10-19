import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import { IconButton } from "gatsby-theme-material-ui";

export const TwitterShareButton = ({ text, url, hashtags, via }) => {
  return (
    <IconButton
      aria-label="tweet"
      href={`https://twitter.com/share?text=${text
        .replace("\n", "%0a")
        .replace(" ", "%20")}${url !== undefined ? `&url=${url}` : ""}${
        hashtags !== undefined ? `${hashtags.join(",")}` : ""
      }${via !== undefined ? `&via=${via}` : ""}`}
    >
      <TwitterIcon sx={{ color: "#1D9BF0" }} fontSize="large" />
    </IconButton>
  );
};
