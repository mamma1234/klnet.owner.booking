import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
//import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import { Link } from "react-router-dom";
//import InputAdornment from "@material-ui/core/InputAdornment";
import {Radio,Collapse} from "@material-ui/core";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Icon from "@material-ui/core/Icon";
//import Divider from '@material-ui/core/Divider';
import Accordion from "components/Accordion/Accordion.js";
// @material-ui/icons
//import Timeline from "@material-ui/icons/Timeline";
//import Code from "@material-ui/icons/Code";
//import Group from "@material-ui/icons/Group";
import PhoneIphone from "@material-ui/icons/PhoneIphone";
//import Person from "@material-ui/icons/PersonOutlined";
//import PhoneAndroid from "@material-ui/icons/PhoneAndroidOutlined";
//import AccountBox from "@material-ui/icons/AccountBoxOutlined";
//import Face from "@material-ui/icons/FaceOutlined";
//import Email from "@material-ui/icons/EmailOutlined";
//import Lock from "@material-ui/icons/LockOutlined";
//import LockOpen from "@material-ui/icons/LockOpenOutlined";
//import Visibility from "@material-ui/icons/VisibilityOutlined";
//import VisibilityOff from "@material-ui/icons/VisibilityOffOutlined";
// import LockOutline from "@material-ui/icons/LockOutline";
//import Check from "@material-ui/icons/Check";
import CardHeader from "components/Card/CardHeader.js";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomOutInput.js";
//import CustomInputNew from "components/CustomInput/CustomInputSendNum.js";
//import InfoArea from "components/InfoArea/InfoArea.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
//import GoogleIcon from 'assets/img/sns/google.png';
//import FaceIcon from 'assets/img/sns/face.png';
//import KakaoIcon from 'assets/img/sns/kakao.png';
//import NaverIcon from 'assets/img/sns/naver.png';
//import TextField from '@material-ui/core/TextField';
//import List from '@material-ui/core/List';
//import ListItem from '@material-ui/core/ListItem';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
//import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
//import ListItemText from '@material-ui/core/ListItemText';
import HighlightOff from '@material-ui/icons/HighlightOff';
//import CommentIcon from '@material-ui/icons/Comment';
//import IconButton from '@material-ui/core/IconButton';
//import FormHelperText from "@material-ui/core/FormHelperText";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
//import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
//import CardFooter from "components/Card/CardFooter.js";
//page import
import Terms from 'views/TermsOfService.js';
import Privacy from 'views/PrivacyPolicy.js';

//import { useCookies  } from 'react-cookie';
import styles from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import axios from 'axios';
import queryString from 'query-string';
import NavPills from "components/NavPills/NavPillsFind.js";
//import queryString from 'query-string';
import { observer, inject } from 'mobx-react'; // 6.x

const useStyles = makeStyles(styles);


