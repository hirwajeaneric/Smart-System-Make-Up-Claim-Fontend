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
    
    axios.get(`${Apis.courseApis.findByDepartment}`)
    .then(response => {
      let fetchedData = response.data.course;
      fetchedData.forEach(element => {
        element.id = element._id;
      });
    })
    .catch(error => console.log(error));

    // Fetch courses that are studied by students from all departments
    axios.get(`${Apis.courseApis.findByDepartment}All&department=${user.department}`)
    .then(response => {
      let fetchedData = response.data.course;
      fetchedData.forEach(element => {
        element.id = element._id;
      });
      setData(fetchedData);
    })
    .catch(error => console.log(error));
  },[params.userType]);  

  return (
    <Page>
      <Helmet>
        <title>Hod/Dean - Courses allocation</title>
        <meta name="description" content="Hod/Dean's courses allocation page."/> 
      </Helmet>
      <PageTitle>
        <h2>Courses</h2>
      </PageTitle>
      <PageContent>
        <CourseDivision>
          <h3>Courses in this semester</h3>
          <CoursesTable data={data} />
        </CourseDivision>
        <LecturerDivision>
          <h3>Lecturers</h3>
        </LecturerDivision>
      </PageContent>
    </Page>
  )
}

export default CoursesAllocation