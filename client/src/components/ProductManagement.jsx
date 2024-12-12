import { useEffect, useState } from "react";
import { formatIndianRupees } from "../utils/formatIndianRupees";

const ProductManagement = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: ["", "", "", ""],
    stock: "",
    rating: "",
    numReview: "",
  });
  const [products, setProducts] = useState([]);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [editProductId, setEditProductId] = useState(null);
  const [categories, setCategories] = useState([]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...newProduct.images];
    updatedImages[index] = value;
    setNewProduct((prevState) => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await fetch(`http://localhost:8000/api/product/${editProductId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        });

        fetchProducts();

        setIsPopupVisible(false);
      } else {
        const response = await fetch("http://localhost:8000/api/product/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        })
          .then((res) => res.json())
          .then((res) => {

            fetchProducts();

            setNewProduct({
              name: "",
              description: "",
              price: "",
              category: "",
              images: ["", "", "", ""],
              stock: "",
              rating: "",
              numReview: "",
            });
            setIsPopupVisible(false);
          });
      }
    } catch (error) {
      console.error("Error in adding product:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/product/");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/category/");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const deleteProduct = async (productId) => {
    await fetch(`http://localhost:8000/api/product/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        fetchProducts();
        console.log(data);
      });
  };

  const openPopup = (product = null) => {
    if (product) {
      setIsEditing(true);
      setEditProductId(product._id); // Set the ID for editing
      setNewProduct({
        ...product,
        images: product.images || ["", "", "", ""],
      });
    } else {
      setIsEditing(false);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        images: ["", "", "", ""],
        stock: "",
        rating: "",
        numReview: "",
      });
    }
    setIsPopupVisible(true);
  };

  return (
    <div>
      <div className="flex justify-between">

      <h2 className="font-semibold text-2xl">Product List</h2>
      <button className="btn-primary px-4 py-1" onClick={() => openPopup()}>
        Add
      </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <div key={product._id} className="relative">
            <img
              alt={product.imageAlt}
              src={product.images[0]}
              className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
            />
            <div className="mt-4 flex">
              <div>
                <h3 className="text-sm text-gray-700">
                  <div>
                    <span aria-hidden="true" className="absolute" />
                    {product.name}
                  </div>
                </h3>
                <p className="mt-1 text-sm text-gray-500">₹ {formatIndianRupees(product.price)}</p>
                <button
                  className="btn-primary px-3 py-1 mr-2"
                  onClick={() => openPopup(product)}
                >
                  Edit
                </button>
                <button
                  className="btn-primary bg-red-400 hover:bg-red-600 px-3 py-1"
                  onClick={() => {
                    deleteProduct(product._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isPopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h3>
            <form onSubmit={handleSubmitProduct} className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  className=" border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={newProduct.name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description:
                </label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className=" block w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price:
                </label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="block w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category:</label>
                <select
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  className=" block w-full rounded-md border-gray-300 shadow-sm border focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className=" flex">
                {newProduct.images.map((image, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700">
                      Image URL {index + 1}:
                    </label>
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock:
                </label>
                <input
                  type="number"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  className="border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating:
                </label>
                <input
                  type="number"
                  name="rating"
                  step="0.1"
                  value={newProduct.rating}
                  onChange={handleInputChange}
                  className="border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Reviews:
                </label>
                <input
                  type="number"
                  name="numReview"
                  value={newProduct.numReview}
                  onChange={handleInputChange}
                  className="border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button className="btn-primary px-3 py-1" type="submit">
                  {isEditing ? "Save Changes" : "Add Product"}
                </button>
                <button
                  type="button"
                  className="btn-primary bg-red-400 hover:bg-red-600 px-3 py-1"
                  onClick={() => setIsPopupVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
