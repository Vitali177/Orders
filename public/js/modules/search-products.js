import { getMarkupOrderProduct } from "../html-markups/get-markup-order-product";

export function searchProducts(searchText) {
  const numberLineItems = document.querySelector(".order__line-items-heading span");
  const orderLineList = document.querySelector(".order__line-list .wrapper");
  const id = document.querySelector("h3.order__name span").innerHTML;
  const url = `http://localhost:3000/api/Orders/${id}/products`;  

  orderLineList.innerHTML = `<div class="preloader"></div>`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      let matchesProducts = data.filter(product => {
        const regex = new RegExp(`^${searchText}`, "gi");
        return `${product.id}`.match(regex) || product.name.match(regex) || `${product.price}`.match(regex) 
          || `${product.quantity}`.match(regex) || `${product.totalPrice}`.match(regex);
      });
    
      if (!searchText.length) {
        matchesProducts = data; // show all list when input is empty
      }
    
      if (matchesProducts.length) {
        const markup = matchesProducts.map(product => getMarkupOrderProduct(product)).join("");
        orderLineList.innerHTML = markup;
      } else {
        orderLineList.innerHTML = `<div class="no-products">Products not found</div>`;
      }
      numberLineItems.innerHTML = matchesProducts.length;
    });  
} 