import { Checkbox, Radio } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Prices } from "../components/Prices";

const HomePage = () => {
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
            setLoading(false)
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
            <div className="flex mt-3">
                <div className="w-1/4">
                    <h6 className="text-left mb-2 font-semibold">
                        Filter By Category
                    </h6>
                    <div className="flex flex-col space-y-1">
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
                    <div className="mt-3">
                        <h6 className="text-left mb-2 font-semibold">
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
                    <div className="flex flex-col space-y-2">
                        <button
                            className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 w-[38%] rounded-none focus:outline-none focus:ring focus:ring-red-300"
                            onClick={() => window.location.reload()}
                        >
                            RESET FILTERS
                        </button>
                    </div>
                </div>
                {/* <div className="w-1/4">
                   
                </div>  */}
                <div className="w-3/4">
                   
                    <h4 className=" text-center text-4xl mr-15 text font-bold ">
                        All Products
                    </h4>
                    <div className="flex flex-wrap">
                        {products?.map((p) => (
                            <div
                                key={p._id}
                                className="card m-2"
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
                                        {" "}
                                        $ {p.price}
                                    </p>
                                    <button className="btn btn-primary">
                                        More Details
                                    </button>
                                    <button className="btn btn-secondary">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button
                                className="btn btn-warning ml-5"
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