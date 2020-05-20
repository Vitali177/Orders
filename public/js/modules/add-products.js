import { getMarkupOrderProduct } from "../html-markups/get-markup-order-product";

export async function addProducts() {
  const selectedInputs = document.querySelectorAll("input[type='checkbox']:checked");
  
  if (!selectedInputs.length) {
    return;
  }

  const ids = [...selectedInputs].map(input => input.value);
  const quantities = [...selectedInputs].map(input => input.parentNode.querySelector("li.quantity input").value);

  const products = ids.map((id, index) => {
    return {id, quantity: quantities[index]}
  });

  const orderId = window.location.href.split("id=")[1];
  const url = `${window.location.origin}/api/OrderProducts/${orderId}`;

  fetch(url, {
    method: "POST",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(products)
  })
  .then(res => res.json())
  .then(products => {
    console.log(products);
    const numberLineItems = document.querySelector(".order__line-items-heading span");
    const orderLineList = document.querySelector(".order__line-list .wrapper");
    const orderCost = document.querySelector(".order__cost-value");
    const productsTotalCost = products.reduce((acc, curr) => acc += curr.totalPrice, 0);

    if (orderLineList.querySelector(".no-products")) { // clear "Products not found"
      orderLineList.innerHTML = "";
    }

    let markup = "";
    products.forEach(product => markup += getMarkupOrderProduct(product));

    orderLineList.innerHTML += markup;
    numberLineItems.innerHTML = +numberLineItems.innerHTML + products.length;
    orderCost.innerHTML =  (+orderCost.innerHTML + productsTotalCost).toFixed(2);
  });  
}