import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const CategoryProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        if (params?.slug) getProductsbyCat();
    }, [params?.slug]);

    const getProductsbyCat = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`);
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto mt-3">
                <h1 className="text-center text-3xl font-semibold">{category?.name}</h1>
                <h2 className="text-center text-xl mt-2">{products?.length} results found</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {products?.map((p) => (
                        <div key={p._id} className="bg-white shadow-md p-4 rounded-lg">
                            <img
                                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                className="w-full h-40 object-cover"
                                alt={p.name}
                            />
                            <h3 className="text-lg font-semibold mt-2">{p.name}</h3>
                            <p className="text-gray-600 text-sm">{p.description.substring(0, 50)}</p>
                            <p className="text-lg font-bold mt-2">${p.price}</p>
                            <div className="flex justify-between mt-4">
                                <button
                                    className=" bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-700"
                                    onClick={() => navigate(`/product/${p.slug}`)}
                                >
                                    More Details
                                </button>
                                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default CategoryProduct;
