import { getMarkupCustomer } from "../html-markups/get-markup-customer";

export function showExistCustomers() {
  const customerInfo = document.querySelector(".create-order-form .customers-info");
  const url = `${window.location.origin}/api/Customers`;

  fetch(url)
  .then(res => res.json())
  .then(customers => {   
    let markupCustomers = ""; 
    customers.forEach(customer => markupCustomers += getMarkupCustomer(customer));
    
    const markup = `
    <div class="customers-header">
      <li class="id">id</li>
      <li class="firstName">firstName</li>
      <li class="lastName">lastName</li>
      <li class="address">address</li>
      <li class="phone">phone</li>
      <li class="email">email</li>
    </div>
    <div class="customers-wrapper">
      ${markupCustomers}
    </div>`;

    customerInfo.innerHTML = markup;
  });  
}