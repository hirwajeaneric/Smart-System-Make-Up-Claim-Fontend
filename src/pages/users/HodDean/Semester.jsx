import React, { useContext, useEffect, useState } from 'react'
import { LecturerSelection, LecturerSelectionThree } from '../../../components/styled-components/pageStyledComponents'
import { MdOutlineRemove } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { courseApis as API } from '../../../utils/Apis';
import { AddedLecturerContext } from '../../../App';

const Semester = () => {
  const params = useParams();
  const addedLecturer = useContext(AddedLecturerContext);

  const [course, setCourse] = useState({});
  const [allocation, setAllocation] = useState({});
  const [lecturers, setLecturers] = useState([]);

  // Fetching course by code
  useEffect(() => {
    axios.get(API.findByCode+params.courseCode)
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

  const addCourse = () => {
    console.log("Lecturer: ",addedLecturer.lecturer);
    console.log("Command: ", addedLecturer.addCommand)
  }

  return (
    <>
      {lecturers.map((element, index) => (
        <LecturerSelection key={index}>{element.name}<MdOutlineRemove/></LecturerSelection>
      ))}
      {addedLecturer.lecturer.name && 
        <LecturerSelectionThree>
          <div className='upper'>
            {addedLecturer.lecturer.name}
            <MdOutlineRemove/>
          </div>
          <div className='lower'>
            <div>
              <label htmlFor="A">A</label>
              <input type="checkbox" name="group" id="A" />
              <label htmlFor="B">B</label>
              <input type="checkbox" name="group" id="B" />
              <input type="checkbox" name="group" id="C" />
              <input type="checkbox" name="group" id="D" />
              <input type="checkbox" name="group" id="E" />
            </div>
            <button>Confirm</button>
          </div>
        </LecturerSelectionThree>}
    </>
  )
}

export default Semester