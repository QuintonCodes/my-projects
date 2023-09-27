let clear;
let handleClearClick;

export function initializeCalc() {
  let screen = document.querySelector(".screen");
  let allClear = document.querySelector("#allcancel");
  let equal = document.querySelector(".btn-equal");
  clear = document.querySelector("#cancel");

  function clickHandler(e) {
    let value = e.target.dataset.num;

    clear.classList.remove("processed");

    if (value) {
      if (value === "%") {
        let currentValue = parseFloat(screen.value);
        if (!isNaN(currentValue)) {
          screen.value = (currentValue / 100).toString();
        }
      } else {
        screen.value += value;
      }
    }
  }

  function handleEqualClick() {
    if (screen.value === "") {
      screen.value = "Please enter";
    } else {
      try {
        let answer = Function("return " + screen.value)();
        screen.value = answer.toString();
      } catch (error) {
        screen.value = "Error";
      }
    }
  }

  function handleAllClearClick() {
    screen.value = "";
    clear.classList.remove("processed");
  }

  handleClearClick = function (e) {
    if (!e.target.classList.contains("processed")) {
      e.target.classList.add("processed");
      if (screen.value === "Error" || screen.value === "Please enter") {
        screen.value = "";
      } else if (screen.value.length > 0) {
        screen.value = screen.value.slice(0, -1);
      }
    }
  };

  //* Attach event listeners
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach(function (button) {
    if (!button.hasAttribute("data-listener")) {
      button.addEventListener("click", clickHandler);
      button.setAttribute("data-listener", "true");
    }
  });

  equal.removeEventListener("click", handleEqualClick);
  equal.addEventListener("click", handleEqualClick);

  allClear.removeEventListener("click", handleAllClearClick);
  allClear.addEventListener("click", handleAllClearClick);

  clear.removeEventListener("click", handleClearClick);
  clear.addEventListener("click", handleClearClick);

  //* Function to remove event listeners
  function removeEventListeners() {
    buttons.forEach(function (button) {
      button.removeEventListener("click", clickHandler);
      button.removeAttribute("data-listener");
    });

    equal.removeEventListener("click", handleEqualClick);
    allClear.removeEventListener("click", handleAllClearClick);
    clear.removeEventListener("click", handleClearClick);
  }

  return removeEventListeners;
}

export function removeEventListeners() {
  clear.removeEventListener("click", handleClearClick);
}
