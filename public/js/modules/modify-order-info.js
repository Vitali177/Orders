export function modifyOrderInfo(button) {
  const inputs = document.querySelectorAll(".tab--selected input");
  let isReadOnly;
  let buttonText;

  if (!button.classList.contains("button-edit-display--active")) {
    buttonText = "Display";
    isReadOnly = false;
  } else {
    buttonText = "Edit";
    isReadOnly = true;

    const orderId = window.location.href.split("id=")[1];
    const url = `${window.location.origin}/api/Orders/${orderId}`;
    const selectedTab = document.querySelector(".tab--selected");
    
    function updateOrderInfo() {
      const customerName = document.querySelector(".order-list__item--selected .order-list__item-customer");
      const orderCustomer = document.querySelector(".order__customer span");
      const firstName = document.querySelector(".tab--selected input.firstName").value;
      const lastName = document.querySelector(".tab--selected input.lastName").value;

      customerName.innerHTML = `${firstName} ${lastName}`;
      orderCustomer.innerHTML = `${firstName} ${lastName}`;
    }

    inputs.forEach(input => {
      if (input.classList.contains("firstName")) {
        updateOrderInfo();
      }
    });

    let indexTab;
    const keys = [["address", "ZIP", "region", "country"], 
          ["firstName", "lastName", "address", "phone", "email"]];

    if (selectedTab.classList.contains("order__address")) {
      indexTab = 0;
    } else if (selectedTab.classList.contains("order__processor")) {
      indexTab = 1;
    }

    const keysTab = keys[indexTab];
    const data = {};

    keysTab.forEach((value, index) => {
      data[value] = inputs[index].value;
    });

    fetch(url, {
      method: "PUT",
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  button.innerHTML = buttonText;
  button.classList.toggle("button-edit-display--active");

  inputs.forEach(input => {
    input.readOnly = isReadOnly;
    input.classList.toggle("is-modify");
  });
}