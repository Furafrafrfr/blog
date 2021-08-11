import React from "react"
import { useCategories } from "../category/categoryState"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

export function CategoryTagButtonList({ showOnlySelected, style }) {
  const [categories, setCategories] = useCategories()
  return (
    <div className="category-list" style={style}>
      {Array.from(categories.keys())
        .filter(showOnlySelected ? key => categories.get(key) : () => true)
        .map((category, index) => (
          <CategoryTagButton
            category={category}
            isActive={categories.get(category)}
            onClick={category => setCategories(category)}
            key={index}
          />
        ))}
    </div>
  )
}

function CategoryTagButton(props) {
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
      {props.category}
    </button>
  )
}

export function CategoryTagList({ category, children }) {
  return (
    <div className="category-list">
      {children}
      {category.map(category => (
        <CategoryTag category={category} />
      ))}
    </div>
  )
}

function CategoryTag(props) {
  return (
    <div style={{ backgroundColor: "#444444", color: "#eeeeee" }}>
      {props.category}
    </div>
  )
}
