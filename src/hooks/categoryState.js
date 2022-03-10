import { RecoilRoot, atom, useRecoilState } from "recoil"
import React from "react"

const categoryState = atom({
  key: "categoryKey",
  default: new Map(),
})

export const useCategory = () => {
  const [category, _setCategory] = useRecoilState(categoryState)
  const setCategory = (categoryKey, isSelected) =>
    _setCategory(new Map(category.set(categoryKey, isSelected)))

  const toggleCategory = categoryKey =>
    setCategory(categoryKey, !category.get(categoryKey))
    
  return { category, setCategory, toggleCategory }
}

export const CategoryScope = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>
}
