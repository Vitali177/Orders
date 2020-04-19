import { searchProducts } from "./search-products";

export function sortingProducts(image, Orders) {
  const sectionOrderLineItems = document.querySelector("section.order__line-items .wrapper");
  const products = [...document.querySelectorAll(".wrapper .order__line-list-row")];  
  const alphabetSortCriterion = "product";
  const defaultDirection = "default";
  const directionASC = "ASC";
  const directionDESC = "DESC";
  let sortingDirection = null;
  const sortingCriterion = image.parentNode.classList.value;

  const lastSortingImages = [...document.querySelectorAll(".sort-picture--DESC"),
    ...document.querySelectorAll(".sort-picture--ASC")];

  lastSortingImages.forEach(lastImage => {  // show default state of other "active" images
    if (image !== lastImage) {
      lastImage.classList.remove("sort-picture--DESC");
      lastImage.classList.remove("sort-picture--ASC");
    }
  });

  if (image.classList.contains("sort-picture--ASC")) {
    image.classList.remove("sort-picture--ASC");
    image.classList.add("sort-picture--DESC");
    sortingDirection = directionDESC;
  } else if (image.classList.contains("sort-picture--DESC")) {
    image.classList.remove("sort-picture--DESC");
    sortingDirection = defaultDirection;
  } else {
    image.classList.add("sort-picture--ASC");
    sortingDirection = directionASC;
  }

  if (sortingDirection === defaultDirection) {    
    searchProducts(document.querySelector(".order__line-items-input-search").value, Orders); // display columns by default
    return;
  }

  const sortedProducts = products.sort((a, b) => {
    const value1 = a.querySelector(`.${sortingCriterion} .value`).innerHTML;
    const value2 = b.querySelector(`.${sortingCriterion} .value`).innerHTML;

    if (sortingCriterion === alphabetSortCriterion) {
      if (sortingDirection === directionDESC) {
        if (value2 > value1) return 1;
        return (value2 < value1) ? -1 : 0;
      } else {
        if (value1 > value2) return 1;
        return (value1 < value2) ? -1 : 0;
      } 
    } else return (sortingDirection === directionDESC) ? (value1 - value2) : (value2 - value1);     
  }); 
  
  sectionOrderLineItems.innerHTML = "";
  sortedProducts.forEach((element) => {
    sectionOrderLineItems.appendChild(element);
  });
}