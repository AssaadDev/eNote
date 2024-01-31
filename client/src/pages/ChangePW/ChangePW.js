
import Btn from '../../components/Btn/Btn';
import InputBar from '../../components/inputBar/InputBar';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'

function ChangePW({showModal}) {

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userID = localStorage.getItem('id');
  const userStat = localStorage.getItem('status');

  const [errorMsg, setErrorMsg] = useState('');
  const [greenLight, setGreenLight]= useState('');

  const [inputValues, setInputValues] = useState({
    user_id: userID,
    password: '',
    newPassword: ''
  });

  const [confPass, setConfPass]= useState('');

  const [inputStatus, setInputStatus]= useState(false);
  

  useEffect(()=>{

    if(!token && !userID){
      navigate('/forbbiden');
      return;
    }
    if(userStat == 'STOP'){
      navigate('/verify');
      return;
    }

  },[])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  function change(){
    
    const passwordCheck = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
    setErrorMsg('');


    if(!passwordCheck.test(inputValues.newPassword)){
      showModal('Password must contain at least 1 upper letter, 8 chars long and 1 number!');
      return;
    }

    if(inputValues.newPassword !== confPass){
      showModal('Your new password doesnt match!');
      return;
    }



    axios.post('rest/changePw', inputValues) // your-backend-api-endpoint
    .then((response) => {

      setInputStatus(true);

      showModal(response.data.message);
      navigate('/profile');
       
    })
    .catch((error) => {
      showModal(error.response.data.message);
    });



  }



  return (
    <div className='centar nWStick roseNt'>
           <p>Change password</p>
      
            <InputBar label='Old Password' type='password' disabled={inputStatus} placeholder='Old password' name="password" onChange={handleInputChange} />
            <InputBar label='New Password' type='password' disabled={inputStatus} placeholder='New password' name="newPassword" onChange={handleInputChange} />
            <InputBar label='Confirm Password' type='password' disabled={inputStatus} placeholder='Confirm new password' name="ConfNewPassword" onChange={(e)=> setConfPass(e.target.value)} />
            
            <div className='centar BtnArea'>

            <Link to='/profile'>Back</Link>
            <Btn text='Change' onClick={change} />
            </div>
            
        
    </div>
  );
}

export default ChangePW;
