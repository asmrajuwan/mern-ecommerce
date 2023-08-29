import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";

const Categories = () => {
    const categories = useCategory();

    return (
        <Layout>
            <div className="container mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((c) => (
                        <div className="p-3 rounded-lg shadow-md bg-white" key={c._id}>
                            <Link
                                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm block text-center hover:bg-blue-700"
                                to={`/categories/${c.slug}`}
                            >
                                {c.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Categories;
