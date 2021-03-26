/**
 * Create a new CategoryNode object
 * @class
 * @param {string} catName
 *
 */

export default function CategoryNode(catName,color="grey") {
  var self = this
  /**
   * Name of this category.
   * @type {string}
   */
  this.catName = catName
  /**
   * Parent category of this category
   * @type {CategoryNode}
   */
  this.parent = null
  /**
   * Children categories of this category
   * @type {CategoryNode[]}
   */
  this.children = []
  /**
   * color which is used as background color of element in the CategoryList
   * regular color expression of CSS is available
   * @type {string}
   * @default grey
   */
  this.color = color
  /**
   * Set a parent category
   * @param {CategoryNode} parent category which you want to add as a parent
   */
  this.setParent = parent => {
    this.parent = parent
  }
  /**
   * Add children categories
   * @param {CategoryNode[]} children list of categories which you want to add as children
   */
  this.addChildren = children => {
    this.children = self.children.concat(children)
    this.children.sort()
    for (let child of children) {
      child.setParent(this)
    }
  }
  /**
   * Get descendant categories
   * @returns {CategoryNode[]} children of this category and children's children category and children's children's chldren category and...
   */
  this.getDescendantCategory = () => {
    var List = []
    this.children.forEach((cat, index) => {
      List.push(cat.catName)
      if (cat.children.length > 0) {
        cat.getDescendantCategory()
      }
    })
    return List
  }

  /**
   *
   */
  this.getParentCategory = () => {
    return [this.parent]
  }
  /**
   * Get ancestor categories
   * @returns {CategoryNode[]} List of ancestor categories. Last index is the most far category in the list.
   */
  this.getAncestorCategoryList = () => {
    let List = []
    let me = this
    while (me.parent) {
      List.push(me)
      me = me.parent
    }
    return List
  }

  /**
   * Search a category object whose catName is the same as searchName from descendant categories
   * @param {string} searchName a term which will use to search a category
   * @returns {(CategoryNode|undefined)} If a category whose catName is the same as searchName have found, this returns the category. If not, returns undefined.
   */
  this.searchByCatName = searchName => {
    for (let cat of this.children) {
      if (searchName === cat.catName) {
        return cat
      } else {
        if (cat.children.length > 0) {
          let result = cat.searchByCatName(searchName)
          if (result !== undefined) {
            return result
          }
        }
      }
    }
  }
}
