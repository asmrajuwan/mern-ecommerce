import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-center">
      <div className="py-6 px-3">
        <h4 className="text-xl font-semibold mb-4">Dashboard</h4>
        <div className="bg-white shadow-md rounded-lg p-4">
          <NavLink
            to="/dashboard/user/profile"
            className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out"
            activeClassName="bg-gray-100"
          >
            Profile
          </NavLink>
          <hr className="my-2" /> 
          <NavLink
            to="/dashboard/user/orders"
            className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out"
            activeClassName="bg-gray-100"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
