export function deleteProduct(button) {
  const wrapperOfProducts = document.querySelector(".order__line-list > .wrapper");
  const numberOfProducts = document.querySelector(".order__line-items-heading span");
  const orderId = document.querySelector(".order-list__item--selected").id;
  let product = button.parentNode;
  
  while (!product.classList.contains("order__line-list-row")) {
    product = product.parentNode;
  }

  const productId = product.querySelector(".id").innerHTML;

  wrapperOfProducts.removeChild(product);
  numberOfProducts.innerHTML--;

  // If there are no products after delete last product
  if (!wrapperOfProducts.querySelectorAll(".order__line-list-row").length) {
    wrapperOfProducts.innerHTML = `<div class="no-products">Products not found</div>`;
  }

  const url = `http://localhost:3000/api/OrderProducts/${orderId}/${productId}`;  
  fetch(url, {method: "DELETE", mode: 'cors', cache: 'no-cache', credentials: 'same-origin'});
}