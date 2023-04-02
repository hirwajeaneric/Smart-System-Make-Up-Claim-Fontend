import React, { useEffect, useState } from 'react'
import { SectionOrPageContainer } from '../styled-components/pageStyledComponents'
import { Logo, LogoSpace, NavigationBarContainer, NavigationLinks, TopBarLeft, TopBarRight, UserAccountIcon } from '../styled-components/navigationStyledComponents'
import { NavLink, useParams } from 'react-router-dom'

const NavigationBar = () => {
  // Hooks
  const params = useParams();
  
  // States
  const [sysUser, setSysUser] = useState({});
  const [userName, setUserName] = useState('')
  
  // Fetching user data according to paramester and local storage
  useEffect(() => {
    let user = '';
    if (params.userType === 's') {
      user = JSON.parse(localStorage.getItem('stdInfo'));
    } else if (params.userType === 'l') {
      user = JSON.parse(localStorage.getItem('lecInfo'));
    } else if (params.userType === 'h') {
      user = JSON.parse(localStorage.getItem('hodInfo'));
    } else if (params.userType === 'r') {
      user = JSON.parse(localStorage.getItem('regInfo'));
    } else if (params.userType === 'e') {
      user = JSON.parse(localStorage.getItem('exoInfo'));
    } else if (params.userType === 'd') {
      user = JSON.parse(localStorage.getItem('dsdInfo'));
    } else if (params.userType === 'a') {
      user = JSON.parse(localStorage.getItem('accInfo'));
    }
    setSysUser(user);
    
    // Generating user Icon according to their name
    let firstLetters = [];
    let name = user.fullName.split(' ');

    name.forEach((element, index) => {
      if (index < 2) {
        firstLetters.push(Array.from(element)[0]);
      }
    })
    setUserName(firstLetters.join(''));

  },[params.userType]);
  
  return (
    <SectionOrPageContainer style={{ background: '#0A4D98', paddingTop: '12px', paddingBottom: '12px'}}>
      <NavigationBarContainer>
        <TopBarLeft>
          <LogoSpace>
              <Logo src='/Assets/iconLogo.png'/>
              <h2>EMUCS</h2>
          </LogoSpace>
          <NavigationLinks>
            <NavLink to={'./'}>Home</NavLink>
            <NavLink to={'courses'}>Courses</NavLink>
            <NavLink to={'report-preview'}>Reports</NavLink>
            <NavLink to={'settings'}>Settings</NavLink>
          </NavigationLinks>
        </TopBarLeft>
        <TopBarRight>
          <UserAccountIcon>
            {userName}
          </UserAccountIcon>
        </TopBarRight>
      </NavigationBarContainer>
    </SectionOrPageContainer>
  )
}

export default NavigationBar