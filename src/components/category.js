import React from "react"
import { useCategory } from "../category/categoryState"
import { getMapKeys } from "../util/mapUtil"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

export function SelectedCategoryList() {
  const [category, setCategory] = useCategory()
  return (
    <div className="category-list">
      {getMapKeys(category)
        .filter(key => category.get(key))
        .map((key, index) => (
          <CategoryButton
            isActive={true}
            onClick={() => setCategory(key, !category.get(key))}
            key={index}
          >
            {key}
          </CategoryButton>
        ))}
    </div>
  )
}

export function CategorySelector() {
  const [category, setCategory] = useCategory()
  return (
    <div className="category-list" style={{ marginTop: "15px" }}>
      {getMapKeys(category).map((categoryKey, index) => (
        <CategoryButton
          isActive={category.get(categoryKey)}
          onClick={() => setCategory(categoryKey, !category.get(categoryKey))}
          key={index}
        >
          {categoryKey}
        </CategoryButton>
      ))}
    </div>
  )
}

export function CategoryList({ category }) {
  return (
    <div className="category-list">
      {category.map((category, index) => (
        <CategorySpan key={index}>{category}</CategorySpan>
      ))}
    </div>
  )
}

function CategoryButton(props) {
  return (
    <button
      style={{
        backgroundColor: props.isActive ? "#444444" : "#cccccc",
        color: props.isActive ? "#cccccc" : "#444444",
        cursor: "pointer",
      }}
      onClick={() => props.onClick(props.category)}
    >
      {props.isActive && (
        <FontAwesomeIcon
          icon={faTimesCircle}
          style={{ opacity: "0.5", marginRight: "8px" }}
        />
      )}
      {props.children}
    </button>
  )
}

function CategorySpan(props) {
  return (
    <span
      style={{ backgroundColor: "#444444", color: "#cccccc", cursor: "pointer" }}
    >
      {props.children}
    </span>
  )
}
