import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { TwitterShareButton } from "./twitterButton";
import { CopyTextButton } from "./copy";

export const ShareButtons = ({ url, tweetText }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="nowrap"
      alignItems="center"
    >
      <Typography component="span" variant="body1">
        この投稿をシェア:
      </Typography>
      <Stack direction="row" justifyContent="space-around">
        <TwitterShareButton text={tweetText} url={url} />
        <CopyTextButton text={url} />
      </Stack>
    </Box>
  );
};
