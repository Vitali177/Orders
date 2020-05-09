import { createMarkupAllOrdersInList } from "./modules/create-markup-all-orders-in-list";
import { showDetailsOrder } from "./modules/show-details-order";
import { addEventListeners } from "./modules/add-event-listeners";
import { setupApplicationUI } from "./modules/setup-application-UI";
import { displayPreloaders } from "./modules/display-preloaders";
import { getMarkup404NotFound } from "./html-markups/get-markup-404-not-found";

window.addEventListener("DOMContentLoaded", init);

function init() {
  const urlId = window.location.href.split("id=")[1];

  setupApplicationUI(); 
  displayPreloaders();

  createMarkupAllOrdersInList().then(() => {
    if (urlId && !document.querySelector(`.order-list__item[id='${urlId}']`)) {
      document.body.innerHTML = getMarkup404NotFound();
    } else {
      const order = urlId ? document.querySelector(`.order-list__item[id='${urlId}']`)
        : document.querySelectorAll(".order-list__item")[0];

      if (!urlId) {
        history.pushState({}, document.title, `${window.location.pathname}?id=${order.id}`);
      }

      order.classList.add("order-list__item--selected");  
      showDetailsOrder(order.id);
      addEventListeners(); 
    }       
  });
}