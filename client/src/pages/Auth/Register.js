import axios from 'axios';
import React, { useState } from "react";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/register`,
                { name, email, password, phone, address, answer }
            );
            if (res.data.success) {
                toast.success(res && res.data.message);
                navigate('/login');
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
                    <h1 className="text-3xl font-semibold mb-4 text-center">Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-800 text-sm font-semibold mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                id="username"
                                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-400"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-800 text-sm font-semibold mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-400"
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-800 text-sm font-semibold mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-400"
                                placeholder="Your Password"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-800 text-sm font-semibold mb-1">
                                Phone
                            </label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                id="phone"
                                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-400"
                                placeholder="Your Phone"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-gray-800 text-sm font-semibold mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                id="address"
                                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-400"
                                placeholder="Your Address"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="answer" className="block text-gray-800 text-sm font-semibold mb-1">
                                Answer
                            </label>
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                id="answer"
                                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-400"
                                placeholder="What is your favourite game?"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-slate-900 hover:bg-slate-700 text-white px-4 py-2 rounded-md text-sm w-full"
                        >
                            Register
                        </button>
                    </form>
                    <p className="mt-4 text-gray-800 text-center">
                        Already have an account? Please{" "}
                        <Link
                            to="/login"
                            className="text-slate-900 hover:underline text-xl font-semibold hover:text-slate-700"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
