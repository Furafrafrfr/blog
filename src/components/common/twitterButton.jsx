import React from "react"
import TwitterIcon from "@mui/icons-material/Twitter"
import { Button } from "gatsby-theme-material-ui"

export const TwitterShareButton = ({ text, url, hashtags, via}) => {
  return (
    <a
      href={`https://twitter.com/share?text=${text
        .replace("\n", "%0a")
        .replace(" ", "%20")}${url !== undefined ? `&url=${url}` : ""}${
        hashtags !== undefined ? `${hashtags.join(",")}` : ""
      }${via !== undefined ? `&via=${via}` : ""}`}
    >
      <Button
        variant="contained"
        sx={{ width: "3rem", height: "3rem", p: 1, minWidth: 0 }}
      >
        <TwitterIcon sx={{ width: "100%", height: "100%" }} />
      </Button>
    </a>
  )
}
