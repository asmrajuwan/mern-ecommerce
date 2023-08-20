import React from 'react'
import Layout from '../components/Layout/Layout'

const PageNotFound = () => {
  return (
    <Layout>
        <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-semibold mb-4">404</h1>
        <p className="text-xl">Page Not Found</p>
      </div>
    </div>
    </Layout>
  )
}

export default PageNotFound