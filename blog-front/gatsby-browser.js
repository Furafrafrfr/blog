import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import React from "react";
import { CategoryScope } from "./src/hooks/categoryState";
import { App } from "./src/components/App";

export const wrapPageElement = ({ element }) => {
  return <App>{element}</App>;
};

export const wrapRootElement = ({ element }) => {
  return <CategoryScope>{element}</CategoryScope>;
};
