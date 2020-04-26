export function clearSettingsToDefault() {
  const inputOrders =  document.querySelector(".order-list__input-search");
  const inputProducts =  document.querySelector(".order__line-items-input-search");
  const sortingImages = document.querySelectorAll(".sort-picture");

  const buttonAddress = document.querySelector(".order__button-address");
  const sectionOrderAddress = document.querySelector("section.order__address");

  inputOrders.value = "";
  inputProducts.value = "";

  sortingImages.forEach(image => {  // clear images to default
    image.classList.remove("sort-picture--ASC");
    image.classList.remove("sort-picture--DESC");
  });

  // should show address tab by default
  document.querySelector(".order__button--selected").classList.remove("order__button--selected");
  buttonAddress.classList.add("order__button--selected");
  document.querySelector(".tab--selected").classList.remove("tab--selected");
  sectionOrderAddress.classList.add("tab--selected");
}