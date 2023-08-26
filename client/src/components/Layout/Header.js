import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import SearchInput from "../Form/SearchInput";

const Navbar = () => {
    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("loggedout successfully");
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-900">
            <div className="container mx-auto py-4 px-4 flex justify-between items-center">
                <div className="flex items-center">
                    <NavLink to="/" className="text-white text-2xl font-bold">
                        <span className="text-yellow-500">Bazar</span> Shodai
                    </NavLink>
                </div>
                <div className={`md:flex ${isOpen ? "block" : "hidden"}`}>
                    <ul className="md:flex space-y-2 md:space-y-0 md:space-x-4">
                        <SearchInput/>
                        <li>
                            <NavLink
                                to="/"
                                className="text-white hover:text-gray-300"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/category"
                                className="text-white hover:text-gray-300"
                            >
                                Category
                            </NavLink>
                        </li>
                        {!auth.user ? (
                            <>
                                {" "}
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
                                <li className="relative group">
                                    <NavLink className="flex items-center text-sm font-medium text-white hover:text-gray-300 focus:outline-none">
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
                                    <ul className="absolute hidden mt-2 space-y-1 bg-white border border-gray-300 border-t-0 border-l-0 border-r-2 rounded-lg shadow-lg group-hover:block">
                                        <li>
                                            <NavLink
                                                 to={`/dashboard/${
                                                    auth?.user?.role === 1 ? "admin" : "user"
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
                                                className="block px-4 py-2  text-sm text-gray-700 hover:text-gray-300  hover:bg-gray-100 "
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
                                className="text-white hover:text-gray-300"
                            >
                                Cart(0)
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
