import React from "react"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material"
import { CategorySelector } from "./category"
import { useCategory } from "../../hooks/categoryState"
import { getMapKeys } from "../../util/mapUtil"

export const CategoryDialog = ({ open, onClose }) => {
  const { category, setCategory } = useCategory()
  return (
    <>
      <Dialog open={open}>
        <DialogTitle>フィルタ</DialogTitle>
        <DialogContent>
          <CategorySelector />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              getMapKeys(category).forEach(key => setCategory(key, false))
            }}
          >
            clear
          </Button>
          <Button onClick={onClose}>done</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
