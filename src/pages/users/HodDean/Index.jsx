import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../../../components/sections/NavigationBar';
import { SectionOrPageContainer } from '../../../components/styled-components/pageStyledComponents';

const Index = () => {
  return (
    <div>
        <NavigationBar />
        <SectionOrPageContainer>
          <Outlet />
        </SectionOrPageContainer>
    </div>
  )
}

export default Index