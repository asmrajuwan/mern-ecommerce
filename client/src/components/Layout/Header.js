import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Navbar = () => {
    const [auth,setAuth] =useAuth();

    const handleLogout = ()=>{
        setAuth({
            ...auth,user:null,token:''
        })
        localStorage.removeItem('auth')
        toast.success('loggedout successfully')
    }

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
                <div className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
                    <ul className="md:flex space-y-2 md:space-y-0 md:space-x-4">
                        <li>
                            <NavLink to="/" className="text-white hover:text-gray-300">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/category" className="text-white hover:text-gray-300">
                                Category
                            </NavLink>
                        </li>
                         {
                          !auth.user ? (<>  <li>
                            <NavLink to="/register" className="text-white hover:text-gray-300">
                                Register
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/login" className="text-white hover:text-gray-300">
                                Login
                            </NavLink>
                        </li>
                          </>) :(<>
                            <li>
                            <NavLink onClick={handleLogout} to="/login" className="text-white hover:text-gray-300">
                                Logout
                            </NavLink>
                        </li></>)
                         }
                        <li>
                            <NavLink to="/cart" className="text-white hover:text-gray-300">
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
