import React from "react";
import Analytics from "../components/Global/Analytics";
import Banner from "../components/Global/Banner";
import Cards from "../components/Global/Cards";

import Hero from "../components/Global/Hero";
import Newsletter from "../components/Global/Newsletter";
import Layout from "../components/Layout/Layout";
import Slider2 from "../components/Sliders/slider2";
import bannerImg from "../images/banner_hero_image.avif";
import contactImage from "../images/laptop.jpg";

function HomePage() {
  return (
    <Layout>
    <div>
      <Banner headingText="Setting up an ethical business standard"
        paragraphText="Ensuring sustainable growth through"
        buttonText="Get Started"
        bannerImgSrc={bannerImg}/>
      <Cards/>
      <Hero 
        leading=" GROWING WITH DATA ANALYTICS"
        heading="Grow with data fast."
        subtite="Fast, flexible financing for"
        content="Monitor your data analytics to increase revenue for BTB, BTC, & SASS platforms."
        buttonText="Get Started"
        />
      <Slider2/>
      <Analytics image={contactImage}
      leadingText="DATA ANALYTICS DASHBOARD"
      headingText="Manage Data Analytics Centrally"
      contentText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
        molestiae delectus culpa hic assumenda, voluptate reprehenderit
        dolore autem cum ullam sed odit perspiciatis. Doloribus quos velit,
        eveniet ex deserunt fuga?"
        buttonText="Get Started"/>
      <Newsletter/>
     

    </div>
    </Layout>
  );
};

export default HomePage;

// import { Checkbox, Radio } from "antd";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";

// import { useNavigate } from "react-router-dom";

// import Layout from "../components/Layout/Layout";
// import { Prices } from "../components/Prices";
// import Slider from "../components/Slider";
// import { useCart } from "../context/cart";

// const HomePage = () => {
//     const navigate = useNavigate();
//     const [cart, setCart] = useCart();
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [checked, setChecked] = useState([]);
//     const [radio, setRadio] = useState([]);
//     const [total, setTotal] = useState(0);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);

//     const getAllCategories = async () => {
//         try {
//             const { data } = await axios.get(
//                 `${process.env.REACT_APP_API}/api/v1/category/categories`
//             );
//             if (data?.success) {
//                 setCategories(data?.categories);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         getAllCategories();
//         getTotal();
//     }, []);

//     const getAllProducts = async () => {
//         try {
//             setLoading(true);
//             const { data } = await axios.get(
//                 `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
//             );
//             setLoading(false);
//             setProducts(data.products);
//         } catch (error) {
//             setLoading(false);
//             console.log(error);
//         }
//     };

//     const getTotal = async () => {
//         try {
//             const { data } = await axios.get(
//                 `${process.env.REACT_APP_API}/api/v1/product/product-count`
//             );
//             setTotal(data?.total);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         if (page === 1) return;
//         loadMore();
//     }, [page]);

//     const loadMore = async () => {
//         try {
//             setLoading(true);
//             const { data } = await axios.get(
//                 `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
//             );
//             setLoading(false);
//             setProducts([...products, ...data?.products]);
//         } catch (error) {
//             console.log(error);
//             setLoading(false);
//         }
//     };

//     const handleFilter = (value, id) => {
//         let all = [...checked];
//         if (value) {
//             all.push(id);
//         } else {
//             all = all.filter((c) => c !== id);
//         }
//         setChecked(all);
//     };

//     useEffect(() => {
//         if (!checked.length || !radio.length) getAllProducts();
//     }, [checked.length, radio.length]);

//     useEffect(() => {
//         if (checked.length || radio.length) filterProduct();
//     }, [checked, radio]);

//     const filterProduct = async () => {
//         try {
//             const { data } = await axios.post(
//                 `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
//                 { checked, radio }
//             );
//             setProducts(data?.products);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <Layout>
            
//             <Slider />

//             <div className="container mx-auto mb-5 p-4 lg:p-8">
            
//                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//                     <div className="col-span-1 lg:col-span-1 bg-gray-100 p-4 rounded-lg shadow-md">
                   
//                         <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                             Filter By Category
//                         </h2>
//                         <div className="space-y-2">
//                             {categories?.map((c) => (
//                                 <div key={c._id}>
//                                     <Checkbox
//                                         onChange={(e) =>
//                                             handleFilter(
//                                                 e.target.checked,
//                                                 c._id
//                                             )
//                                         }
//                                     >
//                                         {c.name}
//                                     </Checkbox>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="mt-6">
//                             <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                                 Filter By Price
//                             </h2>
//                             <div className="space-y-2">
//                                 <Radio.Group
//                                     onChange={(e) => setRadio(e.target.value)}
//                                 >
//                                     {Prices.map((p) => (
//                                         <div key={p._id}>
//                                             <Radio value={p.array}>
//                                                 {p.name}
//                                             </Radio>
//                                         </div>
//                                     ))}
//                                 </Radio.Group>
//                             </div>
//                         </div>
//                         <div className="mt-6">
//                             <button
//                                 className="bg-gray-900 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded w-full focus:outline-none"
//                                 onClick={() => window.location.reload()}
//                             >
//                                 RESET
//                             </button>
//                         </div>
//                     </div>

//                     <div className="col-span-1 lg:col-span-3">
//                         <h1 className="text-4xl font-bold text-gray-800 mb-6">
//                             ALL PRODUCTS
//                         </h1>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {products?.map((p) => (
//                                 <div
//                                     key={p._id}
//                                     className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
//                                 >
//                                     <img
//                                         src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
//                                         alt={p.name}
//                                         className="w-full h-48 object-cover object-center"
//                                     />
//                                     <div className="p-4">
//                                         <h5 className="text-lg font-semibold text-gray-800">
//                                             {p.name}
//                                         </h5>
//                                         <p className="text-gray-600 text-sm mt-2">
//                                             {p.description.substring(0, 100)}{" "}
//                                             ...
//                                         </p>
//                                         <div className="mt-4 flex flex-col">
//                                             <p className="text-gray-800 font-semibold">
//                                                 $ {p.price}
//                                             </p>
//                                             <div className="mt-2">
//                                                 <button
//                                                     className="text-white bg-gray-900 hover:bg-gray-700 px-3 py-1 rounded-full mr-2"
//                                                     onClick={() =>
//                                                         navigate(
//                                                             `/product/${p.slug}`
//                                                         )
//                                                     }
//                                                 >
//                                                     More Details
//                                                 </button>
//                                                 <button
//                                                     className="text-gray-800 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full"
//                                                     onClick={() => {
//                                                         setCart([...cart, p]);
//                                                         localStorage.setItem(
//                                                             "cart",
//                                                             JSON.stringify([
//                                                                 ...cart,
//                                                                 p,
//                                                             ])
//                                                         );
//                                                         toast.success(
//                                                             "Item Added to Cart"
//                                                         );
//                                                     }}
//                                                 >
//                                                     Add to Cart
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="m-4">
//                             {products && products.length < total && (
//                                 <button
//                                     className="text-white bg-cyan-900 hover:bg-cyan-800 px-4 py-2 rounded-full focus:outline-none focus:ring focus:ring-cyan-500"
//                                     onClick={(e) => {
//                                         e.preventDefault();
//                                         setPage(page + 1);
//                                     }}
//                                 >
//                                     {loading ? "Loading..." : "Load More"}
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default HomePage;