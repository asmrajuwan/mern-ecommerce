import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [cart, setCart] = useCart();

    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);

    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
            );
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };

    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto p-4 product-details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                            className="w-full rounded-lg shadow-md"
                            alt={product.name}
                        />
                    </div>
                    <div className="flex flex-col justify-center space-y-4">
                        <h1 className="text-3xl font-semibold">
                            {product.name}
                        </h1>
                        <div className="text-gray-600">
                            <p>{product.description}</p>
                        </div>
                        <div className="text-xl font-semibold">
                            {product?.price?.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                        </div>
                        <div className="text-lg text-gray-700">
                            Category: {product?.category?.name}
                        </div>
                        <button
                            className="bg-slate-600 hover:bg-slate-400 text-white py-2 px-6 rounded-lg w-1/3"
                            onClick={() => {
                                setCart([...cart, product]);
                                localStorage.setItem(
                                    "cart",
                                    JSON.stringify([...cart, product])
                                );
                                toast.success("Item Added to Cart");
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
                <hr className="my-6" />
                <div className="container mx-auto similar-products">
                    <h2 className="text-2xl font-semibold mb-4">
                        Similar Products
                    </h2>
                    {relatedProducts.length < 1 ? (
                        <p className="text-center">No Similar Products Found</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {relatedProducts?.map((p) => (
                                <div
                                    className="bg-white rounded-lg shadow-md overflow-hidden"
                                    key={p._id}
                                >
                                    <img
                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                        className="w-full h-44 object-cover"
                                        alt={p.name}
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold">
                                            {p.name}
                                        </h3>
                                        <p className="text-gray-600 mt-2">
                                            {p.description.substring(0, 80)}...
                                        </p>
                                        <div className="flex items-center justify-between mt-4">
                                            <span className="text-xl font-semibold">
                                                {p.price.toLocaleString(
                                                    "en-US",
                                                    {
                                                        style: "currency",
                                                        currency: "USD",
                                                    }
                                                )}
                                            </span>
                                            <button
                                                className="bg-slate-600 hover:bg-slate-400 text-white py-2 px-6 rounded-lg w-1/3"
                                                onClick={() => {
                                                    setCart([...cart, p]);
                                                    localStorage.setItem(
                                                        "cart",
                                                        JSON.stringify([
                                                            ...cart,
                                                            p,
                                                        ])
                                                    );
                                                    toast.success(
                                                        "Item Added to Cart"
                                                    );
                                                }}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;
