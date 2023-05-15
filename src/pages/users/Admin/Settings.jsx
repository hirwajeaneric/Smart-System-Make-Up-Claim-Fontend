import React from 'react'
import { Page } from '../../../components/styled-components/pageStyledComponents'
import { Helmet } from 'react-helmet-async'

const Settings = () => {
  return (
    <Page>
      <Helmet>
        <title>Account settings - Administrator</title>
        <meta name="description" content="Administrator's user account settings page."/> 
      </Helmet>
      Settings
    </Page>
  )
}

export default Settings