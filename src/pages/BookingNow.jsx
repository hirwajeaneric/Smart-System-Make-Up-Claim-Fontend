import React from 'react'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'
import { SimpleTopNavigation, Banner } from '../components/styled-components/landingPageComponents';

const BookingNow = () => {
  return (
    <div>
      <Helmet>
        <title>Welcome to VSBA.</title>
        <meta name="description" content="Book a slot with  VSBA."/>
      </Helmet>
      <SimpleTopNavigation>
        <ul>
          <li><NavLink to={'/'}>Home</NavLink></li>
          <li><NavLink to={'/book-now'}>Book now</NavLink></li>
          <li><NavLink to={'/client/'}>My Account</NavLink></li>
        </ul>
      </SimpleTopNavigation>
      <Banner>
        <h1>Book your slot now.</h1>
      </Banner>
    </div>
  )
}

export default BookingNow
