import React from 'react';

import './input.bar.css';


function InputBar( props )
{

  return (
    <div className='comb-Bar'>
      <label className='lable-Bar'>{props.label}</label>
      <input
        style={props.style}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        className={ props.styleNoFocus ? 'input-Bar noFocus' : 'input-Bar'}
        value={props.value !== null ? props.value : ''}
        disabled={props.disabled !== null ? props.disabled : false}
        onChange={props.onChange} 
        readOnly={props.readOnly !== null ? props.readOnly : false}
      />
    </div>
  );

  }
  
  export default InputBar;