import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthenticationPageContainer, AuthFormContainer, InnerContainer } from '../../components/styled-components/authenticationPages'
import Apis from '../../API/Apis';

import { Helmet } from 'react-helmet-async';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// THIS FORM WILL BE USED BY ALL USERS. IT IS DINAMIC AND THEREBY SETS INPUT ACCORDING TO THE KIND OF URL A USER ENTERED.
const RequestPasswordReset = () => {
  // Hooks
  const params = useParams();
  
  // States
  const [sysUser, setSysUser] = useState('');
  const [formData, setFormData] = useState({ email: '', role: '' });
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
  
  // Submit function
  const submitForm = (e) => {
    e.preventDefault();
    const data = {};

    const { email } = formData;
    
    // Setting up the url to call
    var link = Apis.userApis.requestPasswordReset;
    
    //  Setting user data according to users
    if (params.userType === 'std') {
      data.email = email
      data.role = sysUser;  
    } else if (params.userType === 'lec') {
      data.email = email
      data.role = sysUser;
    } else if (params.userType === 'hod') {
      data.email = email
      data.role = sysUser;
    } else if (params.userType === 'reg') {
      data.email = email
      data.role = sysUser;
    } else if (params.userType === 'exo') {
      data.email = email
      data.role = sysUser;
    } else if (params.userType === 'dsd') {
      data.email = email
      data.role = sysUser;
    } else if (params.userType === 'acc') {
      data.email = email
      data.role = sysUser;
    } 

    // Validation 
    if (data.email === '') {
      setResponseMessage({ message: 'Email must be provided', severity: 'error' });
      setOpen(true);
      return;
    } else {
      // Set progress message
      setProgress({ value: 'Sending request ...', disabled: true});
      // Api call
      axios.post(link, data)
      .then(response => {
        setTimeout(()=>{
          if (response.status === 200) {
            setResponseMessage({ message: response.data.message, severity: 'success' });
            setOpen(true); 
            
            // Reset inputs to normal
            setProgress({ value: '', disabled: false });
            setFormData({...formData, email: ''});
            data.email = '';
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
        <title>{sysUser} Forgot password - Exam make up.</title>
        <meta name="description" content={`${sysUser} sign in for exam make up.`} /> 
      </Helmet>
      <InnerContainer>
        <h2 style={{ textAlign: 'center' }}>FORGOT PASSWORD</h2>
        <p style={{ textAlign: 'center', padding: '20px', marginBottom: '20px' }}>Do you want to reset your password? Provide the email address you used to sign up.</p>
        <AuthFormContainer onSubmit={submitForm}>
          <TextField id="filled-basic" sx={{ m: 1, width: '40ch' }}  size='small' label="email" variant="filled" name='email' value={formData.email || ''} onChange={handleChange}/>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            {!progress.disabled && <Button type='submit' style={{width: '100%' }} variant='contained' size='medium' color='primary'>Send </Button>}
            {progress.disabled && <Button type='submit' style={{width: '100%' }} variant='contained' size='medium' color='primary' disabled>Sending ... </Button>}

            <p style={{ width: '100%', marginTop: '20px', textAlign: 'center' }}>Do you want to sign in? <Link style={{color: 'black'}} to={'../signin'}>Sign in.</Link></p>
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

export default RequestPasswordReset