import { getMarkupOrderMainInfo } from "../html-markups/get-markup-order-main-info";
import { getMarkupOrderAddress } from "../html-markups/get-markup-order-address";
import { getMarkupOrderCustomer } from "../html-markups/get-markup-order-customer"; 
import { getMarkupOrderMap } from "../html-markups/get-markup-order-map";
import { getMarkupOrderProduct } from "../html-markups/get-markup-order-product";
import { generateYandexMap } from "./generate-yandex-map";

export function showDetailsOrder(id) {  
  const sectionMainInfo = document.querySelector("section.order__main-info > .wrapper");
  const sectionOrderAddress = document.querySelector("section.order__address");
  const sectionOrderProcessor = document.querySelector("section.order__processor");
  const sectionOrderMap = document.querySelector("section.order__map");
  const sectionOrderLineItems = document.querySelector(".order__line-list > .wrapper");
  const numberLineItems = document.querySelector(".order__line-items-heading span");
  const tabSelected = document.querySelector(".tab--selected");
  
  [sectionMainInfo, tabSelected, sectionOrderLineItems]
    .forEach(block => block.innerHTML = `<div class="preloader"></div>`);

  const url = `${window.location.origin}/api/Orders/${id}`;  
  const urlProducts = `${window.location.origin}/api/Orders/${id}/products`; 

  fetch(url)
    .then(res => res.json())
    .then(data => {
      sectionMainInfo.innerHTML = getMarkupOrderMainInfo(data);
      sectionOrderAddress.innerHTML = getMarkupOrderAddress(data);
      sectionOrderProcessor.innerHTML = getMarkupOrderCustomer(data);
      sectionOrderMap.innerHTML = getMarkupOrderMap();

      displayMap();

      fetch(urlProducts)
        .then(res => res.json())
        .then(data => {
          let markup = "";

          if (data.length) {
            data.forEach((product) => {
              markup += getMarkupOrderProduct(product);  
            });
          } else {
            markup = `<div class="no-products">Products not found</div>`;
          }          

          sectionOrderLineItems.innerHTML = markup;
          numberLineItems.innerHTML = data.length;
        });      
    });

  function displayMap() {
    const address = document.querySelector("input.address").value;
    const region = document.querySelector("input.region").value;
    const country = document.querySelector("input.country").value;
    const queryApi = 'https://api.opencagedata.com/geocode/v1/json?';
    const accessKey = `q=${address},${region},${country}&key=ddc1c7bc04434a968ca2655d83467aee&pretty=1&no_annotations=1&language=en`;
    const url = queryApi + accessKey;

    fetch(url)
      .then(res => res.json())
      .then(data => generateYandexMap(data.results[0].geometry.lat, data.results[0].geometry.lng))
      .catch(err => document.querySelector("#map").innerHTML = `<div class="no-map">Region and street of the shipping address is not found</div>`);
  }
}