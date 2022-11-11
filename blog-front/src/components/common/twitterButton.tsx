import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import { IconButton } from "@mui/material";

type TwShareButtonProps = {
  text?: string;
  url?: string;
  hashtags?: string[];
  via?: string;
};

const createTwitterLink: (
  text?: string,
  url?: string,
  hashtags?: string[],
  via?: string
) => string = (text, url, hashtags, via) => {
  const textParam = text
    ? `text=${text.replace("\n", "%0a").replace(" ", "%20")}`
    : "";
  const urlParam = url ? `url=${url}` : "";
  const hashtagsParam =
    hashtags && hashtags.length > 0 ? `hashtags=${hashtags.join(",")}` : "";
  const viaParam = via ? `via=${via}` : "";
  const params = [textParam, urlParam, hashtagsParam, viaParam]
    .filter((val) => val)
    .join("&");

  return "https://twitter.com/intent/tweet?" + params;
};

export const TwitterShareButton: React.FC<TwShareButtonProps> = ({
  text,
  url,
  hashtags,
  via,
}) => {
  return (
    <IconButton
      aria-label="tweet"
      href={createTwitterLink(text, url, hashtags, via)}
    >
      <TwitterIcon sx={{ color: "#1D9BF0" }} fontSize="large" />
    </IconButton>
  );
};
