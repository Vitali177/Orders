export function getMarkupOrderInList(order) {  
  const classes = ["in-time", "urgent", "too-late"];
  const statuses = ["In time", "Urgent", "Too late"];
  const statusClass = classes[statuses.indexOf(order.status)];
  
  return `
  <div class="order-list__item" id="${order.id}">
    <div class="order-list__item-row">
        <h4 class="order-list__item-order">Order <span>${order.id}</span></h4>
        <h3 class="order-list__item-ordered-date">${order.createdAt}</h3>
    </div>
    <div class="order-list__item-row">
        <h5 class="order-list__item-customer">${order.firstName} ${order.lastName}</h5>
        <h5 class="order-list__item-order-time order-list__item-order-time--${statusClass}">${order.status}</h5>
    </div>
    <div class="order-list__item-row">
        <h5 class="order-list__item-shipped">Shipped: <span>${order.shippedAt}</span></h5>
    </div>
  </div>`;
}