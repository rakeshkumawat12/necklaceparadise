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
      <div className="flex justify-around p-3 bg-slate-200">
        <div className="cursor-pointer" onClick={() => setActiveTab("Products")}>
          Products
        </div>
        <div className="cursor-pointer" onClick={() => setActiveTab("Orders")}>
          Orders
        </div>
        <div className="cursor-pointer" onClick={() => setActiveTab("Category")}>
          Category
        </div>
      </div>

      <div className="p-4">
        <h2>Admin Dashboard</h2>
        {renderContent()}
      </div>
    </>
  );
};

export default AdminDashboard;
