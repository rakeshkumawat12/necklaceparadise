import { useEffect, useState } from "react";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(`https://necklaceparadise.onrender.com/api/payment/allDetails`, {
      headers: {
        jwttoken: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) =>
        console.error("Error fetching order management:", error)
      );
  }, []);
  
  return (
    <div>
      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          
          <thead className="text-xs text-white bg-indigo-600 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email Id
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Ordered at
              </th>
              <th scope="col" className="px-6 py-3">
                transactionID
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b bg-slate-100">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {order.user.name}
                </th>
                <td className="px-6 py-4">{order.user.email}</td>
                <td className="px-6 py-4">SUCCESS</td>
                <td className="px-6 py-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                 {order.transactionId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
