import Btn from '../../components/Btn/Btn';
import InputNote from '../../components/inputNote/inputNote';
import InputTitle from '../../components/inputTitle/inputTitle';
import Loader from '../../components/Loading/Loading';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';


import './viewEdit.css';

function ViewEditNote({ showModal }) {
  const { id } = useParams();
  const [userID, setUserID] = useState(localStorage.getItem('id') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const userStat = localStorage.getItem('status');
  const navigate = useNavigate();
  const [noteData, setNoteData] = useState(null);
  const [view, setView] = useState(true);
  const [loading, setLoading] = useState(true);
  const [dltStatus, setDltStatus] = useState(false);
  const [rmnStatus, setRmnStatus] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    if (!token || !userID) {
      navigate('/');
      return;
    }
    if(userStat == 'STOP'){
      navigate('/verify');
      return;
    }

    axios
      .get('/rest/getNote', { params: { id: id, user_id: userID } })
      .then((response) => {
        console.log('Note is fetched!');
        setNoteData(response.data[0]);
        setLoading(false); // Set loading to false when data is available
      })
      .catch((error) => {
        setLoading(false); // Set loading to false when an error occurs
      });
  }, []);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setNoteData((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const [selectedDay, setSelectedDay] = useState('');

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  useEffect(() => {
    console.log(selectedDay);
  }, [selectedDay]);
  

  function remindMail(){

   
    const newObject = {
      ...noteData,
      userID: userID
    };

    axios.post('/rest/sendEmail', newObject) 
      .then((response) => {

        showModal('Your note has been sent!');

        console.log(response.data);
        remindBtn();
      })
      .catch((error) => {
        showModal(error.response.data.error);
      });

  }

  function savenote() {

    axios.put('/rest/editNote', { noteData, userID }) // your-backend-api-endpoint
      .then((response) => {

        showModal(response.data.message);
        setView(true);
       // navigate('/dashboard');
      })
      .catch((error) => {
        showModal(error.response);
      });

  }

  function changeView() {
    setView(view ? false : true);
  }
  function deletebtn(){
    dltStatus ? setDltStatus(false) : setDltStatus(true);
  }
  function remindBtn(){
    rmnStatus ? setRmnStatus(false) : setRmnStatus(true);
  }

  function deleteYes(){
    axios.delete('/rest/deleteNote', { data: { noteData, userID }}) // your-backend-api-endpoint
      .then((response) => {
        
        showModal(response.data.message);
        navigate('/dashboard');
      })
      .catch((error) => {
        showModal(error.response.error);
      });
  }

  return (
      loading ? (
        <Loader />
      ) : (
        <div className={noteData.prio === 'low' ? 'centar nWStick greenNt' : noteData.prio === 'medium' ? 'centar nWStick yellowNt' : noteData.prio === 'high' ? 'centar nWStick roseNt' : 'centar nWStick yellowNt'}>
          {view && noteData ? (
            <div className='centar inputArea'>
              <h1 className='title'>{noteData.title}</h1>
              <p className='adjustView'>{noteData.notes}</p>
            </div>
          ) : (
            <div className='centar inputArea'>
              <InputTitle
                type='text'
                placeholder='Title...'
                name="title"
                onChange={inputChange}
                value={noteData ? noteData.title : ''}
              />

              <InputNote
                type='text'
                placeholder='Write here...'
                name="notes"
                onChange={inputChange}
                value={noteData ? noteData.notes : ''}
              />
            </div>
          )}
          {view ? (
                dltStatus ? 
                (
                  <div>
                    <p style={{ background: 'white', padding: '1px 5px', borderRadius: '15px', color: 'red' }}>Are you sure want to delete this note?</p>
                      <div className='centar BtnArea' >
                        <Btn text='yes' styleBtn={"dltHover"} onClick={deleteYes} />
                        <Btn text='no' onClick={deletebtn} />
                      </div>
                    </div>
                  ):
                  rmnStatus ? (
                  <div>
                  <label style={{ background: 'white', padding: '1px 5px', borderRadius: '15px' }}>Send this note to your email?</label>

              
                      <div className='centar BtnArea'>
                        <Btn text='Send' onClick={remindMail} />
                        <Btn text='Back' onClick={remindBtn} />
                      </div>
                    </div>
                    )
                  :
                  (
                    <div className='centar BtnArea arange'>
                          <Link to='/dashboard'>Back</Link>
                          <Btn text='edit' onClick={changeView} />
                          <Btn text='Email' onClick={remindBtn} />
                          <Btn text='delete' styleBtn={"deleteBtn"} onClick={deletebtn} />
                    </div>
                  )
            
          ) : (
            <div className='centar BtnArea'>
              <Btn text='Back' onClick={changeView} />
              <Btn text='save' onClick={savenote} />
            </div>
          )}
        </div>
      )
  );
}

export default ViewEditNote;
