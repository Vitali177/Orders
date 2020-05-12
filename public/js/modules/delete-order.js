import { showDetailsOrder } from "./show-details-order";

export function deleteOrder() {
  const orderListMain = document.querySelector(".order-list__main");
  const selectedOrder = document.querySelector(".order-list__item--selected");
  const numberOfOrders = document.querySelector(".order-list__header-row h3 span");
  const indexSelectedOrder = 0;  // default selected order

  const id = selectedOrder.id;
  const url = `${window.location.origin}/api/Orders/${id}`;  

  if (selectedOrder) {
    orderListMain.removeChild(selectedOrder);
    numberOfOrders.innerHTML--;

    if (document.querySelectorAll(".order-list__item").length) {
      document.querySelectorAll(".order-list__item")[indexSelectedOrder].classList.add("order-list__item--selected");

      const idSelectedOrder = document.querySelector(".order-list__item--selected").id;
      showDetailsOrder(idSelectedOrder);
      history.pushState({}, document.title, `${window.location.pathname}?id=${idSelectedOrder}`);
    } else {  // If there are no orders after delete last order
      orderListMain.innerHTML = `<div class="no-orders">Orders not found</div>`;
      history.pushState({}, document.title, window.location.pathname);
    }

    fetch(url, {method: "DELETE", mode: 'cors', cache: 'no-cache', credentials: 'same-origin'});
  }
}