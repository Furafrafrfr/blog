import React from "react"
import { useCategories } from "../category/categoryState"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

function CategoryTag(props) {
  return (
    <span style={{ backgroundColor: "#444444", color: "#eeeeee" }}>
      {props.category}
    </span>
  )
}

function CategoryTagButton(props) {
  return (
    <button
      style={{
        backgroundColor: props.isActive ? "#444444" : "#eeeeee",
        color: props.isActive ? "#eeeeee" : "#444444",
        cursor: "pointer",
      }}
      onClick={() => props.onClick(props.category)}
    >
      {props.isActive && (
        <FontAwesomeIcon
          icon={faTimesCircle}
          style={{ opacity: "0.5", marginRight: "3px" }}
        />
      )}
      {props.category}
    </button>
  )
}

export function CategoryTagButtonList({ showOnlySelected }) {
  const [categories, setCategories] = useCategories()
  return (
    <ul>
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
    </ul>
  )
}

export function CategoryTagList({category}) {
  return (
    <ul>
      {category.map(category => (
        <CategoryTag category={category} />
      ))}
    </ul>
  )
}
