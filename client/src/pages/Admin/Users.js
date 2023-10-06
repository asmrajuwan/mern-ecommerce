import React from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';

const Users = () => {
  return (
    <Layout>
      <div className="container mx-auto mt-6 p-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4">
            <AdminMenu />
          </div>
          <div className="w-full md:w-3/4 mt-4 md:ml-4">
            <h3 className="text-2xl font-bold">All Users</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
