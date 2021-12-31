import { RecoilRoot, atom, useRecoilState } from "recoil"
import React from "react"

const categoryState = atom({ key: "categoryKey", default: new Map() })

export function useCategory() {
  const [category, setCategory] = useRecoilState(categoryState)
  return [
    category,
    (categoryKey, isSelected) =>
      setCategory(new Map(category.set(categoryKey, isSelected))),
  ]
}
export function CategoryScope({ category, children }) {
  return (
    <RecoilRoot initializeState={({ set }) => set(categoryState, category)}>
      {children}
    </RecoilRoot>
  )
}
