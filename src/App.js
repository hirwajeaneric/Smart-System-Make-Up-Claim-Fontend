import React from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartingPage from './pages';
import LandingPage from './pages/LandingPage';
import AuthentincationPage from './pages/auth';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import ResetPassword from './pages/auth/RequestPasswordReset';
import RequestPasswordReset from './pages/auth/RequestPasswordReset';

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
            <Route path='reset-password' element={<ResetPassword />} />
          </Route>

          <Route path='/:userType/'>

          </Route>
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
