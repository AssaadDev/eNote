import './Btn.css';
import React from 'react';

function Btn(props) {

return (
        <button onDrop={props.onDrop}
                onDragOver={props.onDragOver}
                style={props.style}
                onDragLeave={props.onDragLeave} 
                className={ props.styleBtn ? "Btn-cstm "+props.styleBtn :"Btn-cstm"} 
                onClick={props.onClick}
                >
          {props.text}
        </button>
    );
}

export default Btn;
