import React from 'react'
import { Page } from '../../../components/styled-components/pageStyledComponents'
import { Helmet } from 'react-helmet-async'

const Report = () => {
  return (
    <Page>
      <Helmet>
        <title>Book details - More info about your booking</title>
        <meta name="description" content="More details about a booking made by the client."/> 
      </Helmet>
      Booking details
    </Page>
  )
}

export default Report