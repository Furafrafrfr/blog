import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"
import React from "react"

const categoriesState = atom({ key: "categories", default: new Map() })

const categoryKeyState = selector({
  key: "categoryKey",
  get: ({ get }) => {
    const categories = get(categoriesState)

    return Array.from(categories.keys())
  },
})

const categoryValueState = selector({
  key: "categoryValue",
  get: ({ get }) => {
    const categories = get(categoriesState)

    return Array.from(categories.values())
  },
})

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

export function useCategoryKeyState() {
  return useRecoilValue(categoryKeyState)
}

export function useCategoryValueState() {
  return useRecoilValue(categoryValueState)
}

export function CategoryScope({ categories, children }) {
  return (
    <RecoilRoot initializeState={({ set }) => set(categoriesState, categories)}>
      {children}
    </RecoilRoot>
  )
}
