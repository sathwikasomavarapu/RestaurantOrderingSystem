from anyio import current_time
from fastapi import FastAPI
import random
import time
import json
from enum import Enum
from datetime import datetime

class OrderDetails(str, Enum):
    pizza = "pizza"
    burger = "burger"
    pasta = "pasta"
    wrap = "wrap"
    rice_bowl = "rice_bowl"


app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#load the json file orders.json
#empty orders.json file when initially created
with open("orders.json", "w") as f:
    json.dump({}, f)
with open("orders.json", "r") as f:
    orders = json.load(f)

with open("dishes.json", "r") as f:
    dishes = json.load(f)

from typing import List
@app.post("/place_order")
async def place_order(items: List[OrderDetails]):
    order_id = random.randint(1000, 9999)  # Generate a random order ID
    total_estimated_time = 0
    for item in items:
        total_estimated_time += dishes[item.value]
    current_time = time.time()
    wait_time = 0 # initial wait time
    for order in orders.values():
        if order["status"] == "PREPARING":
            time_elapsed = (current_time - order["timestamp"]) / 60  # Convert to minutes
            remaining_time = order["estimated_time"] - time_elapsed
            wait_time += remaining_time if remaining_time > 0 else 0
    now = datetime.now()
    orders[order_id] = {
        "items": items,
        "timestamp": time.time(),
        "created_at": now.strftime("%Y-%m-%d %H:%M:%S"),
        "estimated_time": total_estimated_time,
        "wait_time": wait_time,
        "status": "PREPARING"
    }
    with open("orders.json", "w") as f:
        json.dump(orders, f)
    return {"order_id": order_id, 
            "items": items,
            "estimated_time": round(total_estimated_time + wait_time),
            "message": "Order placed successfully"}

@app.get("/get_order_status/{order_id}")
async def get_order_status(order_id: int):
    if order_id in orders:
        order = orders[order_id]
        current_time = time.time()
        time_elapsed = (current_time - order["timestamp"]) / 60  # Convert to minutes
        remaining_time = (order["estimated_time"] + order["wait_time"]) - time_elapsed
        return {
            "order_id": order_id,
            "items": order["items"],
            "created_at": order["created_at"],
            "status": order["status"],
            "estimated_time": f"{round(remaining_time)} mins"
        }
    else:
        return {"error": "Order ID not found."}
    
@app.get("/update_order_status/{order_id}")
async def update_order_status(order_id: int):
    if order_id in orders:
        orders[order_id]["status"] = "COMPLETED"
        with open("orders.json", "w") as f:
            json.dump(orders, f)
        return {"message": f"Order {order_id} status updated to COMPLETED."}
    else:
        return {"error": "Order ID not found."}

@app.get("/get_all_orders")
async def get_all_orders():
    return orders