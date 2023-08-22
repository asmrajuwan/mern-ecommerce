import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const Profile = () => {
  return (
    <Layout><div className="container-fluid m-3 p-3">
    <div className="flex">
      <div className="w-1/4">
        <UserMenu />
      </div>
      <div className="w-3/4">
        <h3 className="text-2xl font-bold">your profile</h3>
      </div>
    </div>
  </div></Layout>
  )
}

export default Profile;