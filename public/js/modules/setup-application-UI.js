export function setupApplicationUI() {
  const tabletWidth = 1075;

  // removing menu animation (leaving to left), when user just opened the page
  if (window.innerWidth < tabletWidth) { 
    const menu = document.querySelector(".order-list");
    const timeout = 0;
    
    menu.classList.add("order-list--hidden");
    menu.style.display = "none";
    setTimeout(() => menu.style.display = "block", timeout);
  }

  // hides button for menu in header, because the menu is already open
  if (window.innerWidth > tabletWidth) {  
    const headerButton = document.querySelector(".header__button");
    headerButton.classList.add("header__button--hidden");
  } 
}