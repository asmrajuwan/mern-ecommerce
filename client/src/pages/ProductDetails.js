import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from '../components/Layout/Layout';

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
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
              className="w-full"
              alt={product.name}
              height="100"
              width={'350px'}
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-center text-2xl font-bold mb-4">Product Details</h1>
            <hr className="mb-4" />
            <h6 className="mb-2">Name : {product.name}</h6>
            <h6 className="mb-2">Description : {product.description}</h6>
            <h6 className="mb-2">
              Price : {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h6>
            <h6 className="mb-2">Category : {product?.category?.name}</h6>
            <button className="btn btn-secondary mt-2">ADD TO CART</button>
          </div>
        </div>
        <hr className="my-4" />
        <div className="container mx-auto similar-products">
          <h4 className="text-xl font-bold mb-2">Similar Products ➡️</h4>
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          <div className="flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="w-full"
                  alt={p.name}
                  height="300"
                />
                <div className="card-body">
                  <div className="flex justify-between items-center">
                    <h5 className="text-lg font-semibold">{p.name}</h5>
                    <h5 className="text-lg font-semibold">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="text-sm mb-2">{p.description.substring(0, 60)}...</p>
                   <button className="btn btn-dark ms-1">ADD TO CART</button> 
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