//export default function RegisterPage(props) {
const FindInfoPage = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props}) => {	

   const query = queryString.parse(window.location.search);
	
   const classes = useStyles();
   const userStoreValue = userStore.user;
   //const userStoreValue = {'provider':'kakao','userid':'test00000001','accessToken':'test123123123123'};
   console.log("query",query);
   const [activeTab, setActiveTab] = React.useState(parseInt(query.code));
   
   const [resetPage,setResetPage] = React.useState(null);
   
   
   const [uid,setUid] = React.useState("");
   const [uidErr,setUidErr] = React.useState("");
   const [userName,setUserName] = React.useState("");
   const [phoneNum,setPhoneNum] = React.useState("");
   const [phoneView,setPhoneView] = React.useState("");
   const [phoneOrigin,setPhoneOrigin] = React.useState("");
   const [phoneHelpText,setPhoneHelpText] = React.useState("*??????????????????'-'?????? ??????????????????.");
   const [expanded, setExpanded] = React.useState(false);
   
   const [serviceGB,setServiceGB] = React.useState(0);
   const [userData,setUserData] = React.useState([]);
   
   const [selectId,setSelectId] = React.useState("");
   
   const[idFindStatus,setIdFindStatus] = React.useState("");
   
   //const [error,setError] = React.useState();
   const [userErr,setUserErr] = React.useState();
   const [phoneErr,setPhoneErr] = React.useState();
   
   
   const [password,setPassword] = React.useState();
   const [repassword,setRepassword] = React.useState();
   const [passwordCheck,setPasswordCheck] = React.useState();
   const [repasswordCheck,setRepasswordCheck] = React.useState();
   

   
   
   const [email,setEmail] = React.useState("");
   const [emailCheck,setEmailCheck] = React.useState();
	
   const [open, setOpen] = React.useState(false);
   const [agreeText, setAgreeText] = React.useState();
   
   const [serviceChecked,setServiceChecked] = React.useState(false);
   const [polChecked,setPolChecked] = React.useState(false);
   
   const [certifyStatus, setCertifyStatus] = React.useState(false);
   const [certifyCheck,setCertifyCheck] = React.useState();
   const [certifyMsg,setCertifyMsg] = React.useState("");
   
   const [submitStatus,setSubmitStatus] = React.useState("");
	
   //????????? ?????? ??????
   //const [mergeId,setMergeId] = React.useState();
   //const [mergePw,setMergePw] = React.useState();
   
   const [open1, setOpen1] = React.useState(false);
   const [serviceText, setServiceText] = React.useState(""); //????????????
   
   const [severity, setSeverity] = React.useState("");
   const [alertOpen, setAlertOpen] = React.useState(false);
   const [errMessage, setErrmessage] = React.useState("");
   
   //const kakaoUrl ="https://kauth.kakao.com/oauth/authorize?client_id="+process.env.REACT_APP_KAKAO_CLIENT_ID+"&redirect_uri=https://www.plismplus.com/auth/kakao/callback&response_type=code&state=12345";
   //const googleUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id="+process.env.REACT_APP_GOOGLE_CLIENT_ID+"&redirect_uri=https://www.plismplus.com/auth/google/callback&response_type=code&scope=profile&state=12345";
   //const facebookUrl = "https://www.facebook.com/v5.0/dialog/oauth?client_id="+process.env.REACT_APP_FACEBOOK_CLIENT_ID+"&redirect_uri=https://www.plismplus.com/auth/facebook/callback&response_type=code&state=12345"
   //const naverUrl = "https://nid.naver.com/oauth2.0/authorize?client_id="+process.env.REACT_APP_NAVER_CLIENT_ID+"&redirect_uri=https://www.plismplus.com/auth/naver/callback&response_type=code&state=12345"
   
	//console.log(">>>uservalue:",userStore.user);

 // ????????? ?????? ????????? ?????? 
  function verifyPhone(value) {
	  var phoneRex = /^01?([0-9]{9,11})$/;
	  return !phoneRex.test(value)?false:true;
  }
  
  function change(value, name) {

	  switch (name) {
      case "id":
    	 setUid(value);
    	 setUidErr(false);
        break;
      case "name":
    	  setUserName(value); 
    	  setUserErr(false);
    	break;	
      case "phone":
    	  setPhoneNum(value);
    	  if(verifyPhone(value)){
    		  setPhoneErr(false);
    		  setPhoneHelpText("");
    	  } else {
    		  setPhoneErr(true);
    		  setPhoneHelpText("????????? ??????????????? ????????? ?????????????????????.");
    	  }
    	break;
      default:
        break;
    }
	 
  }

  
  function PaperComponent(props) {
	  return (
			  <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
			  	<Paper {...props} />
			  </Draggable>
			  );
  }


  
  const handleClose = () => {
	  setOpen(false);
	  setOpen1(false);
  }
  
 
  
  const Serti =() => {

	  return axios ({
			url:'/auth/sertify',
			method:'POST',
			data: {}
		}).then(res=>{ 
			var form1 = document.form1;
			window.open("", "auth_popup", "width=430,height=640,scrollbar=yes");	
			form1.target = "auth_popup";
			form1.tc.value="kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd";
			form1.action = "https://safe.ok-name.co.kr/CommonSvl";
			form1.method = "post";
			form1.cp_cd.value=res.data.CP_CD;
			form1.mdl_tkn.value=res.data.MDL_TKN;
			form1.submit();
			
		}
		)
		.catch(err => {
			alert(err);
		});
  }
  
  window.event_popup = function() {
	  if(document.kcbResultForm.RSLT_CD.value === "B000"){
		  setPhoneNum(document.kcbResultForm.TEL_NO.value);
		  setUserName(document.kcbResultForm.RSLT_NAME.value);
		  //setIdFindStatus("P");
		  certifyFindInfo(document.kcbResultForm.RSLT_NAME.value,document.kcbResultForm.TEL_NO.value);
	  } else {
		  setCertifyCheck(true);
		  setCertifyStatus(false);
		  alert(document.kcbResultForm.RSLT_MSG.value);
		  setCertifyMsg("error: ????????? ?????? ????????? ?????? ???????????????. ?????? ??????????????????.");
		  
	  }
  }
  
  const certifyFindInfo = (name,hp) => {
			
			axios ({
				url:'/auth/userfinder',
				method:'POST',
				data: {name:name, phone:hp}
			}).then(res=>{
				setIdFindStatus("P");
				setUserData(res.data);
				console.log("data:",res.data);
			}
			)
			.catch(err => {
				if(err.response !== undefined) {
					setUserData([]);
					if(err.response.status === 500) {
						alertMessage("[ERROR]"+err.response.data,'error');
					} else if(err.response.status === 501) {
						alertMessage("[ERROR]????????? ??????????????? ???????????? ????????????. ??????????????? ??????????????????.",'error');
					}
				}
			});
	}
  
/*  const socialReady=() => {
	  alert("????????? ??????????????????.");
  }*/


  function DialogComponet(props) {
	  return (
			  
		<Dialog
			open={open}
		    onClose={handleClose}
		    PaperComponent={PaperComponent}
		    aria-labelledby="draggable-dialog-title"
		>
		<DialogContent>
			<DialogContentText>{props.text}</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button autoFocus size="sm"  color="info">???</Button>	
			<Button autoFocus size="sm" onClick={handleClose} color="info">?????????</Button>	
		</DialogActions>
		</Dialog>
	  );
  }
  
/*  const handleClickOpen = (event,name) => {
	  
	  if(name === "terms") {
		  setServiceText("T");
	  } else {
		  setServiceText("P");
	  }
	  setOpen1(true);
  }*/
  
  function DialogComponet1(props) {
	  return (
			  
		<Dialog
			open={open1}
		    onClose={handleClose}
		    PaperComponent={PaperComponent}
		    aria-labelledby="draggable-dialog-title"
		>
		<DialogContent>
			{serviceText === "T"?<Terms {...props} handleClose={handleClose} />:<Privacy {...props} handleClose={handleClose}/>}
		</DialogContent>
		</Dialog>
	  );
  }
  
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
	
	
	// db ????????? ?????? ?????? 
/*	function dataCheck () {
		return axios ({
			url:'/auth/datacheck',
			method:'POST',
			data: {
				   id:uid,
				   name:userName,
				   phone:phoneNum
				   }
		}).then(res=>{
		              alertMessage('PLISM PLUS ???????????? ?????????????????????. ????????? ?????? ????????? ????????? ???????????????.','success');
		}
		)
		.catch(err => {
			if(err.response !== undefined) {
				if(err.response.status === 500) {
					alertMessage("[ERROR]"+err.response.data,'error');
				}
			}
		});
	}*/
	const sendPhoneId = (e) => {
		console.log("send sms :",e,"=>",selectId);
		alertMessage('SMS ?????? ????????? ?????? ????????????.','info');
	}
	
	const certifyNum = (event,gb) => {
		
		if(gb === 0) {
			console.log("ID??????1");
			//?????? ????????? ?????? 
			if(userName === "") {
				setUserErr(true);
				alertMessage('????????? ?????? ????????? ?????????.','error');
				return;
			} else {
				setUserErr(false);	
			}

			if(phoneNum === "" || phoneErr) {
				setPhoneErr(true);	
				alertMessage('??????????????? ?????? ?????? ????????? ?????? ???????????????.','error');
				return;
			} else {
				setPhoneErr(false);	
			}
			
			axios ({
				url:'/auth/userfinder',
				method:'POST',
				data: {name:userName, phone:phoneNum}
			}).then(res=>{
				setIdFindStatus("S");
				setUserData(res.data);
				console.log("data:",res.data);
			}
			)
			.catch(err => {
				if(err.response !== undefined) {
					if(err.response.status === 500) {
						alertMessage("[ERROR]"+err.response.data,'error');
					} else if(err.response.status === 501) {
						alertMessage("[ERROR]????????? ??????????????? ???????????? ????????????. ??????????????? ??????????????????.",'error');
					}
				}
			});
			
			
		} else {

			console.log("PW??????");
			//?????? ????????? ?????? 
			console.log("id:",uid);
			if(uid === "") {
				setUidErr(true);
				alertMessage('???????????? ?????? ????????? ?????????.','error');
				return;
			} else {
				setUidErr(false);
			}
			
			if(userName === "") {
				setUserErr(true);
				alertMessage('????????? ?????? ????????? ?????????.','error');
				return;
			} else {
				setUserErr(false);	
			}

			if(phoneNum === "" || phoneErr) {
				setPhoneErr(true);	
				alertMessage('??????????????? ?????? ?????? ????????? ?????? ???????????????.','error');
				return;
			} else {
				setPhoneErr(false);	
			}
			
			axios ({
				url:'/auth/userfinder',
				method:'POST',
				data: {id:uid ,name:userName, phone:phoneNum, gb:"P"}
			}).then(res=>{
				setIdFindStatus("N");
				console.log("data:",res.data);
			}
			)
			.catch(err => {
				if(err.response !== undefined) {
					if(err.response.status === 500) {
						alertMessage("[ERROR]"+err.response.data,'error');
					} else if(err.response.status === 501) {
						alertMessage("[ERROR]????????? ??????????????? ???????????? ????????????. ??????????????? ??????????????????.",'error');
					}
				}
			});
			
			
		
		}
		
	}
	
  const setStatData = (event) => {
	  
      console.log("reset");
      setIdFindStatus("");
	  setResetPage(null);
	  setUserName("");
	  setPhoneNum("");
	  setUid("");
  }

  const handleIdChange = (id,phone,origin) => {
	  
     // console.log("event:",value);
	  setSelectId(id);
	  setExpanded(true);
	  setPhoneView(phone);
	  setPhoneOrigin(origin);
	  
  };
  
  return (
    <div className={classes.container}>
    	<form name="form1">
    	<input type="hidden" name="tc" />	
    	<input type="hidden" name="cp_cd" />	
    	<input type="hidden" name="mdl_tkn" />	
    	<input type="hidden" name="target_id"/>	
    	</form>
    	<form name="kcbResultForm" method="post">
    		<input type="hidden" name="RSLT_CD"/>
    	    <input type="hidden" name="RSLT_MSG"/>
    	    <input type="hidden" name="TEL_NO"/>
    	    <input type="hidden" name="RSLT_NAME"/>
    	</form>  		
    <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={5}>
          <Card className={classes.cardSignup} style={{margin:'0',paddingTop:'0',paddingBottom:'0'}}>
          <HighlightOff onClick={()=> props.history.push("/landing")} style={{color:'black',top:'2',right:'2',position:'absolute'}}/>
            <CardBody style={{paddingTop:'0',paddingBottom:'15px'}}>
            <NavPills
            color="info"
            setStatData={event=>setStatData(event)}
            active={activeTab}
            tabs={[
              {
                tabButton: "ID ??????",
                tabContent: (			
                		<div>
	      		          	{idFindStatus==="S"?
	      		          		<GridItem xs={12}>
	      		          			<Card style={{margin:'10px'}}>
	      		          				<CardHeader style={{paddingTop:'0',paddingLeft:'5px',paddingBottom:'0'}}>
	      		          					<h5 style={{fontSize:'1.05em',fontWeight:'bold',marginBottom:'0'}}> ????????? ?????? ??????</h5>
	      		          				</CardHeader>
	      		          				<CardBody style={{paddingTop:'0',paddingBottom:'0' }}>
			      		          			<Table style={{marginTop:'10px',marginBottom:'10px'}}>
						  		          		<TableBody>
				      		          			{userData.map((data, key) => { 
				      		          				return ( 
								  		          		<TableRow>
								  		          			<TableCell key={key} style={{paddingTop:'0',paddingBottom:'0'}}>
										  		          		<Radio 
							  		          					checked={selectId === data.origin_local_id}
							  		          				    onChange={(event)=>handleIdChange(event.target.value,data.user_phone,data.origin_user_phone)}
							  		          				    value={data.origin_local_id}
							  		          				    size="small"
							  		          				    />{data.local_id}
							  		          				</TableCell>
								  		          	        <TableCell style={{textAlignLast:'end'}}>{data.insert_date} ??????</TableCell>
								  		          		</TableRow>	
				      		          			    );
				      		          			})}
					      		          		</TableBody>
				      		          		</Table>
				      		          		<h5 style={{color:'silver',fontSize:'0.9em'}}>*???????????? ????????? ?????? ????????? ????????????  ***??? ?????? ?????????.</h5>
	      		          				</CardBody>
	      		          			</Card>
	      		          			
	      		          			<Collapse in={expanded} timeout="auto" unmountOnExit>
		      		          		<Card style={{margin:'10px'}}>
		  		          				<CardHeader style={{paddingTop:'0',paddingLeft:'5px',paddingBottom:'0'}}>
		  		          					<h5 style={{fontSize:'1.05em',fontWeight:'bold'}}>????????? ?????? ????????????</h5>
		  		          				</CardHeader>
		  		          				<CardBody style={{paddingTop:'0',paddingBottom:'0'}}>
		  		          					<GridItem xs={12} sm={12} md={12}>
					  		          			<GridContainer justify="center">
						  		          			<GridItem xs={12} sm={12} md={2} style={{marginTop:'10px'}}><PhoneIphone fontSize='large'/></GridItem>
						  		          		    <GridItem xs={12} sm={12} md={6} style={{marginTop:'15px'}}>{phoneView}</GridItem>
						  		          		    <GridItem xs={12} sm={12} md={4}><Button color="info" onClick={event=> sendPhoneId(phoneOrigin)} fullWidth>??????????????? ??????</Button></GridItem>
					  		          		    </GridContainer>	
					  		          		  </GridItem>
				  		          			<h5 style={{color:'red',fontSize:'0.9em'}}>*???????????? ?????? ???????????? ?????? ????????? ????????? ?????? ????????? ????????? ???????????????.</h5>
		  		          				</CardBody>
	  		          				</Card>
	  		          				</Collapse>
	  		          		</GridItem>:
	  		          	idFindStatus==="P"?
	      		          		<GridItem xs={12}>
	      		          			<Card style={{margin:'10px'}}>
	      		          				<CardHeader style={{paddingTop:'0',paddingLeft:'3px',paddingBottom:'0'}}>
	      		          					<h5 style={{fontSize:'1.05em',fontWeight:'bold',marginBottom:'0'}}> ????????? ?????? ??????</h5>
	      		          				</CardHeader>
	      		          				<CardBody >
			      		          			<Table style={{marginTop:'10px',marginBottom:'10px'}}>
						  		          		<TableBody>
						  		          	{userData.length>0?userData.map((data, key) => { 
			      		          				return ( 
								  		          		<TableRow>
										  		          	<TableCell><font color="red">[????????????]</font></TableCell>
								  		          			<TableCell style={{textAlignLast:'start'}}>{data.origin_local_id}</TableCell>
								  		          	        <TableCell style={{textAlignLast:'end'}}>{data.insert_date} ??????</TableCell>
								  		          		</TableRow>
			      		          			 );
			      		          			}):(<TableRow>
										  		          	<TableCell colSpan="3"><font color="red">????????? ??????????????? ???????????? ????????????. ??????????????? ??????????????????.</font></TableCell>
								  		          		</TableRow>)}
					      		          		</TableBody>
					      		          	</Table>
	      		          				</CardBody>
	      		          			</Card> 	
	  		          		</GridItem>		
	  		          		:		
	  		          	<div>
            		  		<h5 style={{fontSize:'1.05em'}}>???????????? ?????? ????????? ??????????????????.</h5>
	                      <Accordion
	                        active={resetPage}
	                        collapses={[
	                          {
	                            title: "????????? ?????????????????? ??????",
	                            content:
	                            	
	                            	<GridItem xs={12} sm={12} md={11} >
				      		          	<CustomInput
				      			            labelText={
				      			              <span>
				      			              <font size="2">??????</font><small>(required)</small>
				      			              </span>
				      			            }
				      			            id="name"
				      			            //helperText={uid === undefined?" ":uid.toUpperCase() === "admin".toUpperCase()?"AMDIN ???????????? ???????????? ????????? ?????????.":idCheck&&uid !== ""?"?????? ????????? ????????? ?????????.":" "}
				      			            formControlProps={{
				      			              fullWidth: true, variant:'outlined',size:'small', error:userErr,style:{marginTop:'15px'}
				      			            }}
				      			            inputProps={{
				      			              onChange: event => change(event.target.value, "name"),
				      			              labelWidth:110
				      			            }}   
				      		          	/>	
				      		        	<CustomInput
							            labelText={
							              <span>
							              	<font size="2">????????? ??????</font>
							              </span>
							            }
							            id="phoneNum"
							            helperText={phoneHelpText}
							            formControlProps={{
							              fullWidth: true,variant:'outlined',size:'small', error:phoneErr,style:{marginTop:'13px',marginBottom:'10px'}
							            }}
							            inputProps={{
							              onChange: event => change(event.target.value, "phone"),
							              labelWidth:75,
							              //value:phoneNum
							            }}
						              
							          />
				      		        	<Button color="info" onClick={event=> certifyNum(event,0)} fullWidth>??????</Button>
				      		        </GridItem>
	                          },
	                          {
		                            title: "?????????????????? ??????",
		                            content:
		                            	<GridItem xs={12} sm={12} md={11}>
		                                    <h5 style={{fontSize:'1.05em'}}>???????????? ??????????????? ????????? ???????????? ?????? ??? ????????????.</h5>
					      		        	<Button color="info" onClick={Serti} fullWidth>??????????????????</Button>
					      		        </GridItem>     
		                          }
	                        ]}
	                      />
	                      </div>}
                      </div>
                )
              },
              {
                tabButton: "???????????? ??????",
                tabContent: (
                		  <div>
                		  	<h5 style={{fontSize:'1.05em'}}>??????????????? ?????? ????????? ??????????????????.<br/>
                		  	???????????? ??? ??????????????? ?????? ????????? ??? ????????????.</h5>
                          <Accordion
                            active={resetPage}
                            collapses={[
                              {
                                title: "????????? ?????????????????? ??????",
                                content:
                                	<GridItem xs={12} sm={12} md={11} >
				      		        	<CustomInput
				      			            labelText={
				      			              <span>
				      			              <font size="2">?????????</font><small>(required)</small>
				      			              </span>
				      			            }
				      			            id="id"
				      			            //helperText={uid === undefined?" ":uid.toUpperCase() === "admin".toUpperCase()?"AMDIN ???????????? ???????????? ????????? ?????????.":idCheck&&uid !== ""?"?????? ????????? ????????? ?????????.":" "}
				      			            formControlProps={{
				      			              fullWidth: true, variant:'outlined',size:'small',style:{marginTop:'15px'}
				      			            }}
				      			            inputProps={{
				      			            	onChange: event => change(event.target.value, "id"),
				      			              labelWidth:110,
				      			            value:uid
				      			            }}   
				      		          	/>
				      		          	<CustomInput
				      			            labelText={
				      			              <span>
				      			              <font size="2">??????</font><small>(required)</small>
				      			              </span>
				      			            }
				      			            id="id"
				      			            //helperText={uid === undefined?" ":uid.toUpperCase() === "admin".toUpperCase()?"AMDIN ???????????? ???????????? ????????? ?????????.":idCheck&&uid !== ""?"?????? ????????? ????????? ?????????.":" "}
				      			            formControlProps={{
				      			              fullWidth: true, variant:'outlined',size:'small', style:{marginTop:'15px'}
				      			            }}
				      			            inputProps={{
				      			            	onChange: event => change(event.target.value, "name"),
				      			              labelWidth:110,
				      			            value:userName
				      			            }}   
				      		          	/>
				      		        	<CustomInput
							            labelText={
							              <span>
							              	<font size="2">????????? ??????</font>
							              </span>
							            }
							            id="phoneNum"
							            helperText={phoneHelpText}
							            formControlProps={{
							              fullWidth: true,variant:'outlined',size:'small', error:phoneErr,style:{marginTop:'13px',marginBottom:'10px'}
							            }}
							            inputProps={{
							              onChange: event => change(event.target.value, "phone"),
							              labelWidth:75,
							              value:phoneNum
							            }}
						              
							          />{idFindStatus === "N"?
							          <div>
							            <GridContainer>
							        		<GridItem xs={12} sm={12} md={9}>
								        		<CustomInput
										            labelText={
										              <span>
										              	<font size="2">????????????</font>
										              </span>
										            }
										            id="number"
										            formControlProps={{
										              fullWidth: true,variant:'outlined',size:'small', style:{marginTop:'3px',marginBottom:'10px'}
										            }}
										            inputProps={{
										              onChange: event => change(event.target.value, "phone"),
										              labelWidth:75,
										              //value:phoneNum
										            }}
										         />
							        		</GridItem>
							        		<GridItem xs={12} sm={12} md={3}>
							        			<Button color="info" onClick={event=> certifyNum(event,2)}  fullWidth style={{marginTop:'3px'}}>?????????</Button>
							        		</GridItem>
							        	</GridContainer>
							        	<Button color="info" onClick={event=> certifyNum(event,3)}  fullWidth>??????</Button>
							        	</div>
							           :
				      		        	<Button color="info" onClick={event=> certifyNum(event,1)}  fullWidth>??????????????????</Button>}
				      		        </GridItem>
                              },
                              {
                                  title: "?????????????????? ??????",
                                  content:
                                  	<GridItem xs={12} sm={12} md={11}>
                                          <h5 style={{fontSize:'1.05em'}}>???????????? ??????????????? ???????????? ??????</h5>
    				      		        	<CustomInput
    				      			            labelText={
    				      			              <span>
    				      			              <font size="2">?????????</font><small>(required)</small>
    				      			              </span>
    				      			            }
    				      			            id="id"
    				      			            //helperText={uid === undefined?" ":uid.toUpperCase() === "admin".toUpperCase()?"AMDIN ???????????? ???????????? ????????? ?????????.":idCheck&&uid !== ""?"?????? ????????? ????????? ?????????.":" "}
    				      			            formControlProps={{
    				      			              fullWidth: true, variant:'outlined',size:'small', style:{marginTop:'15px'}
    				      			            }}
    				      			            inputProps={{
    				      			            	onChange: event => change(event.target.value, "id"),
    				      			              labelWidth:110
    				      			            }}   
    				      		          	/>
    				      		        	<Button color="info" fullWidth>??????????????????</Button>
    				      		        </GridItem>     
                                }
                            ]}
                          />

                          </div>
                )
              }
            ]}
          />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <DialogComponet text={agreeText} />
      <DialogComponet1 {...props}/>
	   <Snackbar open={alertOpen} autoHideDuration={2500} onClose={handleAlertClose}>
		<Alert 
			onClose={handleAlertClose}
			severity={severity}>
				{errMessage}
		</Alert>
	</Snackbar>
    </div>
  );
}

))

export default FindInfoPage;
