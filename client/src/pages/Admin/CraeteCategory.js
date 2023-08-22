import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'

const CraeteCategory = () => {
  return (
<Layout>
       <div className="container-fluid m-3 p-3">
  <div className="flex">
    <div className="w-1/4">
      <AdminMenu />
    </div>
    <div className="w-3/4">
      <h3 className="text-2xl font-bold">Craete Category</h3>
    </div>
  </div>
</div>

    </Layout>  )
}

export default CraeteCategory