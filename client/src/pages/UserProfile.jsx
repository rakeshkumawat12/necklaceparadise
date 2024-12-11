import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
              "jwttoken": localStorage.getItem("token"),
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
              "jwttoken": localStorage.getItem("token"),
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
          const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
          if (!confirmDelete) return;
    
          setIsLoading(true);
          const response = await fetch("http://localhost:8000/api/auth/", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "jwttoken": localStorage.getItem("token"),

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
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
        />
      </div>

      <button onClick={handleDelete} className="bg-red-500 text-white p-2">
        Delete
      </button>
      <button onClick={handleSave} className="bg-blue-500 text-white p-2">
        Save
      </button>
    </div>
  );
};

export default UserProfile;
