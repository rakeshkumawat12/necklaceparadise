import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { formatIndianRupees } from "../utils/formatIndianRupees";
import { stripePromise } from "../App";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

// after clicking on pay now this url will render
// http://localhost:5173/cart?payment_intent=pi_3QUUSQSDhay8j6t608PlOUxK&payment_intent_client_secret=pi_3QUUSQSDhay8j6t608PlOUxK_secret_R3zDAdBECKWOjIUDzVGmK8ppX&redirect_status=succeeded

const Cart = () => {
  const [cartData, setCartData] = useState({ items: [], totalPrice: 0 });
  const [clientSecret, setClientSecret] = useState("");
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const appearance = {
    theme: "stripe",
  };

  const handlePaymentOrder = () => {
    fetch("http://localhost:8000/api/payment/get-payment-secret", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        jwttoken: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        cartData: cartData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/cart/", {
      headers: {
        jwttoken: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCartData(data.length > 0 ? data[0] : { items: [], totalPrice: 0 });
      })
      .catch((err) => console.error("Failed to fetch cart data:", err));
  }, []);

  useEffect(() => {
    const updatedTotalPrice = cartData.items.reduce((total, item) => {
      return total + (item.product?.price || 0);
    }, 0);
    setCartData((prevData) => ({ ...prevData, totalPrice: updatedTotalPrice }));
  }, [cartData.items]);  

  useEffect(() => {
    const transactionId = searchParams.get("payment_intent");

    if (transactionId) {
      fetch("http://localhost:8000/api/payment/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          jwttoken: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          transactionId: searchParams.get("payment_intent"),
          // cartItems: cartData.items,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          navigate("/");
        });
    }
  }, [searchParams]);

  if (cartData.items.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  const handleRemove = (productId) => {
    fetch("http://localhost:8000/api/cart/remove", {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
        jwttoken: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setCartData((prevData) => ({
          ...prevData,
          items: prevData.items.filter(
            (item) => item.product._id !== productId
          ),
        }));
      })
      .catch((e) => {
        window.alert(e.message);
      });
  };

  return (
    <div>
      <h1 className="text-center">Shopping cart</h1>

      <div className="max-w-[25rem] mx-auto">
        <div className="max-w-[25rem] mx-auto">
          {cartData.items.map((item) => (
            <div key={item._id} className="flex py-6">
              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  alt={item.product?.name || "Product Image"}
                  src={item.product?.images[0] || "placeholder.jpg"}
                  className="size-full object-cover"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <div>{item.product?.name || "Item Name"}</div>
                    </h3>
                    <p className="ml-4">
                      {" "}
                      {formatIndianRupees(item.product?.price || 0)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">Qty 1</p>

                  <div className="flex">
                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="font-medium text-red-500 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>₹ {formatIndianRupees(cartData.totalPrice)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <button
                onClick={handlePaymentOrder}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </button>
            </div>

            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>

            {clientSecret && (
              <Elements
                options={{
                  clientSecret,
                  appearance,
                }}
                stripe={stripePromise}
              >
                <CheckoutForm successUrl={window.location.href} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
