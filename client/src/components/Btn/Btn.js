import './Btn.css';
import React from 'react';

function Btn(props) {

return (
        <button className={ props.styleBtn ? "Btn-cstm "+props.styleBtn :"Btn-cstm"} onClick={props.onClick}>
          {props.text}
        </button>
    );
}

export default Btn;
