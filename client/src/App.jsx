import "./App.css";
import AdminDashboard from "./pages/AdminDashboard";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyOrder from "./pages/MyOrder";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import PageNotFound from "./pages/PageNotFound";
import AboutMe from "./pages/AboutMe";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
export const stripePromise = loadStripe(
  "pk_test_51NOFUdSDhay8j6t6zskHjNr2prKDZkHdnwxe7JJzic59qliwzxTVCvwo2xnYaZWzUqhQbcicEQnAKGTtQkKxvgYn000wGLVnGj"
);

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/productlist/:categoryId" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />

          <Route path="/checkout" element={<Checkout/>}/>

          <Route
            path="/myorder"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MyOrder />
              </ProtectedRoute>
            }
          />

          <Route path="/aboutme" element={<AboutMe />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admindashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userprofile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
