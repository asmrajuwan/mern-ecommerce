import React from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';

const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout> <div className="container mx-auto my-3 px-3 py-3">
    <div className="flex">
        <div className="w-1/4">
            <UserMenu />
        </div>
        <div className="w-3/4 pl-4">
            <div className="bg-white shadow-md rounded-lg p-6 w-1/2">
                <h3 className="text-2xl">
                    Admin Name:{auth?.user?.name}
                </h3>
                <h3 className="text-2xl">
                   Admin Email: {auth?.user?.email}
                </h3>
                <h3 className="text-2xl">
                  Admin Contact:  {auth?.user?.address}
                </h3>
            </div>
        </div>
    </div>
</div></Layout>
  )
}

export default Dashboard;