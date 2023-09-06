import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="bg-slate-200 rounded-lg shadow-md p-4">
      <h4 className="text-2xl font-semibold mb-4 text-center">Admin Panel</h4>
      <div className="space-y-2">
        <NavLink
          to="/dashboard/admin/create-category"
          className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300"
          activeClassName="bg-blue-500 text-white"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300"
          activeClassName="bg-blue-500 text-white"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300"
          activeClassName="bg-blue-500 text-white"
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300"
          activeClassName="bg-blue-500 text-white"
        >
          Orders
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300"
          activeClassName="bg-blue-500 text-white"
        >
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
