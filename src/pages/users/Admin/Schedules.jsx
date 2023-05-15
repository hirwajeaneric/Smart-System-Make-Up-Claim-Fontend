import React from 'react'
import { Page } from '../../../components/styled-components/pageStyledComponents'
import { Helmet } from 'react-helmet-async'

export default function Schedules() {
  return (
    <Page>
      <Helmet>
        <title>Schedules - Administrator</title>
        <meta name="description" content="Administrator's report preview page."/> 
      </Helmet>
      Schedules
    </Page>
  )
}