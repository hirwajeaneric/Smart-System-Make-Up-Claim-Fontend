import React from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartingPage from './pages';
import LandingPage from './pages/LandingPage';
import AuthentincationPage from './pages/auth';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import ResetPassword from './pages/auth/ResetPassword';
import RequestPasswordReset from './pages/auth/RequestPasswordReset';

import UserHome from './pages/users/index';
import Home from './pages/users/Home';
import ClaimDetails from './pages/users/ClaimDetails';
import Settings from './pages/users/Settings';
import NewClaim from './pages/users/Student/NewClaim';
import Courses from './pages/users/HodDean/Courses';
import MyCourses from './pages/users/Lecturer/MyCourses';
import Report from './pages/users/Report';
import Success from './pages/users/Success';

function App() {
  
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path='/' element={<StartingPage />}>
            <Route path='' element={<LandingPage />} />
          </Route>

          <Route path='/:userType/auth' element={<AuthentincationPage />}>
            <Route path='' element={<Signin />} />
            <Route path='signin' element={<Signin />} />
            <Route path='signup' element={<Signup />} />
            <Route path='forgot-password' element={<RequestPasswordReset />} />
            <Route path='reset-password/:token/:userId' element={<ResetPassword />} />
          </Route>

          <Route path='/:userType/' element={<UserHome />} >
            <Route path='' element={<Home />} />
            <Route path='settings' element={<Settings />} />
            <Route path='claim/:id' element={<ClaimDetails />} />
            <Route path='new-claim' element={<NewClaim />} />
            <Route path='courses' element={<Courses />} />
            <Route path='my-courses' element={<MyCourses />} />
            <Route path='report-preview' element={<Report />} />
            <Route path='success' element={<Success />} />
          </Route>
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
