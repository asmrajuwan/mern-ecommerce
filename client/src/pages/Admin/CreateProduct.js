import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");

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
            toast.error("Something went wrong in getting categories");
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/product/create-product`,
                productData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("Product Created Successfully");
                navigate("/dashboard/admin/products");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="flex">
                    <div className="w-1/4">
                        <AdminMenu />
                    </div>
                    <div className="w-3/4">
                        <h3 className="text-2xl font-bold">Create Product</h3>
                        <div className="m-1 w-3/4">
                            <div className="mb-3">
                                <label className="block mb-1 font-medium">
                                    Category
                                </label>
                                <Select
                                    options={categories.map((c) => ({
                                        value: c._id,
                                        label: c.name,
                                    }))}
                                    placeholder="Select a category"
                                    isSearchable
                                    className="w-full"
                                    onChange={(selectedOption) => {
                                        setCategory(selectedOption.value);
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block mb-1 font-medium pb-2">
                                    Upload Photo
                                </label>
                                <label className="border border-gray-300 rounded-md p-2 w-full text-center cursor-pointer hover:bg-gray-100">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setPhoto(e.target.files[0])
                                        }
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo && (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height="200px"
                                            className="block mx-auto"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="block mb-1 font-medium">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Write a name"
                                    className="border rounded-md p-2 w-full"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block mb-1 font-medium">
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    placeholder="Write a description"
                                    className="border rounded-md p-2 w-full"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 font-medium">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="Write a Price"
                                    className="w-full py-2 px-4 rounded-md border border-gray-300"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 font-medium">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="Write a quantity"
                                    className="w-full py-2 px-4 rounded-md border border-gray-300"
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-6 pb-2">
                                <label className="block mb-1 font-medium">
                                    Shipping
                                </label>
                                <Select
                                    placeholder="Select Shipping"
                                    isSearchable
                                    className="w-full"
                                    options={[
                                        { value: "0", label: "No" },
                                        { value: "1", label: "Yes" },
                                    ]}
                                    onChange={(selectedOption) => {
                                        setShipping(selectedOption.value);
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <button
                                    onClick={handleCreate}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                >
                                    CREATE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateProduct;
