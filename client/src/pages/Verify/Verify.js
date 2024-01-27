import Btn from '../../components/Btn/Btn';
import InputBar from '../../components/inputBar/InputBar';

import axios from 'axios';
import Countdown from "react-countdown";
import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../components/Loading/Loading';

function Verify({showModal}) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userID = localStorage.getItem('id');
  const userStat = localStorage.getItem('status');
  const [inputStatus, setInputStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bck, setBck] = useState(true);
  const [verfInfo, setVerfInfo] = useState({
    user_id: userID,
    token: ''
  });
  

  useEffect(() => {
    if (!token && !userID) {
      navigate('/');
      return;
    }

    axios.get('rest/verify', { params: { id: userID } }) // your-backend-api-endpoint
    .then((response) => {
      // Handle success (e.g., show a success message)

      setLoading(false);
      console.log('Data sent successfully, status: ', response.statusText); // response.data
    })
    .catch((error) => {
      setLoading(false);
      // Handle errors (e.g., show an error message)
      console.error('Error sending data:', error);
    });

  }, []);

  const CountdownRenderer = ({ formatted: { minutes, seconds }, completed }) => {
    if (completed) {
      // Render when the countdown is completed (optional)
      setInputStatus(true);
      return (<span style={{color: 'red'}}>Your token has expired!</span>);
    } else {
      // Render the minutes and seconds
      return (
        <span className='counterTime'>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVerfInfo((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  // Create the Countdown component once and memoize it to prevent re-renders
  const countdownComponent = useMemo(() => (
    <Countdown
      date={Date.now() + 90000} // Adjust the target time as needed
      renderer={CountdownRenderer}
    />
  ), []);

  

  function sendVerify(){

  axios.post('rest/test', verfInfo)
  .then((response) => {
    console.log('Data sent successfully:', response.data);
    console.log('Data sent successfully your id is ', response.data.id);
    
    showModal(response.data.message);

    localStorage.setItem('status', 'active');

    navigate('/profile');
  })
  .catch((error) => {
    showModal(error.response.data.message);
    if( error.response.data.message == 'Your token has expired!'){
      if(userStat !== 'STOP'){
        navigate('/profile');
      }else{
        goBck();
      }
      
    }
  });
}

function goBck(){
  navigate('/');

  localStorage.removeItem('token');
  localStorage.removeItem('id');
}


  return (
    
      loading ? (
        <Loader />
        )
        :
        (
      <div className='centar nWStick yellowNt'>
          <h1>Verify Account</h1>
          <p>We sent a code to your email.<br />If you don't get the email,<br />check your spam folder.</p>
          {countdownComponent} {/* Render the Countdown component */}
          <InputBar type='text' disabled={inputStatus} placeholder='Enter code...' name="token" onChange={handleInputChange} />
        <div className='centar BtnArea'>
          {
            userStat !== 'STOP' ? (<Link to='/profile'>Back</Link>):
            (
              <Btn text='Logout' onClick={goBck} />
            )
          }
            
          <Btn text='Verify' onClick={sendVerify} />
        </div>
      </div>
      )
    
    
  );
}

export default Verify;
