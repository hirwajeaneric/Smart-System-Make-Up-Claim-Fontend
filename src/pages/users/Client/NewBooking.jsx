import React from 'react'
import { Page } from '../../../components/styled-components/pageStyledComponents'
import { Helmet } from 'react-helmet-async'

export default function NewBooking() {
  return (
    <Page>
      <Helmet>
        <title>New booking - Book an appointment or slot in the garage for your car.</title>
        <meta name="description" content="Booking for an appointment or slot in the garage for one's car."/> 
      </Helmet>
      New Booking
    </Page>
  )
}