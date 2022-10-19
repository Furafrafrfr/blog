exports.createCategoryPath = (category) => {
  return `/category/${category.toLowerCase().replaceAll(/[\s]/g, "_")}`
}