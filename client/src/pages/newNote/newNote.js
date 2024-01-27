
import Btn from '../../components/Btn/Btn';
import InputNote from '../../components/inputNote/inputNote';
import InputTitle from '../../components/inputTitle/inputTitle';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'

import './newNote.css';

function NewNote({showModal}) {


const [userID, setUserID] = useState(localStorage.getItem('id') ? localStorage.getItem('id') : '');
const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
const userStat = localStorage.getItem('status');
const [prio, setPrio] = useState('medium');
const [folderName, setFolderName] = useState(localStorage.getItem('folder') ? localStorage.getItem('folder') : null);

const navigate = useNavigate();

useEffect(()=>{
  if(!token && !userID){
    navigate('/');
    return;
  }
  if(userStat == 'STOP'){
    navigate('/verify');
    return;
  }
  console.log(folderName);
},[])


useEffect(()=>{
  //console.log(prio);
},[prio])


  const [noteInput, setNoteInput] = useState({
    id: userID,
    title: '',
    text: '',
    folder: folderName,
    prio: prio
  });
  
  const [error, setError] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoteInput((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  
  const sendDataToBackend = (props) => {
    //console.log('sending data to bckedn: '+props);
    axios.post('rest/newNote', props) 
      .then((response) => {

        showModal('New note added sucessfuly!');

        navigate('/dashboard');
      })
      .catch((error) => {
        setError(error.response?.data?.error || '');
        showModal(error.response.data.error);
      });
  };

  function handleButtonClick() {

    setError('');
  
    if(!noteInput.title){
      setError('Please enter the title!');
      return;
    }
 
    console.log('Sending data to backend: '+noteInput);
    
    sendDataToBackend(noteInput);
  };

  const handlePriorityChange = (event) => {
    const newPrio = event.target.value;
  
    setPrio((prevPrio) => {
      // Set the noteInput state with the new value for 'prio'
      setNoteInput((prevNoteInput) => ({
        ...prevNoteInput,
        prio: newPrio,
      }));
  
      return newPrio; // Return the new value to update the state immediately
    });
  };
  

  return (
    <div className={prio === 'low' ? 'centar nWStick greenNt' : prio === 'medium' ? 'centar nWStick yellowNt' : prio === 'high' ? 'centar nWStick roseNt' : 'centar nWStick yellowNt'}>
        <div className='centar inputArea'>
        { error !== '' ? 
        (<p className='error'>{error}</p>) 
        : 
        (<h1 className='titleNote'>New note</h1>) 
        }
       
       
        <InputTitle type='text'
                    placeholder='Title...' 
                    name="title" 
                    onChange={handleInputChange}/>
        <InputNote  type='text'
                    placeholder='Write here...' 
                    name="text" 
                    onChange={handleInputChange}/>
        </div>

        <p>Priority</p>
        <div className="container">
          <div className="radio_container">
            <label className={ prio === 'low' ? 'greenNt' : null}><input type="radio" name="low" value="low" checked={prio === 'low'} onChange={handlePriorityChange}/>
            low</label>
            <label className={ prio === 'medium' ? 'yellowNt' : null}><input type="radio" name="medium" value="medium" checked={prio === 'medium'} onChange={handlePriorityChange} />
            medium</label>
            <label className={ prio === 'high' ? 'roseNt' : null}><input type="radio" name="high" value="high" checked={prio === 'high'} onChange={handlePriorityChange} />
            high</label>
          </div>
        </div>

        <div className='centar BtnArea'>
        <Link to='/dashboard'>Back</Link>
        <Btn text='Save' onClick={handleButtonClick} />
            </div>
    </div>
  );
}

export default NewNote;
