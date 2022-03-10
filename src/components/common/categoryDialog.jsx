import React, { useState } from "react"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Fab,
} from "@mui/material"
import FilterListIcon from "@mui/icons-material/FilterList"
import { CategorySelector } from "./category"

export const CategoryDialog = () => {
  const [openFilterDialog, setOpenFilterDialog] = useState(false)

  return (
    <>
      <Dialog
        open={openFilterDialog}
        onClose={() => setOpenFilterDialog(false)}
      >
        <DialogTitle>フィルタ</DialogTitle>
        <DialogContent>
          <CategorySelector />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenFilterDialog(false)
            }}
          >
            done
          </Button>
        </DialogActions>
      </Dialog>
      <Fab
        color="primary"
        onClick={() => {
          setOpenFilterDialog(true)
        }}
        sx={{
          position: "fixed",
          bottom: 50,
          right: 20,
          left: "auto",
          top: "auto",
        }}
      >
        <FilterListIcon />
      </Fab>
    </>
  )
}
