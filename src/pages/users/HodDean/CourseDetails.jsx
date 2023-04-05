import React, { useEffect, useState } from 'react'
import { ChooseLecturers, CourseManagementContainer, Lecturers, ListOfSemesters, Page, PageContent, PageTitle, Semesters, TopCourseInformation, TopInformation } from '../../../components/styled-components/pageStyledComponents'
import { Helmet } from 'react-helmet-async'
import axios from 'axios';
import APIS from '../../../utils/Apis';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';

const CourseDetails = () => {
  const params = useParams();
  const [course, setCourse] = useState({code:"", name: "", credits: "", faculty: "", department: "", allocations: []});

  useEffect(()=>{
    axios.get(APIS.courseApis.findById+params.courseId)
    .then(response => {setCourse(response.data.course)})
    .catch(error => console.log(error))
  },[params]);

  return (
    <Page>
      <Helmet>
        <title>Hod/Dean - Course Information</title>
        <meta name="description" content="Hod/Dean's courses allocation page."/> 
      </Helmet>
      <PageTitle>
        <h2>Course Details</h2>
      </PageTitle>
      <PageContent style={{ flexDirection: 'column', gap: '20px', width: '100%'}}>
        <TopCourseInformation>
          <div><p>Name:</p><h3>{course.name}</h3></div>
          <div><p>Code:</p><h3>{course.code}</h3></div>
        </TopCourseInformation>
        <CourseManagementContainer>
          <Semesters>
            <h4>Semesters</h4>
            <hr/>
            <ListOfSemesters>
              {course.allocations ? 
                course.allocations.map((element, index) => (
                  <NavLink to={`sem/${element.semester}/${element.academicYear}`} key={index}>
                    <p>{element.semester}</p>
                    <p>{element.academicYear}</p>
                  </NavLink>
                ))
              : 
              <p>Not yet allocated.</p>}
            </ListOfSemesters>
          </Semesters>
          <Lecturers>
            <h4>Course lecturers</h4>
            <hr/>
            <Outlet />
          </Lecturers>
          <ChooseLecturers>
            <h4>Choose lecturers</h4>
            <hr/>
          </ChooseLecturers>
        </CourseManagementContainer>
      </PageContent>
    </Page>
  )
}

export default CourseDetails