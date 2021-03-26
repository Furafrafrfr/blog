import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

export default function CategoryElement(props) {
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
        cursor:"pointer"
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
