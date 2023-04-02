import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../../../components/sections/NavigationBar';

const Index = () => {
  return (
    <div>
        <NavigationBar />
        <h1>Welcome home Director of student discipline</h1>
        <Outlet />
    </div>
  )
}

export default Index