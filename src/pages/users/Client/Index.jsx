import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../../../components/sections/NavigationBar';

const Index = () => {
  return (
    <div>
        <NavigationBar />
        <Outlet />
    </div>
  )
}

export default Index