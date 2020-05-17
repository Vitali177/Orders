export async function createProduct() {
  const productName = document.querySelector(".pop-up-form .input-name").value;
  const price = document.querySelector(".pop-up-form .input-price").value;

  const product = {productName, price};
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
    // const numberLineItems = document.querySelector(".order__line-items-heading span");
    // const orderLineList = document.querySelector(".order__line-list .wrapper");
    // const orderCost = document.querySelector(".order__cost-value");

    // if (orderLineList.querySelector(".no-products")) { // clear "Products not found"
    //   orderLineList.innerHTML = "";
    // }

    // orderLineList.innerHTML += getMarkupOrderProduct(product);
    // numberLineItems.innerHTML++;
    // orderCost.innerHTML =  (+orderCost.innerHTML + +product.totalPrice).toFixed(2);
  });  
}