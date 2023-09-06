import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );

      if (res && res.data.success) {
        toast.success(res && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="bg-white max-w-md w-full mx-auto p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-4 text-center">Log In</h1>
          <p className="text-gray-600 mb-8 text-center">
            Log in to your account to continue.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-800 text-sm font-semibold mb-1"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-800 text-sm font-semibold mb-1"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
                placeholder="Your Password"
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="button"
                onClick={() => {
                  navigate("/forgot-password");
                }}
                className="text-blue-700 hover:underline text-sm focus:outline-none"
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-700 w-full"
            >
              Log In
            </button>
          </form>
          <p className="mt-4 text-gray-800 text-center">
            New to \E Shoes? Please{" "}
            <Link
              to="/register"
              className="text-slate-900 hover text-xl font-semibold hover:text-slate-700"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
