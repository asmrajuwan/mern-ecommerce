import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import Layout from "./../../components/Layout/Layout";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) {
            getOrders();
        }
    }, [auth?.token]);

    return (
        <Layout >
            <div className="container-flui p-3 m-3">
                <div className="flex">
                    <div className="w-1/4">
                        <UserMenu />
                    </div>
                    <div className="w-3/4">
                        <h1 className="text-center text-2xl font-bold mb-4">All Orders</h1>
                        {orders?.map((o, i) => (
                            <div className="border shadow p-3 mb-4" key={o._id}>
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2">#</th>
                                            <th className="px-4 py-2">Status</th>
                                            <th className="px-4 py-2">Buyer</th>
                                            <th className="px-4 py-2">Date</th>
                                            <th className="px-4 py-2">Payment</th>
                                            <th className="px-4 py-2">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="px-4 py-2">{i + 1}</td>
                                            <td className="px-4 py-2">{o?.status}</td>
                                            <td className="px-4 py-2">{o?.buyer?.name}</td>
                                            <td className="px-4 py-2">{moment(o?.createAt).fromNow()}</td>
                                            <td className="px-4 py-2">{o?.payment.success ? "Success" : "Failed"}</td>
                                            <td className="px-4 py-2">{o?.products?.length}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="grid gap-4 mt-4">
                                    {o?.products?.map((p) => (
                                        <div className="grid grid-cols-2 gap-4 p-3 border rounded-md shadow-md" key={p._id}>
                                            <div>
                                                <img
                                                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                                    className="object-contain w-full h-24"
                                                    alt={p.name}
                                                />
                                            </div>
                                            <div>
                                                <p className="font-semibold">{p.name}</p>
                                                <p>{p.description.substring(0, 30)}</p>
                                                <p>Price: {p.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
