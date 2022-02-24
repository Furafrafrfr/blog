require("prismjs/themes/prism-tomorrow.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

const React = require("react")
const { CategoryScope } = require("./src/hooks/categoryState")

exports.wrapRootElement = ({ element }) => {
  return (
    <CategoryScope category={new Map()}>
      {element}
    </CategoryScope>
  )
}
