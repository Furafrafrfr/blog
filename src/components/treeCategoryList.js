import React from "react"
import CategoryElement from "./categoryElement"

export default function TreeCategoryList(props) {
  return (
    <ul>
      {props.category.children.map((cat, index) => {
        let isSelected=props.selectedCategory.findIndex(selected=>selected===cat)>=0
        return (
          <li key={index}>
            <CategoryElement
              category={cat}
              cross={isSelected
              }
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
