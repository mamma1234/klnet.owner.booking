import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Draggable from 'react-draggable';

import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from '@material-ui/core/Divider';
import MaterialButton from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from "@material-ui/core/FormHelperText";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Paper from '@material-ui/core/Paper';

// @material-ui/icons
import Person from "@material-ui/icons/PersonOutlined";
import PhoneAndroid from "@material-ui/icons/PhoneAndroidOutlined";
import AccountBox from "@material-ui/icons/AccountBoxOutlined";
import Email from "@material-ui/icons/EmailOutlined";
import Lock from "@material-ui/icons/LockOutlined";
import LockOpen from "@material-ui/icons/LockOpenOutlined";
import HighlightOff from '@material-ui/icons/HighlightOff';
import CommentIcon from '@material-ui/icons/Comment';
import MuiAlert from '@material-ui/lab/Alert';

// components,page
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomOutInput.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Terms from 'components/Footer/TermsOfService.js';
import Privacy from 'components/Footer/PrivacyPolicy.js';

import GoogleIcon from 'assets/img/sns/google.png';
import FaceIcon from 'assets/img/sns/face.png';
import KakaoIcon from 'assets/img/sns/kakao.png';
import NaverIcon from 'assets/img/sns/naver.png';
import styles from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

import axios from 'axios';
import dotenv from "dotenv";
import { useCookies  } from 'react-cookie';
dotenv.config();
const useStyles = makeStyles(styles);


