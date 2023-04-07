import React, { useContext, useEffect, useState } from 'react'
import { ChooseLecturers, CourseManagementContainer, LecturerSelectionTwo, Lecturers, ListOfLecturerToChoose, ListOfSemesters, Page, PageContent, PageTitle, SemesterLecturerContainer, Semesters, TopCourseInformation, TopInformation } from '../../../components/styled-components/pageStyledComponents'
import { Helmet } from 'react-helmet-async'
import axios from 'axios';
import APIS from '../../../utils/Apis';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { MdOutlineAdd } from 'react-icons/md';
import { AddedLecturerSetterContext } from '../../../App';

const CourseDetails = () => {
  const params = useParams();
  const setAddedLecturer = useContext(AddedLecturerSetterContext);
  
  const [course, setCourse] = useState({code:"", name: "", credits: "", faculty: "", department: "", allocations: []});
  const [lecturers, setLecturers] = useState([]);

  // Find Course by course code
  useEffect(()=>{
    axios.get(APIS.courseApis.findByCode+params.courseCode)
    .then(response => {setCourse(response.data.course)})
    .catch(error => console.log(error))
  },[params]);

  // Fetch all available lecturers
  useEffect(() => {
    axios.get(APIS.userApis.findByRole+'Lecturer')
    .then(response => {
      setLecturers(response.data.users)
    })
    .catch(error => console.log(error))
  }, [])
  
  // Adding lecturers to selected lecturers 
  const chooseLecturer = (lecturer) => {
    var theCourse = {};
    course.allocations.forEach(element => {
      if (element.semester === params.number && element.academicYear === params.academicYear) {
        theCourse = element;
      }
    });

    // Verifying whether the selected lecture isn't already selected.
    let isPresent = false;
    theCourse.lecturers.forEach(element => {
      if (element.lecturerId === lecturer._id) { isPresent = true } else { isPresent = false }
    });
    
    if (isPresent === true) {
      console.log('lecturer already in');  
    } else {
      setAddedLecturer({
        lecturer: {
          lecturerId: lecturer._id, 
          name: lecturer.fullName}, 
        addCommand: true
      });

      console.log({lecturerId: lecturer._id, name: lecturer.fullName});
    }; 
  }

  const addCourse = () => {
    // console.log(course.allocations);
  }

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
            <SemesterLecturerContainer>
              <Outlet />
            </SemesterLecturerContainer>
          </Lecturers>
          <ChooseLecturers>
            <h4>Choose and add lecturers</h4>
            <hr/>
            <ListOfLecturerToChoose>
              {lecturers.map((element, index)=> (
                <LecturerSelectionTwo 
                  key={index}
                  >
                  {element.fullName}
                  <MdOutlineAdd onClick={(e) => { e.preventDefault(); chooseLecturer(element); addCourse();}}/>
                </LecturerSelectionTwo>
              ))}
            </ListOfLecturerToChoose>
          </ChooseLecturers>
        </CourseManagementContainer>
      </PageContent>
    </Page>
  )
}

export default CourseDetails