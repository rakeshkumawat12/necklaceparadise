import { useState } from "react";
import CategoryManagement from "../components/CategoryManagement";
import OrderManagement from "../components/OrderManagement";
import ProductManagement from "../components/ProductManagement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Products");

  const renderContent = () => {
    switch (activeTab) {
      case "Products":
        return <ProductManagement />;
      case "Orders":
        return <OrderManagement />;
      case "Category":
        return <CategoryManagement />;
      default:
        return <div>Select a tab to view content</div>;
    }
  };
  return (
    <>
      <div className="flex justify-center items-center gap-[3rem] p-3 bg-indigo-100">
        <div
          className={`cursor-pointer px-2 py-1 rounded-md hover:bg-indigo-200 ${
            activeTab === "Products" ? "bg-indigo-300" : "bg-indigo-100"
          }`}
          onClick={() => setActiveTab("Products")}
        >
          Products
        </div>
        <div
          className={`cursor-pointer px-2 py-1 rounded-md hover:bg-indigo-200 ${
            activeTab === "Orders" ? "bg-indigo-300" : "bg-indigo-100"
          }`}
          onClick={() => setActiveTab("Orders")}
        >
          Orders
        </div>
        <div
          className={`cursor-pointer px-2 py-1 rounded-md hover:bg-indigo-200 ${
            activeTab === "Category" ? "bg-indigo-300" : "bg-indigo-100"
          }`}
          onClick={() => setActiveTab("Category")}
        >
          Category
        </div>
      </div>

      <div className="p-4">{renderContent()}</div>
    </>
  );
};

export default AdminDashboard;
