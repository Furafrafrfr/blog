import React, { useEffect, useState } from "react";

import { IconButton } from "gatsby-theme-material-ui";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export const CopyTextButton: React.FC<{ text: string }> = ({ text }) => {
  const [copyNow, setCopyNow] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copyNow) {
      console.log(text);
      navigator.clipboard.writeText(text).then(() => {
        setCopyNow(false);
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 1000);
      });
    }
  }, [copyNow]);

  return (
    <IconButton
      onClick={() => {
        setCopyNow(true);
      }}
      color={copied ? "primary" : undefined}
      sx={{ transition: "color 0.25s" }}
    >
      <ContentCopyIcon fontSize="large" />
    </IconButton>
  );
};
