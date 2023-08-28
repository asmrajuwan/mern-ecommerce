import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'

const Profile = () => {
  const [auth,setAuth]= useAuth()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
//get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const {data} = await axios.put(
            `${process.env.REACT_APP_API}/api/v1/auth/profile`,
            { name, email, password, phone, address, }
        );
       if(data?.error){
        toast.error(data.error)
       } else {
         setAuth({...auth,user:data?.updatedUser}) 
         let ls = localStorage.getItem("auth")
         ls = JSON.parse(ls)
         ls.user =  data.updatedUser
         localStorage.setItem("auth", JSON.stringify(ls))
         toast.success("profile updated successfully")

       }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
    }
};


  return (
    <Layout><div className="container-fluid m-3 p-3">
    <div className="flex">
      <div className="w-1/4">
        <UserMenu />
      </div>
      <div className="w-3/4">
      <div className="text-center mb-8">
                    <h1 className="text-4xl font-semibold text-black">User Profile</h1>
                    
                </div> 
      <div className="max-w-md w-full mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                id="username"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                placeholder="Your Name"
                                
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                placeholder="Your Email"
                                
                                disabled
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                placeholder="Your Password"
                                
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 text-sm font-semibold mb-1">
                                Phone
                            </label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                id="phone"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                placeholder="Your Phone"
                               
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-gray-700 text-sm font-semibold mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                id="address"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                placeholder="Your Address"
                                
                            />
                        </div>
                       
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 w-full"
                        >
                          Update
                        </button>
                    </form>
                </div>
      </div>
    </div>
  </div></Layout>
  )
}

export default Profile;