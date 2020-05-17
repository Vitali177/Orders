export function getMarkupCreateProductForm() {  
  return `
  <div class="wrapper-product-form wrapper-pop-up-form"">
    <div class="create-product-form pop-up-form">
      <h3>Please, write product details</h3>
      <form action="#">
        <input type="text" class="input-name" placeholder="Name" required>
        <input type="text" class="input-price" placeholder="Price" required>
        <input type="submit" class="submit-create-product" value="Create Product">
      </form>     
      <div class="product-cancel-button cancel-button"></div> 
    </div>
  </div>`;    
}