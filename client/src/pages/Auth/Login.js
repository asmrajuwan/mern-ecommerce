import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth,setAuth,googleLogin] =useAuth()
    
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
                setAuth({...auth,
                         user:res.data.user,
                         token:res.data.token   
                });
                localStorage.setItem('auth',JSON.stringify(res.data))
                navigate(location.state || "/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    // const handleGoogleLogIn= () =>{
    //     googleLogin()
    //         .then(result =>{
    //             const user = result.user;
    //             console.log(user);
    //         })
    //         .catch(err => console.error(err))
    // }


    
    return (
        <Layout>
            <div
                
                className="bg-gray-600 h-screen flex justify-center items-center"
            >
                <div className="bg-gray-400 max-w-md w-full mx-auto p-6 rounded-none shadow-lg">
                    <h1 className="text-2xl font-semibold mb-4 text-center">Log In</h1>
                    <p className="text-black mb-8">
                        Log in to your account to continue.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-black text-sm font-semibold mb-1"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                className="w-full  bg-slate-50 rounded-md px-3 py-2 text-sm"
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-black text-sm font-semibold mb-1"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                className="w-full  bg-slate-50 rounded-md px-3 py-2 text-sm"
                                placeholder="Your Password"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <button
                                type="button"
                                onClick={() => {
                                    navigate('/forgot-password');
                                }}
                                className="text-blue-900 hover:underline text-sm focus:outline-none"
                            >
                                Forgot Password?
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="bg-slate-700 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800 w-full"
                        >
                            LogIn
                        </button>
                    </form>
                    <p className='ml-8 mb-5 text-black'>New to Bazar Shodai? Please <Link to='/register' className='hover:underline text-xl font-bold hover:text-slate-800 text-slate-700'>Register</Link> </p>
                    {/* <button
                            onClick={handleGoogleLogIn}
                           
                            className="bg-slate-700 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800 w-full"
                        >
                            LogIn with google
                        </button> */}
                </div>
            </div>
        </Layout>
    );
};

export default Login;
