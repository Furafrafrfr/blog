import { RecoilRoot, atom, useRecoilState } from "recoil"
import React from "react"

const categoryState = atom({ key: "categoryKey", default: new Map() })

export function useCategory() {
  const [category, _setCategory] = useRecoilState(categoryState)
  const setCategory = (categoryKey, isSelected) =>
    _setCategory(new Map(category.set(categoryKey, isSelected)))

  const toggleCategory = categoryKey =>
    _setCategory(new Map(category.set(categoryKey, !category.get(categoryKey))))

  return [
    category,
    setCategory,
    toggleCategory,
  ]
}
export function CategoryScope({ category, children }) {
  return (
    <RecoilRoot initializeState={({ set }) => set(categoryState, category)}>
      {children}
    </RecoilRoot>
  )
}
