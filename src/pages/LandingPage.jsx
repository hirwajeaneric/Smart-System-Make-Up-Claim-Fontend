import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import {  } from '../components/styled-components/landingPageComponents';

const LandingPage = () => {
  return (
    <div>
      <Helmet>
        <title>Welcome to Exam Make Up Claim Management System.</title>
        <meta name="description" content="Welcome to Exam Make Up Claim Management System."/>
      </Helmet>
      <h1>WELCOME TO SMART FOR MAKEUP EXAMS</h1>
      <div>
          <Link to='/book'>Book a slot now.</Link>
      </div>
    </div>
  )
}

export default LandingPage
