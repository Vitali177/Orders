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
    const url = `http://localhost:3000/api/Orders/${orderId}`;
    const selectedTab = document.querySelector(".tab--selected");
    
    let indexTab;
    const keys = [["firstName", "address", "ZIP", "region", "country"], 
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