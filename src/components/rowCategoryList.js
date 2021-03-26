import React from "react"
import CategoryElement from "./categoryElement"

export default function PostCategoryList(props) {
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
