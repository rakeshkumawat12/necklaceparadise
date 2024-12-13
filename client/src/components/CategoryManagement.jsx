import { useEffect, useState } from "react";

const CategoryManagement = () => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });
  const [categories, setCategories] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await fetch(`http://localhost:8000/api/category/${editCategoryId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCategory),
        });

        fetchCategories();

        setIsPopupVisible(false);
      } else {
        const response = await fetch("http://localhost:8000/api/category/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCategory),
        })
          .then((res) => res.json())
          .then((res) => {
            fetchCategories();

            setNewCategory({
              name: "",
              description: "",
            });
            setIsPopupVisible(false);
          });
      }
    } catch (error) {
      console.error("Error in adding category:", error);
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
    fetchCategories();
  }, []);

  const openPopup = (category = null) => {
    if (category) {
      setIsEditing(true);
      setEditCategoryId(category._id);
      setNewCategory({
        ...category,
      });
    } else {
      setIsEditing(false);
      setNewCategory({
        name: "",
        description: "",
      });
    }
    setIsPopupVisible(true);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="font-semibold text-2xl">Our Categories</h2>

        <button className="btn-primary px-4 py-1" onClick={() => openPopup()}>
          Add
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-white bg-indigo-600 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Category name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Created at
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="border-b bg-slate-100">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {category.name}
                </th>
                <td className="px-6 py-4">{category.description}</td>
                <td className="px-6 py-4">
                  {new Date(category.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    className="font-medium bg-indigo-100 rounded-lg py-2 px-5 text-black"
                    onClick={() => openPopup(category)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isPopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {isEditing ? "Edit Category" : "Add New Category"}
            </h3>
            <form onSubmit={handleSubmitCategory} className="space-y-4">
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  className="mt-1 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={newCategory.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Description:
                </label>
                <textarea
                  name="description"
                  value={newCategory.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button className="btn-primary px-3 py-1" type="submit">
                  {isEditing ? "Save Changes" : "Add Category"}
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

export default CategoryManagement;
