import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
        <h1>WELCOME TO SMART FOR MAKEUP EXAMS</h1>
        <div>
            <Link to='std/'>Student</Link>
            <Link to='lec/'>Lecturer</Link>
            <Link to='hod/'>Head of Department/ Dean</Link>
            <Link to='acc/'>Accountant</Link>
            <Link to='dsd/'>Director of Student Discipline</Link>
            <Link to='exo/'>Examination officer</Link>
            <Link to='reg/'>Registration officer</Link>
        </div>
    </div>
  )
}

export default LandingPage
