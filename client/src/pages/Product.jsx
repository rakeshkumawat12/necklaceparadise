import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { formatIndianRupees } from "../utils/formatIndianRupees";
import Navbar from "../components/Navbar";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/api/product/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product", err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const handleAddToCart = (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to login if no token is found
      setNotification("You must be logged in to add items to the cart.");
      setTimeout(() => setNotification(""), 3000);
      navigate("/login"); // Adjust the path based on your app's routing
      return;
    }

    const cartItem = {
      items: [
        {
          product: productId,
        },
      ],
    };

    fetch("http://localhost:8000/api/cart/", {
      method: "POST",
      body: JSON.stringify(cartItem),
      headers: {
        "Content-Type": "application/json",
        jwttoken: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        setNotification("Product added to cart successfully!");
        setTimeout(() => setNotification(""), 3000);
      })
      .catch((e) => {
        setNotification("Failed to add product to cart.");
        setTimeout(() => setNotification(""), 3000);
      });
  };

  return (
    <div className="bg-white">
      <Navbar />
      
      <div className="pt-6">
        {notification && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
            {notification}
          </div>
        )}

        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <img
            alt="productImg"
            src={product.images[0]}
            className="hidden aspect-[3/4] size-full rounded-lg object-cover lg:block"
          />
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <img
              alt="productImg"
              src={product.images[1]}
              className="aspect-[3/2] size-full rounded-lg object-cover"
            />
            <img
              alt="productImg"
              src={product.images[2]}
              className="aspect-[3/2] size-full rounded-lg object-cover"
            />
          </div>
          <img
            alt="productImg"
            src={product.images[3]}
            className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-[3/4]"
          />
        </div>

        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-2 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              ₹ {formatIndianRupees(product.price)}
            </p>

            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        product.rating > rating
                          ? "text-yellow-300"
                          : "text-gray-200",
                        "size-5 shrink-0"
                      )}
                    />
                  ))}
                </div>
                <div className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {product.numReview} reviews
                </div>
              </div>
            </div>

            <form className="mt-10">
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Stock</h3>
                  {product.stock}
                </div>
              </div>

              <div
                onClick={() => handleAddToCart(product._id)}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
              >
                Add to Cart
              </div>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">
                  {product.category.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
