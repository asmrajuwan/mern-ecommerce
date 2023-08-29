import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import useCategory from "../../hooks/useCategory";
import SearchInput from "../Form/SearchInput";

const Navbar = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("logged out successfully");
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800">
            <div className="container mx-auto py-4 px-4 flex justify-between items-center">
                <div className="flex items-center">
                    <NavLink to="/" className="text-white text-2xl font-bold">
                        <span className="text-yellow-500">Bazar</span> Shodai
                    </NavLink>
                </div>
                <div className={`md:flex ${isOpen ? "block" : "hidden"}`}>
                    <ul className="md:flex space-y-2 md:space-y-0 md:space-x-4">
                        <SearchInput />
                        <NavLink
                            to="/"
                            className="text-white hover:text-gray-300"
                        >
                            Home
                        </NavLink>

                        <div className="relative group">
                            <button className="nav-link dropdown-toggle text-white focus:outline-none">
                                Categories
                                <svg
                                    className="w-4 h-4 ml-1 text-white inline"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </button>
                            <ul className="absolute z-10 hidden mt-2 space-y-1 bg-white border border-gray-300 rounded shadow-lg min-w-max group-hover:block">
                                <li>
                                    <Link
                                        to={"/categories"}
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        All Categories
                                    </Link>
                                </li>
                                {categories?.map((c) => (
                                    <li key={c._id}>
                                        <Link
                                            to={`/category/${c.slug}`}
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            {c.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {!auth.user ? (
                            <>
                                <li>
                                    <NavLink
                                        to="/register"
                                        className="text-white hover:text-gray-300"
                                    >
                                        Register
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/login"
                                        className="text-white hover:text-gray-300"
                                    >
                                        Login
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="relative group mt-2 top-0">
                                    <NavLink
                                        className="flex items-center text-base mb-2  text-white hover:text-gray-300 focus:outline-none"
                                        role="button"
                                        onClick={() => {}}
                                    >
                                        {auth?.user?.name}
                                        <svg
                                            className="w-5 h-5 ml-1 text-gray-400 group-hover:text-gray-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </NavLink>
                                    <ul className=" absolute hidden  mb-3   bg-white border border-gray-300 rounded shadow-lg min-w-max group-hover:block">
                                        <li>
                                            <NavLink
                                                to={`/dashboard/${
                                                    auth?.user?.role === 1
                                                        ? "admin"
                                                        : "user"
                                                }`}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Dashboard
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                onClick={handleLogout}
                                                to="/login"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-300 hover:bg-gray-100"
                                            >
                                                Logout
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        )}

                        <li>
                            <NavLink
                                to="/cart"
                                className="text-white hover:text-gray-300 relative"
                            >
                                Cart
                                {cart?.length > 0 && (
                                    <span className=" bg-red-500 text-white text-xs absolute top-0 right-0 mt-[-0.5rem] mr-[-1.27rem] px-2 py-1 rounded-full">
                                        {cart.length}
                                    </span>
                                )}
                            </NavLink>
                        </li>
                    </ul>
                </div>
                {!isOpen && (
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </button>
                    </div>
                )}
                {isOpen && (
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
