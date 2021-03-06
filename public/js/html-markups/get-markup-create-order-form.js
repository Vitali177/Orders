export function getMarkupCreateOrderForm() {  
  return `
  <div class="wrapper-order-form wrapper-pop-up-form"">
    <div class="create-order-form pop-up-form">
      <h3>Please, write order details</h3>
      <form action="#">
        <h4>Summary</h4>
        <input type="text" class="createdAt" placeholder="Created at">
        <input type="text" class="shippedAt" placeholder="Shipped at">
        <h4>Status</h4>
        <select class="status">
          <option value="In time" selected>In time</option>
          <option value="Urgent">Urgent</option>
          <option value="Too late">Too late</option>
        </select>
        <h4>Ship to</h4>
        <input type="text" class="ZIP" placeholder="ZIP">
        <input type="text" class="region" placeholder="Region">
        <input type="text" class="country" placeholder="Country">
        <h4>Customer Info <button class="exist-customers">Select an existing customer</button></h4>
        <div class="customers-info">
          <input type="text" class="firstName" placeholder="First name">
          <input type="text" class="lastName" placeholder="Last name">
          <input type="text" class="customer-address" placeholder="Address">
          <input type="text" class="phone" placeholder="Phone">
          <input type="text" class="email" placeholder="Email">
        </div>
        <input type="submit" class="submit-create-order" value="Create Order">
      </form>     
      <div class="order-cancel-button cancel-button"></div> 
    </div>
  </div>`;    
}