import React from "react"
import { useCategory } from "../category/categoryState"
import { getMapKeys } from "../util/mapUtil"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const selectedBg = "#333333"
const noSelectedBg = "#ffffff"
const selectedCol = "#ffffff"
const noSelectedCol = "#202020"

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
        backgroundColor: props.isActive ? selectedBg : noSelectedBg,
        color: props.isActive ? selectedCol : noSelectedCol,
        border: `1px solid ${noSelectedCol}`,
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
      style={{
        backgroundColor: selectedBg,
        color: selectedCol,
        cursor: "pointer",
      }}
    >
      {props.children}
    </span>
  )
}
