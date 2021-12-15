import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';

import Button from "components/CustomButtons/Button.js";

import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import DialogContent from '@material-ui/core/DialogContent';
//import Grid from '@material-ui/core/Grid';
import dotenv from "dotenv";
import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import {observer} from 'mobx-react-lite';
import { userStore } from 'store/userStore.js';
dotenv.config();

const useStyles = makeStyles(styles);


//  export default function LoginPage(props) {
const ChangeSessionPage = observer((props) =>{
  const {adminRole}	=props;
  const classes = useStyles();
  const [email,setEmail] = React.useState('');
  const [password,setPassword] = React.useState('');
  const [checked,setChecked] = React.useState('');
  const [severity, setSeverity] = React.useState("");
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [errMessage, setErrmessage] = React.useState("");
 // const { from } = location.state || { from: { pathname: "/" } };
  //console.log("login props:",props);
  
	function Alert(props) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	const handleAlertClose = (event, reason) => {
		if(reason ==='clickaway') {
			return;
		}
		setAlertOpen(false);
	  }
	
	function  alertMessage (message,icon) {
		setErrmessage(message);
		setSeverity(icon);
		setAlertOpen(true);
	}
  const clean = () => {
	  //userStore.setUser('');
	  //userStore.setToken('');
  }

  const onKeyDownEnter = (event) => {
	  if(event.key === 'Enter') {
		onSubmit();
		  return;
	  }
  }
  const onSubmit = ()=>{
	// userStore.user.role == 'Y'
	// console.log(adminRole, password)
	email&&password&&adminRole == 'Y' 
	?
		axios.post("/auth/changeSession",{ userid:email ,adminKey:password, isAuthenticated: adminRole} )
		.then(res => {
			console.log(res)
			if (res.data.goChangeSession==true ){
				userStore.sessionIn();
			}else{
				res.data.error?alert(res.data.error):alert('세션변경실패') 
			}			
		})
		.catch(err => {
			console.log(err);
			//window.location.href = "/Landing";
		})
		
	: alert('권한이 없습니다')

  }
  return (
			<DialogContent
			style={{
			maxWidth: '400px',
			minWidth: '350px',
			margin:'100px auto'
			// paddingLeft: '10px',
			// paddingRight: '10px',
			}}>
              	<CardHeader style={{textAlignLast:'center'}}>
                	<h4 className={classes.cardTitle} style={{fontWeight:'400'}}><font color="black" size="5">세션전환</font></h4>
              	</CardHeader>
              	<CardBody style={{paddingLeft:'10px',paddingRight:'10px'}}>
              	<div style={{marginBottom:'10px'}}>
              		<TextField id="id" name="id" label={<font size="2">아이디</font>} onChange={event => setEmail(event.target.value.toUpperCase())} value={email} variant="outlined" size="small" fullWidth />
                </div>
                <div style={{marginBottom:'5px'}}>
                	<TextField id="pw" name="pw" label={<font size="2">관리자 비밀번호</font>} onChange={event => setPassword(event.target.value.toUpperCase()) } value={password} onKeyPress={onKeyDownEnter} 
                	variant="outlined" size="small" type="password" fullWidth />
                </div>
			
				<CardFooter className={classes.justifyContentCenter} style={{marginLeft:'0px',marginRight:'0px',paddingTop:'5px'}}>
                      <Button  color="info" size="lg" fullWidth  onClick={onSubmit}   >세션 전환 로그인</Button>
				</CardFooter>				
              </CardBody>
			  {/* </form>			   */}
       	   <Snackbar open={alertOpen} autoHideDuration={2500} onClose={handleAlertClose}>
				<Alert 
					onClose={handleAlertClose}
					severity={severity}>
						{errMessage}
				</Alert>
			</Snackbar>
	   </DialogContent>
  );
})
//))

export default ChangeSessionPage;
