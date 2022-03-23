import { createTheme } from "@mui/material"

const theme = createTheme({
  palette: {
    primary:{
      main: "#e65100"
    },
    secondary:{
      main: "#2196f3"
    },
    twitterBlue: {
      main: "#1D9BF0",
    },
  },
})

const weight = theme.typography.fontWeightRegular

theme.typography.h1s = {
  ...theme.typography.h1,
  fontWeight: weight,
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.75rem",
  },
}

theme.typography.h2s = {
  ...theme.typography.h2,
  fontWeight: weight,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.75rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
  },
}

theme.typography.h3s = {
  ...theme.typography.h3,
  fontWeight: weight,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.25rem",
  },
}

theme.typography.h4s = {
  ...theme.typography.h4,
  fontWeight: weight,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.25rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.2rem",
  },
}

theme.typography.h5s = {
  ...theme.typography.h5,
  fontWeight: weight,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.2rem",
  },
}

theme.typography.h6s = {
  ...theme.typography.h6,
  fontWeight: weight,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.1rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.1rem",
  },
}

export default theme
