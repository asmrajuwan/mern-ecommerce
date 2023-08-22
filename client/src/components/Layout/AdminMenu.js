import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
    return (
        <>
        <div className="text-center">

            <div className="space-y-1">
            <h4 className="text-xl font-semibold">Admin Panel</h4>

                <NavLink
                    to="/dashboard/admin/create-category"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                   Create Category
                </NavLink>
                <NavLink
                    to="/dashboard/admin/create-product"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                   Create Product
                </NavLink>
                <NavLink
                    to="/dashboard/admin/users"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                    Users
                </NavLink>
               
            </div>
            </div>
        </>
    );
};

export default AdminMenu;
