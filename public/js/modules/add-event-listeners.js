import { showDetailsOrder } from "./show-details-order";
import { searchOrders } from "./search-orders";
import { searchProducts } from "./search-products";
import { sortingProducts } from "./sorting-products";
import { clearSettingsToDefault } from "./clear-settings-to-default";
import { createMarkupAllOrdersInList } from "./create-markup-all-orders-in-list";
import { modifyOrderInfo } from "./modify-order-info";
import { deleteProduct } from "./delete-product";
import { deleteOrder } from "./delete-order"; 
import { createProduct } from "./create-product";
import { createOrder } from "./create-order";
import { getMarkupCreateProductForm } from "../html-markups/get-markup-create-product-form";
import { getMarkupCreateOrderForm } from "../html-markups/get-markup-create-order-form";

export function addEventListeners() {
  const tabletWidth = 1075;

  const buttonBack = document.querySelector(".order-list__button-back");
  const headerButton = document.querySelector(".header__button");
  const footerDeleteOrderButton = document.querySelector(".footer__delete-order");
  const buttonCreateProduct = document.querySelector(".order__line-items-button-create-product");
  const buttonCreateOrder = document.querySelector(".order-list__footer-button-create-order");

  const contentWrapper = document.querySelector(".content-wrapper");
  const orderList = document.querySelector(".order-list");
  const orderItemsMain = document.querySelector(".order-list__main");  
  
  const orderButtons = document.querySelector(".order__buttons");

  const orderMain = document.querySelector("main.order");
  const sectionOrderAddress = document.querySelector("section.order__address");
  const sectionOrderProcessor = document.querySelector("section.order__processor");
  const sectionOrderMap = document.querySelector("section.order__map");

  const searchFromOrdersList = document.querySelector(".order-list__input-search");
  const imageSearchFromOrdersList = document.querySelector(".order-list__form .order-list__button-search");
  const searchFromProductsTable = document.querySelector(".order__line-items-input-search");
  const imageSearchFromProductsTable = document.querySelector(".order__line-items-form .order-list__button-search");

  const listOfProducts = document.querySelector(".order__line-list");
  const listOfProductsHeader = document.querySelector(".order__line-list-row--headline");

  buttonBack.addEventListener("click", () => {
    contentWrapper.classList.add("content-wrapper--menu-hidden");
    headerButton.classList.remove("header__button--hidden");
    orderList.classList.add("order-list--hidden");
  });

  headerButton.addEventListener("click", () => {
    contentWrapper.classList.remove("content-wrapper--menu-hidden");
    headerButton.classList.add("header__button--hidden");
    orderList.classList.remove("order-list--hidden");
  });

  orderItemsMain.addEventListener("click", (e) => {
    if (!e.target.classList.contains("order-list__main")) { //  event delegation      
      let orderListItem = e.target;

      while (!orderListItem.classList.contains("order-list__item")) { //find clicked order
        orderListItem = orderListItem.parentNode;
      }

      createMarkupAllOrdersInList() // show all orders in menu
        .then(() => {
          document.querySelector(`div[id="${orderListItem.id}"]`).classList.add("order-list__item--selected");
          history.pushState({}, document.title, window.location.pathname + "?id=" + orderListItem.id);

          showDetailsOrder(orderListItem.id);
          clearSettingsToDefault();

          if (window.innerWidth < tabletWidth) {
            buttonBack.click(); // hide the menu when the user selects an order
          }
        });      
    }
  });

  orderButtons.addEventListener("click", (e) => { //  event delegation    
    if (e.target.classList.contains("order__button")) {
      document.querySelector(".order__button--selected").classList.remove("order__button--selected");
      e.target.classList.toggle("order__button--selected");

      document.querySelector(".tab--selected").classList.remove("tab--selected");
      if (e.target.classList.contains("order__button-address")) {
        sectionOrderAddress.classList.add("tab--selected");
      } else if (e.target.classList.contains("order__button-processor")) {
        sectionOrderProcessor.classList.add("tab--selected");
      } else if (e.target.classList.contains("order__button-map")) {
        sectionOrderMap.classList.add("tab--selected");
      }
    }
  });

  imageSearchFromOrdersList.addEventListener("click", (e) => {
    e.preventDefault();
    searchOrders(searchFromOrdersList.value);
  });

  imageSearchFromProductsTable.addEventListener("click", (e) => {
    e.preventDefault();
    searchProducts(searchFromProductsTable.value);
  }); 

  listOfProductsHeader.addEventListener("click", (e) => { //  event delegation  
    if (e.target.classList.contains("sort-picture")) {
      sortingProducts(e.target);
    }
  });

  orderMain.addEventListener("click", (e) => {
    if (e.target.classList.contains("button-edit-display")) {
      modifyOrderInfo(e.target);
    }
  });

  listOfProducts.addEventListener("click", (e) => {
    if (e.target.classList.contains("button-delete-product")) {
      deleteProduct(e.target);
    }
  });

  footerDeleteOrderButton.addEventListener("click", deleteOrder);

  buttonCreateProduct.addEventListener("click", () => {
    document.querySelector(".content-wrapper").classList.add("content-wrapper--blurred");
    document.body.classList.add("blocked");
    window.scrollTo(0, 0); // Page up

    document.body.insertAdjacentHTML("beforeend", getMarkupCreateProductForm());
  });

  buttonCreateOrder.addEventListener("click", () => {
    document.querySelector(".content-wrapper").classList.add("content-wrapper--blurred");
    document.body.classList.add("blocked");
    window.scrollTo(0, 0); // Page up

    document.body.insertAdjacentHTML("beforeend", getMarkupCreateOrderForm());
  });

  document.body.addEventListener("click", (e) => {

    function hiddenForm() {
      document.querySelector(".content-wrapper").classList.remove("content-wrapper--blurred");
      document.body.classList.remove("blocked");

      const popUpForm = document.querySelector(".wrapper-pop-up-form");
      document.body.removeChild(popUpForm);
    }

    if (e.target.classList.contains("submit-create-product")) {
      e.preventDefault();
      createProduct();
      hiddenForm();
    }
    else if (e.target.classList.contains("submit-create-order")) {
      e.preventDefault();
      createOrder();
      hiddenForm();
    }
    else if (e.target.classList.contains("product-cancel-button") || 
             e.target.classList.contains("order-cancel-button")) {
      hiddenForm();
    }     
  });
}