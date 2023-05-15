import React from 'react'
import { Page } from '../../../components/styled-components/pageStyledComponents'
import { Helmet } from 'react-helmet-async'

export default function SuccessPage() {
  return (
    <Page>
      <Helmet>
        <title>Success - Booking submitted</title>
        <meta name="description" content="Client booking successfully submitted.."/> 
      </Helmet>
      Success
    </Page>
  )
}
