export function getMarkupOrderMainInfo(order) {  
  return `
  <div class="order__row">
      <h3 class="order__name">Order <span>${order.id}</span></h3>
      <h3 class="order__cost">${(+order.summary.totalPrice).toFixed(2)} <br><span>${order.summary.currency}</span></h3>
  </div>
  <ul class="order__main-info-list">
      <li class="order__customer">Customer: <span></span>${order.customerInfo.firstName} ${order.customerInfo.lastName}</span></li>
      <li class="order__ordered">Ordered: <span>${order.summary.createdAt}</span></li>
      <li class="order__shipped">Shipped: <span>${order.summary.shippedAt}</span></li>
  </ul>`;    
}