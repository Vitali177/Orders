import { getMarkupOrderProduct } from "../html-markups/get-markup-order-product.js";

export async function createProduct() {
  const name = document.querySelector(".pop-up-form .input-name").value;
  const price = document.querySelector(".pop-up-form .input-price").value;
  const currency = document.querySelector(".pop-up-form .input-currency").value;
  const quantity = document.querySelector(".pop-up-form .input-quantity").value;
  const totalPrice = document.querySelector(".pop-up-form .input-totalPrice").value;
  const orderId = window.location.href.split("id=")[1];

  const product = {name, price, currency, quantity, totalPrice, orderId};
  const url = "http://localhost:3000/api/OrderProducts";

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
  .then(data => {
    const numberLineItems = document.querySelector(".order__line-items-heading span");
    const orderLineList = document.querySelector(".order__line-list .wrapper");

    if (!orderLineList.length) { // clear "Products not found"
      orderLineList.innerHTML = "";
    }

    orderLineList.innerHTML += getMarkupOrderProduct(data);
    numberLineItems.innerHTML++;
  })  
}