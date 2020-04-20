import { createMarkupAllOrdersInList } from "./modules/create-markup-all-orders-in-list";
import { showDetailsOrder } from "./modules/show-details-order";
import { addEventListeners } from "./modules/add-event-listeners";
import { setupApplicationUI } from "./modules/setup-application-UI";
import { displayPreloaders } from "./modules/display-preloaders";

window.addEventListener("DOMContentLoaded", init);

function init() {
  const urlId = window.location.href.split("id=")[1];

  setupApplicationUI(); 
  displayPreloaders();

  createMarkupAllOrdersInList().then(() => {
    if (document.querySelectorAll(".order-list__item").length) {
      if (urlId && document.querySelector(".order-list__item[id='" + urlId + "']")) {
        document.querySelector(".order-list__item[id='" + urlId + "']").classList.add("order-list__item--selected");
      } else {  // default selected first order
        // ! 404 page not found
        const id = document.querySelectorAll(".order-list__item")[0].id
        window.location.href = `${window.location.pathname}?id=${id}`;
      }
      showDetailsOrder(document.querySelector(".order-list__item--selected").id);
    }
    addEventListeners();  
  });
}