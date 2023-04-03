import React, { useEffect, useState } from 'react'
import { SectionOrPageContainer } from '../styled-components/pageStyledComponents'
import { Logo, LogoSpace, MobileMenu, MobileNavigationLinks, NavigationBarContainer, NavigationLinks, TopBarLeft, TopBarRight, UserAccountIcon } from '../styled-components/navigationStyledComponents'
import { NavLink, useParams } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';

const NavigationBar = () => {
  // Hooks
  const params = useParams();
  
  // States
  const [sysUser, setSysUser] = useState({});
  const [userName, setUserName] = useState('');
  const [visible, setVisible] = useState(false);
  
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
            {sysUser.role === 'Hod/Dean' && <NavLink to={'courses'}>Courses</NavLink>}
            {(sysUser.role === 'Hod/Dean' || sysUser.role === 'Examination officer') && <NavLink to={'report-preview'}>Reports</NavLink>}
            {sysUser.role === 'Student' && <NavLink to={'new-claim'}>New claim</NavLink>}
            {sysUser.role === 'Examination officer' && <NavLink to={'exams-timetable'}>Exams timetable</NavLink>}
            <NavLink to={'settings'}>Settings</NavLink>
          </NavigationLinks>
          <MobileMenu onClick={() => setVisible(!visible)}>
            <AiOutlineMenu />
          </MobileMenu>
        </TopBarLeft>
        <TopBarRight>
          <UserAccountIcon>
            {userName}
          </UserAccountIcon>
        </TopBarRight>
      </NavigationBarContainer>
      
      {/* Bottom mobile menu  */}
      {visible===true && <MobileNavigationLinks>
        <div>
          <NavLink to={'./'} onClick={() => setVisible(!visible)}>Home</NavLink>
          {sysUser.role === 'Student' && <NavLink to={'new-claim'}>New claim</NavLink>}
          {sysUser.role === 'Hod/Dean' && <NavLink to={'courses'} onClick={() => setVisible(!visible)}>Courses</NavLink>}
          {(sysUser.role === 'Hod/Dean' || sysUser.role === 'Examination officer') && <NavLink to={'report-preview'} onClick={() => setVisible(!visible)}>Reports</NavLink>}
          {sysUser.role === 'Examination officer' && <NavLink to={'exams-timetable'}>Exams timetable</NavLink>}
          <NavLink to={'settings'} onClick={() => setVisible(!visible)}>Settings</NavLink>
        </div>
      </MobileNavigationLinks>}
    </SectionOrPageContainer>
  )
}

export default NavigationBar