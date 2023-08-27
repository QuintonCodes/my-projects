document.addEventListener('DOMContentLoaded', function() {
    var cartRows = document.querySelectorAll('.cart-row');
    var initialCartSubtotal = 0;

    cartRows.forEach(function(cartRow) {
        var priceElement = cartRow.querySelector('.price');
        var quantityInput = cartRow.querySelector('.qtn input');

        var price = parseFloat(priceElement.innerText.replace('R ', ''));
        var quantity = Math.max(parseInt(quantityInput.value), 1);
        var subtotal = price * quantity;

        initialCartSubtotal += subtotal;

        //Remove items
        var removeButton = document.getElementsByClassName('fa-trash-can');
        removeButton.addEventListener('click', function() {
            cartRow.remove();
            updateCartTotal();
        });

        // Quantity Input
        quantityInput.addEventListener('input', function() {
            var newQuantity = parseInt(this.value);
            if (isNaN(newQuantity) || newQuantity <= 0) {
                this.value = 1;
            }
            updateCartTotal();
        });
    });

    document.getElementById('cart-sub').innerText = 'R ' + initialCartSubtotal.toFixed(2);
    updateCartTotal();

    // Side bar
    const bar = document.getElementById('bar');
    const nav = document.getElementById('navbar');
    const close = document.getElementById('close');

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
    var cartRows = cartItemContainer.querySelectorAll('.cart-row');
    var total = 0;

    cartRows.forEach(function(cartRow) {
        var priceElement = cartRow.querySelector('.price');
        var quantityInput = cartRow.querySelector('.qtn input');
        var subtotalElement = cartRow.querySelector('.sub');

        var price = parseFloat(priceElement.innerText.replace('R ', ''));
        var quantity = MathparseInt(quantityInput.value);
        var subtotal = price * quantity;

        subtotalElement.innerText = 'R ' + subtotal.toFixed(2);
        total += subtotal;
    });

    var shippingCost = parseFloat(document.getElementById('shipping').innerText.replace('R ', ''));
    var cartSubtotal = total;
    var grandTotal = cartSubtotal + shippingCost;

    document.getElementById('cart-sub').innerText = 'R ' + cartSubTotal.toFixed(2);
    document.getElementById('total').innerText = 'R ' + grandTotal.toFixed(2);
}