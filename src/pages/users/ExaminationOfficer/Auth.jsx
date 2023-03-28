import { Outlet } from 'react-router-dom'
import React from 'react'

const Auth = () => {
  return (
    <div>
        <h1>AUTHENTICATION PAGE - EXAMINATION OFFICER</h1>
        <Outlet />
    </div>
  )
}

export default Auth