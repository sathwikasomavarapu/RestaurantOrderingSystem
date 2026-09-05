let cart = [];

function addToCart(itemName) {
    const qty = parseInt(document.getElementById(`qty-${itemName}`).value);
    if (!cart[itemName]) { cart[itemName] = 0; }
    cart[itemName] += qty;
    updateCartCount();
    showToast(`added to cart 🛒`);
}

function showToast(message = "Added to cart ✅") {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.add("show");
    setTimeout(() => {toast.classList.remove("show");}, 500);
}

function addOne(itemName) {
    if (!cart[itemName]) cart[itemName] = 0;
    cart[itemName] += 1;
    updateCartCount();
    openCart();
}

function removeFromCart(itemName) {
    if (!cart[itemName]) return;
    cart[itemName] -= 1;
    if (cart[itemName] <= 0) {delete cart[itemName];}
    updateCartCount();
    openCart();
}

function updateCartCount() {
    const total = Object.values(cart).reduce((a, b) => a + b, 0);
    document.getElementById("cartCount").innerText = total;
}

function openCart() {
    let html = "<h2>Cart</h2>";
    if (Object.keys(cart).length === 0) {
        html += "<p>Cart is empty</p>";
    } else {
        html += Object.entries(cart).map(([item, qty]) => `
            <div class="cart-row">
                <span>${item}</span>
                <div class="cart-controls">
                    <button onclick="removeFromCart('${item}')">−</button>
                    <span>${qty}</span>
                    <button onclick="addOne('${item}')">+</button>
                </div>
            </div>
        `).join("");
        html += `<br><button onclick="placeOrder()">Place Order</button>`;
    }
    document.getElementById("content").innerHTML = html;
}