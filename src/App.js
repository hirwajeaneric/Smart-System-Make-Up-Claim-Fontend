import React, { createContext, useState } from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

// General pages 
import ErrorPage from './pages/ErrorPage';
import StartingPage from './pages';
import LandingPage from './pages/LandingPage';

// Authentication pages
import AuthentincationPage from './pages/auth';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import ResetPassword from './pages/auth/ResetPassword';
import RequestPasswordReset from './pages/auth/RequestPasswordReset';

//Student Pages 
import StudentAccount from './pages/users/Student/Index';
import StudentHome from './pages/users/Student/Home';
import NewClaim from './pages/users/Student/NewClaim';
import ClaimDetails from './pages/users/Student/ClaimDetails';
import StudentSettings from './pages/users/Student/Settings';
import Success from './pages/users/Student/Success';

// Lecturer Pages
import LecturerAccount from './pages/users/Lecturer/Index';
import LecturerHome from './pages/users/Lecturer/Home';
import MyCourses from './pages/users/Lecturer/MyCourses';
import LecturerSettings from './pages/users/Lecturer/Settings';
import LecturerCourseDetails from './pages/users/Lecturer/CourseDetails.jsx';

// Hod Pages
import HodAccount from './pages/users/HodDean/Index';
import HodHome from './pages/users/HodDean/Home';
import CoursesAllocation from './pages/users/HodDean/Courses';
import HodReport from './pages/users/HodDean/Report';
import HodSettings from './pages/users/HodDean/Settings';

// Dod Pages
import DodAccount from './pages/users/DirectorOfStudentDiscipline/Index';
import DodHome from './pages/users/DirectorOfStudentDiscipline/Home';
import DodSettings from './pages/users/DirectorOfStudentDiscipline/Settings';

// Accountant Pages
import AccountantAccount from './pages/users/Accountant/Index';
import AccountantHome from './pages/users/Accountant/Home';
import AccountantSettings from './pages/users/Accountant/Settings';

// Examincation Officer Pages
import ExOfficerAccount from './pages/users/ExaminationOfficer/Index';
import ExOfficerHome from './pages/users/ExaminationOfficer/Home';
import ExOfficerReport from './pages/users/ExaminationOfficer/Report';
import ExOfficerSettings from './pages/users/ExaminationOfficer/Settings';
import ExamsTimeTable from './pages/users/ExaminationOfficer/TimeTable';

// Registration officer Pages
import RegOfficerAccount from './pages/users/RegistrationOfficer/Index';
import RegOfficerHome from './pages/users/RegistrationOfficer/Home';
import RegOfficerSettings from './pages/users/RegistrationOfficer/Settings';
import SemesterTimeTable from './pages/users/RegistrationOfficer/SemesterTimeTable';
import CourseDetails from './pages/users/HodDean/CourseDetails';
import Semester from './pages/users/HodDean/Semester';

export const AddedLecturerContext = createContext();
export const AddedLecturerSetterContext = createContext();

