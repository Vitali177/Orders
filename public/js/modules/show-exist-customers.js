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
      <li class="id">Id</li>
      <li class="firstName">First Name</li>
      <li class="lastName">Last Name</li>
      <li class="address">Address</li>
      <li class="phone">Phone</li>
      <li class="email">Email</li>
    </div>
    <div class="customers-wrapper">
      ${markupCustomers}
    </div>`;

    customerInfo.innerHTML = markup;
  });  
}