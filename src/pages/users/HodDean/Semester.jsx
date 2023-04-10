import React, { useContext, useEffect, useState } from 'react'
import { LecturerSelection, LecturerSelectionThree } from '../../../components/styled-components/pageStyledComponents'
import { MdOutlineRemove } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { courseApis as COURSE_API, userApis as USER_API } from '../../../utils/Apis';
import { AddedLecturerContext } from '../../../App';

const Semester = () => {
  const params = useParams();
  const addedLecturer = useContext(AddedLecturerContext);

  const [course, setCourse] = useState({});
  const [userToken, setUserToken] = useState('');
  const [allocation, setAllocation] = useState({});
  const [lecturers, setLecturers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState({confirming: '', updating: ''});

  // Determine user type---------------------------------------------------------------
  useEffect(() => {
    let user = '';
    if (params.userType === 's') {
      user = localStorage.getItem('stdTkn');
    } else if (params.userType === 'l') {
      user = localStorage.getItem('lecTkn');
    } else if (params.userType === 'h') {
      user = localStorage.getItem('hodTkn');
    } else if (params.userType === 'r') {
      user = localStorage.getItem('regTkn');
    } else if (params.userType === 'e') {
      user = localStorage.getItem('exoTkn');
    } else if (params.userType === 'd') {
      user = localStorage.getItem('dsdTkn');
    } else if (params.userType === 'a') {
      user = localStorage.getItem('accTkn');
    }
    setUserToken(user);
  },[params.userType])

  // Fetching course by code ------------------------------------------------------------
  useEffect(() => {
    axios.get(COURSE_API.findByCode+params.courseCode)
    .then(response => {
      let allocations = response.data.course.allocations;
      setCourse(response.data.course);

      // Setting the specific allocation according to parameters
      allocations.forEach(element => {
        if (element.semester === params.number && element.academicYear === params.academicYear) {
          setAllocation(element);
          setLecturers(element.lecturers);
        }
      })
    })
    .catch(error => console.log(error));
  },[params])

  // Updating form data
  const handleChange = ({currentTarget: input}) => { 
    groups.push(input.value); setGroups(groups);
    setError(''); 
  };

  // Adding a lecturer.-------------------------------------------------------------------
  const addLecturer = (e) => {
    e.preventDefault();

    const config = {
      headers: { 
        'Authorization' : `Bearer ${userToken}`,
      }
    }

    // VALIDATION
    if (groups.length === 0) {
      setError('Choose groups');
    } else {
      // Find the lecturer with the specific choosen lecturer Id.
      axios.get(USER_API.findById+addedLecturer.lecturerId)
      .then(response => {
        setProgress({ confirming: 'Confirming...', updating: '' })
        var fetchedLecturer = response.data.user;
        
        // Fixing updates in the course model
        var dataUpdates= {lecturerId: response.data.user._id, name: response.data.user.fullName, groups: groups};
        lecturers.push(dataUpdates);

        course.allocations.forEach((element, index) => {
          if (element.semester === params.number && element.academicYear === params.academicYear) {
            element.lecturers = lecturers;
          }
        });

        // UPDATING THE COURSE
        axios.put(COURSE_API.update+course._id, course, config)
        .then(response => {
          if (response.status === 200) {
            window.location.reload();
          }
        })
        .catch(error => console.log(error));
      })
      .catch(error => console.log(error))
    }
  }

  return (
    <>
      {lecturers.map((element, index) => (
        <LecturerSelection key={index}>{element.name}&nbsp;<span><strong>Groups: </strong></span>{element.groups.join(",")}&nbsp;<button>Edit</button><MdOutlineRemove/></LecturerSelection>
      ))}
      {addedLecturer.name && 
        <LecturerSelectionThree style={{ border: error ? `2px solid tomato` : `1px solid #ffc34d`, background: error ? '#ffd4cc' : '#ffe6b3' }}>
          <div className='upper' style={{ marginBottom: '10px'}}>
            {addedLecturer.name}
            <MdOutlineRemove/>
          </div>
          <div className='lower'>
            <form onSubmit={addLecturer}>
              <div>
                <label htmlFor="A">A</label>
                <input type="checkbox" id="A" value={'A'} onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor="B">B</label>
                <input type="checkbox" id="B" value={'B'} onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor="C">C</label>
                <input type="checkbox" id="C" value={'C'} onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor="D">D</label>
                <input type="checkbox" id="D" value={'D'} onChange={handleChange}/>
              </div>
              <div>
                <label htmlFor="E">E</label>
                <input type="checkbox" id="E" value={'E'} onChange={handleChange}/>
              </div>
              {progress.confirming 
                ? <button disabled>{progress}</button> 
                : <button style={{ background: error ? 'tomato':'#ffbb33'}}>{error ? error : 'Confirm'}</button>
              }
            </form>
          </div>
        </LecturerSelectionThree>}
    </>
  )
}

export default Semester
