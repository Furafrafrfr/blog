import * as Category from "./categories"
import CategoryNode from "./categoryNode"

const Root = new CategoryNode("root")

Category.React.addChildren([Category.Gatsby])

Category.JS.addChildren([Category.React])

Category.DotNet.addChildren([Category.CSharp])

Category.Web.addChildren([Category.CSS, Category.HTML, Category.JS])

Category.Software.addChildren([Category.Web, Category.DotNet])

Root.addChildren([Category.Software, Category.Trip, Category.Other])

export default Root
