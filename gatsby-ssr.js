import "prismjs/themes/prism-tomorrow.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

import React from "react"
import { CategoryScope } from "./src/hooks/categoryState"

export const wrapRootElement = ({ element }) => {
  return <CategoryScope>{element}</CategoryScope>
}
