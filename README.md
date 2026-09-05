# 🍽 Restaurant Ordering System

A simple full-stack Restaurant Ordering System built using **FastAPI (backend)** and **HTML, CSS, JavaScript (frontend)**.

This app allows:
- Customers to view menu, add/remove items to cart, and place orders
- Customers to track order status with live countdown
- Chefs/Customers to view and update order status

---

## 🚀 Features

### 👤 Customer
- View menu with images, price, and quantity selector
- Add / remove items from cart
- View cart with item count
- Place order
- See order confirmation with:
  - Order ID
  - Items ordered
  - Estimated time
  - Live countdown
- View **Order Status** with countdown

### 👨‍🍳 Chef/Admin
- View all orders
- Update order status to `COMPLETED`

---

## 🏗 Project Structure
project/
│
├── main.py # FastAPI backend
├── dishes.json # Dish preparation time
├── orders.json # Stores all orders
├── requirements.txt
│
└── restaurant-ui/
├── index.html # Main UI
├── styles.css # Styling
├── app.js # Routing logic
├── menu.js # Menu rendering
├── cart.js # Cart logic
├── order.js # Order handling
└── images/ # Food images



---

## ⚙️ Backend Setup (FastAPI)

### 1. Create virtual environment

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload

http://127.0.0.1:8000


🌐 Frontend Setup
1. Navigate to UI folder
cd restaurant-ui
2. Run simple server
python -m http.server 5500
3. Open in browser
http://127.0.0.1:5500


🔗 API Endpoints
➤ Place Order
POST /place_order

Body:

{
  "items": ["pizza", "burger"]
}

➤ Get Order Status
GET /get_order_status/{order_id}

➤ Update Order Status
GET /update_order_status/{order_id}

➤ Get All Orders
GET /get_all_orders


🎯 Future Improvements
✅ Payment integration
📱 Mobile responsive UI
🔔 Real-time updates (WebSockets)
🧾 Order history per user including user sign in
🛒 Persistent cart (localStorage)
🔥 Animations

🧑‍💻 Tech Stack
Backend: FastAPI
Frontend: HTML, CSS, JavaScript
Storage: JSON (file-based)

💡 How it Works
User selects items → adds to cart
Cart sends items → FastAPI /place_order
Backend calculates:
Estimated time
Wait time (based on queue)
Order stored in orders.json
UI shows countdown based on time