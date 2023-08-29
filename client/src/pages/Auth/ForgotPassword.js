import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
                { email, newPassword, answer }
            );

            if (res && res.data.success) {
                toast.success(res && res.data.message);

                navigate("/login");
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
            <div
                
                className="bg-gray-600 h-screen flex justify-center items-center"
            >
                <div className="max-w-md w-full mx-auto bg-gray-400 p-6 rounded-none shadow-md">
                    <h1 className="text-2xl font-semibold mb-4">
                        Reset Password
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-semibold mb-1"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                className="w-full border bg-slate-50 border-gray-300 rounded-md px-3 py-2 text-sm"
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-semibold mb-1"
                            >
                                Answer
                            </label>
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                id="answer"
                                className="w-full border bg-slate-50 border-gray-300 rounded-md px-3 py-2 text-sm"
                                placeholder="Enter your favourite game name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block  text-gray-700 text-sm font-semibold mb-1"
                            >
                                New Password
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                id="password"
                                className="w-full border bg-slate-50 border-gray-300 rounded-md px-3 py-2 text-sm"
                                placeholder="Your Password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-slate-700 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800 w-full"
                        >
                            Reset
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ForgotPassword;
