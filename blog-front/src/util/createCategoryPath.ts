export const createCategoryPath = (category: string): string => {
  return `/category/${category.toLowerCase().replaceAll(/[\s]/g, "_")}`;
};
