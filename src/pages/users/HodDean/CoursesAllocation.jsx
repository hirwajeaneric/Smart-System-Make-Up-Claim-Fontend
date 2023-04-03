import React from 'react'
import { CourseDivision, LecturerDivision, Page, PageContent, PageTitle } from '../../../components/styled-components/pageStyledComponents'
import { Helmet } from 'react-helmet-async'

const CoursesAllocation = () => {
  return (
    <Page>
      <Helmet>
        <title>Hod/Dean - Courses allocation</title>
        <meta name="description" content="Hod/Dean's courses allocation page."/> 
      </Helmet>
      <PageTitle>
        <h1>Courses</h1>
      </PageTitle>
      <PageContent>
        <CourseDivision>
          <h2>Courses</h2>
          
        </CourseDivision>
        <LecturerDivision>
          <h2>Lecturers</h2>
        </LecturerDivision>
      </PageContent>
    </Page>
  )
}

export default CoursesAllocation