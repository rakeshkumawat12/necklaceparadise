import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../assets/logo.png"

const Register = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFieldChange = (key) => (e) => {
    const value = e.target.value;
    setUserData((prevFields) => ({
      ...prevFields,
      [key]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/login");
      })
      .catch((e) => {
        window.alert(e.message);
      });
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link to="/">
          <img
            alt="Necklace Paradise"
            src={logo}
            className="mx-auto h-24 w-auto"
            />
            </Link>
          <h2 className="mt-1 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Register to your account
          </h2>
        </div>

        <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={handleFieldChange("name")}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={handleFieldChange("email")}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  type="password"
                  id="password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={handleFieldChange("password")}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  type="password"
                  id="confirm-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={handleFieldChange("confirmPassword")}
                />
                {userData.confirmPassword !== userData.password && (
                  <p className="text-red-500">
                    Password and confirm password don't match
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleRegister}
                className="flex w-full justify-center rounded-md disabled:bg-indigo-300 bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={
                  !userData.name ||
                  !userData.email ||
                  !userData.password ||
                  userData.confirmPassword !== userData.password
                }
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-7 text-center text-sm/6 text-gray-500">
            Already a user?{" "}
            <a
              href="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
