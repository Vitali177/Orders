export function getMarkupOrderProduct(product) {  
  return `
  <div class="order__line-list-row">
    <li class="product">
      <span class = "value">${product.name}</span>
      <span class = "id">${product.id}</span>
    </li>
    <li class="unit-price">
      <span class="mobile-info">Unit Price:<br></span>
      <span class = "value">${product.price}</span>
      <span class="currency">${product.currency}</span>
    </li>
    <li class="quantity">
      <span class="mobile-info">Quantity:<br></span>
      <span class = "value">${product.quantity}</span>
    </li>
    <li class="total">
      <span class="mobile-info">Total:<br></span>
      <span class = "value">${product.totalPrice}</span>
      <span class="currency">${product.currency}</span>
    </li>
    <li class="delete-product">
      <div class="button-delete-product"></div>
    </li>
  </div>`;    
}