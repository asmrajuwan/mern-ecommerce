// import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";

import { toast } from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const { Option } = Select;

const CreateProduct = () => {
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
                            <Select
                                options={categories.map((c) => ({
                                    value: c._id,
                                    label: c.name,
                                }))}
                                placeholder="Select a category"
                                isSearchable
                                className="bg-white  rounded-md shadow-sm text-gray-700 focus:ring focus:ring-opacity-50 focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full mb-3"
                                onChange={(selectedOption) => {
                                    setCategory(selectedOption.value);
                                }}
                            />
                            <div className="mb-3">
  <label className="border border-gray-300 rounded-md p-2 w-full text-center cursor-pointer hover:bg-gray-100 ml-4">
    {photo ? photo.name : "Upload Photo"}
    <input
      type="file"
      name="photo"
      accept="image/*"
      onChange={(e) => setPhoto(e.target.files[0])}
      className="hidden"
    />
  </label>
</div>
<div className="mb-3">
  {photo && (
    <div className="text-center ml-4">
      <img
        src={URL.createObjectURL(photo)}
        alt="product_photo"
        height={"200px"}
        className="block mx-auto"
      />
    </div>
  )}
</div>

                        </div>
                        
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateProduct;
