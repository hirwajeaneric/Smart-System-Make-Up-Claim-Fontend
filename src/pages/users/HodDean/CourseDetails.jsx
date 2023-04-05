import React from 'react'
import { Page, PageContent, PageTitle } from '../../../components/styled-components/pageStyledComponents'
import { Helmet } from 'react-helmet-async'

const CourseDetails = () => {
  return (
    <Page>
      <Helmet>
        <title>Hod/Dean - Course Information</title>
        <meta name="description" content="Hod/Dean's courses allocation page."/> 
      </Helmet>
      <PageTitle>
        <h2>Course Information</h2>
      </PageTitle>
      <PageContent>

      </PageContent>
    </Page>
  )
}

export default CourseDetails