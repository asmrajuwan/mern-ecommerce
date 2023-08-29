import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const Products = () => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/products`
            );
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout>
            <div className="flex">
                <div className="w-1/4">
                    <AdminMenu />
                </div>
                <div className="col-span-9">
                    <h1 className="text-center text-2xl font-bold mb-4">
                        All Products List
                    </h1>
                    <div className="flex flex-wrap">
                        {products?.map((p) => (
                            <div
                                key={p._id}
                                className="card m-2 w-64"
                            >
                                <Link to={`/dashboard/admin/product/${p.slug}`}>
                                    <img
                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">
                                            {p.description}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;
