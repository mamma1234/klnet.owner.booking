import React, { useState, useEffect } from 'react';
import {Alert} from 'reactstrap'


export default function AlertMessage(props) {
  const [message,setMessage]= useState(props.message);
  const [isActive,setIsActive] = useState(props.isOpen);
  const [timeOut,setTimeOut] = useState(props.timeOut===undefined?3000:props.timeOut);
  //primary, secondary, success, danger, warning, info, light, dark
  //default success
  const [alertColor,setAlertColor] = useState(props.alertColor===undefined?"success":props.alertColor);
  //css color
  //default : white
  const [fontColor, setFontColor] = useState(props.fontColor===undefined?"white":props.fontColor)
  
  useEffect(()=>{
    if(props.isOpen===true){
      setMessage(props.message);
      setAlertColor(props.alertColor);
      handleOpen();
      setTimeout(()=>{
        handleClose()
      },timeOut);
    }
  },[props]);
  
  const handleOpen = () => {
    setIsActive(true)
  }
  const handleClose = () => {
    props.isClose(false);
    setIsActive(false)
  }
  return (
      <div className = {isActive ? ['snackbar', 'show'].join(" ") : 'snackbar'} style={{zIndex:'9999999'}}>
        <Alert style={{height:'60px',border:'1px solid silver',borderRadius:'10px',display:'flex',alignItems:'center'}} color={alertColor} isOpen={true} toggle={handleClose} onClick={handleClose}>
          <span style={{color:fontColor,fontSize:'15px', fontWeight:'600', marginRight:'30px'}}>{message}</span>
        </Alert>
      </div>
    )
}
