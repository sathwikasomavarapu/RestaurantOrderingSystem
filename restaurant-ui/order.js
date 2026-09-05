const BASE_URL = "http://127.0.0.1:8000";

async function placeOrder() {
    const items = [];
    Object.entries(cart).forEach(([item, qty]) => {
        for (let i = 0; i < qty; i++) {
            items.push(item);
        }
    });
    const res = await fetch(`${BASE_URL}/place_order`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(items)
    });
    const data = await res.json();
    document.getElementById("content").innerHTML = `
        <h2>✅ Order Placed</h2>
        <p>Order ID: ${data.order_id}</p>
        <p>Items: ${formatItems(data.items)}</p>
        <p>Estimated Time: ${data.estimated_time} mins</p>
        <p id="countdown"></p>`;
    startCountdown(data.estimated_time * 60);
    cart = {};
    updateCartCount();
}

function formatItems(items) {
    const grouped = {};
    items.forEach(item => {
        grouped[item] = (grouped[item] || 0) + 1;
    });
    return Object.entries(grouped)
        .map(([item, qty]) => `${item} - ${qty}`)
        .join(", ");
}

function startCountdown(seconds) {
    const el = document.getElementById("countdown");
    Object.entries(data).forEach(([id, o]) => {
        if (o.status !== "PREPARING") return;
        const currentTime = Date.now() / 1000;
        const elapsed = (currentTime - o.timestamp) / 60;
        let remaining = (o.estimated_time + o.wait_time) - elapsed;
        if (remaining < 0) remaining = 0;
        startCountdownForOrder(`cd-${id}`, Math.round(remaining * 60));
    });
    const interval = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(interval);
            el.innerText = "Ready!";
            return;}
        el.innerText = `⏳ ${Math.floor(seconds/60)}m ${seconds%60}s`;
        seconds--;
    }, 1000);
}

async function showPending() {
    document.getElementById("pageTitle").innerText = "Order Status";
    const res = await fetch(`${BASE_URL}/get_all_orders`);
    const data = await res.json();
    let html = "<div class='orders-container'>";
    Object.entries(data).forEach(([id, o]) => {
        if (o.status !== "PREPARING") return;
        html += `
            <div class="order-card">
                <p><b>ID:</b> ${id}</p>
                <p>${o.items.join(", ")}</p>
                <p>${o.created_at}</p>
                <p id="cd-${id}" class="countdown"></p>
            </div>
        `;
    });

    html += "</div>";
    document.getElementById("content").innerHTML = html;
    Object.entries(data).forEach(([id, o]) => {
        if (o.status !== "PREPARING") return;
        const currentTime = Date.now() / 1000;
        const elapsed = (currentTime - o.timestamp) / 60;
        let remaining = (o.estimated_time + o.wait_time) - elapsed;
        if (remaining < 0) remaining = 0;
        startCountdownForOrder(`cd-${id}`, Math.round(remaining * 60));
    });
}

function startCountdownForOrder(elId, seconds) {
    const el = document.getElementById(elId);
    const interval = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(interval);
            el.innerText = "🍽 Order Ready!";
            return;
        }
        el.innerText = `⏳ ${Math.floor(seconds/60)}m ${seconds%60}s`;
        seconds--;
    }, 1000);
}