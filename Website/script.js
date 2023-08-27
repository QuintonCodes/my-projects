<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function() {
    // Side bar
    const bar = document.getElementById('bar');
    const nav = document.getElementById('navbar');
    const close = document.getElementById('close');
=======
const cartItemContainer = document.getElementById('cart-items');

// Side bar
const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');
>>>>>>> ce96235c9eaa43629648039a383b04f5c068ea91

    if (bar){
        bar.addEventListener('click', () => {
            nav.classList.add('active');
        });
    }

    if (close){
        close.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    }

<<<<<<< HEAD
    var removeCartItemButtons = document.getElementsByClassName('fa-trash-can');
    for(let i = 0; i < removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i];
        button.addEventListener('click', function(event){
            var buttonClicked = event.target;
            buttonClicked.parentElement.parentElement.parentElement.remove();
            updateCartTotal();
        });
    }

    var quantityInputs = document.querySelectorAll('.qtn input');
    for (let i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener('input', function() {
            var quantity = parseInt(this.value);
            if (isNaN(quantity) || quantity <= 0) {
                this.value = 1;
            }
            updateCartTotal();
        });
    }

    updateCartTotal();
});

function updateCartTotal() {
    var cartItemContainer = document.getElementById('cart-items');
=======
var removeCartItemButtons = document.getElementsByClassName('fa-trash-can');
for(let i = 0; i < removeCartItemButtons.length; i++){
    var button = removeCartItemButtons[i];
    button.addEventListener('click', function(event){
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.parentElement.remove();
        updateCartTotal();
    });
}

function updateCartTotal() {
>>>>>>> ce96235c9eaa43629648039a383b04f5c068ea91
    var cartRows = cartItemContainer.querySelectorAll('.cart-row');
    var total = 0;

    cartRows.forEach(function(cartRow) {
        var priceElement = cartRow.querySelector('.price');
        var quantityElement = cartRow.querySelector('.qtn input');
        var subtotalElement = cartRow.querySelector('.sub');

        var price = parseFloat(priceElement.innerText.replace('R ', ''));
        var quantity = parseInt(quantityElement.value);
        var subtotal = price * quantity;

        subtotalElement.innerText = 'R ' + subtotal.toFixed(2);
        total += subtotal;
    });
<<<<<<< HEAD

    var shippingCost = parseFloat(document.getElementById('shipping').innerText.replace('R ', ''));
    var cartSubtotal = total;
    var grandTotal = cartSubtotal + shippingCost;

    document.getElementById('cart-sub').innerText = 'R ' + cartSubTotal.toFixed(2);
    document.getElementById('total').innerText = 'R ' + grandTotal.toFixed(2);
=======

    document.getElementById('cart-sub').innerText = 'R ' + total.toFixed(2);
}

var quantityInputs = document.querySelectorAll('.qtn input');
for (let i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener('change', updateCartTotal);
>>>>>>> ce96235c9eaa43629648039a383b04f5c068ea91
}