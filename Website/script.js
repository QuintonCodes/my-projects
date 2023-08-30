document.addEventListener("DOMContentLoaded", function () {
  function ready() {
    var quantityInputs = document.querySelectorAll(".qtn input");
    for (let i = 0; i < quantityInputs.length; i++) {
      quantityInputs[i].addEventListener("change", function () {
        updateCartTotal();
        updateGrandTotal();
      });
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

    var addToCartButtons = document.getElementsByClassName("button");
    for (let i = 0; i < addToCartButtons.length; i++) {
      addToCartButtons[i].addEventListener("click", addToCartClicked);
    }

    document
      .getElementsByClassName("Btn")[0]
      .addEventListener("click", payClicked);

    // ! Remove Items - Do not change it works.
    var removeCartItemButtons = document.getElementsByClassName("fa-trash-can");
    for (let i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i];
      button.addEventListener("click", function (event) {
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.parentElement.remove();
        updateCartTotal();
        updateGrandTotal();
      });
    }

    var quantityInputs = document.querySelectorAll(".qtn input");
    for (let i = 0; i < quantityInputs.length; i++) {
      quantityInputs[i].addEventListener("change", quantityChanged);
    }

    updateCartQuantity();
    updateCartTotal();
    updateGrandTotal();
  }

  ready();
});

// Side bar
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

function updateCartTotal() {
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

  cartRows2.forEach(function (cartRow2) {
    var cartSubElement = cartRow2.querySelector(".cart-sub");
    var shippingCostElement = cartRow2.querySelector(".delivery");
    var gTotalElement = cartRow2.querySelector(".total");

    console.log("cartSubElement:", cartSubElement);
    console.log("shippingCost:", shippingCostElement);

    if (cartSubElement !== null && shippingCostElement !== null) {
      var cartSub = parseFloat(cartSubElement.innerText.replace("R ", ""));
      var shipping = parseFloat(
        shippingCostElement.innerText.replace("R ", "")
      );
      var grandTotal = cartSub + shipping;

      gTotalElement.innerText = "R " + grandTotal.toFixed(2);
      gtotal += grandTotal;
    }
  });

  gtotal = Math.round(gtotal * 100) / 100;
  document.querySelector(".total").innerText = "R " + gtotal.toFixed(2);
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
  updateGrandTotal();
}

function addToCartClicked(event) {
  var add = event.target;
  var shopItem = add.parentElement.parentElement.parentElement;
  var img = shopItem.getElementsByClassName("img")[0].src;
  var item = shopItem.getElementsByClassName("item")[0].innerText;
  var price = shopItem.getElementsByClassName("priceItem")[0].innerText;
  addItemToCart(img, item, price);
  updateCartTotal();
}

function addItemToCart(img, item, price) {
  var cartItemNames = document.querySelectorAll(".pd");
  var cartItems = document.querySelectorAll("pro")[0];

  // Create a new table row for the cart
  var cartRow = document.createElement("td");
  cartRow.classList.add("cart-row");

  // Check if item is already in cart
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == item) {
      alert("This item is already added to the cart");
      return;
    }
  }

  var cartRowItems = `
        <td class = "remove"><a href = "#"><i class = "fa-solid fa-trash-can" style = "color: #000000;"></i></a></td>
        <td class = "img"><img src = "${img}" alt=""></td>
        <td class = "pd">${item}</td>
        <td class = "price">${price}</td>
        <td class = "qtn"><input type = "number" value = "1"></td>
        <td class = "sub">R 0.00</td>`;

  cartRow.innerHTML = cartRowItems;
  cartItems.append(cartRow);

  cartRow
    .getElementsByClassName("button")[0]
    .addEventListener("click", removeCartItemButtons);
  cartRow
    .getElementsByClassName("qtn")[0]
    .addEventListener("change", quantityChanged);
}

function payClicked() {
  alert("Thank you for your purchase.");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }

  // Reset cart totals
  document.querySelector(".cart-sub").innerText = "R 0.00";
  document.querySelector(".shipping").innerText = "R 0.00";
  document.querySelector(".total").innerText = "R 0.00";

  updateCartQuantity();
  updateGrandTotal();
}
