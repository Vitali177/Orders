export function deleteProduct(button) {
  const wrapperOfProducts = document.querySelector(".order__line-list > .wrapper");
  const numberOfProducts = document.querySelector(".order__line-items-heading span");
  let product = button.parentNode;
  
  while (!product.classList.contains("order__line-list-row")) {
    product = product.parentNode;
  }

  wrapperOfProducts.removeChild(product);
  numberOfProducts.innerHTML--;

  // If there are no products after delete last product
  if (!wrapperOfProducts.querySelectorAll(".order__line-list-row").length) {
    wrapperOfProducts.innerHTML = `<div class="no-products">Products not found</div>`;
  }

  // ! Удалить на сервере
}