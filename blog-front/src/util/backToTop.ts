export const backToTop: () => void = () => {
  const anchor = document.querySelector("#scroll-top-anchor");
  if (anchor) {
    anchor.scrollIntoView({ behavior: "smooth" });
  }
};
