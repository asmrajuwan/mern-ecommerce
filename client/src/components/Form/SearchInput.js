import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null); // Clear any previous errors
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      if (Array.isArray(data)) {
        setValues({ ...values, results: data });
        navigate("/search");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching results.");
    }
  };

  return (
    <div className="join">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          className="w-full md:w-64 text-white py-2 px-4 bg-stone-600 border-gray-300 rounded focus:outline-none"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) =>
            setValues({ ...values, keyword: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-slate-400 hover:bg-slate-700 text-white py-2 px-4 rounded ml-1 focus:outline-none"
        >
          Search
        </button>
      </form>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default SearchInput;
