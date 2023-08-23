import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <input
                        type="text"
                        className="appearance-none border 
    rounded w-full py-2 px-3 text-gray-700 
    leading-tight focus:outline-none 
    focus:shadow-outline"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter new category"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default CategoryForm;
