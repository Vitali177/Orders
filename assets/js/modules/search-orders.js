import { getMarkupOrderInList } from "../html-markups/get-markup-order-in-list";

export function searchOrders(searchText) {
  const numberOfOrders = document.querySelector(".order-list__header-row h3 span");
  const orderListMain = document.querySelector(".order-list__main");
  const orderMainCriteria = ["id", "summary", "shipTo", "customerInfo"];
  const url = "http://localhost:3000/api/Orders";

  orderListMain.innerHTML = `<div class="preloader"></div>`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      let matchesOrders = data.filter(order => {
        const regex = new RegExp(`^${searchText}`, "gi");
    
        for (let keyMain in order) {
          if (orderMainCriteria.indexOf(keyMain) !== -1) {
            let mainProperties = order[keyMain];
            for (let key in mainProperties) {
              if (`${mainProperties[key]}`.match(regex)) return 1;
            }    
          }        
        }
      });
    
      if (!searchText.length) {
        matchesOrders = data; // show all list when input is empty
      }
    
      if (matchesOrders.length) {
        const markup = matchesOrders.map(order => getMarkupOrderInList(order)).join("");
        orderListMain.innerHTML = markup;
      } else {
        orderListMain.innerHTML = `<div class="no-orders">Orders not found</div>`;
      }
      numberOfOrders.innerHTML = matchesOrders.length;
    });  
}