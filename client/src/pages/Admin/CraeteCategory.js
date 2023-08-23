import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CategoryForm from "../../components/Form/CategoryForm";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const CraeteCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name,setName] = useState("")

    const handleSubmit = async (e)=>{
      e.preventDefault()
      try {
        const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{name})
        if(data?.success){
          toast.success(`${name} is created`)
          getAllCategories();
        } else{
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong in input form')
      }
    }

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/category/categories`
            );
            if (data.success) {
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
    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="flex">
                    <div className="w-1/4">
                        <AdminMenu />
                    </div>
                    <div className="w-3/4">
                        <h3 className="text-2xl font-bold">Manage Category</h3>
                        <div className="p-3 w-1/2">
                          <CategoryForm  handleSubmit={handleSubmit} value={name} setValue={setName}/>
                        </div>
                        <div className="w-3/4">
                            <table className="table">
                                <thead>
                                    <tr>
                                        
                                        
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                      {categories?.map(c => (
                                        <>
                                    <tr>
                                        <td key={c._id}>{c.name}</td>
                                      <td><button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                        Edit
                                      </button></td>
                                    </tr>
                                        </>
                                      ))} 
                                   
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CraeteCategory;
