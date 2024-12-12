import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/api/auth/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          jwttoken: localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUserData({
        name: data.name || "",
        email: data.email || "",
      });
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError("Error fetching user data. Please try again.");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/api/auth/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          jwttoken: localStorage.getItem("token"),
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      alert("Profile updated successfully!");
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError("Error updating profile. Please try again.");
      setIsLoading(false);
    }
  };

  // Delete user profile
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete your profile?"
      );
      if (!confirmDelete) return;

      setIsLoading(true);
      const response = await fetch("http://localhost:8000/api/auth/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          jwttoken: localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user profile");
      }

      alert("Profile deleted successfully!");
      setIsLoading(false);
      // Optionally, redirect to a different page or clear user data
      navigate("/login");
      setUserData({ name: "", email: "" });
    } catch (err) {
      console.error(err);
      setError("Error deleting profile. Please try again.");
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto mt-10">
        <div className="bg-white shadow-md rounded p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            User Profile
          </h2>
          {isLoading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
