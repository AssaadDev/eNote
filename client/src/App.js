
import './App.css';

import Bckgrnd from './components/background/Bckgrnd';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import DashBoard from './pages/Dashboard/Dashboard';
import NewNote from './pages/newNote/newNote';
import ViewEditNote from './pages/ViewEditNote/ViewEditNote';
import Profil from './pages/Profil/Profil';
import Verify from './pages/Verify/Verify';
import ChangePW from './pages/ChangePW/ChangePW';

import Forbbiden from './pages/Forbbiden/Forbbiden';

import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { useState ,useEffect} from 'react';

import Modal from './components/Modal/Modal';

function App() {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [divClass, setDivClass] = useState('hide');

  const showModal = (content) => {
   // console.log('click app');
    setDivClass('show');
    setModalContent(content);
    setModalVisible(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setDivClass('show hide');
      setTimeout(() => {
        setDivClass('hide');
        setModalVisible(false);
       }, 500);
     }, 5000);
   
 }, [modalVisible]);

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Bckgrnd >
{
  modalVisible ? (<Modal
  content={modalContent}
  divClass={divClass}
/>):null
}
          

            <Routes>
              <Route index element={<Login showModal={showModal}/>} />
              <Route path='/forbbiden' element={<Forbbiden />} />
              <Route path='/register' element={<Register showModal={showModal}/>} />
              <Route path='/dashboard' element={<DashBoard showModal={showModal}/>} />
              {
                //<Route path='/folder/:folder' element={<DashBoard showModal={showModal} />} />
              }
              <Route path='/new' element={<NewNote showModal={showModal} />} />
              <Route path='/profile' element={<Profil />} />
              <Route path='/changepw' element={<ChangePW showModal={showModal} />} />
              <Route path='/verify' element={<Verify showModal={showModal} /> } />
              <Route path='/note/:id' element={<ViewEditNote showModal={showModal} />} />
            </Routes>
          </Bckgrnd>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
