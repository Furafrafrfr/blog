import { createTheme } from "@mui/material"

const theme = createTheme()

theme.typography.h1s = {
  ...theme.typography.h1,
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.75rem",
  },
}

theme.typography.h2s = {
  ...theme.typography.h2,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.75rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
  },
}

theme.typography.h3s = {
  ...theme.typography.h3,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.25rem",
  },
}

export default theme
