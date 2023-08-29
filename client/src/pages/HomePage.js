import { Checkbox, Radio } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";

const HomePage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/category/categories`
            );
            if (data?.success) {
                setCategories(data?.categories);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategories();
        getTotal();
    }, []);

    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
            );
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const getTotal = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/product-count`
            );
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
            );
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    const filterProduct = async () => {
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
                { checked, radio }
            );
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="flex mt-0">
                <div className="w-1/4 bg-gray-400 p-4">
                    <h6 className="text-left mb-2 font-semibold text-gray-800 mx-6">
                        Filter By Category
                    </h6>
                    <div className="flex flex-col space-y-1 mx-6">
                        {categories?.map((c) => (
                            <Checkbox
                                key={c._id}
                                onChange={(e) =>
                                    handleFilter(e.target.checked, c._id)
                                }
                            >
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    <div className="mt-4 mx-6">
                        <h6 className="text-left mb-2 font-semibold text-gray-800">
                            Filter By Price
                        </h6>
                        <div className="flex flex-col space-y-1">
                            <Radio.Group
                                onChange={(e) => setRadio(e.target.value)}
                            >
                                {Prices.map((p) => (
                                    <div key={p._id}>
                                        <Radio value={p.array}>{p.name}</Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                    </div>
                    <div className="flex flex-col mt-6 space-y-2">
                        <button
                            className="bg-gray-900 hover:bg-gray-600 text-white font-semibold py-2 px-4 md:px-6 rounded focus:outline-none focus:ring focus:ring-red-300 w-full md:w-[50%] xl:w-[50%]"
                            onClick={() => window.location.reload()}
                            style={{ whiteSpace: "nowrap" }}
                        >
                            RESET
                        </button>
                    </div>
                </div>
                <div className="w-3/4 bg-slate-500 p-4">
                    <h4 className="text-center text-4xl mb-6 font-bold text-gray-800">
                        All Products
                    </h4>
                    <div className="flex flex-wrap shadow-md">
                        {products?.map((p) => (
                            <div
                                key={p._id}
                                className="card m-2 bg-white shadow-md"
                                style={{ width: "18rem" }}
                            >
                                <img
                                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">
                                        {p.description.substring(0, 30)}
                                    </p>
                                    <p className="card-text font-bold">
                                        $ {p.price}
                                    </p>
                                    <button
                                        className="btn btn-primary bg-gray-900 hover:bg-slate-700"
                                        onClick={() =>
                                            navigate(`/product/${p.slug}`)
                                        }
                                    >
                                        More Details
                                    </button>
                                    <button
                                        className="btn btn-success bg-gray-400 hover:bg-gray-300"
                                        onClick={() => {
                                            setCart([...cart, p]);
                                            localStorage.setItem(
                                                "cart",
                                                JSON.stringify([...cart, p])
                                            );
                                            toast.success("Item Added to cart");
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button
                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-yellow-300"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? "Loading..." : "Load More"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
