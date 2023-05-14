import React from 'react'
import { Page } from '../../../components/styled-components/pageStyledComponents'
import { Helmet } from 'react-helmet-async'

const Report = () => {
  return (
    <Page>
      <Helmet>
        <title>Administrator - Report preview</title>
        <meta name="description" content="Administrator's report preview page."/> 
      </Helmet>
      Report
    </Page>
  )
}

export default Report