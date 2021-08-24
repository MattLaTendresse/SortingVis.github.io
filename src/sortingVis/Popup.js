import React from 'react'
import './Popup.css'
import {useState} from 'react';

function Popup(props){
   // const [buttonPopup,setButtonPopup] = useState(false);
    return(props.trigger) ? (
        <div className="Popup">
            <div className = "PopupInner">          
                {props.children}
            </div>
        </div>
    ): "";
}

export default Popup;