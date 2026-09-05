
const menuItems = [
    {
        name: "pizza",
        price: 200,
        img: "images/pizza.jpg"
    },
    {
        name: "burger",
        price: 150,
        img: "images/burger.jpg"
    },
    {
        name: "wrap",
        price: 90,
        img: "images/wrap.jpg"
    },
    {
        name: "rice_bowl",
        price: 190,
        img: "images/rice_bowl.jpg"
    },
    {
        name: "pasta",
        price: 250,
        img: "images/pasta.jpg"
    }
];

function showMenu() {
    document.getElementById("pageTitle").innerText = "View Menu"
    const html = `
        <div class="grid">
            ${menuItems.map(item => `
                <div class="card">
                    <img src="${item.img}" />
                    <h3>${item.name}</h3>
                    <p>₹${item.price}</p>
                    <div class="qty-container">
                        <button onclick="decreaseQty('${item.name}')">−</button>
                        <input type="number" id="qty-${item.name}" value="1" min="1" />
                        <button onclick="increaseQty('${item.name}')">+</button>
                    </div>
                    <button class="add-btn" onclick="addToCart('${item.name}')">
                        Add to Cart
                    </button>
                </div>
            `).join("")}
        </div>
    `;
    document.getElementById("content").innerHTML = html;
}


function increaseQty(item) {
    const input = document.getElementById(`qty-${item}`);
    input.value = parseInt(input.value) + 1;
}

function decreaseQty(item) {
    const input = document.getElementById(`qty-${item}`);
    if (input.value > 1) {
        input.value = parseInt(input.value) - 1;
    }
}