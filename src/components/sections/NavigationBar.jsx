import React, { useEffect, useState } from 'react'
import { SectionOrPageContainer } from '../styled-components/pageStyledComponents'
import { Logo, LogoSpace, MobileMenu, MobileNavigationLinks, NavigationBarContainer, NavigationLinks, TopBarLeft, TopBarRight, UserAccountIcon } from '../styled-components/navigationStyledComponents'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Typography } from '@mui/material';

const NavigationBar = () => {
  // Hooks
  const params = useParams();
  const navigate = useNavigate();

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
      if (index < 1) {
        firstLetters.push(Array.from(element)[0]);
      }
    })
    setUserName(firstLetters.join(''));

  },[params.userType]);

  // Side menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Logout
  const logout = () => {
    if (params.userType === 's') {
      localStorage.removeItem('stdInfo');
      localStorage.removeItem('stdTkn');
    } else if (params.userType === 'l') {
      localStorage.removeItem('lecInfo');
      localStorage.removeItem('lecTkn');
    } else if (params.userType === 'h') {
      localStorage.removeItem('hodInfo');
      localStorage.removeItem('hodTkn');
    } else if (params.userType === 'r') {
      localStorage.removeItem('regInfo');
      localStorage.removeItem('regTkn');
    } else if (params.userType === 'e') {
      localStorage.removeItem('exoInfo');
      localStorage.removeItem('exoTkn');
    } else if (params.userType === 'd') {
      localStorage.removeItem('dsdInfo');
      localStorage.removeItem('dsdTkn');
    } else if (params.userType === 'a') {
      localStorage.removeItem('accInfo');
      localStorage.removeItem('accTkn');
    }

    window.location.replace('./auth/signin');
  }
  
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
            {sysUser.role === 'Lecturer' && <NavLink to={'my-courses'}>My Courses</NavLink>}
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
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#ff8c66', border: '2px solid white' }}>{userName}</Avatar>
            </IconButton>
          </Tooltip>
        </TopBarRight>
        <Menu
          anchorEl={anchorEl} id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: '#ff8c66', border: '2px solid black' }}>{userName}</Avatar> {sysUser.fullName}
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => {handleClose(); navigate('settings')}}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={() => {handleClose(); logout();}}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </NavigationBarContainer>
      
      {/* Bottom mobile menu  */}
      {visible===true && <MobileNavigationLinks>
        <div>
          <NavLink to={'./'} onClick={() => setVisible(!visible)}>Home</NavLink>
          {sysUser.role === 'Lecturer' && <NavLink to={'my-courses'} onClick={() => setVisible(!visible)}>My Courses</NavLink>}
          {sysUser.role === 'Student' && <NavLink to={'new-claim'} onClick={() => setVisible(!visible)}>New claim</NavLink>}
          {sysUser.role === 'Hod/Dean' && <NavLink to={'courses'} onClick={() => setVisible(!visible)}>Courses</NavLink>}
          {(sysUser.role === 'Hod/Dean' || sysUser.role === 'Examination officer') && <NavLink to={'report-preview'} onClick={() => setVisible(!visible)}>Reports</NavLink>}
          {sysUser.role === 'Examination officer' && <NavLink to={'exams-timetable'} onClick={() => setVisible(!visible)}>Exams timetable</NavLink>}
          <NavLink to={'settings'} onClick={() => setVisible(!visible)}>Settings</NavLink>
        </div>
      </MobileNavigationLinks>}
    </SectionOrPageContainer>
  )
}

export default NavigationBar