import { getMarkupOrderInList } from "../html-markups/get-markup-order-in-list";

export async function createOrder() {
  const createdAt = document.querySelector(".create-order-form .createdAt").value;
  const customer = document.querySelector(".create-order-form .customer").value;
  const status = document.querySelector(".create-order-form .status").value;
  const shippedAt = document.querySelector(".create-order-form .shippedAt").value;
  const totalPrice = document.querySelector(".create-order-form .totalPrice").value;
  const currency = document.querySelector(".create-order-form .currency").value;
  const name = document.querySelector(".create-order-form .name").value;
  const address = document.querySelector(".create-order-form .address").value;
  const ZIP = document.querySelector(".create-order-form .ZIP").value;
  const region = document.querySelector(".create-order-form .region").value;
  const country = document.querySelector(".create-order-form .country").value;
  const firstName = document.querySelector(".create-order-form .firstName").value;
  const lastName = document.querySelector(".create-order-form .lastName").value;
  const customerAddress = document.querySelector(".create-order-form .customer-address").value;
  const phone = document.querySelector(".create-order-form .phone").value;
  const email = document.querySelector(".create-order-form .email").value;

  const order = {
    "summary": {createdAt, customer, status, shippedAt, totalPrice, currency},
    "shipTo": {name, address, ZIP, region, country},
    "customerInfo": {firstName, lastName, "address": customerAddress, phone, email}
  };
  const url = "http://localhost:3000/api/Orders";

  console.log(order);

  fetch(url, {
    method: "POST",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);

    const numberOfOrders = document.querySelector(".order-list__header-row h3 span");
    const orderListMain = document.querySelector(".order-list__main");  

    orderListMain.innerHTML += getMarkupOrderInList(data);
    numberOfOrders.innerHTML++;
  })  
}