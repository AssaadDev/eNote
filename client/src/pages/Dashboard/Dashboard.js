
import Btn from '../../components/Btn/Btn';
import Note from '../../components/note/Note';
import Loader from '../../components/Loading/Loading';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom'


import './DashBoard.css';
import Folder from '../../components/folder/Folder';

function DashBoard({showModal}) {

  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');

  const token = localStorage.getItem('token');

  const userID = localStorage.getItem('id');

  const userStat = localStorage.getItem('status');

  const [searchItem, setSearchItem] = useState('')

  const [folderName, setFolderName] = useState('')

  const [folders, setFolders] = useState([])

  //const [folderLocation, setFolderLocation] = useState(null)

  const [filteredNotes, setFilteredNotes] = useState([])

  const [folderRoot, setFolderRoot]  = useState(false);

  const [bckRoot, setBckRoot] = useState('rest/notes');

  const [ask, setAsk]  = useState(false);

  
  useEffect(()=>{
    if(!token && !userID){
      navigate('/forbbiden');
      return;
    }
    if(userStat == 'STOP'){
      navigate('/verify');
      return;
    }
    
    axios.get(bckRoot, { params: { id: userID } }) // your-backend-api-endpoint
    .then((response) => {
      setNotes(response.data.notes);

      if(bckRoot == 'rest/notes'){
        setFolders(response.data.folder);
        setFolderRoot(false);
      }else{
        setFolders(null);
        setFolderRoot(true);
      }

      setFilteredNotes(response.data.notes);
      axios.get('rest/userProf', { params: { id: userID } }) // your-backend-api-endpoint
    .then((response) => {
      setName(response.data.username);
      setLoading(false);
      });  
    })
    .catch((error) => {
      setLoading(false); 
      console.error('Error sending data:', error);
    });

    console.log(folders);
  },[bckRoot]);

function dltFolder(){
  ask ? setAsk(false) : setAsk(true);
}

function dltPerm(){
  const match = bckRoot.match(/[\?&]folder=([^&]*)/);
  const folderValue = match ? match[1] : null;

  axios.delete('/rest/deleteFolder', { data: { folderValue, userID }}) // your-backend-api-endpoint
      .then((response) => {
        
        showModal(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        showModal(error.response.error);
      });
}

  function logOutTk() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  function open(id){
    navigate(`/note/${id}`);
  }

  function openFolder(name){
    localStorage.setItem('folder', name);
    setBckRoot(`rest/notes?folder=${name}`);
  }

  const handleInputChange = (e) => { 
    const searchQuery = e.target.value;
    setSearchItem(searchQuery)

    const filteredItems = notes.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredNotes(filteredItems);
  }

  const setNameOfFolder = (e) => { 

    setFolderName(e.target.value);
    console.log(folderName);
  }

  const [newFold, setNewFold] = useState(false);

  function newFolder() {
    setNewFold(newFold ? false : true);
  }

  function createFolder(){

    if(folderName == ''){
      showModal("Please enter folder name!");
      return;
    }
    
    const creatingFolder = {
      folderName: folderName,
      userID: userID
    };

    axios.post('rest/createFolder', creatingFolder) // your-backend-api-endpoint
    .then((response) => {
      showModal('Folder created!');
      window.location.reload();
    })
    .catch((error) => {
      showModal(error.response.data.message);
    });

  }

  return (
    loading ? ( 
      <Loader />
      ) : (
    <div className='centar startTop'>
    <h1>Hi there {name}, welcome!</h1>
        <div className='centar BtnArea'>
        <Link to='/new'>New note</Link>
        <Link to='/profile'>Profile</Link>
        <Link to='/' onClick={logOutTk}>Log out</Link>
        </div>

        
{
  newFold ? (
    <div className='toolsBar'>

      <input
      className='serchBarTitle'
      type="text"
      value={folderName}
      onChange={setNameOfFolder}
      placeholder='Name of the folder...'
      />

      <Btn text='create folder' onClick={createFolder}/>
      <Btn text='Back' onClick={newFolder} />

    </div>
    )
    :
    (
      <div className='toolsBar'>

      { 
        !folderRoot ? 
        (<Btn text='New Folder' onClick={newFolder} />)
        : !ask ? 
          (<Btn text='Delete folder' onClick={dltFolder} />)
         : (
          (<div>
            <p>Sure?</p>
          <Btn text='YES' onClick={dltPerm} />
          <Btn text='NO' onClick={dltFolder} />
          </div>)
        )
        
      }
        

        <input
        className='serchBarTitle'
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder='Search by title...'
        />

        { 
          folderRoot ? 
          (<Btn text='Back' onClick={() => {
            setBckRoot('rest/notes');
            localStorage.setItem('folder', null);
          }} />)
          :
          null
        }
        
        
      </div>)

  
}
          
        

        <div className='NoteAreaDash'>
          {
            folders && folders.map((item) => (
              <Folder key={item.id} text={item.name} onClick={() => openFolder(item.name)}/>
          ))
        }

          {
             filteredNotes && filteredNotes.map((item) => (
              
                <Note key={item.id} prio={item.prio} title={item.title} text={item.notes} onClick={() => open(item.id)}/>
            ))
          }
        </div>
    </div>
      )
  );
}

export default DashBoard;


