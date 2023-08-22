import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'

const AdminDashboard = () => {
  return (
    <Layout>
   <div className="container mx-auto my-3 px-3 py-3">
  <div className="flex">
    <div className="w-1/4">
      <AdminMenu />
    </div>
    <div className="w-3/4 pl-4">
      Content
    </div>
  </div>
</div>


    </Layout>
  )
}

export default AdminDashboard