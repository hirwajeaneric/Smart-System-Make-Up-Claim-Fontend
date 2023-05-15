import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthenticationPageContainer, AuthFormContainer, CommandButtons, InnerContainer } from '../../components/styled-components/authenticationPages'
import APIS from '../../utils/Apis';

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

const Signin = () => {  
  // States
  const [showPassword, setShowPassword] = React.useState(false);
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

  // Functions
  const handleChange = ({currentTarget: input}) => { setFormData({...formData, [input.name]: input.value}) };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => { event.preventDefault() };

  const submitForm = (e) => {
    e.preventDefault();
    
    const { email, password } = formData;
     
    if (!email) {
      setResponseMessage({ message: 'Email address must be provided.', severity: 'error' });
      setOpen(true);
      return;
    } else if (!password) {
      setResponseMessage({ message: 'Password is required.', severity: 'error' });
      setOpen(true);
      return;
    } else {
      setProgress({ value: 'Signing in ...', disabled: true});

      axios.post(APIS.userApis.signIn, formData)
      .then(response => {
        setTimeout(()=>{
          if (response.status === 200) {
            const { token, ...userInfo } = response.data.user;
            
            setProgress({ value: '', disabled: false });
            localStorage.setItem('admnInfo', JSON.stringify(userInfo));
            localStorage.setItem('admnTkn', token);
            window.location.replace('/admin/');
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
        <title>Sign In - Admin </title>
        <meta name="description" content={`Admin sign in form.`} /> 
      </Helmet>
      <InnerContainer>
        <h2 style={{ textAlign: 'center' }}>ADMIN SIGN IN</h2>
        <AuthFormContainer onSubmit={submitForm}>
          <TextField id="filled-basic" sx={{ m: 1, width: '40ch' }}  size='small' label="email" variant="filled" name='email' value={formData.email || ''} onChange={handleChange}/>
          <FormControl variant="filled">
            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
            <FilledInput id="filled-adornment-password" type={showPassword ? 'text' : 'password'} size='small' name='password' value={formData.password || ''} onChange={handleChange}
              endAdornment={<InputAdornment position="end"><IconButton aria-label="toggle password visibility"onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>}
            />
          </FormControl>
          <CommandButtons>
            {!progress.disabled && <Button type='submit' variant='contained' size='medium' color='primary'>Sign in </Button>}
            {progress.disabled && <Button type='submit' variant='contained' size='medium' color='primary' disabled>Signing in ... </Button>}

            <p>Are you new here? <Link style={{color: 'black'}} to={'../signup'}>Create an account.</Link></p>
          </CommandButtons>
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