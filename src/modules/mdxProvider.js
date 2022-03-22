import React from "react"
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
} from "@mui/material"

const P = ({ children }) => (
  <Typography component="p" variant="body1" color="#424242">
    {children}
  </Typography>
)
const H2 = ({ children }) => (
  <Typography component="h2" variant="h2s" sx={{ my: 4 }}>
    {children}
  </Typography>
)
const H3 = ({ children }) => (
  <Typography component="h3" variant="h3s" sx={{ my: 3 }}>
    {children}
  </Typography>
)
const H4 = ({ children }) => (
  <Typography component="h4" variant="h4s" sx={{ my: 3 }}>
    {children}
  </Typography>
)
const H5 = ({ children }) => (
  <Typography component="h5" variant="h5s" sx={{ my: 2 }}>
    {children}
  </Typography>
)
const H6 = ({ children }) => (
  <Typography component="h6" variant="h6s" sx={{ my: 2 }}>
    {children}
  </Typography>
)
const H1 = ({ children }) => (
  <Typography component="h1" variant="h1s" sx={{ my: 2 }}>
    {children}
  </Typography>
)
const Li = ({ children }) => (
  <Typography component="li" variant="body1" color="#424242">
    {children}
  </Typography>
)
const PostTable = ({ children }) => {
  return (
    <TableContainer component={Paper}>
      <Table>{children}</Table>
    </TableContainer>
  )
}

const Tr = ({ children }) => <TableRow>{children}</TableRow>
const Th = ({ children }) => <TableCell component="th">{children}</TableCell>
const Td = ({ children }) => <TableCell>{children}</TableCell>

export const components = {
  p: P,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  li: Li,
  table: PostTable,
  tr: Tr,
  th: Th,
  td: Td,
}
