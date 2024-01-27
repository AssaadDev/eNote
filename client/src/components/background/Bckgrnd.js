import React from 'react';

import './style.bckgrnd.css';


function Bckgrnd({children})
{
    return (
      <div className='bckgrnd'>
      { children }
      </div>
    );
  }
  
  export default Bckgrnd;