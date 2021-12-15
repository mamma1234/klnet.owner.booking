import React from "react";
import { CircularProgress } from "@material-ui/core";
function seachParam(key){
    // console.log('window.location.search',window.location.search)
    return new URLSearchParams(window.location.search).get(key);
  }
const ReturnLogin = (props) =>{
    
    if(seachParam('code')=='SUCCESS'&&window.opener){
    // if(userData&&window.opener){
        console.log(window.opener?window.opener:'' ,'ddd',window.opener.parent)
        console.log('>>>>')
        window.opener.parent.location.reload();
        window.self.close();
    }
    return (<div><CircularProgress/></div>)
}

export default ReturnLogin;