import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container mx-auto mt-6 p-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4">
            <AdminMenu />
          </div>
          <div className="md:w-3/4 md:pl-4 mt-4 md:mt-0">
            <div className="bg-slate-100 shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Admin Details</h2>
              <div className="space-y-4">
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-lg">
                    <strong>Admin Name:</strong> {auth?.user?.name}
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-lg">
                    <strong>Admin Email:</strong> {auth?.user?.email}
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-lg">
                    <strong>Admin Contact:</strong> {auth?.user?.phone}
                  </p>
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
