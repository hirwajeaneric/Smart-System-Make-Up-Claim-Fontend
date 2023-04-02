import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
        <h1>WELCOME TO SMART FOR MAKEUP EXAMS</h1>
        <div>
            <Link to='student/s/'>Student</Link>
            <Link to='lecturer/l/'>Lecturer</Link>
            <Link to='hod/h/'>Head of Department/ Dean</Link>
            <Link to='accountant/a/'>Accountant</Link>
            <Link to='dsd/d/'>Director of Student Discipline</Link>
            <Link to='exo/e/'>Examination officer</Link>
            <Link to='reg/r/'>Registration officer</Link>
        </div>
    </div>
  )
}

export default LandingPage
