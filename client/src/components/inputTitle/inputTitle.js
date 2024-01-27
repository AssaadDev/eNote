import React from 'react';

import './inputTitle.css';


function InputTitle(props)
{
  return (
    <div>
    {
                    <input
                      name={props.name}
                      type={props.type}
                      placeholder={props.placeholder}
                      className='TitleArea'
                      value={props.value !== null ? props.value : ''}
                      onChange={props.onChange} 
                      
                    />
                   }
      
    </div>
  );

  }
  
  export default InputTitle;