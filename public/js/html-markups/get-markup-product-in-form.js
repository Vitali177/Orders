export function getMarkupProductInForm(product) {  
  return `
  <div class="products-item">
    <input type="checkbox" id="product-${product.id}" name="product" value="${product.id}">
    <label for="product-${product.id}">
      <li class="id">${product.id}</li>
      <li class="product-name">${product.productName}</li>
      <li class="price">${product.price}</li>
      <li class="quantity">
        <input type="text" value="1">
      </li>
    </label>    
  </div>`;
}