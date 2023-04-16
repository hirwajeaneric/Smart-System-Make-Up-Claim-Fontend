import React, { useEffect, useState } from 'react'
import { CourseManagementContainer, CustomTableContainer, DetailsForAllocatedLecturer, Page, PageContent, PageTitle, TopCourseInformation } from '../../../components/styled-components/pageStyledComponents'
import { Helmet } from 'react-helmet-async'
import axios from 'axios';
import APIS, { courseApis } from '../../../utils/Apis';
import { useParams } from 'react-router-dom';
import CourseAllocationsTable from '../../../components/tables/CourseAllocationsTable';
import ListOfCourseLecturerTable from '../../../components/tables/ListOfCourseLecturerTable';
import { Button, FormControl, InputLabel, MenuItem, OutlinedInput } from '@mui/material';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  const [progress, setProgress] = useState({ value: '', disabled: false });
  const [open, setOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ message: '', severity: ''})

  // Handle snackbar closurer
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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

  // Removing a lecturer from the list of lecturers teaching a course
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

    // Fetching user token by determining the user type.
    let token = '';
    if (params.userType === 's') {
        token = localStorage.getItem('stdTkn');
    } else if (params.userType === 'l') {
      token = localStorage.getItem('lecTkn');
    } else if (params.userType === 'h') { 
      token = localStorage.getItem('hodTkn');
    } else if (params.userType === 'r') {
      token = localStorage.getItem('regTkn');
    } else if (params.userType === 'e') {
      token = localStorage.getItem('exoTkn');
    } else if (params.userType === 'd') {
      token = localStorage.getItem('dsdTkn');
    } else if (params.userType === 'a') {
      token = localStorage.getItem('accTkn');
    }

    // Setting headers
    const config = {
      headers: { 
        'Authorization' : `Bearer ${token}`,
      }
    }

    // API Call
    setProgress({ value: 'REMOVING LECTURER ...', disabled: true });
    setTimeout(()=> {
      axios.put(courseApis.update+updatedCourseInfo._id, updatedCourseInfo, config)
      .then(response => {
        if (response.status === 200) {
          setResponseMessage({ message: response.data.message, severity: 'success' });
          setOpen(true);
          setProgress({ value: '', disabled: false });
          window.location.replace('../courses');
        }
      })
      .catch(error => {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          setResponseMessage({ message: error.response.data.msg, severity: 'error' });
          setOpen(true);
          setProgress({ value: '', disabled: false });
        }
      })
    },2000);
  }

  return (
    <Page>
      <Helmet>
        <title>Lecturer - Course Information</title>
        <meta name="description" content="Lecturer's courses allocation page."/> 
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
                  {!progress.disabled && <Button variant='contained' color='error' size='small' onClick={removeLecturer}>Delete</Button>}
                  {progress.disabled && <Button type='submit' variant='contained' size='medium' color='primary' disabled>{progress.value}</Button>}
                </div>
              </div>
            </DetailsForAllocatedLecturer>
          </CustomTableContainer>}        
        </CourseManagementContainer>
      </PageContent>
      
      {/* Response message  */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={responseMessage.severity} sx={{ width: '100%' }}>{responseMessage.message}</Alert>
      </Snackbar>      
    </Page>
  )
}

export default CourseDetails