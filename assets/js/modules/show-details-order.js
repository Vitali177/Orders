import { getMarkupOrderMainInfo } from "../html-markups/get-markup-order-main-info";
import { getMarkupOrderAddress } from "../html-markups/get-markup-order-address";
import { getMarkupOrderCustomer } from "../html-markups/get-markup-order-customer"; 
import { getMarkupOrderMap } from "../html-markups/get-markup-order-map";
import { getMarkupOrderProduct } from "../html-markups/get-markup-order-product";
import { generateYandexMap } from "./generate-yandex-map";

export function showDetailsOrder(id) {  
  const sectionMainInfo = document.querySelector("section.order__main-info .wrapper");
  const sectionOrderAddress = document.querySelector("section.order__address");
  const sectionOrderProcessor = document.querySelector("section.order__processor");
  const sectionOrderMap = document.querySelector("section.order__map");
  const sectionOrderLineItems = document.querySelector("section.order__line-items .wrapper");
  const numberLineItems = document.querySelector(".order__line-items-heading span");
  
  const url = `http://localhost:3000/api/Orders/${id}`;  
  const urlProducts = `http://localhost:3000/api/Orders/${id}/products`; 

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      sectionMainInfo.innerHTML = getMarkupOrderMainInfo(data);
      sectionOrderAddress.innerHTML = getMarkupOrderAddress(data);
      sectionOrderProcessor.innerHTML = getMarkupOrderCustomer(data);
      sectionOrderMap.innerHTML = getMarkupOrderMap();

      displayMap();

      fetch(urlProducts)
        .then(res => res.json())
        .then(data => {
          console.log(data);

          let markup = "";
          data.forEach((product) => {
            markup += getMarkupOrderProduct(product);  
          });

          sectionOrderLineItems.innerHTML = markup;
          numberLineItems.innerHTML = data.length;
        });      
    });

  function displayMap() {
    const country = document.querySelector(".order-input-country").value;
    const queryApi = 'https://api.opencagedata.com/geocode/v1/json?';
    const accessKey = `q=${country}&key=ddc1c7bc04434a968ca2655d83467aee&pretty=1&no_annotations=1&language=en`;
    const url = queryApi + accessKey;

    fetch(url)
      .then(res => res.json())
      .then(data => generateYandexMap(data.results[0].geometry.lat, data.results[0].geometry.lng));    
  }
}