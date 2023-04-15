import React, { useContext, useEffect, useState } from 'react'
import { CourseManagementContainer, CustomTableContainer, DetailsForAllocatedLecturer, Page, PageContent, PageTitle, TopCourseInformation } from '../../../components/styled-components/pageStyledComponents'
import { Helmet } from 'react-helmet-async'
import axios from 'axios';
import APIS from '../../../utils/Apis';
import { useParams } from 'react-router-dom';
import CourseAllocationsTable from '../../../components/tables/CourseAllocationsTable';
import ListOfCourseLecturerTable from '../../../components/tables/ListOfCourseLecturerTable';
import { Button, FormControl, InputLabel, MenuItem, OutlinedInput } from '@mui/material';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250,
    },
  },
};

const groups = ['A', 'B', 'C', 'D', 'E'];

const CourseDetails = () => {
  const theme = useTheme();
  const params = useParams();
  
  const [course, setCourse] = useState({code:"", name: "", credits: "", faculty: "", department: "", allocations: []});
  const [lecturers, setLecturers] = useState([]);
  const [lecturerInfo, setLecturerInfo] = useState({});
  const [addOption, setAddOption] = useState(false);
  const [age, setAge] = useState('');
  const [personName, setPersonName] = useState([]);
  const [listOfGroups, setListOfGroups] = useState([]);
  const [courseAllocation, setCourseAllocation] = useState({});

  // Lecturer info
  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem('lectureDetails'));
    let lec = {};
    if (localData) {
      const { lecturer, allocation } = localData;
      setCourseAllocation(allocation);
      lec = lecturer;

    } else {
      lec = {};
    }
    setLecturerInfo(lec);
  }, [params]);
  
  // Find Course by course code
  useEffect(()=>{
    axios.get(APIS.courseApis.findByCode+params.courseCode)
    .then(response => {
      setCourse(response.data.course)
      response.data.course.allocations.forEach(element => {
        element.id = element._id;
      });
    })
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
  
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleMultipleSelectionChange = (event) => {
    const { target: { value },} = event;
    setListOfGroups(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const removeLecturer = (e) => {
    e.preventDefault();
  
    let previousCourseAllocationList = course.allocations;
    let updatedCourseAllocation = courseAllocation;
    let newAllocationList = [];
    let updatedCourseInfo = course;

    let filteredLecturerList = courseAllocation.lecturers.filter(lecturer => lecturer.lecturerId !== lecturerInfo.lecturerId)
    setCourseAllocation({...courseAllocation, lecturers: filteredLecturerList});
    updatedCourseAllocation.lecturers = filteredLecturerList;

    previousCourseAllocationList.forEach(allo => {
      if (allo._id === updatedCourseAllocation._id) {
        allo = updatedCourseAllocation;
        newAllocationList.push(updatedCourseAllocation);
      } else {
        newAllocationList.push(allo);
      }
    })
    
    updatedCourseInfo.allocations = newAllocationList;
    console.log(updatedCourseInfo);

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
          <div>
            <div style={{ marginBottom: '10px'}}><p>Name:</p><h3>{course.name}</h3></div>
            <div><p>Code:</p><h3>{course.code}</h3></div>
          </div>
          <div>
            {/* <Button variant='contained' color='info' size='small' onClick={()=> {setAddOption(true);}}>Add lecturer</Button> */}
          </div>
        </TopCourseInformation>
        
        <CourseManagementContainer style={{ marginTop: '20px', background: 'white' }}>
          
          <CustomTableContainer>
            <h4>Semesters</h4>
            <CourseAllocationsTable data={course}/>
          </CustomTableContainer>
          
          <CustomTableContainer>
            <h4>Lecturers</h4>
            <ListOfCourseLecturerTable />
          </CustomTableContainer>
          
          {lecturerInfo.lecturerId && <CustomTableContainer>
            {addOption ? <h4>Add lecturer</h4> : <h4>Lecturer Details</h4>}
            <DetailsForAllocatedLecturer>
              <hr />
              <div style={{ justifyContent: 'flex-end', alignItems: 'flex-end', margin: '20px 0' }}>
                <Button variant='outlined' color='secondary' size='small' onClick={()=> {setAddOption(false);}}>Cancel</Button>
              </div>
              <div style={{ width: '100%' }}>
                {addOption 
                ? 
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <FormControl sx={{ marginBottom: '20px' }} size="small">
                    <InputLabel id="demo-select-small">Lecturer</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={age}
                      label="Lecturer"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {lecturers.map((element) => (
                        <MenuItem
                          key={element.fullName}
                          value={element.fullName}
                        >
                          {element.fullName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl sx={{ width: '100%'}} size="small">
                    <InputLabel id="groups">Groups</InputLabel>
                    <Select
                      labelId="groups"
                      id="groups"
                      multiple
                      value={listOfGroups}
                      onChange={handleMultipleSelectionChange}
                      input={<OutlinedInput label="Name" />}
                      MenuProps={MenuProps}
                    >
                      {groups.map((group) => (
                        <MenuItem key={group} value={group}>{group}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                :
                <>
                  <p style={{ marginBottom: '15px' }}><strong>Name:</strong>  {lecturerInfo.name}</p>
                  <p style={{ marginBottom: '15px' }}><strong>Groups:</strong>  {lecturerInfo.groups.join(', ')}</p>
                </>
                }
                <div style={{ marginTop: '20px' }}>
                  {/* {addOption 
                    ? <Button variant='contained' color='success' size='small'>Confirm</Button> 
                    :<Button variant='contained' color='success' size='small'>Update</Button>
                  } */}
                  <Button variant='contained' color='error' size='small' onClick={removeLecturer}>Delete</Button>
                </div>
              </div>
            </DetailsForAllocatedLecturer>
          </CustomTableContainer>}
        
        </CourseManagementContainer>
      </PageContent>
    </Page>
  )
}

export default CourseDetails