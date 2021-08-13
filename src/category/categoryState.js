import { RecoilRoot, atom, useRecoilState } from "recoil"
import React from "react"

const categoriesState = atom({ key: "categories", default: new Map() })

export function useCategories() {
  const [categories, setCategories] = useRecoilState(categoriesState)
  return [
    categories,
    category =>
      setCategories(
        new Map(categories.set(category, !categories.get(category)))
      ),
  ]
}

export function CategoryScope({ categories, children }) {
  return (
    <RecoilRoot initializeState={({ set }) => set(categoriesState, categories)}>
      {children}
    </RecoilRoot>
  )
}
