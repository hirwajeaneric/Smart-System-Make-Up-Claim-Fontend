import React, { useEffect, useState } from 'react'
import { CourseDivision, CourseList, CourseListContainer, CourseListItem, Page, PageContent, PageTitle, Popup } from '../../../components/styled-components/pageStyledComponents'
import { Helmet } from 'react-helmet-async'
import axios from 'axios';
import Apis from '../../../utils/Apis';
import { useParams } from 'react-router-dom';
import { Button, Modal, Typography } from '@mui/material';
import LecturerCoursesTable from '../../../components/tables/LecturerCoursesTable';

export default function MyCourses() {
  const params = useParams();
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [sysUser, setSysUser] = useState({});

  const handleOpen = () => {
    setOpen(true)
    fetchAllCourses();
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    let user = {};
    let token = '';
    if (params.userType === 's') {
      user = JSON.parse(localStorage.getItem('stdInfo'));
      token = localStorage.getItem('stdTkn');
    } else if (params.userType === 'l') {
      user = JSON.parse(localStorage.getItem('lecInfo'));
      token = localStorage.getItem('lecTkn');
    } else if (params.userType === 'h') {
      user = JSON.parse(localStorage.getItem('hodInfo'));
      token = localStorage.getItem('hodTkn');
    } else if (params.userType === 'r') {
      user = JSON.parse(localStorage.getItem('regInfo'));
      token = localStorage.getItem('regTkn');
    } else if (params.userType === 'e') {
      user = JSON.parse(localStorage.getItem('exoInfo'));
      token = localStorage.getItem('exoTkn');
    } else if (params.userType === 'd') {
      user = JSON.parse(localStorage.getItem('dsdInfo'));
      token = localStorage.getItem('dsdTkn');
    } else if (params.userType === 'a') {
      user = JSON.parse(localStorage.getItem('accInfo'));
      token = localStorage.getItem('accTkn');
    }
    setSysUser({user, token: token});

    localStorage.removeItem('lectureDetails');
    localStorage.removeItem('courseAllocation');

    // Setting headers
    const config = {
      headers: { 
        'Authorization' : `Bearer ${token}`,
      }
    }

    // Fetch courses that a lecture teaches
    axios.get(`${Apis.courseApis.findByLecturerId}${user.id}`, config)
    .then(response => {
      let fetchedData = response.data.courses;
      fetchedData.forEach(element => {
        element.id = element._id;
      });
      setData(fetchedData);
    })
    .catch(error => console.log(error));
  },[params.userType]);  

  // Fetch all courses
  const fetchAllCourses = () => {
    axios.get(`${Apis.courseApis.findByDepartment}All&department=${sysUser.department}`)
    .then(response => { setAllCourses(response.data.course)})
    .catch(error => console.log(error));
  }

  return (
    <Page>
      <Helmet>
        <title>Lecturer - My Courses</title>
        <meta name="description" content="Lecturer courses."/> 
      </Helmet>
      <PageTitle>
        <h2>Courses</h2>
        <Button variant='contained' size='small' color='info' onClick={handleOpen}>Add course</Button>
      </PageTitle>
      <PageContent>
        <CourseDivision style={{ width: '100%' }}>
          <h3>My courses in this semester</h3>
          <LecturerCoursesTable data={data} />
        </CourseDivision>
      </PageContent>
      
      {/* Modal displaying lecturer information  */}
      <Modal sx={{ height: '100%' }} open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Popup>
          <Typography id="modal-modal-title" variant="h4" component="h1">Add course<hr/></Typography>
          <CourseListContainer>
            {allCourses && 
              <CourseList>
                {allCourses.map((course, index) => 
                  <CourseListItem key={index}>
                    <span>{course.name}</span>
                    <strong>{course.code}</strong>
                    <Button variant='text' size='small' color='info' onClick={handleOpen}>Add</Button>
                  </CourseListItem>)
                }
              </CourseList>
            }
          </CourseListContainer>
        </Popup>
      </Modal>
    </Page>
  )
}