
import Btn from '../../components/Btn/Btn';
import InputBar from '../../components/inputBar/InputBar';
import Loader from '../../components/Loading/Loading';

import './profile.css';

import Countdown from "react-countdown";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'




function Profil() {

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userID = localStorage.getItem('id');
  const userStat = localStorage.getItem('status');


  const [userData, setUserData] = useState({});
  const [userStatus, setUserStatus] = useState('');

  const [loading, setLoading] = useState(true);

  const styleInputeBlock = {
    textAlign: 'center',
    border: 'none',
    fontSize:'1rem',
    color: 'white',
    backgroundColor: '#4c944c',
    cursor: 'default',
  };

  const styleNoFocus = "noFocus";
  

  const styleActive = { 
    backgroundColor: 'green',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'default',
    border: 'none', };

    const styleInactive = {
    backgroundColor: 'red',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '20px',
    cursor: 'default',
    border: 'none',
    };
  

  useEffect(()=>{

    if(!token && !userID){
      navigate('/forbbiden');
      return;
    }
    if(userStat == 'STOP'){
      navigate('/verify');
      return;
    }

    axios.get('rest/userProf', { params: { id: userID } }) // your-backend-api-endpoint
    .then((response) => {
      // Handle success (e.g., show a success message)
      setUserData(response.data);

      const currentTimestamp = Date.now(); // Example current timestamp
      const oldTimestamp = new Date(response.data.timeCreated).getTime()+604800000; // Replace with the timestamp you want to compare

      setUserStatus(oldTimestamp - currentTimestamp);

      //console.log('time stamp : '+response.data.timeCreated);
      //console.log('deadline : '+unixTimestamp);

      //console.log('time stamp userStatus : '+userID+token);

      //console.log('curr : '+currentTimestamp+'  old : '+oldTimestamp+' da fuq : '+ (currentTimestamp - oldTimestamp));
      setLoading(false); 
      console.log('Data sent successfully, status: ', response.statusText); // response.data

    })
    .catch((error) => {
      // Handle errors (e.g., show an error message)
      setLoading(false); 
      console.error('Error sending data:', error);
    });
  },[])


  return (
    loading ? ( 
      <Loader />
      ) : (
    <div className='centar nWStick yellowNt'>
        <div className='centar inputArea'>
            <h1 className='titleNote'>Profile</h1>

            <InputBar label='Username'
                      placeholder='Username' 
                      name='username' 
                      value={userData.username || ''}  
                      readOnly
                      style={styleInputeBlock}
                      styleNoFocus={styleNoFocus}
                      />

            <InputBar label='Email'
                      placeholder='Email' 
                      name='email' 
                      value={userData.email || ''} 
                      readOnly
                      style={styleInputeBlock}
                      styleNoFocus={styleNoFocus}
                      />
                      <Link to='/changepw'>Change pw</Link>

                      {
                        userData.status !== 'inactive' ? (
                          <InputBar
                            type='Submit'
                            value={userData.status}
                            style={styleActive}
                              readOnly
                          />
                        ) : (
                          <div className='space'>
                            <p className='titleVerf'>Time left to Verify</p>
                            <Countdown date={Date.now() + userStatus} className='counterTime' />
                            <InputBar
                              type='Submit'
                              value="Inactive"
                              style={styleInactive}
                              readOnly
                            />
                            <Link to='/verify'>Verify</Link>
                          </div>
                        )
                      }
                      
            <div className='centar BtnArea'>
            <Link to='/dashboard'>Back</Link>
            </div>
        </div>

        
    </div>
    )
  );
}

export default Profil;
