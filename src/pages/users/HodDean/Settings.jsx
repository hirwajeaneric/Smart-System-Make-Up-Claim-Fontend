import React from 'react'
import { Page } from '../../../components/styled-components/pageStyledComponents'
import { Helmet } from 'react-helmet-async'

const Settings = () => {
  return (
    <Page>
      <Helmet>
        <title>Hod/Dean - Account settings</title>
        <meta name="description" content="Hod/Dean's user account settings page."/> 
      </Helmet>
      Settings
    </Page>
  )
}

export default Settings