import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
    return (
        <>
        <div className="text-center">

            <div className="space-y-1">
            <h4 className="text-xl font-semibold">Dashboard</h4>

                <NavLink
                    to="/dashboard/user/profile"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                   Profile
                </NavLink>
                <NavLink
                    to="/dashboard/user/orders"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                   Orders
                </NavLink>
                
               
            </div>
            </div>
        </>
    );
};

export default UserMenu;
