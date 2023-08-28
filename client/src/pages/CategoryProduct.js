import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const CategoryProduct = () => {
  const navigate = useNavigate()
    const params = useParams();
    const [products,setProducts] =useState([]);
    const [ category,setCategory] =useState([]);

useEffect(()=>{
    if(params?.slug) getProductsbyCat()
},[params?.slug])

    const getProductsbyCat = async ()=>{
        try {
            const {data} =await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
           console.log(error) 
        }
    }


  return (
    <Layout>
      <div className='container mt-3'>
      <h1 className='text-center'>{category?.name}</h1>
      <h1 className='text-center'>{products?.length} results found</h1>
      <div className='row'>
      
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
                                    <button className="btn btn-primary"  onClick={() => navigate(`/product/${p.slug}`)}>
                                        More Details
                                    </button>
                                    <button className="btn btn-secondary">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
      </div>
      </div>
    </Layout>
  )
}

export default CategoryProduct