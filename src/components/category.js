import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

function CategoryElement(props) {
  return props.isDisplayOnly ? (
    <span
      style={{
        backgroundColor: props.bgColor && props.category.color,
        color: props.bgColor && "white",
      }}
    >
      {props.category.catName}
    </span>
  ) : (
    <button
      style={{
        backgroundColor: props.bgColor && props.category.color,
        color: props.bgColor && "white",
        cursor: "pointer",
      }}
      onClick={() => props.onSelectedCategoryChange(props.category)}
    >
      {props.cross && (
        <FontAwesomeIcon
          icon={faTimesCircle}
          style={{ opacity: "0.5", marginRight: "3px" }}
        />
      )}
      {props.category.catName}
    </button>
  )
}

export function TreeCategoryList(props) {
  return (
    <ul>
      {props.category.children.map((cat, index) => {
        let isSelected =
          props.selectedCategory.findIndex(selected => selected === cat) >= 0
        return (
          <li key={index}>
            <CategoryElement
              category={cat}
              cross={isSelected}
              bgColor={isSelected}
              onSelectedCategoryChange={props.onSelectedCategoryChange}
            />
            {cat.children.length > 0 && (
              <TreeCategoryList
                category={cat}
                selectedCategory={props.selectedCategory}
                onSelectedCategoryChange={props.onSelectedCategoryChange}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function PostCategoryList(props) {
  return (
    <div className="category-list line">
      {props.children}
      <ul>
        {props.category.map((cat, index) => (
          <li key={index}>
            <CategoryElement
              category={cat}
              bgColor={props.bgColor}
              cross={props.cross}
              onSelectedCategoryChange={props.onSelectedCategoryChange}
              key={index}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
