import InputBar from '../../components/inputBar/InputBar';
import Btn from '../../components/Btn/Btn';
import '../pagesCss/generalPages.css';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams } from 'react-router-dom'

function Login({showModal}) {

const [inputValues, setInputValues] = useState({
  username: '',
  password: '',
});


const [userID, setUserID] = useState(localStorage.getItem('id') ? localStorage.getItem('id') : '');
const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

const navigate = useNavigate();

useEffect(()=>{
  if(token && userID){
    navigate('/dashboard');
    return;
  }
},[])


const { error } = useParams(); // Assuming your route parameter is named 'error'
const [errorMsg, setErrorMsg] = useState(error || '');

localStorage.setItem('errorMsg', '');

const sendDataToBackend = (props) => {
  axios.post('rest/login', props) // your-backend-api-endpoint
    .then((response) => {
      //console.log(response.data);

      localStorage.setItem('id', response.data.id);
      localStorage.setItem('token', inputValues.username+response.data.id+inputValues.username);
      

      const currentTimestamp = Date.now(); // Example current timestamp
      
      const oldTimestamp = new Date(response.data.timeCreated).getTime()+604800000; // Replace with the timestamp you want to compare
      if(response.data.status == 'inactive'){

        if((oldTimestamp-currentTimestamp) <= 0){
          showModal('You need to verify your account to continue using eNotes!');
          localStorage.setItem('status', 'STOP');
          
          navigate('/verify');
          return;
        }else{
          showModal('Please verify your account!');
          localStorage.setItem('status', 'inactive');
        }

      }else{
      localStorage.setItem('status', 'active');
      }

      
      navigate('/dashboard');
    })
    .catch((error) => {
      showModal(error.response.data.message);
      setErrorMsg(error.response?.data?.error || '');
    });
};


const handleInputChange = (e) => {
  const { name, value } = e.target;
  setInputValues((prevInputValues) => ({
    ...prevInputValues,
    [name]: value,
  }));
};

function handleButtonClick() {
  setErrorMsg('');

  if(!inputValues.username || !inputValues.password ){
    setErrorMsg('Please fill all the fields!');
    return;
  }

  sendDataToBackend(inputValues);
};

  return (
    <div className='centar'>
    <h1>eNote</h1>
    { errorMsg !== '' ? (<p className='error'>{errorMsg}</p>) : null }
    <InputBar label='Username' type='text' placeholder='Please enter Username' name="username" onChange={handleInputChange} />
    <InputBar label='Password' type='password' placeholder='Please enter password' name="password" onChange={handleInputChange} />
    <Btn text='Log in' onClick={handleButtonClick} />
      <Link to='/register'>Register</Link>
    </div>
  );
}

export default Login;
