import React, { useEffect, useState } from 'react'
import { CourseDivision, LecturerDivision, Page, PageContent, PageTitle } from '../../../components/styled-components/pageStyledComponents'
import { Helmet } from 'react-helmet-async'
import CoursesTable from '../../../components/tables/CoursesTable'
import axios from 'axios';
import Apis from '../../../utils/Apis';
import { useParams } from 'react-router-dom';

const CoursesAllocation = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [sysUser, setSysUser] = useState({});

  useEffect(() => {
    let user = '';
    if (params.userType === 's') {
      user = JSON.parse(localStorage.getItem('stdInfo'));
    } else if (params.userType === 'l') {
      user = JSON.parse(localStorage.getItem('lecInfo'));
    } else if (params.userType === 'h') {
      user = JSON.parse(localStorage.getItem('hodInfo'));
    } else if (params.userType === 'r') {
      user = JSON.parse(localStorage.getItem('regInfo'));
    } else if (params.userType === 'e') {
      user = JSON.parse(localStorage.getItem('exoInfo'));
    } else if (params.userType === 'd') {
      user = JSON.parse(localStorage.getItem('dsdInfo'));
    } else if (params.userType === 'a') {
      user = JSON.parse(localStorage.getItem('accInfo'));
    }
    setSysUser(user);

    // Fetch courses that are studied by students from the department lead by this user
    let myCourses = [];
    let generalCourses = [];
    
    console.log(`${Apis.courseApis.findByDepartment}${user.department}`)

    axios.get(`${Apis.courseApis.findByDepartment}${user.department}`)
    .then(response => {
      response.data.course.forEach(element => {
        element.id = element._id;
        myCourses.push(element);
      });
    })
    .catch(error => console.log(error));

    // Fetch courses that are studied by students from all departments
    console.log(`${Apis.courseApis.findByDepartment}All`);
    
    axios.get(`${Apis.courseApis.findByDepartment}All`)
    .then(response => {
      response.data.course.forEach(element => {
        element.id = element._id;
        generalCourses.push(element)
      });
    })
    .catch(error => console.log(error));

    console.log(generalCourses);
    console.log(myCourses);

    setData(generalCourses);

    // if (myCourses.length === 0 && generalCourses.length !== 0) {
    //   setData(generalCourses);
    // } else if (myCourses.length !== 0 && myCourses.length === 0) {
    //   setData(myCourses);
    // } else if (myCourses.length !== 0 && myCourses.length !== 0) {
    //   setData(myCourses.concat(generalCourses));
    // }
  },[params.userType]);  

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
          <h2>Courses in this semester</h2>
          <p>{data.length}</p>
          <CoursesTable data={data} />
        </CourseDivision>
        <LecturerDivision>
          <h2>Lecturers</h2>
        </LecturerDivision>
      </PageContent>
    </Page>
  )
}

export default CoursesAllocation