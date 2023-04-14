import React, { useContext, useEffect, useState } from 'react'
import { CourseManagementContainer, CustomTableContainer, DetailsForAllocatedLecturer, Page, PageContent, PageTitle, SmallButton, TopCourseInformation } from '../../../components/styled-components/pageStyledComponents'
import { Helmet } from 'react-helmet-async'
import axios from 'axios';
import APIS from '../../../utils/Apis';
import { useParams } from 'react-router-dom';
import { AddedLecturerSetterContext } from '../../../App';
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
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ['A', 'B', 'C', 'D', 'E'];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CourseDetails = () => {
  const theme = useTheme();
  const params = useParams();
  const setAddedLecturer = useContext(AddedLecturerSetterContext);
  
  const [course, setCourse] = useState({code:"", name: "", credits: "", faculty: "", department: "", allocations: []});
  const [lecturers, setLecturers] = useState([]);
  const [lecturerInfo, setLecturerInfo] = useState({});
  const [addOption, setAddOption] = useState(false);

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem('lectureDetails'));
    let lec = {};
    if (localData) {
      const { lecturer, otherCourseInfo } = localData;
      // console.log(localData);
      if (otherCourseInfo.code === params.courseCode) {
        lec = lecturer;
      } else {
        lec = {};
      }
    } else {
      lec = {};
    }
    setLecturerInfo(lec);
    console.log(lec);
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
      setAddedLecturer({ lecturerId: lecturer._id, name: lecturer.fullName });
    }; 
  }

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [personName, setPersonName] = React.useState([]);

  const handleMultipleSelectionChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

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
            <Button variant='contained' color='info' size='small' onClick={()=> {setAddOption(true);}}>Add lecturer</Button>
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
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl sx={{ width: '100%'}} size="small">
                    <InputLabel id="demo-multiple-name-label">Groups</InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={personName}
                      onChange={handleMultipleSelectionChange}
                      input={<OutlinedInput label="Name" />}
                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
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
                  {addOption 
                    ? <Button variant='contained' color='success' size='small'>Confirm</Button> 
                    :<Button variant='contained' color='success' size='small'>Update</Button>
                  }
                  <Button variant='contained' color='error' size='small'>Delete</Button>
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