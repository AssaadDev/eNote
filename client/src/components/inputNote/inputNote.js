import React from 'react';

import './inputNote.css';


function InputNote(props)
{
  return (
    <div>
    <textarea rows="4" cols="50"
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        className='NoteArea'
        value={props.value !== null ? props.value : ''}
        onChange={props.onChange} 
        ></textarea>
    </div>
  );
  }
  
  export default InputNote;