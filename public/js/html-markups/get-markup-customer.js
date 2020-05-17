export function getMarkupCustomer(customer) {  
  return `
  <div class="customers-item">
    <input type="radio" id="customer-${customer.id}" name="customer" value="${customer.id}">
    <label for="customer-${customer.id}">
      <li class="id">${customer.id}</li>
      <li class="firstName">${customer.firstName}</li>
      <li class="lastName">${customer.lastName}</li>
      <li class="address">${customer.address}</li>
      <li class="phone">${customer.phone}</li>
      <li class="email">${customer.email}</li>
    </label>    
  </div>`;    
}