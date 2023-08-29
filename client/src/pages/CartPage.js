import DropIn from "braintree-web-drop-in-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        } catch (error) {
            console.log(error);
        }
    };

    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    // Get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
            );
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getToken();
    }, [auth?.token]);

    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
                {
                    nonce,
                    cart,
                }
            );
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully ");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <h1 className="text-center">{`Hello ${
                    auth?.token && auth?.user?.name
                }`}</h1>
                <h4 className="text-center">
                    {cart?.length
                        ? `You have ${cart.length} items in your cart ${
                              auth?.token ? "" : "please login to checkout"
                          }`
                        : "Your cart is empty"}
                </h4>
                <div className="flex">
                    <div className="w-2/3 pr-4">
                        {cart?.map((p) => (
                            <div key={p._id} className="flex mb-4 p-2 border">
                                <div className="w-1/4">
                                    <img
                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                        className="w-16 h-16 object-cover"
                                        alt={p.name}
                                    />
                                </div>
                                <div className="w-3/4 pl-4">
                                    <p className="text-lg font-semibold">
                                        {p.name}
                                    </p>
                                    <p className="text-sm">
                                        {p.description.substring(0, 30)}
                                    </p>
                                    <p className="text-base">
                                        Price: {p.price}
                                    </p>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onClick={() => removeCartItem(p._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-1/3 p-4 bg-gray-100 rounded-lg">
                        <h2 className="text-2xl">Cart Summary</h2>
                        <p className="mb-2">Total | Checkout | Payment</p>
                        <hr className="my-2" />
                        <h4 className="text-lg font-semibold">
                            Total : {totalPrice()}{" "}
                        </h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4 className="text-lg font-semibold">
                                        Current Address
                                    </h4>
                                    <h5 className="text-base">
                                        {auth?.user?.address}
                                    </h5>
                                    <button
                                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg mt-2 hover:bg-yellow-400"
                                        onClick={() =>
                                            navigate("/dashboard/user/profile")
                                        }
                                    >
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {auth?.token ? (
                                    <button
                                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg mt-2 hover:bg-yellow-400"
                                        onClick={() =>
                                            navigate("/dashboard/user/profile")
                                        }
                                    >
                                        Update Address
                                    </button>
                                ) : (
                                    <button
                                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg mt-2 hover:bg-yellow-400"
                                        onClick={() =>
                                            navigate("/login", {
                                                state: "/cart",
                                            })
                                        }
                                    >
                                        Plase Login to checkout
                                    </button>
                                )}
                            </div>
                        )}
                        {!clientToken || !auth?.token || !cart?.length ? (
                            ""
                        ) : (
                            <div className="mt-2">
                                <DropIn
                                    options={{
                                        authorization: clientToken,
                                        paypal: {
                                            flow: "vault",
                                        },
                                    }}
                                    onInstance={(instance) =>
                                        setInstance(instance)
                                    }
                                />
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-2 hover:bg-blue-400"
                                    onClick={handlePayment}
                                    disabled={
                                        loading ||
                                        !instance ||
                                        !auth?.user?.address
                                    }
                                >
                                    {loading
                                        ? "Processing ...."
                                        : "Make Payment"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
