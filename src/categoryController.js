export const getSelectedCat = (catArr, root) => {
  let selectedCat = []
  catArr.forEach(catStr => {
    let result = root.searchByCatName(catStr)
    if (result !== undefined) {
      selectedCat.push(result)
    }
  })

  let selectedCatAndAncestor = []
  selectedCat.forEach(cat => {
    selectedCatAndAncestor = selectedCatAndAncestor.concat(
      [cat],
      cat.getAncestorCategoryList()
    )
  })

  let Catmap = new Map()

  selectedCatAndAncestor.forEach(cat => {
    Catmap.set(cat, 0)
  })

  return Array.from(Catmap.keys())
}
