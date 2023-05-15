import { Button, TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthenticationPageContainer, AuthFormContainer, CommandButtons, InnerContainer } from '../../components/styled-components/authenticationPages';
import axios from 'axios';

import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Helmet } from 'react-helmet-async';
import Apis from '../../utils/Apis';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ClientSignup = () => {  
  // States
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', role: 'client', password: '' });
  const [progress, setProgress] = useState({ value: '', disabled: false});
  const [open, setOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ message: '', severity: ''});

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

    if (formData.fullName.length <= 3) {
      setResponseMessage({ message: 'Your name must be more than 3 characters long ', severity: 'error' });
      setOpen(true);
      return;
    } else {
      setProgress({ value: 'Signing up ...', disabled: true });

      axios.post(Apis.userApis.signUp, formData)
      .then(response => {
        setTimeout(()=>{
          if (response.status === 201) {
            const { token, ...userInfo } = response.data.user;
            
            setProgress({ value: '', disabled: false });
            localStorage.setItem('admnInfo', JSON.stringify(userInfo));
            localStorage.setItem('admnTkn', token);
            window.location.replace('/client/');
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
        <title>Sign Up - Client.</title>
        <meta name="description" content={`Client sign up form.`} /> 
      </Helmet>
      <InnerContainer>
        <h2 style={{ textAlign: 'center' }}>ADMIN SIGN UP</h2>
        <AuthFormContainer onSubmit={submitForm}>
          <TextField id="fullName" sx={{ m: 1, width: '40ch' }}  size='small' label="Full name" variant="filled" name='fullName' value={formData.fullName || ''} onChange={handleChange}/>
          <TextField id="email" sx={{ m: 1, width: '40ch' }}  size='small' label="Email" variant="filled" name='email' value={formData.email || ''} onChange={handleChange}/>
          <TextField id="phone" sx={{ m: 1, width: '40ch' }}  size='small' label="Phone" variant="filled" name='phone' value={formData.phone || ''} onChange={handleChange}/>
          <FormControl variant="filled">
            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
            <FilledInput id="filled-adornment-password" type={showPassword ? 'text' : 'password'} size='small' name='password' value={formData.password || ''} onChange={handleChange}
              endAdornment={<InputAdornment position="end"><IconButton aria-label="toggle password visibility"onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>}
            />
          </FormControl>
          <CommandButtons>
            {!progress.disabled && <Button type='submit' variant='contained' size='medium' color='primary'>Sign up </Button>}
            {progress.disabled && <Button type='submit' variant='contained' size='medium' color='primary' disabled>{progress.value} </Button>}

            <p>Do you already have an account? <Link style={{color: 'black'}} to={'../signin'}>Sign In Here</Link></p>
          </CommandButtons>
        </AuthFormContainer>
      </InnerContainer>
      
      {/* Response message  */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={responseMessage.severity} sx={{ width: '100%' }}>{responseMessage.message}</Alert>
      </Snackbar>
    </AuthenticationPageContainer>
  )
}

export default ClientSignup;