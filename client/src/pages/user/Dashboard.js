import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 px-4">
            <UserMenu />
          </div>
          <div className="w-full md:w-3/4 px-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">User Dashboard</h2>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Name</h3>
                <p className="text-gray-700">{auth?.user?.name}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-gray-700">{auth?.user?.email}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Address</h3>
                <p className="text-gray-700">{auth?.user?.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
