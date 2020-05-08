export function getMarkupOrderInList(order) {  
  return `
  <div class="order-list__item" id="${order.id}">
    <div class="order-list__item-row">
        <h4 class="order-list__item-order">Order <span>${order.id}</span></h4>
        <h3 class="order-list__item-ordered-date">${order.createdAt}</h3>
    </div>
    <div class="order-list__item-row">
        <h5 class="order-list__item-customer">${order.firstName} ${order.lastName}</h5>
        <h5 class="order-list__item-order-time order-list__item-order-time--in-time">${order.status}</h5>
    </div>
    <div class="order-list__item-row">
        <h5 class="order-list__item-shipped">Shipped: <span>${order.shippedAt}</span></h5>
    </div>
  </div>`;
}