
import InputBar from '../../components/inputBar/InputBar';
import Btn from '../../components/Btn/Btn';
import React, { useState, useEffect } from 'react';

import '../pagesCss/generalPages.css';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'


function Register({showModal}) {

  const navigate = useNavigate();

const [userID, setUserID] = useState(localStorage.getItem('id') ? localStorage.getItem('id') : '');
const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

useEffect(()=>{
  if(token && userID){
    navigate('/dashboard');
    return;
  }
},[])




const sendDataToBackend = (props) => {
  axios.post('rest/register', props) // your-backend-api-endpoint
    .then((response) => {
      showModal("Successfully registred!");
      navigate('/');
      // Handle success (e.g., show a success message)
      console.log('Data sent successfully:', response.data);
      console.log('Data sent successfully your id is ', response.data.id);
    })
    .catch((error) => {
      // Handle errors (e.g., show an error message)
      showModal(error.response.data.message);
      console.error('Error sending data:', error);
    });
};

const [inputValues, setInputValues] = useState({
  email: '',
  username: '',
  password: '',
  cpassword: '',
});

const [error, setError] = useState('');

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setInputValues((prevInputValues) => ({
    ...prevInputValues,
    [name]: value,
  }));
};

function handleButtonClick() {

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const passwordCheck = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
  setError('');

  if(!inputValues.email || !inputValues.username || !inputValues.password || !inputValues.cpassword){
    setError('Please fill all the fields!');
    return;
  }
  if(!emailPattern.test(inputValues.email)){
    setError('Please enter valid email!');
    return;
  }
  if(inputValues.password !== inputValues.cpassword){
    setError('Password doesnt match!');
    return;
  }
  if(!passwordCheck.test(inputValues.password)){
    setError('Password must contain at least 1 upper letter, 8 chars long and 1 number!');
    return;
  }

  console.log('sending data to backend: '+inputValues.email);
  
  sendDataToBackend(inputValues);
};

  

  return (
    <div className='centar'>
      { error !== '' ? (<p className='er'>{error}</p>) : null }
      <InputBar label='Username' type='text' placeholder='Please enter Username' name="username" onChange={handleInputChange} />
      <InputBar label='Email' type='email' placeholder='Please enter Email' name="email" onChange={handleInputChange} />
      <InputBar label='Password' type='password' placeholder='Please enter password' name="password" onChange={handleInputChange} />
      <InputBar label='Confirm Password' type='password' placeholder='Please confirm password' name="cpassword" onChange={handleInputChange}/>
      <Btn text='Register' onClick={handleButtonClick} />
      <Link to='/'>Back</Link>
    </div>
  );
}

export default Register;
