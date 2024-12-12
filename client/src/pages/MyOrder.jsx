import React, { useEffect, useState } from "react";
import { formatIndianRupees } from "../utils/formatIndianRupees";
import Navbar from "../components/Navbar";

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
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="text-center text-4xl font-bold mb-8">My Order</div>
        <div className="flex flex-col items-center">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div
                key={order._id}
                className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-6"
              >
                <div>
                  <p className="text-gray-600">
                    <strong>Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-800 font-semibold">
                    <strong>Total Price:</strong> ₹
                    {order.totalPrice.toLocaleString()}
                  </p>
                </div>

                <hr className="my-4" />
                <h4 className="text-lg font-bold mb-4">Products:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {order?.orderItems?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex flex-col ">
                        <p className="text-gray-800 font-medium">
                          {item.product.name}
                        </p>
                        <p className="text-gray-600">
                          ₹ {formatIndianRupees(item.product.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>


              </div>
            ))
          ) : (
            <div className="animate-pulse">
              <p>Loading orders...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
