export function deleteProduct(button) {
  const wrapperOfProducts = document.querySelector(".order__line-list > .wrapper");
  const numberOfProducts = document.querySelector(".order__line-items-heading span");
  const orderCost = document.querySelector(".order__cost-value");
  const orderId = document.querySelector(".order-list__item--selected").id;
  let product = button.parentNode;
  
  while (!product.classList.contains("order__line-list-row")) {
    product = product.parentNode;
  }

  const productId = product.querySelector(".id").innerHTML;
  const productCost = product.querySelector(".total .value").innerHTML;
  const quantity = product.querySelector(".quantity .value").innerHTML;

  wrapperOfProducts.removeChild(product);
  numberOfProducts.innerHTML--;
  orderCost.innerHTML =  (+orderCost.innerHTML - +productCost).toFixed(2);

  // If there are no products after delete last product
  if (!wrapperOfProducts.querySelectorAll(".order__line-list-row").length) {
    wrapperOfProducts.innerHTML = `<div class="no-products">Products not found</div>`;
  }

  const url = `${window.location.origin}/api/OrderProducts/${orderId}/${productId}?quantity=${quantity}`;  
  fetch(url, {method: "DELETE", mode: 'cors', cache: 'no-cache', credentials: 'same-origin'});
}