export async function createProduct() {
  const productName = document.querySelector(".pop-up-form .input-name").value;
  const price = document.querySelector(".pop-up-form .input-price").value;

  if ((productName || price) === "") {
    return; // if user didn't fill all inputs
  }

  const product = {productName, price};
  const url = `${window.location.origin}/api/OrderProducts`;

  fetch(url, {
    method: "POST",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  }); 
}