export default function RegisterPage(props) {
	const {to, staticContext, ...rest} = props;
	const classes = useStyles();
	let provider = null;
	const [cookies, setCookies, removeCookie] = useCookies(['name']);

	const [uid,setUid] = React.useState();
	const [localUi,setLocalUi] = React.useState(true);// true: sns??????+klnet ?????? || false : ?????? klnet????????? sns????????????


	const [state,setState]=React.useState('');
	//    const onchangeHandler = (e)=>{e.toUpperCase()}

	const [error,setError] = React.useState(false);
	const [errorMsg,setErrorMsg] =React.useState("");

	const [idCheck,setIdCheck] = React.useState();
	const [password,setPassword] = React.useState();
	const [repassword,setRepassword] = React.useState();
	const [passwordCheck,setPasswordCheck] = React.useState();
	const [repasswordCheck,setRepasswordCheck] = React.useState();

	const [userName,setUserName] = React.useState("");
	const [phoneNum,setPhoneNum] = React.useState("");
	const [birthDay, setBirthDay] = React.useState("");
	const [gender, setGender] = React.useState("");

	const [email,setEmail] = React.useState("");
	const [emailCheck,setEmailCheck] = React.useState();
	const [emailState ,setEmailState] = React.useState("");
	const [open, setOpen] = React.useState(false);
	const [agreeText, setAgreeText] = React.useState("");
	const [phoneCheck,setPhoneCheck] = React.useState(false); //?????? false
	const [serviceChecked,setServiceChecked] = React.useState(false);
	const [polChecked,setPolChecked] = React.useState(false);

	const [certifyStatus, setCertifyStatus] = React.useState(false); //?????? false
	const [certifyMsg,setCertifyMsg] = React.useState("");

	const [submitStatus,setSubmitStatus] = React.useState("");

	//????????? ?????? ??????
	const [mergeId,setMergeId] = React.useState();
	const [mergePw,setMergePw] = React.useState();

	const [open1, setOpen1] = React.useState(false);
	const [serviceText, setServiceText] = React.useState(""); //????????????

	const [severity, setSeverity] = React.useState("");
	const [alertOpen, setAlertOpen] = React.useState(false);
	const [errMessage, setErrmessage] = React.useState("");

	const kakaoUrl ="https://kauth.kakao.com/oauth/authorize?client_id="+process.env.REACT_APP_KAKAO_CLIENT_ID+"&redirect_uri=http://booking.plism.com/auth/kakao/callback&response_type=code&state=12345";
	const googleUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id="+process.env.REACT_APP_GOOGLE_CLIENT_ID+"&redirect_uri=https://booking.plism.com/auth/google/callback&response_type=code&scope=profile&state=12345";
	const facebookUrl = "https://www.facebook.com/v5.0/dialog/oauth?client_id="+process.env.REACT_APP_FACEBOOK_CLIENT_ID+"&redirect_uri=https://booking.plism.com/auth/facebook/callback&response_type=code&state=12345"
	const naverUrl = "https://nid.naver.com/oauth2.0/authorize?client_id="+process.env.REACT_APP_NAVER_CLIENT_ID+"&redirect_uri=https://booking.plism.com/auth/naver/callback&response_type=code&state=12345"
	const host = window.location.hostname;
	let klnetUrl = '';
		if( host.indexOf('localhost') >= 0 ){
		klnetUrl = 'http://localhost:5002/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=http://localhost:5000/auth/klnet/callback&response_type=code&state=12345';
	}else if( host.indexOf('dev') >= 0 ) {
			klnetUrl = 'https://devauth.plism.com/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=https://devbooking.plism.com/auth/klnet/callback&response_type=code&state=12345';
		} else {
			klnetUrl = 'https://auth.plism.com/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=https://booking.plism.com/auth/klnet/callback&response_type=code&state=12345';
		}
   /***???????????? */
   if(cookies) {
		  provider = cookies['xauth_social'];
// console.log('RegisterPage) provider >>> ',provider)
		  removeCookie('xauth_social',{path:'/'});
	  } else {
		  provider = 'klnet';
	  }
/*********/

/*
   provider = {'provider':'kakao','id':'test00000001','accessToken':'test123123123123'};
   provider = {
					provider: 'google',
					// id: '',
					userno: '',
					userid: '',
					usertype: '',
					email: undefined,
					accessToken: 'ACCESSTOKEN',
					accessToken_social: '????????????',
					refreshToken: 'REFRESHTOKEN',
					username: '??????',
					displayName: '??????',
					providerid: '113400586462492529293'
				}
*/	
	// console.log(">>>uservalue:",userStore.user);
	// provider = {
	// 	provider: 'kakao',
	// 	// id: '',
	// 	userno: 'JSONG',
	// 	userid: '',
	// 	usertype: '',
	// 	email: undefined,
	// 	accessToken: 'ACCESSTOKEN',
	// 	refreshToken: 'REFRESHTOKEN',
	// 	accessToken_social: 'SOCIAL_TOKEN',
	// 	username: '??????',
	// 	displayName: '??????',
	// 	providerid: 1832246147
	//   }
	// console.log('RegisterPage) provider >>> ',provider)

	React.useEffect(() => {
		  if(props.userData) {
			  //setUserName(userStore.user.username);
			  setEmail(props.userData.email.toUpperCase());
		  }

		    return () => {
		      console.log('cleanup');
		     // window.removeEventListener("touchmove",handleTouchMove);
		    };
	}, []);
	
	React.useEffect(() => {
		if(phoneNum.length > 0) {
			axios.post("/auth/dupcheckPhone",{num:phoneNum}).then(
			res=> {
				if(res.status===200) {
					if(res.data==="OK") {
						setPhoneCheck(false);
					}else {
						setPhoneCheck(true);
					}
				}else {
					setPhoneCheck(true);
				}
				
			})
		}
	},[phoneNum])
  function handleState (e) {
		 if(e ==="success") {
			 alertMessage('??????????????? ?????????????????????. ?????? ????????? ?????? ??????????????????.','success');
			 props.history.push("/newhome");
		 } else if (e ==="401") {
			 alertMessage('?????? ????????? ??????????????????.','error');
		 } else {
			 alert(e);
		 }
	  }
  
  // ????????? ????????? ??????
  function verifyEmail(value) {
	    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    if (emailRex.test(value)) {
	      return true;
	    }
	    return false;  
	  }
  
  // ???????????? ????????? ?????? ( ??????,?????? ?????? 6~20)
  function verifyPassword(value) {
	  //var passwordRex = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/; ( ??????,?????? ?????? 6~20)
	//   var passwordRex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; //(??????/?????????/?????????/??????????????? ?????? ?????? 8???~)
	  var passwordRex = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; //(??????/?????????/??????????????? ?????? ?????? 8???~)
	  console.log(' !passwordRex.test(value)', !passwordRex.test(value))
	  return !passwordRex.test(value)?false:true;
  }
  // ????????? ?????? ????????? ?????? 
  function verifyPhone(value) {
	  var phoneRex = /^01?([0-9]{9,11})$/;
	  return !phoneRex.test(value)?false:true;
  }
  
  function change(value, name) {

	  switch (name) {
      case "id":
		// setIdCheck(true);
    	  setUid(value.toUpperCase());
    	  if(value.toUpperCase() === "admin".toUpperCase()) {
    		  setIdCheck(true);
    		  return;
    	  }
    	  if(value !== "") {
			//   console.log('value',value)
	    	  axios ({
	    			url:'/auth/dupcheck',
	    			method:'POST',
	    			data: {id:value}
	    		}).then(res=>{
					if(res.status === 200){
						if(res.data==="OK") {
							setIdCheck(false);
						}else {
							setIdCheck(true);
						}
					}else {
						setIdCheck(true);
					}
				})
	    		.catch(err => {
	    			setIdCheck(true);
	    		});
    	  }
        break;
      case "password":
			// setPasswordCheck(true);	
    	  setPassword(value.toUpperCase());
    	  if (verifyPassword(value)) {
    		  setPasswordCheck(false);
    	  } else {
    		  setPasswordCheck(true);
    	  }
    	  
    	  if (repassword ) {
    		  if(value === repassword) {
    			//   setPasswordCheck(false);
    			  setRepasswordCheck(false);
    		  } else {
    			  setPasswordCheck(true);
    			  setRepasswordCheck(true);
    		  }
    	  }	  
    	break;
      case "passwordConfirm":
			// setRepasswordCheck(true);
    	  setRepassword(value.toUpperCase());
    	  if(value) {
	    	  if (value === password ) {
				  setRepasswordCheck(false);
	    	  } else {
	    		  setRepasswordCheck(true);
	    	  }
    	  }
    	break;
      case "name":
    	  setUserName(value); 
    	break;	
      case "email":
    	  setEmail(value.toUpperCase());
    	  if (!verifyEmail(value.toUpperCase()) ) {
			  setEmailCheck(true);
			  setEmailState("????????? ????????? ?????????????????????.")
    	  } else {
			// console.log('value',value)
			axios ({
				url:'/auth/dupcheckMail',
				method:'POST',
				data: {mail:value}
			}).then(res=>{
				if(res.status === 200){
					if(res.data==="OK") {
						setEmailCheck(false);
						setEmailState("");
					}else {
						setEmailCheck(true);
						setEmailState("?????? ???????????? ?????? ???????????? ????????????.")
					}
				}else {
					setEmailCheck(true);
					setEmailState("?????? ???????????? ?????? ???????????? ????????????.")
				}
			})
			.catch(err => {
				setEmailCheck(true);
				setEmailState("ERROR : ???????????? ?????? ??????????????????.")
			});
		  }
    	break;   	
      default:
        break;
    }
	 
  }

  const submit_checked = () => {

	  //?????? ??? ?????? 
	  
	 if(uid === undefined || uid === "") {
		 setIdCheck(true);
		 alertMessage('???????????? ?????? ?????? ????????????.','error');
		 return;	 
	 } else if (idCheck){
		 setIdCheck(true);
		 alertMessage('???????????? ????????? ?????????.','error');
		 return;
	 }

	 if(password === undefined || password === "") {
		 setPasswordCheck(true);
		 alertMessage('??????????????? ?????? ?????? ????????????.','error');
		 return;	
	 } else if (passwordCheck){
		 setPasswordCheck(true);
		 alertMessage('????????? ??????????????? ??????????????????.','error');
		 return;
	 } else if (repassword === undefined || repassword === "") {
		 setRepasswordCheck(true);
		 alertMessage('???????????? ????????? ?????? ?????????.','error');
		 return;

	 } else if (repasswordCheck){
		 setRepasswordCheck(true);
		 alertMessage('???????????? ????????? ?????? ?????????.','error');
		 return;
	 }
	 	 
	 if(emailCheck) {
		 setEmailCheck("error");
		 alertMessage('????????? ????????? ????????? ??????????????????.','error');
		 return;
	 }

	 /**??????????????? ???????????? */
	if(!certifyStatus) {
		 alertMessage('???????????? ??? ?????? ?????????.','error');
		 return;
	 }
	 if(phoneCheck) {
		alertMessage('????????? ?????????????????? ????????? ????????? ???????????????.','error');
		return;
	}	
	 if(!serviceChecked) {
		  alertMessage('???????????? ????????? ?????? ?????????.','error');
		  return;
	 }
	 if(!polChecked) {
	 	alertMessage('???????????? ?????? ?????? ????????? ?????? ?????????.','error');
		return;
	 }

	if(!idCheck&&!passwordCheck&&!repasswordCheck&&certifyStatus) {
	    if(props.userData) {
	    	setAgreeText("?????? ????????? ?????? ?????? PLISM PLUS ????????? ?????? ???????????????????");
	    } else {
	    	setAgreeText("PLISM PLUS ????????? ?????? ???????????????????");
	    }
	     setSubmitStatus("KLNET");
		 setOpen(true);
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
	// setPhoneNum('01029380031');
	// setUserName('?????????');
	// setBirthDay('19910918');
	// setGender('F');
	// setCertifyStatus(true);


	/**??????????????? ???????????? */
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
		  setBirthDay(document.kcbResultForm.RSLT_BIRTHDAY.value);
		  setGender(document.kcbResultForm.RSLT_SEX_CD.value);
		  
		  setCertifyStatus(true);
	  } else {
		  
		  setCertifyStatus(false);
		  alert(document.kcbResultForm.RSLT_MSG.value);
		  setCertifyMsg("error: ????????? ?????? ????????? ?????? ???????????????. ?????? ??????????????????.");
		  
	  }
  }
  
  const socialReady=() => {
	  alert("????????? ??????????????????.");
  }
  
  const submit1 = () => {

	  if(mergeId === undefined || mergeId === "") {
		  alert("????????? ????????? ?????? ????????? ?????????.");
		  return;
	  }
	  
	  if(mergePw === undefined|| mergePw === "") {
		  alert("???????????? ????????? ?????? ????????? ?????????.");
		  return;
	  }
	  setSubmitStatus("ADD_SNS");
	  setAgreeText("PLISM PLUS ????????? ?????? ???????????????????");
	  setOpen(true);
  }

  const submit_btn =()=> {
	  
	  setOpen(false);  
	  if(submitStatus === 'ADD_SNS') {
		  return axios ({
				url:'/auth/join',
				method:'POST',
				//headers:{'Authorization':'Bearer '+this.props.store.token},
				data: {status:'merge',
					   provider:provider.provider,
					   id : mergeId,
					   password : mergePw,
					   providerid: provider?provider.providerid:'',
					   provider_token:provider?provider.accessToken_social:'',
					//    kakaoid: provider&&provider.provider==='kakao'?provider.providerid:'',
					//    tokenkakao:provider&&provider.provider==='kakao'?provider.accessToken:'',
					//    naverid:provider&&provider.provider==='naver'?provider.providerid:'',
					//    tokennaver:provider&&provider.provider==='naver'?provider.accessToken:'',
					//    faceid:provider&&provider.provider==='facebook'?provider.providerid:'',
					//    tokenface:provider&&provider.provider==='facebook'?provider.accessToken:'',
					//    googleid:provider&&provider.provider==='google'?provider.providerid:'',
					//    tokengoogle:provider&&provider.provider==='google'?provider.accessToken:'', 
					//    linkyn:'Y'	   
					   }
			}).then(res=>{ 
				if(res.data && res.data.status === 'SUCCESS') {
					setSubmitStatus("SUCCESS");
					setAgreeText("PLISM PLUS ????????? ????????? ???????????????. ????????????????????? ?????????????????????????");
					setOpen(true);   
				} 
				else {
					setOpen(false);
					setErrorMsg(res.data.msg);	setError(true);  
					setMergeId(''); setMergePw('')
				}
			})
	  } else if(submitStatus === 'KLNET') {
		  axios ({
				url:'/auth/join',
				method:'POST',
				data: {status:'klnet',
					   provider:'klnet',
					   id:uid,
					   password:password,
					   email:email.toUpperCase(),
					/**????????? ????????????*/
					   kname:userName,
					   phone:phoneNum,
					   gender:gender,
					   birthDay:birthDay

					/**????????? */
					// kname:'?????????',
					// phone:'01077778888',
					// gender:'M',
					// birthDay:'19990909'
					,linkyn:'N'}
			}).then(res=>{ 
						  setSubmitStatus("SUCCESS");
						  setAgreeText("??????????????? ?????????????????????. ????????????????????? ?????????????????????????");
						  setOpen(true);    	
			}
			).catch(err => {
				if(err.response != undefined) {
					if(err.response.status == "500") {
						alertMessage("[ERROR]"+err.response.data.msg,'error');
					}
				}
			});
	  } else if(submitStatus === 'SUCCESS') {
		if(provider){
			switch(provider.provider){
				case 'google' : window.location.href=googleUrl; break;
				case 'naver' : window.location.href=naverUrl; break;
				case 'kakao' : window.location.href=kakaoUrl; break;
				case 'facebook' : window.location.href=facebookUrl; break;
				default: console.log(provider); window.location.href=klnetUrl;
			}
	  	 }else{	 window.location.href=klnetUrl;}
	  } else { //klnet with SNS
		  axios ({
				url:'/auth/join',
				method:'POST',
				data: {status:'klnet with sns',
						provider: provider.provider,
						id:uid,
						password:password,
						email:email.toUpperCase(),
						kname:userName,
						phone:phoneNum,
						gender:gender,
						birthDay:birthDay,
						providerid: provider.providerid,
						provider_token:provider.accessToken_social,
					   linkyn:'Y'}
			}).then(res=>{ setSubmitStatus("SUCCESS");
			               setAgreeText('?????? ?????? ??? ???????????? PLISM PLUS ?????????????????????. ????????????????????? ?????????????????????????');
			               setOpen(true);
			}
			);
	  }
  }
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
			<Button autoFocus size="sm" onClick={submit_btn} color="info">???</Button>	
			<Button autoFocus size="sm" onClick={handleClose} color="info">?????????</Button>	
		</DialogActions>
		</Dialog>
	  );
  }
  
  const handleClickOpen = (event,name) => {
	  
	  if(name === "terms") {
		  setServiceText("T");
	  } else {
		  setServiceText("P");
	  }
	  setOpen1(true);
  }
  
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
	
	const submit_local_checked = () =>{
		setLocalUi(!localUi);
	}
	const loginCheck = () => {
		
	    if(mergeId && mergePw) {
			axios ({
				url:'/auth/joinCheck',
				method:'POST',
				data: {id:mergeId,pw:mergePw}
			}).then(res=> {if(res.data && res.data !== 'OK'){setError(true);setErrorMsg("????????? ???????????????. ?????? ??????????????????.");} else {setError("");setError(false);}  })
	    } else {
	    	setErrorMsg("");
			setError(false);
	    }
	}
	//?????? +?????? ?????? ??????
	const access_merge = (flag) => {
		console.log('flag >>>>',flag) //flag=localUI; true??? ??????+??????; false??? ??????????????? ????????????
		if(flag) { //?????? + ?????? // gb=D ??? ??????
			if(register_checked('KLNET_SNS')) {
				  setSubmitStatus("KLNET_SNS");
				  setAgreeText("PLISM PLUS ????????? ?????? ?????? ???????????????????");
				  setOpen(true);
			}  
		} else { //??????????????? ?????? ?????? // gb=M?????? ??????
			if(register_checked('ADD_SNS')) {
				  setSubmitStatus("ADD_SNS");
				  setAgreeText("PLISM PLUS ????????? ?????? ???????????????????");
				  setOpen(true);
			}  
		}
		
	}
	
  function register_checked (gb) {
	  if(gb === 'ADD_SNS') { //??????????????? ???????????? (localUi false??????)
		      if(mergeId === undefined || mergeId === "") {
				alertMessage("????????? ????????? ?????? ????????? ?????????.",'error');
				  return false;
			  }
			  
			  if(mergePw === undefined|| mergePw === "") {
				  alertMessage("???????????? ????????? ?????? ????????? ?????????.",'error');
				  return false;
			  }
			  if(error) {
				  alertMessage("????????? ID ??? Password ??????????????????.",'error');
				  return false;
			  }
			 if(!serviceChecked) {
					  alertMessage('???????????? ????????? ?????? ?????????.','error');
					  return false;
			 }
				  
			 if(!polChecked) {
				 	alertMessage('???????????? ?????? ?????? ????????? ?????? ?????????.','error');
				 	return false;
			 }
			  return true; 	 
	  } else { //klnet?????? ?????? ?????? ??? ????????????
			 if(uid === undefined || uid === "") {
				 setIdCheck(true);
				 alertMessage('???????????? ?????? ?????? ????????????.','error');
				 return false;	 
			 } else if (idCheck){
				 setIdCheck(true);
				 alertMessage('???????????? ????????? ?????????.','error');
				 return false;
			 }
			 if(password === undefined || password === "") {
				 setPasswordCheck(true);
				 alertMessage('??????????????? ?????? ?????? ????????????.','error');
				 return false;	
			 } else if (passwordCheck){
				 setPasswordCheck(true);
				 alertMessage('????????? ??????????????? ??????????????????.','error');
				 return false;
			 } else if (repassword === undefined || repassword === "") {
				 setRepasswordCheck(true);
				 alertMessage('???????????? ????????? ?????? ?????????.','error');
				 return false;

			 } else if (repasswordCheck){
				 setRepasswordCheck(true);
				 alertMessage('???????????? ????????? ?????? ?????????.','error');
				 return false;
			 }
			 	 
			 if(emailCheck) {
				 setEmailCheck("error");
				 alertMessage('????????? ????????? ????????? ??????????????????.','error');
				 return false;
			 }
/**??????????????? ???????????? */			 
			 if(!certifyStatus) {
				 
				 alertMessage('???????????? ??? ?????? ?????????.','error');
				 return false;
			 }
			 if(phoneCheck) {
				alertMessage('?????? ????????? ????????? ???????????????.','error');
				return false;
			}	
			 if(!serviceChecked) {
				  alertMessage('???????????? ????????? ?????? ?????????.','error');
				  return false;
			 }
			  
			 if(!polChecked) {
			 	alertMessage('???????????? ?????? ?????? ????????? ?????? ?????????.','error');
			 	return false;
			 }
			 return true;
	  }
  }

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
			<input type="hidden" name="RSLT_BIRTHDAY"/>
    	    <input type="hidden" name="RSLT_SEX_CD"/>
    	</form>  		
    <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={6}>
{provider?
          <Card className={classes.cardSignup} style={{margin:'0',paddingTop:'10px',paddingBottom:'0'}}>
	          <CardHeader className={`${classes.cardHeader} ${classes.textCenter}`} color="info">
		          <HighlightOff onClick={()=> props.history.push("/newhome")} style={{color:'white',top:'2',right:'2',position:'absolute'}}/>
		          <h3 className={classes.cardTitle} style={{marginBottom:'0'}}><font color="white">????????????</font></h3>	
	          </CardHeader>
            <CardBody style={{paddingTop:'10px',paddingBottom:'15px'}}>
            	<div>
            		{provider && provider.user_no
					?<p style={{marginBottom:'0',fontWeight:'bold',textAlignLast:'center'}}><font size="3" color="green">{provider && provider.provider} ???????????? ???????????? ????????????.</font></p>
					:<p style={{marginBottom:'0',fontWeight:'bold',textAlignLast:'center'}}><font size="3" color="green">{provider && provider.provider} ???????????? ?????????????????????.</font></p>
            		}
                </div> 
                <GridItem xs={12} sm={12} md={12}>
	            	<div style={{textAlignLast:'center',paddingLeft:'20px',paddingRight:'20px',paddingTop:'20px',paddingBottom:'20px',fontWeight:'bold'}}>
				     	<p>?????? PLISM PLUS ?????????????????? ??????????????? ???????????? ????????? ??? ????????????.</p><br/>
		{localUi?
				     	<>
				     	<GridItem xs={12} sm={12}>
						    <CustomInput
						            labelText={
						              <span>
						              <font size="2">?????????</font><small>(required)</small>
						              </span>
						            }
						            id="id"
						            helperText={uid === undefined
										?"????????? ???????????? ???????????????"
										:uid.toUpperCase() === "admin".toUpperCase()
											?"AMDIN ???????????? ???????????? ????????? ?????????."
											:idCheck&&uid !== ""
												?"?????? ????????? ????????? ?????????."
												:"????????? ???????????? ???????????????"}
						            formControlProps={{
						              fullWidth: true, variant:'outlined',size:'small', error:idCheck,style:{marginTop:'15px'}
						            }}
						            inputProps={{
						            	onBlur: event => change(event.target.value.toUpperCase(), "id"),
						              endAdornment: (
						                <InputAdornment
						                  position="end"
						                  className={classes.inputAdornment}
						                  style={{ marginRight:'4px'}}
						                >
						                  <AccountBox className={classes.inputAdornmentIcon} />
						                </InputAdornment>
						              ),
						              labelWidth:110,
									  value:state||'',
									  onChange : (e)=>setState(e.target.value.toUpperCase())
						            }}   
						      	/>
						    </GridItem>
						    <GridItem xs={12} sm={12}>
						        <CustomInput
						        labelText={
						          <span>
						          <font size="2">????????????</font><small>(required)</small>
						          </span>
						        }
						        id="password"
						        labelProps={{style:{top:'0'}}}
						        formControlProps={{
						          fullWidth: true, variant:'outlined',size:'small', error:passwordCheck,style:{marginTop:'3px'}
						        }}
						        helperText="8??? ????????? ??????/??????(?????????)/??????????????? ???????????? ?????????."
						        inputProps={{
						          onChange: event => change(event.target.value.toUpperCase(), "password"),
						          endAdornment: (
						            <InputAdornment
						              position="end"
						              className={classes.inputAdornment}
						              style={{ marginRight:'4px'}}
						            >{!passwordCheck?
						              <Lock className={classes.inputAdornmentIcon} />:
						              <LockOpen className={classes.inputAdornmentIcon} />}
						            </InputAdornment>
						          ),
						          type: "password",
						          autoComplete: "off",
						          labelWidth:130
						        }}
						      />
						      <CustomInput
						        labelText={
						          <span>
						          	<font size="2">???????????? ??????</font> <small>(required)</small>
						          </span>
						        }
						        id="passwordConfirm"
						        labelProps={{style:{top:'0'}}}
						        formControlProps={{
						          fullWidth: true,variant:'outlined',size:'small', error:repasswordCheck,style:{marginTop:'3px'}
						        }}
						      	helperText={repasswordCheck?"??????????????? ???????????? ????????????.":" "}
						        inputProps={{
						          onBlur: event => change(event.target.value.toUpperCase(), "passwordConfirm"),
						          endAdornment: (
						            <InputAdornment
						              position="end"
						              className={classes.inputAdornment}
						              style={{ marginRight:'4px'}}
						            >{!repasswordCheck?<Lock className={classes.inputAdornmentIcon} />:
						              <LockOpen className={classes.inputAdornmentIcon} />}
						            </InputAdornment>
						          ),
						          type: "password",
						          autoComplete: "off",
						          labelWidth:160
						        }}
						      /> 
						    </GridItem>
					        <GridItem xs={12} sm={12}>
						      <CustomInput
					            success={emailCheck === "success"}
					            error={emailCheck === "error"}
					            labelText={
					              <span>
					              	<font size="2">?????????</font>
					              </span>
					            }
					            id="email"
					            formControlProps={{
					              fullWidth: true,variant:'outlined',size:'small', error:emailCheck,style:{marginTop:'3px'}
								}}
						      	helperText={emailState}
					            inputProps={{
					              onChange: event => change(event.target.value.toUpperCase(), "email"),
					              endAdornment: (
					                <InputAdornment
					                  position="end"
					                  className={classes.inputAdornment}
					                  style={{ marginRight:'4px'}}
					                >
					                  <Email className={classes.inputAdornmentIcon} />
					                </InputAdornment>
					              ),
					              value:email||'',
					              labelWidth:50
					            }}
					          />
					      </GridItem>
					{certifyStatus==false?( //????????? certifyStatus ????????? ??????
							<GridContainer justify="center">
								<GridItem xs={6} sm={6} md={6} style={{textAlignLast:'center'}}>
									<Button color="info" onClick={Serti} fullWidth>????????????</Button>
								</GridItem>
								{certifyMsg?<FormHelperText id="certifyStatus" style={{color:'red',marginTop:'0'}}>{certifyMsg}</FormHelperText>:null}
							</GridContainer>
					)
					://cerifyStatus true
					(<>
						{phoneCheck===true?(
							<>
							<GridItem xs={12} sm={12}>
							<p style={{marginBottom:'0',fontWeight:'bold',textAlignLast:'center',color:'red'}}>?????? ????????? ????????? ????????? ???????????????.</p>
							</GridItem>
							<GridItem xs={12} sm={12}>
								<Button color="info" fullWidth style={{width:'300',marginBottom:'15px'}}>
									<Link to="/authpage/findinfo" 
									{...rest}
									>???????????????</Link>
								</Button>
							</GridItem>
							</>
							):(
							<GridItem xs={12} sm={12}>
								<CustomInput
									labelText={
									<span>??????</span>
									}
									id="userName"
									formControlProps={{
									fullWidth: true,variant:'outlined',size:'small', style:{marginTop:'13px',marginBottom:'10px'}
									}}
									inputProps={{
									onChange: event => change(event.target.value, "name"),
									endAdornment: (
										<InputAdornment
										position="end"
										className={classes.inputAdornment}
										style={{ marginRight:'4px'}}
										>
										<Person className={classes.inputAdornmentIcon} />
										</InputAdornment>
									),
									disabled:true,
									value:userName||'',
									labelWidth:35
									}}
								/>
								<CustomInput
									labelText={
									<span>
										<font size="2">????????? ??????</font>
									</span>
									}
									id="phoneNum"
									formControlProps={{
									fullWidth: true,variant:'outlined',size:'small', error:repasswordCheck,style:{marginTop:'13px',marginBottom:'10px'}
									}}
									helperText={<font color="green">?????? ????????? ?????????????????????.</font>}
									inputProps={{
									onChange: event => change(event.target.value, "name"),
									endAdornment: (
										<InputAdornment
										position="end"
										className={classes.inputAdornment}
										style={{ marginRight:'4px'}}
										>
											<PhoneAndroid className={classes.inputAdornmentIcon} />
										</InputAdornment>
									),
									disabled:true,
									labelWidth:75,
									value:phoneNum||''
									}}/>
							</GridItem>)}
						</>
					)}</>
		: //false localUI
					<GridContainer justify="center"><GridItem xs={10} sm={10}>				     	
				     	<div style={{marginBottom:'10px'}}>
				     		<TextField id="merge_id" label={<font size="2">?????????</font>} onChange={event => {setMergeId(event.target.value.toUpperCase());setErrorMsg("");setError(false);}} onBlur={()=>loginCheck()} 
				     		variant="outlined" value={mergeId||''}  size="small" fullWidth />
				     	</div>
				        <div style={{marginBottom:'5px'}}>
				         	<TextField id="merge_pw" label={<font size="2">????????????</font>} onChange={event => {setMergePw(event.target.value.toUpperCase());setErrorMsg("");setError(false);}} 
				         		onBlur={()=>loginCheck()} variant="outlined" value={mergePw||''} size="small" type="password" fullWidth />
				        </div>
							<CardFooter style={{marginLeft:'0px',marginRight:'0px',marginBottom:'10px',paddingTop:'0px',justifyContent:'space-around'}}>
								<MaterialButton  size="small" style={{lineHeight:'initial',fontWeight:'blod',paddingLeft:'20px',paddingRight:'20px'}} >
									<Link to="/authpage/findinfo?code=0"  style={{color:'black',textDecoration:'underline'}} {...props}>???????????????</Link>
								</MaterialButton>
								<MaterialButton  size="small" style={{lineHeight:'initial',fontWeight:'blod',paddingLeft:'20px',paddingRight:'15px'}} >
									<Link to="/authpage/findinfo?code=1"  style={{color:'black',textDecoration:'underline'}} {...props}>??????????????????</Link>
								</MaterialButton>
							</CardFooter>
					</GridItem>
					</GridContainer>
		}



				{error?<p style={{marginBottom:'0',fontWeight:'bold',textAlignLast:'center',color:'red'}}>{/* {provider?provider.provider:''}{' '} */}{errorMsg}</p>:<></>}
			    </div> 
                </GridItem>
                  <GridContainer justify="center">
                  <GridItem xs={10} style={{marginBottom:'10px'}}>
	      	      		<p style={{marginBottom:'0',marginTop:'5px',fontWeight:'bold'}}>????????? ?????? ??????</p>
	      		     	<Divider style={{marginTop:'1px',marginBottom:'1px'}}/>
	      		     	<List style={{paddingLeft:'15px',paddingTop:'0',paddingBottom:'0'}}>
		      	         	<ListItem dense button style={{padding:"0"}}>
		      	         	<ListItemIcon style={{minWidth:"0"}}>
		      	         		<Checkbox color="default" edge="start" checked={serviceChecked} onChange={() => setServiceChecked(!serviceChecked)} 
		      	         		disableRipple />
		      	         	</ListItemIcon>
		      	         	<ListItemText primary={"??????????????? ?????? ?????????. (??????)"}/>
		      	         	<ListItemSecondaryAction>
		
		      	         		<IconButton edge="end" style={{padding:"0"}}  onClick={event => handleClickOpen(event,'terms')}>
		      	         			<CommentIcon />
		      	         		</IconButton>
		
		      	         	</ListItemSecondaryAction>
		      	         	</ListItem>
	      	         	</List>
	      	         	<p style={{marginBottom:'0',fontWeight:'bold'}}>????????????????????????</p>
	      	         	<Divider style={{marginTop:'1px',marginBottom:'1px'}}/>
	      	         	<List style={{paddingLeft:'15px',paddingTop:'0',paddingBottom:'0'}}>
	      	         	<ListItem dense button style={{padding:"0"}}>
	      	         	<ListItemIcon style={{minWidth:"0"}}>
	      	         		<Checkbox color="default" edge="start" checked={polChecked} onChange={() => setPolChecked(!polChecked)}  
	      	         		disableRipple />
	      	         	</ListItemIcon>
	      	         	<ListItemText primary={"???????????? ??????????????? ?????? ?????????.(??????)"} />
	      	         	<ListItemSecondaryAction>
	      	         		<IconButton edge="end" style={{padding:"0"}} onClick={event => handleClickOpen(event,'privacy')}>
	      	         			<CommentIcon />
	      	         		</IconButton>
	      	         	</ListItemSecondaryAction>
	      	         	</ListItem>
	      	         </List>
	      	         </GridItem></GridContainer>
     	         <GridItem xs={12} sm={12} style={{textAlignLast:'center'}}>
     	         	<GridContainer justify="space-between">
     	         		<GridItem xs={3} sm={3} style={{textAlignLast:'center'}}>
     	         			<Button color="info" onClick={submit_local_checked} >{localUi?"????????????":"????????????"}</Button>
     	         		</GridItem>
     	         		<GridItem xs={3} sm={3} style={{textAlignLast:'center'}}>
 	         				<Button color="info" onClick={()=>access_merge(localUi)} >{localUi?"????????????":"????????????"}</Button>
 	         			</GridItem>
 	         		</GridContainer>
	 	         </GridItem>              
            </CardBody>
          </Card>






://provider false
        <Card className={classes.cardSignup} style={{margin:'0',paddingTop:'10px',paddingBottom:'0'}}>
          	<CardHeader className={`${classes.cardHeader} ${classes.textCenter}`} color="info">
	         	<HighlightOff onClick={()=> props.history.push("/newhome")} style={{color:'white',top:'2',right:'2',position:'absolute'}}/>
	          	<h3 className={classes.cardTitle} style={{marginBottom:'0'}}><font color="white">????????????</font></h3>	
          	</CardHeader>
        <CardBody style={{paddingTop:'10px',paddingBottom:'15px'}}>
	        <GridItem xs={12} style={{textAlignLast:'center'}}>			
				<Button
				 // style={{backgroundColor:'white',borderRadius:'30px',borderStyle:'solid',borderColor:'#ffe812',color:'#6f6e6e',placeContent:'initial',margin:'3px',height:'48px',paddingLeft:'10px'}}
		          //justIcon
		          color="transparent"
		          className={classes.iconButtons}
		          href={kakaoUrl}
		          //onClick={e => this.handleKakao()}
		          style={{padding:'5px'}}
		        >
		        <img src={KakaoIcon} alt="kakaosns" width="40" height="40"></img>
		        </Button>&nbsp;&nbsp;
		        <Button
		          //justIcon
		          color="transparent"
		          href={naverUrl}
		          className={classes.iconButtons}
		          //onClick={socialReady}
		        style={{padding:'5px'}}
		        >
		        <img src={NaverIcon} alt="naversns" width="40" height="40"></img>
		        </Button>&nbsp;&nbsp;
		        <Button
		          //justIcon
		        color="transparent"
		        className={classes.iconButtons}
		        href={facebookUrl}
		        // onClick={socialReady}
		        style={{padding:'5px'}}
		        >
		        <img src={FaceIcon} alt="facesns" width="40" height="40"></img>
		        </Button>&nbsp;&nbsp;
		        <Button
		        //justIcon
		        color="transparent"
		        className={classes.iconButtons}
		        href={googleUrl}
		        style={{padding:'5px'}}
		      >
		        <img src={GoogleIcon} alt="googlesns" width="40" height="40"></img>
		      </Button>
		        <p style={{marginBottom:'0',fontWeight:'bold',textAlignLast:'center'}}>SNS??? ???????????? ???????????? ??????????????????.</p>
		        <p style={{marginTop:'10px',marginBottom:'0',fontWeight:'bold',textAlignLast:'center'}}>??? ?????? ?????? ??? ??????????????? ???????????????.</p>
		        <Divider />
		    </GridItem>
		    <GridItem xs={12} sm={12}>
		    <CustomInput
		            labelText={
		              <span>
		              <font size="2">?????????</font><small>(required)</small>
		              </span>
		            }
		            id="id"
		            helperText={uid === undefined
						?"????????? ???????????? ???????????????"
						:uid.toUpperCase() === "admin".toUpperCase()
						?"AMDIN ???????????? ???????????? ????????? ?????????."
						:idCheck&&uid !== ""
						?"?????? ????????? ????????? ?????????."
						:"????????? ???????????? ???????????????"}
		            formControlProps={{
		              fullWidth: true, variant:'outlined',size:'small', error:idCheck,style:{marginTop:'15px'}
		            }}
		            inputProps={{
		            	onBlur: event => change(event.target.value.toUpperCase(), "id"),
		              endAdornment: (
		                <InputAdornment
		                  position="end"
		                  className={classes.inputAdornment}
		                  style={{ marginRight:'4px'}}
		                >
		                  <AccountBox className={classes.inputAdornmentIcon} />
		                </InputAdornment>
		              ),
		              labelWidth:110,
					  value:state||'',
					  onChange : (e)=>setState(e.target.value.toUpperCase())
		            }}   
		      	/>
		    </GridItem>
		    <GridItem xs={12} sm={12}>
		        <CustomInput
		        labelText={
		          <span>
		          <font size="2">????????????</font><small>(required)</small>
		          </span>
		        }
		        id="password"
		        labelProps={{style:{top:'0'}}}
		        formControlProps={{
		          fullWidth: true, variant:'outlined',size:'small', error:passwordCheck,style:{marginTop:'3px'}
		        }}
		        helperText="8??? ????????? ??????/??????(?????????)/??????????????? ???????????? ?????????."
		        inputProps={{
		          onChange: event => change(event.target.value.toUpperCase(), "password"),
		          endAdornment: (
		            <InputAdornment
		              position="end"
		              className={classes.inputAdornment}
		              style={{ marginRight:'4px'}}
		            >{!passwordCheck?
		              <Lock className={classes.inputAdornmentIcon} />:
		              <LockOpen className={classes.inputAdornmentIcon} />}
		            </InputAdornment>
		          ),
		          type: "password",
		          autoComplete: "off",
		          labelWidth:130
		        }}
		      />
		      <CustomInput
		        labelText={
		          <span>
		          	<font size="2">???????????? ??????</font> <small>(required)</small>
		          </span>
		        }
		        id="passwordConfirm"
		        labelProps={{style:{top:'0'}}}
		        formControlProps={{
		          fullWidth: true,variant:'outlined',size:'small', error:repasswordCheck,style:{marginTop:'3px'}
		        }}
		      	helperText={repasswordCheck?"??????????????? ???????????? ????????????.":" "}
		        inputProps={{
		          onBlur: event => change(event.target.value.toUpperCase(), "passwordConfirm"),
		          endAdornment: (
		            <InputAdornment
		              position="end"
		              className={classes.inputAdornment}
		              style={{ marginRight:'4px'}}
		            >{!repasswordCheck?<Lock className={classes.inputAdornmentIcon} />:
		              <LockOpen className={classes.inputAdornmentIcon} />}
		            </InputAdornment>
		          ),
		          type: "password",
		          autoComplete: "off",
		          labelWidth:160
		        }}
		      /> 
		    </GridItem>
	        <GridItem xs={12} sm={12}>
		      <CustomInput
	            success={emailCheck === "success"}
	            error={emailCheck === "error"}
	            labelText={
	              <span>
	              	<font size="2">?????????</font>
	              </span>
	            }
	            id="email"
	            formControlProps={{
	              fullWidth: true,variant:'outlined',size:'small', error:emailCheck,style:{marginTop:'3px'}
				}}
		      	helperText={emailState}
	            inputProps={{
	              onChange: event => change(event.target.value.toUpperCase(), "email"),
	              endAdornment: (
	                <InputAdornment
	                  position="end"
	                  className={classes.inputAdornment}
	                  style={{ marginRight:'4px'}}
	                >
	                  <Email className={classes.inputAdornmentIcon} />
	                </InputAdornment>
	              ),
	              value:email||'',
	              labelWidth:50
	            }}
	          />
	      </GridItem>
	{certifyStatus==false?(
    		   <GridContainer justify="center">
			      <GridItem xs={6} sm={6} md={6} style={{textAlignLast:'center'}}>
			      	<Button color="info" onClick={Serti} fullWidth>????????????</Button>
			      </GridItem>
			      {certifyMsg?<FormHelperText id="certifyStatus" style={{color:'red',marginTop:'0'}}>{certifyMsg}</FormHelperText>:null}
			   </GridContainer>
	   )
	://certifyStatus true
	  (
		<>
		{
			phoneCheck===true?(
				<>
				<GridItem xs={12} sm={12}>
					<p style={{marginBottom:'0',fontWeight:'bold',textAlignLast:'center',color:'red'}}>?????? ????????? ????????? ????????? ???????????????.</p>
				</GridItem>
				<GridItem xs={12} sm={12}>
				<Link to="/authpage/findinfo?code=0"  {...rest}><Button color="info" fullWidth style={{width:'300',marginBottom:'15px'}}>
						???????????????</Button></Link>
				</GridItem>
				</>
			):(
			<GridItem xs={12} sm={12}>
				<CustomInput
					labelText={
					<span>??????</span>
					}
					id="userName"
					formControlProps={{
					fullWidth: true,variant:'outlined',size:'small', style:{marginTop:'13px',marginBottom:'10px'}
					}}
					inputProps={{
					onChange: event => change(event.target.value, "name"),
					endAdornment: (
						<InputAdornment
						position="end"
						className={classes.inputAdornment}
						style={{ marginRight:'4px'}}
						>
						<Person className={classes.inputAdornmentIcon} />
						</InputAdornment>
					),
					disabled:true,
					value:userName||'',
					labelWidth:35
					}}
				/>
				<CustomInput
					labelText={
					<span>
						<font size="2">????????? ??????</font>
					</span>
					}
					id="phoneNum"
					formControlProps={{
					fullWidth: true,variant:'outlined',size:'small', error:repasswordCheck,style:{marginTop:'13px',marginBottom:'10px'}
					}}
					helperText={<font color="green">?????? ????????? ?????????????????????.</font>}
					inputProps={{
					onChange: event => change(event.target.value, "name"),
					endAdornment: (
						<InputAdornment
						position="end"
						className={classes.inputAdornment}
						style={{ marginRight:'4px'}}
						>
							<PhoneAndroid className={classes.inputAdornmentIcon} />
						</InputAdornment>
					),
					disabled:true,
					labelWidth:75,
					value:phoneNum||''
					}}/>
			</GridItem>)}
		</>
	  )}

              <GridItem xs={12} style={{marginBottom:'10px'}}>
      	      		<p style={{marginBottom:'0',marginTop:'5px',fontWeight:'bold'}}>????????? ?????? ??????</p>
      		     	<Divider style={{marginTop:'1px',marginBottom:'1px'}}/>
      		     	<List style={{paddingLeft:'15px',paddingTop:'0',paddingBottom:'0'}}>
	      	         	<ListItem dense button style={{padding:"0"}}>
	      	         	<ListItemIcon style={{minWidth:"0"}}>
	      	         		<Checkbox color="default" edge="start" checked={serviceChecked} onChange={() => setServiceChecked(!serviceChecked)} 
	      	         		disableRipple />
	      	         	</ListItemIcon>
	      	         	<ListItemText primary={"??????????????? ?????? ?????????. (??????)"}/>
	      	         	<ListItemSecondaryAction>
	
	      	         		<IconButton edge="end" style={{padding:"0"}}  onClick={event => handleClickOpen(event,'terms')}>
	      	         			<CommentIcon />
	      	         		</IconButton>
	
	      	         	</ListItemSecondaryAction>
	      	         	</ListItem>
      	         	</List>
      	         	<p style={{marginBottom:'0',fontWeight:'bold'}}>????????????????????????</p>
      	         	<Divider style={{marginTop:'1px',marginBottom:'1px'}}/>
      	         	<List style={{paddingLeft:'15px',paddingTop:'0',paddingBottom:'0'}}>
      	         	<ListItem dense button style={{padding:"0"}}>
      	         	<ListItemIcon style={{minWidth:"0"}}>
      	         		<Checkbox color="default" edge="start" checked={polChecked} onChange={() => setPolChecked(!polChecked)}  
      	         		disableRipple />
      	         	</ListItemIcon>
      	         	<ListItemText primary={"???????????? ??????????????? ?????? ?????????.(??????)"} />
      	         	<ListItemSecondaryAction>
      	         		<IconButton edge="end" style={{padding:"0"}} onClick={event => handleClickOpen(event,'privacy')}>
      	         			<CommentIcon />
      	         		</IconButton>
      	         	</ListItemSecondaryAction>
      	         	</ListItem>
      	         </List>
      	         </GridItem>
 	         <GridItem xs={12} sm={12} style={{textAlignLast:'center'}}>
 	         	<GridContainer justify="center">
 	         		<GridItem xs={6} sm={6} style={{textAlignLast:'center'}}>
 	         			<Button color="info" onClick={submit_checked} fullWidth>????????????</Button>
 	         		</GridItem>
	         		</GridContainer>
 	         </GridItem>              
        </CardBody>
      </Card>}
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

//))

//export default RegisterPage;
