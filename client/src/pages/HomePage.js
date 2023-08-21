import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth.js'

const HomePage = () => {
  const [auth,setAuth] =useAuth()
  return (
    <Layout>
        HomePage
        <pre>{JSON.stringify(auth,null,4)}</pre>

    </Layout>
  )
}

export default HomePage