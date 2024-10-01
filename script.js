let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = cart.reduce((sum, item) => sum + item.price, 0);

function searchComics() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const comicItems = document.getElementsByClassName('comic-item');

    for (let i = 0; i < comicItems.length; i++) {
        const title = comicItems[i].getElementsByClassName('comic-description')[0].getElementsByTagName('h2')[0].innerText.toLowerCase();
        if (title.includes(searchTerm)) {
            comicItems[i].style.display = 'block';
        } else {
            comicItems[i].style.display = 'none';
        }
    }
}

function addToCart(comicName, price) {
    const item = cart.find(item => item.productName === comicName);
    if (!item) {
        cart.push({ productName: comicName, price: price });
        localStorage.setItem('cart', JSON.stringify(cart));
        total += price;
        alert(comicName + ' has been added to your cart!');
        updateCart();
    }
}

function updateCart() {
    let cartDiv = document.getElementById('cart');
    let totalSpan = document.getElementById('total');
    if (cartDiv && totalSpan) {
        cartDiv.innerHTML = '';
        cart.forEach((item, index) => {
            let productDiv = document.createElement('div');
            productDiv.innerHTML = `<p>${item.productName} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remove</button></p>`;
            cartDiv.appendChild(productDiv);
        });
        totalSpan.innerText = total.toFixed(2);
    }
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function goToCart() {
    window.location.href = 'cart.html';
}

function goToShop() {
    window.location.href = 'shop.html';
}

function goToHomepage() {
    window.location.href = 'homepage.html';
}

function checkout() {
    window.location.href = 'checkout.html';
}

function updateCheckoutCart() {
    let checkoutCartDiv = document.getElementById('checkout-cart');
    let checkoutTotalSpan = document.getElementById('checkout-total');
    if (checkoutCartDiv && checkoutTotalSpan) {
        checkoutCartDiv.innerHTML = '';
        cart.forEach((item) => {
            let productDiv = document.createElement('div');
            productDiv.innerHTML = `<p>${item.productName} - $${item.price.toFixed(2)}</p>`;
            checkoutCartDiv.appendChild(productDiv);
        });
        checkoutTotalSpan.innerText = total.toFixed(2);
    }
}

function placeOrder() {
    alert('Order placed successfully!');
    cart = [];
    total = 0;
    localStorage.clear();
    updateCart();
    updateCheckoutCart();
    window.location.href = 'homepage.html';
}

// Clear local storage when leaving the site
window.addEventListener('beforeunload', () => {
    localStorage.setItem('cart', JSON.stringify(cart));
});

// Update the cart on page load if on the cart page
document.addEventListener('DOMContentLoaded', (event) => {
    if (document.getElementById('cart')) {
        updateCart();
    }
    if (document.getElementById('checkout-cart')) {
        updateCheckoutCart();
    }
});
