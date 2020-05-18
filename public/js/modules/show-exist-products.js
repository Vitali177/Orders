import { getMarkupProductInForm } from "../html-markups/get-markup-product-in-form";

export function showExistProducts() {
  const url = `${window.location.origin}/api/Products`;

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