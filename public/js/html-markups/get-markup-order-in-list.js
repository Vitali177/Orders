export function getMarkupOrderInList(order) {  
  return `
  <div class="order-list__item" id="${order.orderId}">
    <div class="order-list__item-row">
        <h4 class="order-list__item-order">Order <span>${order.orderId}</span></h4>
        <h3 class="order-list__item-ordered-date">${order.createdAt}</h3>
    </div>
    <div class="order-list__item-row">
        <h5 class="order-list__item-customer">${order.firstNameCustomer} ${order.lastNameCustomer}</h5>
        <h5 class="order-list__item-order-time order-list__item-order-time--in-time">${order.status}</h5>
    </div>
    <div class="order-list__item-row">
        <h5 class="order-list__item-shipped">Shipped: <span>${order.shippedAt}</span></h5>
    </div>
  </div>`;
}