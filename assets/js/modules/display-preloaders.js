export function displayPreloaders() {
  const orderListMain = document.querySelector(".order-list__main");
  const orderMainInfo = document.querySelector(".order__main-info > .wrapper");
  const tabSelected = document.querySelector(".tab--selected");
  const orderLineList = document.querySelector(".order__line-list .wrapper");

  [orderListMain, orderMainInfo, tabSelected, orderLineList]
    .forEach(block => block.innerHTML = `
      <div class="preloader"></div>
    `);  
}