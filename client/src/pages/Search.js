import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useSearch } from "../context/search";

const Search = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();

  return (
    <Layout title="Search Results">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-4">Search Results</h1>
        <p className="text-lg text-center mb-4">
          {values?.results.length < 1
            ? "No Products Found"
            : `Found ${values?.results.length} products`}
            { }
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {values?.results.map((p) => (
            <div
              className="bg-white rounded-lg overflow-hidden shadow-md"
              key={p._id}
            >
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
                className="w-full h-48 object-cover object-center"
              />
              <div className="p-4">
                <h5 className="text-lg font-semibold text-gray-800">
                  {p.name}
                </h5>
                <p className="text-gray-600 text-sm mt-2">
                  {p.description.substring(0, 100)}...
                </p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-gray-800 font-normal">${p.price}</p>
                  <div>
                    <button
                      className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-700"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300 "
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to Cart");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