function App() {
  const [addedLecturers, setAddedLecturers]= useState({lecturer: { lecturerId: "", name: ""}, addCommand: false});

  return (
    <AddedLecturerContext.Provider value={addedLecturers}>
      <AddedLecturerSetterContext.Provider value={setAddedLecturers}>
        
        <GlobalStyle />
        
        <Router>
          <Routes>
            <Route path='/' element={<StartingPage />}>
              <Route path='/' element={<LandingPage />} />
              <Route path='*' element={<ErrorPage />} />
            </Route>

            {/* Authentication routes */}
            <Route path='/:user/:userType/auth' element={<AuthentincationPage />}>
              <Route path='' element={<Signin />} />
              <Route path='signin' element={<Signin />} />
              <Route path='signup' element={<Signup />} />
              <Route path='forgot-password' element={<RequestPasswordReset />} />
              <Route path='reset-password/:token/:userId' element={<ResetPassword />} />
            </Route>

            {/* ------------------------------------------------------------------------------------------------------------- */}
            
            {/* Student Pages */}
            <Route path={'student/:userType'} element={localStorage.getItem("stdTkn") ? <StudentAccount /> : <Navigate replace to='/student/s/auth/signin' />} >
              <Route path='' element={localStorage.getItem("stdTkn") ? <StudentHome /> : <Navigate replace to='/student/s/auth/signin' />} />
              <Route path='settings' element={localStorage.getItem("stdTkn") ? <StudentSettings /> : <Navigate replace to='/student/s/auth/signin' />} />
              <Route path='claim/:id' element={localStorage.getItem("stdTkn") ? <ClaimDetails /> : <Navigate replace to='/student/s/auth/signin' />} />
              <Route path='new-claim' element={localStorage.getItem("stdTkn") ? <NewClaim /> : <Navigate replace to='/student/s/auth/signin' />} />
              <Route path='success' element={localStorage.getItem("stdTkn") ? <Success /> : <Navigate replace to='/student/s/auth/signin' />} />
            </Route>

            {/* Lecturer Routes */}
            <Route path={'lecturer/:userType'} element={localStorage.getItem("lecTkn") ? <LecturerAccount /> : <Navigate replace to='/lecturer/l/auth/signin' />} >
              <Route path='' element={localStorage.getItem("lecTkn") ? <LecturerHome /> : <Navigate replace to='/lecturer/l/auth/signin' />} />
              <Route path='settings' element={localStorage.getItem("lecTkn") ? <LecturerSettings /> : <Navigate replace to='/lecturer/l/auth/signin' />} />
              <Route path='my-courses' element={localStorage.getItem("lecTkn") ? <MyCourses /> : <Navigate replace to='/lecturer/l/auth/signin' />} />
              <Route path='course/:courseCode' element={localStorage.getItem("hodTkn") ? <LecturerCourseDetails /> : <Navigate replace to='/hod/h/auth/signin' />} />
            </Route>

            {/* Hod Routes */}
            <Route path={`hod/:userType`} element={localStorage.getItem("hodTkn") ? <HodAccount /> : <Navigate replace to='/hod/h/auth/signin' />} >
              <Route path='' element={localStorage.getItem("hodTkn") ? <HodHome /> : <Navigate replace to='/hod/h/auth/signin' />} />
              <Route path='settings' element={localStorage.getItem("hodTkn") ? <HodSettings /> : <Navigate replace to='/hod/h/auth/signin' />} />
              <Route path='courses' element={localStorage.getItem("hodTkn") ? <CoursesAllocation /> : <Navigate replace to='/hod/h/auth/signin' />} />
              <Route path='course/:courseCode' element={localStorage.getItem("hodTkn") ? <CourseDetails /> : <Navigate replace to='/hod/h/auth/signin' />} />
              <Route path='report-preview' element={localStorage.getItem("hodTkn") ? <HodReport /> : <Navigate replace to='/hod/h/auth/signin' />} />
            </Route>

            {/* Dod Routes */}
            <Route path={`dsd/:userType`} element={localStorage.getItem("dodTkn") ? <DodAccount /> : <Navigate replace to='/dsd/d/auth/signin' />} >
              <Route path='' element={localStorage.getItem("dodTkn") ? <DodHome /> : <Navigate replace to='/dsd/d/auth/signin' />} />
              <Route path='settings' element={localStorage.getItem("dodTkn") ? <DodSettings /> : <Navigate replace to='/dsd/d/auth/signin' />} />
            </Route>
            
            {/* Examination Officer Routes */}
            <Route path={`exo/:userType`} element={localStorage.getItem("exoTkn") ? <ExOfficerAccount /> : <Navigate replace to='/exo/e/auth/signin' />} >
              <Route path='' element={localStorage.getItem("exoTkn") ? <ExOfficerHome /> : <Navigate replace to='/exo/e/auth/signin' />} />
              <Route path='settings' element={localStorage.getItem("exoTkn") ? <ExOfficerSettings /> : <Navigate replace to='/exo/e/auth/signin' />} />
              <Route path='exams-timetable' element={localStorage.getItem("hodTkn") ? <ExamsTimeTable /> : <Navigate replace to='/exo/e/auth/signin' />} />
              <Route path='report-preview' element={localStorage.getItem("exoTkn") ? <ExOfficerReport /> : <Navigate replace to='/exo/e/auth/signin' />} />
            </Route>

            {/* Accountant Routes */}          
            <Route path={`accountant/:userType`} element={localStorage.getItem("accTkn") ? <AccountantAccount /> : <Navigate replace to='/accountant/a/auth/signin' />} >
              <Route path='' element={localStorage.getItem("accTkn") ? <AccountantHome /> : <Navigate replace to='/accountant/a/auth/signin' />} />
              <Route path='settings' element={localStorage.getItem("accTkn") ? <AccountantSettings /> : <Navigate replace to='/accountant/a/auth/signin' />} />
            </Route>

            {/* Registration officer Routes */}
            <Route path={`reg/:userType`} element={localStorage.getItem("regTkn") ? <RegOfficerAccount /> : <Navigate replace to='/reg/r/auth/signin' />} >
              <Route path='' element={localStorage.getItem("regTkn") ? <RegOfficerHome /> : <Navigate replace to='/reg/r/auth/signin' />} />
              <Route path='semester-timetable' element={localStorage.getItem("hodTkn") ? <SemesterTimeTable /> : <Navigate replace to='/reg/r/auth/signin' />} />
              <Route path='settings' element={localStorage.getItem("regTkn") ? <RegOfficerSettings /> : <Navigate replace to='/reg/r/auth/signin' />} />
            </Route>
          </Routes>
        </Router>
      </AddedLecturerSetterContext.Provider>
    </AddedLecturerContext.Provider>
  );
}

export default App;
