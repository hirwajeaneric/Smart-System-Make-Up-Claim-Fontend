import React from 'react'
import { Outlet } from 'react-router-dom'
import { AuthPagesContainer, MainContainer } from '../../components/styled-components/authenticationPages';

const ClientIndex = () => {
  
  return (
    <MainContainer>
      {/* Put something here */}
      <AuthPagesContainer>
        <Outlet />
      </AuthPagesContainer>
    </MainContainer>
  )
}

export default ClientIndex