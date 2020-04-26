import { getMarkupOrderInList } from "../html-markups/get-markup-order-in-list";

export async function createMarkupAllOrdersInList() {
  const orderListMain = document.querySelector(".order-list__main");  
  const numberOfOrders = document.querySelector(".order-list__header-row h3 span");
  let markup = "";
  const url = "http://localhost:3000/api/Orders";

  // fetch(url)
  // .then(res => console.log(res.json()))

  const res = await fetch(url);
  const data = await res.json();
  await (() => {
    console.log(data);
    numberOfOrders.innerHTML = data.length;  

    if (!data.length) {
      markup = `<div class="no-orders">No orders available</div>`;
    }
    data.forEach(order => {
      console.log(order);
      markup += getMarkupOrderInList(order)
    } );

    orderListMain.innerHTML = markup;
  })();
}