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

function getProductDetails(productID) {
    const products = [
        {
            id: "prod1",
            name: "KickFlip Hoodie",
            price: "R 300.00",
            sizes: ["Select size", "Small", "Medium", "Large", "XL"],
            description: "Product description for KickFlip Hoodie.",
            images: [
                "clothes/mock-ups/mockup1-front.jpeg",
                "clothes/mock-ups/mockup1-back.jpeg"
            ]
        },
        {
            id: "prod2",
            name: "KickFlip Hoodie",
            price: "R 300.00",
            sizes: ["Select size", "Small", "Medium", "Large", "XL"],
            description: "Product description for KickFlip Hoodie.",
            images: [
                "clothes/mock-ups/mockup2-front.jpeg",
                "clothes/mock-ups/mockup2-back.jpeg"
            ]
        }
    ];

    // Find the product with the given ID
    const product = products.find(p => p.id === productID);

    return product;
}

function updateSingleProductPage(product) {
    const MainImg = document.getElementById("MainImg");
    const smallimg = document.getElementsByClassName("small-img");
    const proDetails = document.querySelector(".pro-details");

    MainImg.src = product.images[0];
    if (smallimg.length > 0) {
        smallimg[0].src = product.images[0];
        if (smallimg.length > 1) {
            smallimg[1].src = product.images[1];
        }
    }

    proDetails.innerHTML = `
            <h4>${product.name}</h4>
            <h3>${product.price}</h3>
            <select id="options" autocomplete="Select size">
                ${product.sizes.map(size => `<option>${size}</option>`).join('')}
            </select>
            <input type="number" value="1" id="noOfStock" autocomplete="1">
            <a href="#">
                <div class="pro-buy">
                    <div class="button2">
                        <div class="button-wrapper2">
                            <div class="text2">Buy Now</div>
                            <span class="icon2">
                                <svg viewBox="0 0 16 16" class="bi bi-cart2-2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </a>
            <h4>Product Details</h4>
            <p>${product.description}</p>
        `;
}

// Get the product ID from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get('productID');

// Fetch product details and update the page content
const product = getProductDetails(productID);
if (product) {
    updateSingleProductPage(product);
}

function redirectToSingleProduct(productID) {
    const url = `sproduct.html?id=${productID}`;
    window.location.href = url;
}

const productCards = document.getElementsByClassName('pro');
for (let i = 0; i < productCards.length; i++) {
    const productID = productCards[i].id;
    productCards[i].addEventListener('click', function () {
        const product = getProductDetails(productID);
        if (product) {
            updateSingleProductPage(product);
        }
    });
}