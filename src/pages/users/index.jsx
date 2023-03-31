import React from 'react'
import { Outlet } from 'react-router-dom'

const index = () => {
  return (
    <div>
        <h1>Welcome home</h1>
        <Outlet />
    </div>
  )
}

export default index