import React from 'react'
import { Page } from '../../../components/styled-components/pageStyledComponents'
import { Helmet } from 'react-helmet-async'

export default function ScheduleDetails() {
  return (
    <Page>
      <Helmet>
        <title>Schedule - Administrator</title>
        <meta name="description" content="More details about a schedule."/> 
      </Helmet>
      Schedule details
    </Page>
  )
}