import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container mx-auto my-3 px-3 py-3">
        <div className="flex">
          <div className="w-1/4">
            <AdminMenu />
          </div>
          <div className="w-3/4 pl-4">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-3">Admin Details</h2>
              <div className="space-y-4">
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-xl">Admin Name: {auth?.user?.name}</h3>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-xl">Admin Email: {auth?.user?.email}</h3>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-xl">
                    Admin Contact: {auth?.user?.phone}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
