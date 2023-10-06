import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null); // Initialize with null or default category object
  const [id, setId] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory({
        value: data.product.category._id,
        label: data.product.category.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/categories`
      );
      if (data?.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category.value);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (confirmDelete) {
        const { data } = await axios.delete(
          `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
        );

        if (data?.success) {
          toast.success("Product Deleted Successfully");
          navigate("/dashboard/admin/products");
        } else {
          toast.error(data?.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-6 p-6">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4">
            <AdminMenu />
          </div>
          <div className="w-full md:w-3/4">
            <h3 className="text-2xl font-bold ml-2">Update Product</h3>
            <div className="mt-4 ml-2">
              <div className="mb-3">
                <label className="block mb-1 font-medium">Category</label>
                <Select
                  options={categories.map((c) => ({
                    value: c._id,
                    label: c.name,
                  }))}
                  placeholder="Select a category"
                  isSearchable
                  className="w-full"
                  onChange={(selectedOption) => {
                    setCategory(selectedOption);
                  }}
                  value={category}
                />
              </div>
            </div>
            <div className="mb-3 ml-2">
              <label className="block mb-1 font-medium pb-2">Upload Photo</label>
              <label className="border border-gray-300 rounded-md p-2 w-full text-center cursor-pointer hover:bg-gray-100">
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
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height="200px"
                    className="block mx-auto"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                    alt="product_photo"
                    height="200px"
                    className="block mx-auto"
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                value={name}
                placeholder="write a name"
                className="border rounded-md p-2 w-full"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                value={description}
                placeholder="write a description"
                className="border rounded-md p-2 w-full"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium">Price</label>
              <input
                type="number"
                value={price}
                placeholder="write a Price"
                className="w-full py-2 px-4 rounded-md border border-gray-300"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-medium">Quantity</label>
              <input
                type="number"
                value={quantity}
                placeholder="write a quantity"
                className="w-full py-2 px-4 rounded-md border border-gray-300"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-6 pb-2">
              <label className="block mb-1 font-medium">Shipping</label>
              <Select
                bordered={false}
                placeholder="Select Shipping"
                size="large"
                isSearchable
                className="w-full"
                options={[
                  { value: "0", label: "No" },
                  { value: "1", label: "Yes" },
                ]}
                onChange={(selectedOption) => {
                  setShipping(selectedOption.value);
                }}
                value={
                  shipping
                    ? { value: "1", label: "Yes" }
                    : { value: "0", label: "No" }
                }
              />
            </div>
            <div className="mb-3">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                UPDATE PRODUCT
              </button>
            </div>
            <div className="mb-3">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                DELETE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
