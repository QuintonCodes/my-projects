(function () {
  // Declare function variables
  let screen = document.querySelector(".screen");
  let buttons = document.querySelectorAll(".btn");
  let allClear = document.querySelector("#allcancel");
  let clear = document.querySelector("#cancel");
  let equal = document.querySelector(".btn-equal");

  buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      let value = e.target.dataset.num;
      if (value) {
        if (value === "%") {
          // * Convert the number before the percentage symbol to a decimal
          let currentValue = parseFloat(screen.value);
          if (!isNaN(currentValue)) {
            screen.value = (currentValue / 100).toString();
          }
        } else {
          screen.value += value;
        }
      }
    });
  });

  equal.addEventListener("click", function () {
    if (screen.value === "") {
      screen.value = "Please enter";
    } else {
      try {
        let answer = Function("return " + screen.value)();
        screen.value = answer;
      } catch (error) {
        screen.value = "Error";
      }
    }
  });

  allClear.addEventListener("click", function () {
    screen.value = "";
  });

  clear.addEventListener("click", function () {
    screen.value = screen.value.slice(0, -1);
  });
})();
