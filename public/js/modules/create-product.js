import { getMarkupOrderProduct } from "../html-markups/get-markup-order-product.js";

export async function createProduct() {
  const productName = document.querySelector(".pop-up-form .input-name").value;
  const price = document.querySelector(".pop-up-form .input-price").value;
  const quantity = document.querySelector(".pop-up-form .input-quantity").value;
  const orderId = window.location.href.split("id=")[1];

  const product = {productName, price, quantity, orderId};
  const url = `${window.location.origin}/api/OrderProducts`;

  fetch(url, {
    method: "POST",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
  .then(res => res.json())
  .then(product => {
    const numberLineItems = document.querySelector(".order__line-items-heading span");
    const orderLineList = document.querySelector(".order__line-list .wrapper");

    if (orderLineList.querySelector(".no-products")) { // clear "Products not found"
      orderLineList.innerHTML = "";
    }

    orderLineList.innerHTML += getMarkupOrderProduct(product);
    numberLineItems.innerHTML++;
  })  
}