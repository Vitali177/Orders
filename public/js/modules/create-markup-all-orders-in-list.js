import { getMarkupOrderInList } from "../html-markups/get-markup-order-in-list";

export async function createMarkupAllOrdersInList() {
  const orderListMain = document.querySelector(".order-list__main");  
  const numberOfOrders = document.querySelector(".order-list__header-row h3 span");
  let markup = "";
  const url = `${window.location.origin}/api/Orders`;

  const res = await fetch(url);
  const data = await res.json();
  await (() => {
    numberOfOrders.innerHTML = data.length;  

    if (!data.length) {
      markup = `<div class="no-orders">No orders available</div>`;
    }
    data.forEach(order => {
      markup += getMarkupOrderInList(order)
    } );

    orderListMain.innerHTML = markup;
  })();
}