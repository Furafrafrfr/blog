import { Breakpoint, useTheme, useMediaQuery } from "@mui/material";

export const useIsUpBreakpoint: (breakpoint: Breakpoint) => boolean = (
  breakpoint
) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up(breakpoint));
  return matches;
};
