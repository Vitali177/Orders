export function getMarkupOrderCustomer(order) {  
  return `
  <div class="order__address-header"> 
    <h4 class="order__processor-heading address-processor-heading">Customer Info</h4>
    <div class="button-edit-display">Edit</div>
  </div>
  <ul class="order__processor-list order__address-list">
    <div class="box">
      <li class="order__address-item">First Name:</li>
      <input type="text" class="firstName" value="${order.firstName}" readonly>
    </div>
    <div class="box">
      <li class="order__address-item">Last Name:</li>
      <input type="text" class="lastName" value="${order.lastName}" readonly>
    </div>
    <div class="box">
      <li class="order__address-item">Address:</li>
      <input type="text" value="${order.address}" readonly>
    </div>
    <div class="box">
      <li class="order__address-item">Phone:</li>
      <input type="text" value="${order.phone}" readonly>
    </div>
    <div class="box">
      <li class="order__address-item">Email:</li>
      <input type="text" class="order-input-country" value="${order.email}" readonly>
    </div>
  </ul>`;    
}