import React from 'react'
import { Page } from '../../../components/styled-components/pageStyledComponents'
import { Helmet } from 'react-helmet-async'

const Report = () => {
  return (
    <Page>
      <Helmet>
        <title>Book details - Administrator</title>
        <meta name="description" content="Administrator's booking details page."/> 
      </Helmet>
      Booking details
    </Page>
  )
}

export default Report