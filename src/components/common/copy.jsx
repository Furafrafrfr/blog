import React, { useEffect, useState } from "react"

import { Button } from "gatsby-theme-material-ui"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"

export const CopyTextButton = ({ text }) => {
  const [copyNow, setCopyNow] = useState(false)
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (copyNow) {
      console.log(text)
      navigator.clipboard.writeText(text).then(() => {
        setCopyNow(false)
        setCopied(true)

        setTimeout(() => {
          setCopied(false)
        }, 500)
      })
    }
  }, [copyNow])

  return (
    <Button
      variant={copied ? "contained" : "outlined"}
      sx={{ width: "3rem", height: "3rem", p: 1, minWidth: 0 }}
      onClick={() => {
        setCopyNow(true)
      }}
    >
      <ContentCopyIcon />
    </Button>
  )
}
