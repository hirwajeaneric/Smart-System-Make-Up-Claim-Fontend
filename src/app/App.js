import React from 'react';
import GlobalStyles from '../globalStyles';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

// General pages 
import ErrorPage from '../pages/ErrorPage';
import StartingPage from '../pages';
import LandingPage from '../pages/LandingPage';

// Authentication pages
import AuthentincationPage from '../pages/auth';
import Signup from '../pages/auth/Signup';
import Signin from '../pages/auth/Signin';
import ResetPassword from '../pages/auth/ResetPassword';
import RequestPasswordReset from '../pages/auth/RequestPasswordReset';

// Admin Pages 
import Admin from '../pages/users/Admin/Index';
import AdminHome from '../pages/users/Admin/Home';
import Report from '../pages/users/Admin/Report';
import Schedules from '../pages/users/Admin/Schedules';
import ScheduleDetails from '../pages/users/Admin/ScheduleDetails';
import AdminSettings from '../pages/users/Admin/Settings';
import AdminBookingDetails from '../pages/users/Admin/BookingDetails';

// Client Pages
import Client from '../pages/users/Client/Index';
import NewBooking from '../pages/users/Client/NewBooking';
import ClientBookingDetails from '../pages/users/Client/BookingDetails';
import ClientHome from '../pages/users/Client/Home';
import ClientSettings from '../pages/users/Client/Settings';
import SuccessPage from '../pages/users/Client/SuccessPage';

function App() {
  return (
    <>
      <GlobalStyles />
      
      <Router>
        <Routes>
          <Route path='/' element={<StartingPage />}>
            <Route path='/' element={<LandingPage />} />
            <Route path='*' element={<ErrorPage />} />
          </Route>

          {/* Authentication routes */}
          <Route path='/admin/auth' element={<AuthentincationPage />}>
            <Route path='' element={<Signin />} />
            <Route path='signin' element={<Signin />} />
            <Route path='signup' element={<Signup />} />
            <Route path='forgot-password' element={<RequestPasswordReset />} />
            <Route path='reset-password/:token/:userId' element={<ResetPassword />} />
          </Route>

          {/* ------------------------------------------------------------------------------------------------------------- */}
          
          {/* Student Pages */}
          <Route path={'client'} element={localStorage.getItem("cltTkn") ? <Client /> : <Navigate replace to='/client/auth/signin' />} >
            <Route path='' element={localStorage.getItem("cltTkn") ? <ClientHome /> : <Navigate replace to='/client/auth/signin' />} />
            <Route path='settings' element={localStorage.getItem("cltTkn") ? <ClientSettings /> : <Navigate replace to='/client/auth/signin' />} />
            <Route path='booking/:id' element={localStorage.getItem("cltTkn") ? <ClientBookingDetails /> : <Navigate replace to='/client/auth/signin' />} />
            <Route path='new-booking' element={localStorage.getItem("cltTkn") ? <NewBooking /> : <Navigate replace to='/client/auth/signin' />} />
            <Route path='success' element={localStorage.getItem("cltTkn") ? <SuccessPage /> : <Navigate replace to='/client/auth/signin' />} />
          </Route>

          {/* Lecturer Routes */}
          <Route path={'admin'} element={localStorage.getItem("admnTkn") ? <Admin /> : <Navigate replace to='/admin/auth/signin' />} >
            <Route path='' element={localStorage.getItem("admnTkn") ? <AdminHome /> : <Navigate replace to='/admin/auth/signin' />} />
            <Route path='settings' element={localStorage.getItem("admnTkn") ? <AdminSettings /> : <Navigate replace to='/admin/auth/signin' />} />
            <Route path='request/:id' element={localStorage.getItem("admnTkn") ? <AdminBookingDetails /> : <Navigate replace to='/admin/auth/signin' />} />
            <Route path='report-preview' element={localStorage.getItem("admnTkn") ? <Report /> : <Navigate replace to='/admin/auth/signin' />} />
            <Route path='schedules' element={localStorage.getItem("admnTkn") ? <Schedules /> : <Navigate replace to='/admin/auth/signin' />} />
            <Route path='schedule-details' element={localStorage.getItem("admnTkn") ? <ScheduleDetails /> : <Navigate replace to='/admin/auth/signin' />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
