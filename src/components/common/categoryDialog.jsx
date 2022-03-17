import React, { useState } from "react"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Fab,
} from "@mui/material"
import { CategorySelector } from "./category"

export const CategoryDialog = ({open, onClose}) => {

  return (
    <>
      <Dialog
        open={open}
      >
        <DialogTitle>フィルタ</DialogTitle>
        <DialogContent>
          <CategorySelector />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
          >
            done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
