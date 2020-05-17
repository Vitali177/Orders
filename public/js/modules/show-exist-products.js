
export function showExistProducts() {
  const url = `${window.location.origin}/api/Products`;

  function getMarkupProductInForm(product) {
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

  fetch(url)
  .then(res => res.json())
  .then(products => {   
    let markupProducts = ""; 
    products.forEach(product => markupProducts += getMarkupProductInForm(product));
    
    let markup = `
    <div class="wrapper-order-form wrapper-pop-up-form"">
      <div class="add-products-form pop-up-form">
        <h3>Please, choose Products</h3>
        <form action="#">
          <div class="products-header">
            <li class="id">Id</li>
            <li class="productName">Name</li>
            <li class="price">Price</li>
            <li class="quantity">Quantity</li>
          </div>
          <div class="products-wrapper">
            ${markupProducts}
          </div>
          <input type="submit" class="submit-add-products" value="Add Products">
        </form>     
        <div class="add-products-cancel-button cancel-button"></div> 
      </div>
    </div>`;  

    document.body.insertAdjacentHTML("beforeend", markup);
  });  
}