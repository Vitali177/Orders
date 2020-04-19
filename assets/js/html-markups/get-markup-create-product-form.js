export function getMarkupCreateProductForm() {  
  return `
  <div class="wrapper-product-form wrapper-pop-up-form"">
    <div class="create-product-form pop-up-form">
      <h3>Please, write product details</h3>
      <form action="#">
        <input type="text" class="input-name" placeholder="Name">
        <input type="text" class="input-price" placeholder="Price">
        <input type="text" class="input-currency" placeholder="Currency">
        <input type="text" class="input-quantity" placeholder="Quantity">
        <input type="text" class="input-totalPrice" placeholder="Total Price">
        <input type="submit" class="submit-create-product" value="Create Product">
      </form>     
      <div class="product-cancel-button cancel-button"></div> 
    </div>
  </div>`;    
}