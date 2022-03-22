import "prismjs/themes/prism-tomorrow.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { CategoryScope } from "./src/hooks/categoryState"
import { App } from "./src/components/App"
import { components } from "./src/modules/mdxProvider"

export const wrapPageElement = ({ element }) => {
  return <App>{element}</App>
}

export const wrapRootElement = ({ element }) => {

  return (
    <CategoryScope>
      <MDXProvider components={components}>{element}</MDXProvider>
    </CategoryScope>
  )
}
