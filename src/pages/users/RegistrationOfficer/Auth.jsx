import { Outlet } from 'react-router-dom';
import React from 'react'

const Auth = () => {
  return (
    <div>
        <h1>AUTHENTICATION PAGE - REGISTRATION OFFICER</h1>
        <Outlet />
    </div>
  )
}

export default Auth