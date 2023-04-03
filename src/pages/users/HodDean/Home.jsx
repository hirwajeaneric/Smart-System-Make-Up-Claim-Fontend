import React from 'react'
import { Page } from '../../../components/styled-components/pageStyledComponents'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  return (
    <Page>
      <Helmet>
        <title>Hod/Dean - Home</title>
        <meta name="description" content="Hod/Dean's home page."/> 
      </Helmet>
      Home
    </Page>
  )
}

export default Home