export function getMarkupOrderAddress(order) {  
  return `
  <div class="order__address-header"> 
    <h4 class="order__address-heading address-processor-heading">Shipping Address</h4>
    <div class="button-edit-display">Edit</div>
  </div>
  <ul class="order__address-list">
      <div class="box">
        <li class="order__address-item">Street:</li>
        <input type="text" class="address" value="${order.address}" readonly>
      </div>
      <div class="box">
        <li class="order__address-item">ZIP Code / City:</li>
        <input type="text" class="ZIP" value="${order.ZIP}" readonly>
      </div>
      <div class="box">
        <li class="order__address-item">Region:</li>
        <input type="text" class="region" value="${order.region}" readonly>
      </div>
      <div class="box">
        <li class="order__address-item">Country:</li>
        <input type="text" class="country" value="${order.country}" readonly>
      </div>
  </ul>`;    
}