import { searchProducts } from "./search-products";
import { getMarkupOrderProduct } from "../html-markups/get-markup-order-product";

export function sortingProducts(image) {
  const sectionOrderLineItems = document.querySelector("section.order__line-items .wrapper");
  const alphabetSortCriterion = "name";
  const defaultDirection = "default";
  const directionASC = "ASC";
  const directionDESC = "DESC";
  let sortingDirection = null;
  const lastSortingImages = [...document.querySelectorAll(".sort-picture--DESC"),
    ...document.querySelectorAll(".sort-picture--ASC")];

  const classSortingCriterion = image.parentNode.classList.value;
  const classesSortingCriterion = ["product", "unit-price", "quantity", "total"];
  const sortingCriterions = ["name", "price", "quantity", "totalPrice"];
  const sortingCriterion = sortingCriterions[classesSortingCriterion.indexOf(classSortingCriterion)];

  const id = document.querySelector("h3.order__name span").innerHTML;
  const url = `http://localhost:3000/api/Orders/${id}/products`;

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

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const sortedProducts = data.sort((a, b) => {
        const value1 = a[sortingCriterion];
        const value2 = b[sortingCriterion];

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

      let markup = "";

      if (sortedProducts.length) {
        sortedProducts.forEach((product) => {
          markup += getMarkupOrderProduct(product);  
        });
      } else {
        markup = `<div class="no-products">Products not found</div>`;
      }     

      sectionOrderLineItems.innerHTML = markup;
    });
}