import React from 'react'
import { Page } from '../../../components/styled-components/pageStyledComponents'
import { Helmet } from 'react-helmet-async'

export default function NewBooking() {
  return (
    <Page>
      <Helmet>
        <title>Your VSBA account status</title>
        <meta name="description" content="User home account in their Vehicle Servicing Booking Application."/> 
      </Helmet>
      My account
    </Page>
  )
}