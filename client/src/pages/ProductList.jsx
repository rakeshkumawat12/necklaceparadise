import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import { formatIndianRupees } from "../utils/formatIndianRupees.js";

const categoryMapping = {
  "67503afb6ace9dcca0df40e4": "Mangalsutra",
  "67503b1a6ace9dcca0df40e6": "Chains",
  "67503b2e6ace9dcca0df40e8": "Pendants",
  "67503b3d6ace9dcca0df40ea": "Necklaces",
  "67503b546ace9dcca0df40ec": "Necklace Sets",
};

const ProductList = () => {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  const getCategoryName = (id) => categoryMapping[id] || "Products";

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/product?category=${categoryId}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {getCategoryName(categoryId)}
          </h2>

          {loading ? (
            <div className="flex justify-center items-center mt-6">
              <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <Link to={`/product/${product._id}`}>
                  <div key={product._id} className="group relative">
                    <img
                      alt={product.name}
                      src={product.images[0]}
                      className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                    />
                    <div className="mt-4 flex">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <div>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.name}
                          </div>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          ₹ {formatIndianRupees(product.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
