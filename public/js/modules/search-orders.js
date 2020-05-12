import { getMarkupOrderInList } from "../html-markups/get-markup-order-in-list";

export function searchOrders(searchText) {
  const numberOfOrders = document.querySelector(".order-list__header-row h3 span");
  const orderListMain = document.querySelector(".order-list__main");
  const criteria = ["id", "ZIP", "address", "country", "createdAt", "email", "firstName",
    "lastName", "phone", "region", "shippedAt", "status"];
  const urlId = window.location.href.split("id=")[1];
  const url = `${window.location.origin}/api/Orders`;

  orderListMain.innerHTML = `<div class="preloader"></div>`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      let matchesOrders = data.filter(order => {
        const regex = new RegExp(`^${searchText}`, "gi");

        for (let i = 0; i < criteria.length; i++) {
          if ( `${order[criteria[i]]}`.match(regex)) {
            return 1;
          }
        } 
      });
    
      if (!searchText.length) {
        matchesOrders = data; // show all list when input is empty
      }
    
      if (matchesOrders.length) {
        const markup = matchesOrders.map(order => getMarkupOrderInList(order)).join("");
        orderListMain.innerHTML = markup;
        // If there is selected order from search orders, then display it with backlight
        if (document.querySelector(".order-list__item[id='" + urlId + "']")) {
          document.querySelector(".order-list__item[id='" + urlId + "']").classList.add("order-list__item--selected");
        }
      } else {
        orderListMain.innerHTML = `<div class="no-orders">Orders not found</div>`;
      }
      numberOfOrders.innerHTML = matchesOrders.length;
    });  
}