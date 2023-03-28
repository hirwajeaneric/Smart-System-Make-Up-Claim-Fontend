import React from 'react'
import { Outlet } from 'react-router-dom'
import { AuthPagesContainer, MainContainer, TopBanner } from '../../components/styled-components/authenticationPages';

const index = () => {
  
  return (
    <MainContainer>
      <TopBanner style={{ backgroundImage: "url('/Assets/1.jpg')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div>
            <h1>Welcome to AUCA Exam Make Up Claim System</h1>
        </div>
      </TopBanner>
      <AuthPagesContainer>
        <Outlet />
      </AuthPagesContainer>
    </MainContainer>
  )
}

export default index