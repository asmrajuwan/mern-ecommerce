import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
            );
            setValues({ ...values, results: data });
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="join">
            <form onSubmit={handleSubmit} className="flex" role="search">
                <input
                    className="w-auto  text-white py-1 px-4  bg-stone-600 border-gray-300 rounded-none focus:outline-none"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={values.keyword}
                    onChange={(e) =>
                        setValues({ ...values, keyword: e.target.value })
                    }
                />
                <button
                    className="bg-slate-400 hover:bg-slate-700 text-white py-1 px-6 rounded-none focus:outline-none"
                    type="submit"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchInput;
