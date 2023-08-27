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

var removeCartItemButtons = document.getElementsByClassName('fa-trash-can');
for(let i = 0; i < removeCartItemButtons.length; i++){
    var button = removeCartItemButtons[i];
    button.addEventListener('click', function(event){
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.parentElement.remove();
    });
}

function updateCartTotal() {
    var cartRows = cartItemContainer.querySelector('.cart-row');
    var total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.querySelector('.price');
        var quantityElement = cartRow.querySelector('qtn input');
        var subtotalElement = cartRow.querySelector('.sub');

        var price = parseFloat(priceElement.innerText.replace('R', ''));
        var quantity = parseInt(quantityElement.value);
        var subtotal = price * quantity;

        subtotalElement.innerText = 'R' + subtotal;
        total += subtotal;
    }

    document.getElementById('cart-sub').innerText = 'R' + total;

}

var quantityInputs = document.querySelectorAll('.qtn input');
for (let i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener('change', updateCartTotal);
}