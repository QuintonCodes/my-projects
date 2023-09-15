document.addEventListener("DOMContentLoaded", function () {
  ready();

  const bar = document.getElementById("bar");
  const nav = document.getElementById("navbar");
  const close = document.getElementById("close");

  if (bar) {
    bar.addEventListener("click", () => {
      nav.classList.add("active");
    });
  }

  if (close) {
    close.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  }

  function ready() {
    setupQuantityChangeListeners();
    setupPayClickedListener();
    setupRemoveCartItemListeners();
    updateCartTotals();
    updateGrandTotal();
  }

  // * Event listeners setup
  function setupQuantityChangeListeners() {
    const quantityInputs = document.querySelectorAll(".qtn input");
    quantityInputs.forEach((input) => {
      input.addEventListener("change", function () {
        quantityChanged(event);
        updateCartAndGrandTotals();
      });
    });
  }

  function setupPayClickedListener() {
    const payButton = document.getElementsByClassName("Btn")[0];
    payButton.addEventListener("click", payClicked);
  }

  function setupRemoveCartItemListeners() {
    const removeCartItemButtons = document.querySelectorAll(".fa-trash-can");
    removeCartItemButtons.forEach((button) => {
      button.addEventListener("click", removeCartItem);
    });
  }

  // *Update cart and grand totals
  function updateCartAndGrandTotals() {
    updateCartTotals();
    updateGrandTotal();
  }

  function calculateShipping(cartSubtotal) {
    const freeShippingThreshold = 301;
    const shippingPercentage = 0.2; // 20% of the cart subtotal

    if (cartSubtotal >= freeShippingThreshold) {
      return 0;
    } else {
      const shippingCost = cartSubtotal * shippingPercentage;
      return shippingCost;
    }
  }

  function updateCartTotals() {
    var cartRows = document.querySelectorAll(".cart-row");
    var total = 0;

    cartRows.forEach(function (cartRow) {
      var priceElement = cartRow.querySelector(".price");
      var quantityElement = cartRow.querySelector(".qtn input");
      var subtotalElement = cartRow.querySelector(".sub");

      var price = parseFloat(priceElement.innerText.replace("R ", ""));
      var quantity = Math.max(parseInt(quantityElement.value), 1);
      var subtotal = price * quantity;

      subtotalElement.innerText = "R " + subtotal.toFixed(2);
      total += subtotal;
    });

    total = Math.round(total * 100) / 100;
    document.querySelector(".cart-sub").innerText = "R " + total.toFixed(2);
  }

  function updateGrandTotal() {
    var cartRows2 = document.querySelectorAll(".cart-row2");
    var gtotal = 0;
    var cartSubtotal = 0;

    cartRows2.forEach(function (cartRow2) {
      var cartSubElement = cartRow2.querySelector(".cart-sub");

      if (cartSubElement !== null) {
        var cartSub = parseFloat(cartSubElement.innerText.replace("R ", ""));
        cartSubtotal += cartSub; // Add cartSub to the cartSubtotal
      }
    });

    var shippingCost = calculateShipping(cartSubtotal); // Calculate shipping
    document.querySelector(".delivery").innerText =
      "R " + shippingCost.toFixed(2);

    gtotal = cartSubtotal + shippingCost;
    gtotal = Math.round(gtotal * 100) / 100;
    document.querySelector(".total").innerText = "R " + gtotal.toFixed(2);
  }

  function updateCartQuantity() {
    const cartItems = document.querySelectorAll(".cart-row");
    const cartQuantity = cartItems.length;

    const cartButton = document.querySelector(".btn-cart");
    const quantitySpan = cartButton.querySelector(".quantity");

    // * Update data-quantity attribute and the content of the span element
    cartButton.setAttribute("data-quantity", cartQuantity);
    quantitySpan.textContent = cartQuantity;
  }

  function payClicked() {
    alert("Thank you for your purchase.");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild);
    }

    // Reset cart totals
    document.querySelector(".cart-sub").innerText = "R 0.00";
    document.querySelector(".delivery").innerText = "R 0.00";
    document.querySelector(".total").innerText = "R 0.00";

    updateCartQuantity();
    updateGrandTotal();
  }

  function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateCartTotals();
    updateGrandTotal();
  }

  function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.parentElement.remove();
    updateCartTotals();
    updateGrandTotal();
  }
});
