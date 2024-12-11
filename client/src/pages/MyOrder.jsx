import React, { useEffect, useState } from "react";
import { formatIndianRupees } from "../utils/formatIndianRupees";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/payment/`, {
      headers: {
        jwttoken: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div>
      <div className="text-center font-semibold text-3xl">My Order</div>
      <div className="flex flex-col items-center justify-center">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={order._id} className="flex border m-1 w-fit">
              {/* <h3>Order {index + 1}</h3> */}
              <p className="border-r-2 flex items-center">
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <div className="border-r-2 flex flex-col">
                <h4>Products:</h4>
                <div className="flex flex-col gap-2">
                  {order.orderItems.map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-[10rem] object-cover"
                      />
                      <div className="flex flex-col justify-between">

                      <p>{item.product.name}</p>
                      <p>₹ {formatIndianRupees(item.product.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <strong>Total Price:</strong> ₹
                {order.totalPrice.toLocaleString()}
              </div>
              <hr />
            </div>
          ))
        ) : (
          <p>Loading orders...</p>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
