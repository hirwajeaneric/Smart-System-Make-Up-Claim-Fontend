import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthenticationPageContainer, AuthFormContainer, InnerContainer } from '../../components/styled-components/authenticationPages'
import Apis from '../../API/Apis';

import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Helmet } from 'react-helmet-async';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// THIS FORM WILL BE USED BY ALL USERS. IT IS DINAMIC AND THEREBY SETS INPUT ACCORDING TO THE KIND OF URL A USER ENTERED.
const Signin = () => {
  // Hooks
  const params = useParams();
  
  // States
  const [showPassword, setShowPassword] = React.useState(false);
  const [sysUser, setSysUser] = useState('');
  const [formData, setFormData] = useState({ email: '', registrationNumber: 0, password: '' });
  const [progress, setProgress] = useState({ value: '', disabled: false});
  const [open, setOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ message: '', severity: ''})

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (params.userType === 'std') {
      setSysUser('Student');
    } else if (params.userType === 'lec') {
      setSysUser('Lecturer');
    } else if (params.userType === 'hod') {
      setSysUser('Hod/Dean');
    } else if (params.userType === 'reg') {
      setSysUser('Registration officer');
    } else if (params.userType === 'exo') {
      setSysUser('Examination officer');
    } else if (params.userType === 'dsd') {
      setSysUser('Director of student discipline');
    } else if (params.userType === 'acc') {
      setSysUser('Accountant');
    }
  },[params.userType])

  // Functions
  const handleChange = ({currentTarget: input}) => { setFormData({...formData, [input.name]: input.value}) };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => { event.preventDefault() };

  const submitForm = (e) => {
    e.preventDefault();
    const data = {};

    const { email, registrationNumber, password } = formData;
    
    var link = '';
    if (params.userType === 'std') {
      data.registrationNumber = parseInt(registrationNumber);
      data.role = sysUser;
      link = Apis.userApis.signInAsStudent  
    } else if (params.userType === 'lec') {
      data.email = email
      data.role = sysUser;
      link = Apis.userApis.signInAsOtherUser;
    } else if (params.userType === 'hod') {
      data.email = email
      data.role = sysUser;
      link = Apis.userApis.signInAsOtherUser;
    } else if (params.userType === 'reg') {
      data.email = email
      data.role = sysUser;
      link = Apis.userApis.signInAsOtherUser;
    } else if (params.userType === 'exo') {
      data.email = email
      data.role = sysUser;
      link = Apis.userApis.signInAsOtherUser;
    } else if (params.userType === 'dsd') {
      data.email = email
      data.role = sysUser;
      link = Apis.userApis.signInAsOtherUser;
    } else if (params.userType === 'acc') {
      data.email = email
      data.role = sysUser;
      link = Apis.userApis.signInAsOtherUser;
    } 
    data.password = password;

    console.log(data);
    console.log('Calling Api: '+link);
    
    if (data.role === 'Student' && isNaN(data.registrationNumber)) {
      setResponseMessage({ message: 'Wrong input, registration number should contain digits only.', severity: 'error' });
      setOpen(true);
      return;
    } else if (data.role !== 'Student' && typeof data.email !== 'string') {
      setResponseMessage({ message: 'Wrong input.', severity: 'error' });
      setOpen(true);
      return;
    } else {
      setProgress({ value: 'Signing in ...', disabled: true});

      axios.post(link, data)
      .then(response => {
        setTimeout(()=>{
          if (response.status === 200) {
            const { token, ...userInfo } = response.data.user;
            
            setProgress({ value: '', disabled: false });
  
            if (userInfo.role === 'Student') {
              localStorage.setItem('studentInfo', JSON.stringify(userInfo));
              localStorage.setItem('studentToken', token);
              window.location.replace('/std/home/');
            } else if (userInfo.role === 'Lecturer') {
              localStorage.setItem('lecturerInfo', JSON.stringify(userInfo));
              localStorage.setItem('lecturerToken', token);
              window.location.replace('/lec/home/');
            } else if (userInfo.role === 'Hod/Dean') {
              localStorage.setItem('hodDeanInfo', JSON.stringify(userInfo));
              localStorage.setItem('hodDeanToken', token);
              window.location.replace('/hod/home/');
            } else if (userInfo.role === 'Registration officer') {
              localStorage.setItem('registrationOfficeInfo', JSON.stringify(userInfo));
              localStorage.setItem('registrationOfficeToken', token);
              window.location.replace('/reg/home/');
            } else if (userInfo.role === 'Accountant') {
              localStorage.setItem('accountantInfo', JSON.stringify(userInfo));
              localStorage.setItem('accountantToken', token);
              window.location.replace('/acc/home/');
            } else if (userInfo.role === 'Director of student discipline') {
              localStorage.setItem('directorOfStudentDisciplineInfo', JSON.stringify(userInfo));
              localStorage.setItem('directorOfStudentDisciplineToken', token);
              window.location.replace('/dsd/home/');
            } else if (userInfo.role === 'Examination officer') {
              localStorage.setItem('examinationOfficerInfo', JSON.stringify(userInfo));
              localStorage.setItem('examinationOfficerToken', token);
              window.location.replace('/exo/home/');
            }
          }
        }, 2000); 
      })
      .catch(error => {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          setResponseMessage({ message: error.response.data.msg, severity: 'error' });
          setOpen(true);
          setProgress({ value: '', disabled: false });
        }
      });
    }
  }

  return (
    <AuthenticationPageContainer>
      <Helmet>
        <title>{sysUser} Sign In - Exam make up.</title>
        <meta name="description" content={`${sysUser} sign in for exam make up.`} /> 
      </Helmet>
      <InnerContainer>
        <h2 style={{ textAlign: 'center' }}>{sysUser.toUpperCase()} SIGN IN</h2>
        <AuthFormContainer onSubmit={submitForm}>
          { params.userType === 'std' ? 
            <>
              <TextField id="filled-basic" sx={{ m: 1, width: '40ch' }} size='small' label="Registration number" variant="filled" name='registrationNumber' value={formData.registrationNumber || ''} onChange={handleChange}/>
            </>
            :
            <>
              <TextField id="filled-basic" sx={{ m: 1, width: '40ch' }}  size='small' label="email" variant="filled" name='email' value={formData.email || ''} onChange={handleChange}/>
            </>
          }
          <FormControl variant="filled">
            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
            <FilledInput id="filled-adornment-password" type={showPassword ? 'text' : 'password'} size='small' name='password' value={formData.password || ''} onChange={handleChange}
              endAdornment={<InputAdornment position="end"><IconButton aria-label="toggle password visibility"onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>}
            />
          </FormControl>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            {!progress.disabled && <Button type='submit' style={{width: '45%' }} variant='contained' size='medium' color='primary'>Sign in </Button>}
            {progress.disabled && <Button type='submit' style={{width: '45%' }} variant='contained' size='medium' color='primary' disabled>Signing in ... </Button>}

            <p style={{ width: '45%' }}>Are you new here? <Link style={{color: 'black'}} to={'../signup'}>Create an account.</Link></p>
          </div>
          <div>
          <p style={{ width: '100%' }}>Forgot your password? Click here to <Link style={{color: 'black'}} to={'../forgot-password'}>Reset password.</Link></p>
          </div>
        </AuthFormContainer>
      </InnerContainer>

      {/* Response message  */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={responseMessage.severity} sx={{ width: '100%' }}>{responseMessage.message}</Alert>
      </Snackbar>
    </AuthenticationPageContainer>
  )
}

export default Signin