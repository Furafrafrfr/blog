import React from "react"
import { useCategory } from "../../hooks/categoryState"
import { getMapKeys } from "../../util/mapUtil"
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

export function CategorySelector({ showAll }) {
  const [category, setCategory] = useCategory()

  let key = showAll
    ? getMapKeys(category)
    : getMapKeys(category).filter(key => category.get(key))

  return (
    <div className="category-list">
      {key.map(key => (
        <CategoryButton
          category={key}
          isActive={category.get(key)}
          onClick={() => setCategory(key, !category.get(key))}
          key={key}
        >
          {key}
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

function CategoryButton({isActive, onClick, category}) {
  return (
    <button
      style={{
        backgroundColor: isActive ? selectedBg : noSelectedBg,
        color: isActive ? selectedCol : noSelectedCol,
        border: `1px solid ${noSelectedCol}`,
        cursor: "pointer",
        marginLeft: "3px"
      }}
      onClick={() => onClick(category)}
    >
      {isActive && (
        <FontAwesomeIcon
          icon={faTimesCircle}
          style={{ opacity: "0.5", marginRight: "8px" }}
        />
      )}
      {category}
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
