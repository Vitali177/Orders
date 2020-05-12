export function getMarkupOrderMainInfo(order) {  
  return `
  <div class="order__row">
      <h3 class="order__name">Order <span>${order.id}</span></h3>
      <div class="order__cost">
        <h3 class="order__cost-value">${(+order.totalPrice).toFixed(2)}</h3>
        <span>EUR</span>
      </div>
  </div>
  <ul class="order__main-info-list">
      <li class="order__customer">Customer: <span></span>${order.firstName} ${order.lastName}</span></li>
      <li class="order__ordered">Ordered: <span>${order.createdAt}</span></li>
      <li class="order__shipped">Shipped: <span>${order.shippedAt}</span></li>
  </ul>`;    
}