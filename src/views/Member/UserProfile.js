import React,{useEffect,useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
// core components

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Accordion from "components/Accordion/Accordion.js";
import * as validation from "components/common/validation.js";

import Switch from '@material-ui/core/Switch';
import MuiAlert from '@material-ui/lab/Alert';
import InputLabel from "@material-ui/core/InputLabel";
import {Dialog,Select,Snackbar,DialogContentText,DialogActions,FormControl,DialogContent,Popover, } from '@material-ui/core';
import {VerifiedUserOutlined,LockOpenOutlined,} from '@material-ui/icons';

import GoogleIcon from 'assets/img/sns/google.png';
import FaceIcon from 'assets/img/sns/face.png';
import KakaoIcon from 'assets/img/sns/kakao.png';
import NaverIcon from 'assets/img/sns/naver.png';

import dotenv from "dotenv";
dotenv.config();

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile(props) {
	
//console.log("props:",props);
  const {store} = props;
  const classes = useStyles();
  const [svcType,setSvcType] = useState("E");
  const [insertDate,setInserDate] = useState("");
  const [userName,setUserName] = useState(""); // eslint-disable-line no-unused-vars
  const [userEmail,setUserEmail] = useState(""); // eslint-disable-line no-unused-vars
  const [userPhone,setUserPhone] = useState(""); // eslint-disable-line no-unused-vars
  const [loginDate,setLoginDate] = useState(""); // eslint-disable-line no-unused-vars
  const [socialUse,setSocialUse] = useState(false);
  const [linkStatus,setLinkStatus] = useState("연계 일자");
  const [socialLinkDate,setSocialLinkDate] = useState("");
  const [pwdModifyDate, setPwdModifyDate] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false);
  const [changePW, setChangePW] = useState(false);

  const [kakao,setKakao] = useState("");
  const [naver,setNaver] = useState("");
  const [facebook,setFacebook] = useState("");
  const [google,setGoogle] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [userNo, setUserNo] = useState("");
  const [userId, setUserId] = useState("");
  const [currentPW,setCurrentPW] = useState('');
  const [password,setPassword] = React.useState();
  const [repassword,setRepassword] = React.useState();
  const [passwordCheck,setPasswordCheck] = React.useState();
  const [repasswordCheck,setRepasswordCheck] = React.useState();
  const [emailCheckMessage ,setEmailCheckMessage] = useState("기존 이메일을 변경할 수 있습니다");
  const [emailCheck, setEmailCheck] = useState(false);


  const [severity, setSeverity] = React.useState("");
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [errMessage, setErrmessage] = React.useState("");

  const [url, setUrl] = useState('');


const [googleToken,setGoogleToken]=useState('');


const getData = async()=>{
	try{ 
		await axios.post("/com/getUserInfo",{userId:props.userData.user_no})
		.then(res => {
			console.log('userProfile res.data>>> ', res.data,res.data[0].EMAIL.toUpperCase())

			// USER_ID, UNAME_KR, BIRTHDAY, GENDER, TEL, EMAIL, TO_CHAR(IN_DATE,'YYYY-MM-DD HH24:MI:SS') AS IN_DATE,
			// TO_CHAR(PWD_CHG_DATE,'YYYY-MM-DD HH24:MI:SS') AS PWD_CHG_DATE 
			setSvcType(res.data[0].SVC_TYPE?res.data[0].SVC_TYPE:"");
			setInserDate(res.data[0].IN_DATE);
			setUserName(res.data[0].UNAME_KR?res.data[0].UNAME_KR:"");
			setUserPhone(res.data[0].TEL?res.data[0].TEL:"");
			setUserEmail(res.data[0].EMAIL?res.data[0].EMAIL.toUpperCase():"");
			setPwdModifyDate(res.data[0].PWD_CHG_DATE?res.data[0].PWD_CHG_DATE:"");
			// setSocialUse(res.data[0].social_link_yn === "Y"?true:false);
			setSocialLinkDate(res.data[0].social_link_date?res.data[0].social_link_date:"");
			setKakao(res.data[0].kakao_id?res.data[0].KAKAO_LOGIN_DATE:"");
			setNaver(res.data[0].naver_id?res.data[0].NAVER_LOGIN_DATE:"");
			setFacebook(res.data[0].face_id?res.data[0].FACEBOOK_LOGIN_DATE:"");
			setGoogle(res.data[0].GOOGLE_ID?res.data[0].GOOGLE_LOGIN_DATE:"");
			setUserNo(res.data[0].EMAIL?res.data[0].EMAIL.toUpperCase():""); //email로 수정
			setUserId(res.data[0].USER_ID?res.data[0].USER_ID:"");
			setApiKey(res.data[0].API_SERVICE_KEY?res.data[0].API_SERVICE_KEY:"");
			setGoogleToken(res.data[0].GOOGLE_ID?res.data[0].GOOGLE_ACCESS_TOKEN:"");
		})
	//.then(res => console.log(">>>>>>>>>>>>>>>>>>>>>>>>",JSON.stringify(res.data[0])))
	}catch(err){
	alert(err);
	};
}







  useEffect(() => {
	   // console.log('useEffect 호출....');
	    
	    if(props.userData) {
			getData();
	    } else {
	    	props.history.push("/");
	    }
	    return () => {
	      console.log('cleanup');
	    };
	  }, []);  //  ==> }, [pageData]); 
  
  function SelectBox() {
	  
	  return (
			    <FormControl  fullWidth style={{marginTop:'11px'}}>
			        <InputLabel id = "svctype">사용자구분</InputLabel>
			        <Select
			          native
			          id = "svctype"
			          value={svcType}
			          onChange={(event) => setSvcType(event.target.value)}
			        >
				        <option value="S">선사</option>
				        {/* <option value="F">포워더</option> */}
				        <option value="H">화주</option>
				        {/* <option value="A">관리자</option> */}
				        {/* <option value="E">기타</option> */}
			        </Select>
			    </FormControl>
			  );
  }
  
  const handleLink=(event)=>{
	  console.log( event)
	  const kakaoUrl ="https://kauth.kakao.com/oauth/authorize?client_id="+process.env.REACT_APP_KAKAO_CLIENT_ID+"&redirect_uri=http://booking.plism.com/auth/kakao/callback&response_type=code&state=12345";
	  const googleUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id="+process.env.REACT_APP_GOOGLE_CLIENT_ID+"&redirect_uri=https://booking.plism.com/auth/google/callback&response_type=code&scope=profile&state=12345";
	  const facebookUrl = "https://www.facebook.com/v5.0/dialog/oauth?client_id="+process.env.REACT_APP_FACEBOOK_CLIENT_ID+"&redirect_uri=https://booking.plism.com/auth/facebook/callback&response_type=code&state=12345"
	  const naverUrl = "https://nid.naver.com/oauth2.0/authorize?client_id="+process.env.REACT_APP_NAVER_CLIENT_ID+"&redirect_uri=https://booking.plism.com/auth/naver/callback&response_type=code&state=12345"
	  
	let sns = event.target.id
	  if(event.target.checked){
		setDialogOpen(true)
		switch(sns){
			case 'kakao':
				setUrl(kakaoUrl)
			break;
			case 'naver':
				setUrl(naverUrl)
			break;
			case 'google':
				setUrl(googleUrl)
			break;
			case 'facebook':
				setUrl(facebookUrl)
			break;
			default: console.log('연동하기')
		}
	  }else{
		switch(sns){
			case 'kakao':
				// setUrl(kakaoUrl)
			break;
			case 'naver':
				// setUrl(naverUrl)
			break;
			case 'google':
				// setUrl(googleUrl)
				console.log('googleToken>> ',googleToken)

			break;
			case 'facebook':
				// setUrl(facebookUrl)
			break;
			default:	alert("서비스 준비중입니다.");
		}
	
	  }

	//   if(socialUse) {
	// 	  setSocialUse(false);
	// 	  setLinkStatus("연계 해제 일자");
	//   } else {
	// 	  setSocialUse(true);
	// 	  setLinkStatus("연계 일자"); 
	//   }
  }
	const onCreateApikey = () => {

		if(props.userData) {
			axios.post('/api/createApikey',{id:userId, no:userName}).then(
				res => {
					if(res.statusText==="OK") {
						console.log(res.data)
						if(res.data) {
							switch (res.data.state) {
								case "none":
									setApiKey("");
									break;
								case "new":
									setApiKey(res.data.data);
									break;
								case "exist":
									setApiKey(res.data.data);
									break;
								default:
									break;
							}
						}
					}
				}
			)
		} else {
			props.openLogin();
		}
  	}
	  function change(value, name) {

		switch (name) {
		case "password":
			setPassword(value);
			if (verifyPassword(value)) { 
				setPasswordCheck(false);
			} else {
				setPasswordCheck(true);
			}
			
			if (repassword ) {
				if(value === repassword) {
					setPasswordCheck(false);
					setRepasswordCheck(false);
				} else {
					setPasswordCheck(true);
					setRepasswordCheck(true);
				}
			}	  
		  break;
		case "passwordConfirm":
			setRepassword(value);
			if(value) {
				if (value === password ) {
					setRepasswordCheck(false);
				} else {
					setRepasswordCheck(true);
				}
			}
		  break;
		default:
		  break;
	  }
	   
	}
	function verifyPassword(value) {
		var passwordRex = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; //(숫자/대문자/특수문자를 모두 포함 8자~)
		return !passwordRex.test(value)?false:true;
	}

	const updatePwHandler = () => {
		if(currentPW.length===0) {
			alertMessage('현재 비밀번호를 입력해주세요.','error');
		}else if(password === undefined || password === "") {
			   setPasswordCheck(true);
			   alertMessage('변경하실 비밀번호를 입력해주세요','error');
			   return;	
		   } else if (passwordCheck){
			   setPasswordCheck(true);
			   alertMessage('올바른 비밀번호를 입력해주세요.','error');
			   return;
		   } else if (repassword === undefined || repassword === "") {
			   setRepasswordCheck(true);
			   alertMessage('새 비밀번호를 입력해주세요.','error');
			   return;
  
		   } else if (repasswordCheck){
			   setRepasswordCheck(true);
			   alertMessage('비밀번호가 일치하지 않습니다. 변경할 비밀번호를 확인해주세요.','error');
			   return;
		   }
  
		axios ({
			  url:'/auth/changepassword',
			  method:'POST',
			  data: {user:userId, pw:currentPW, changepw:password}
		  }).then(res=>{
			if(res.statusText==="OK"){
				alertMessage(res.data.msg,res.data.status);
				if(res.data.status ==='success'){
					alertMessage("비밀번호가 변경 되었습니다. 로그인 후 사용 가능합니다.",'success');
					setTimeout(()=>{
					props.isLogOut();
					props.history.push('/newhome');
					},2000);
				}
			}
		
		  }).catch(err => {
			  if(err.response !== undefined) {
				  if(err.response.status === 500) {
					  alertMessage("[ERROR]"+err.response.data,'error');
				  } else if(err.response.status === 404) {
					  alertMessage("[ERROR]입력된 회원정보가 존재하지 않습니다. 회원가입후 이용해주세요.",'error');
				  }
			  }
		  });
	}

	const onChangeEmail = (value) => {
        if(value.length===0){
          setEmailCheckMessage("");
          setEmailCheck(true);
        }else if(value===userNo.toUpperCase()) {
			setEmailCheck(true)
			setEmailCheckMessage("기존 이메일을 변경할 수 있습니다");
		}else {
          if(validation.validationEmail(value)){
            axios ({
              url:'/auth/dupcheckMail',
              method:'POST',
              data: {mail:value}
            }).then(res=>{
              if(res.status===200){
                if(res.data==="OK"){
                  setEmailCheck(false)
                  setEmailCheckMessage("");
                }else {
                  setEmailCheck(true);
                  setEmailCheckMessage("이미 등록된 이메일 입니다.");
                }
              }else {
                setEmailCheckMessage("잠시 후 다시 시도해 주세요.");
                setEmailCheck(true);
              }
              })
            .catch(err => {
                setEmailCheck(true);
            });
           }else {
            setEmailCheck(true);
            setEmailCheckMessage("이메일 형식에 맞지 않습니다.")
           }
        }
        setUserEmail(value.toUpperCase());
      }

  const dialogClose = () => {
    setDialogOpen(false);
	}
  const saveNewMail = () => {
	if(emailCheck) {
		alertMessage("수정 하실 이메일을 다시 확인해주세요.");
		return;
	}
	axios.post("/com/setUserInfo",{gubun:'email',email:userEmail.toUpperCase(),userno:userId}).then(
		res => {
			if(res.statusText==="OK") {
				if(res.status===200) {
					alertMessage("이메일 정보가 수정되었습니다.");
					getData();
				}else {
					alertMessage("오류가 발생했습니다. 잠시후 다시 시도해주세요.");
				}
			}else {
				alertMessage("오류가 발생했습니다. 잠시후 다시 시도해주세요.");
			} 
		}
	).catch(e => {
		alertMessage(String(e));
	})
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
  return (
    <>
      {/* <GridContainer display = 'flex' style={{justifyContent :'center'}} alignItems='center'>*/}
        <GridItem xs={12} sm={12} style={{maxWidth :'800px' , margin:'auto'}} > 
			<Card >
				<CardHeader color="primary">
				<h4 className={classes.cardTitleWhite}>PROFILE</h4>
				{/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
				</CardHeader>
				<CardBody>
					<GridContainer>
						<GridItem xs={12} sm={12} md={5}>
							<SelectBox />
					</GridItem>
						<GridItem xs={12} sm={12} md={7}>
						<CustomInput
							labelText="가입일자"
							id="savedate"
							formControlProps={{
							fullWidth: true,
							}}
						labelProps={{id:"savedate"}}
							inputProps={{
								value:insertDate,
								disabled: true,
							}}
						/>
						</GridItem>
					</GridContainer>
					<GridContainer>
						<GridItem xs={12} sm={12} md={5}>
							<CustomInput
								labelText="이름"
								id="name"
								formControlProps={{
								fullWidth: true,style:{paddingTop:'7px'}
								}}
								labelProps={{
									style:{top:'-10px'},
								}}
								inputProps={{
								value:userName,
								//   onChange:({target:{value} }) => setUserName(value)
								disabled: true,
								}}
							/>
						</GridItem>
						<GridItem xs={12} sm={12} md={7}>
							<CustomInput
								labelText="연락처"
								id="phone"	
								formControlProps={{
								fullWidth: true,style:{paddingTop:'7px'}
								}}
								labelProps={{
									style:{top:'-10px'},
								}}
								inputProps={{
								value:validation.TELFormatter(userPhone),
								//   onChange:({target:{value} }) => setUserPhone(value)
								disabled: true,
								}}
							/>
						</GridItem>
					</GridContainer>
					<GridContainer>
						<GridItem xs={8}  sm={9} >
						<CustomInput
							labelText="비밀번호 변경일자"
							id="email"
							formControlProps={{
							fullWidth: true,style:{paddingTop:'7px'}
							}}
							labelProps={{style:{top:'-10px'}}}
							inputProps={{value:pwdModifyDate,
								// ,onChange:({target:{value} }) => {setPwdModifyDate(value) }
								disabled: true,
							}}
						/>
						</GridItem>
						<GridItem  xs={4}  sm={3} >
							<Button color="primary" onClick={()=>setChangePW(true)} style={{float: "right"}} fullWidth={true}>비밀번호 변경</Button>
						</GridItem>					
					</GridContainer> 
					<GridContainer>
							<GridItem xs={8}  sm={9} >
							<CustomInput
								labelText="API KEY"
								id="apiKey"
								formControlProps={{
								fullWidth: true,style:{paddingTop:'7px'}
								}}
								// helperText={'API KEY 설명'}
								labelProps={{style:{top:'-10px'}}}
								inputProps={{value:apiKey
									,disabled: true,}}
							/>
						</GridItem>
						<GridItem  xs={4}  sm={3} >
							<Button color="primary" onClick={() => onCreateApikey()} style={{float: "right"}} fullWidth={true} disabled={apiKey?true:false}>{apiKey?`KEY 발급완료`:`KEY 발급`}</Button>
						</GridItem>		
					</GridContainer>
					<GridContainer>
						<GridItem xs={8}  sm={9} >
						<CustomInput
							labelText="이메일"
							id="email"
							formControlProps={{
							fullWidth: true, error:emailCheck,style:{paddingTop:'7px'}
							}}
							helperText={emailCheckMessage}
							labelProps={{style:{top:'-10px'}}}
							inputProps={{value:userEmail
								,onChange:({target:{value} }) => {
									onChangeEmail(value.toUpperCase())
									// setUserEmail(value)
								 }}}
						/>
						</GridItem>
						<GridItem  xs={4}  sm={3} >
							<Button color="primary" onClick={saveNewMail} style={{float: "right"}} fullWidth={true} disabled={emailCheck?true:userEmail==userNo?true:false}>이메일 변경</Button>
						</GridItem>					
					</GridContainer> 
					
					
					<Accordion
						active={0}
						collapses={[
							{
							title: "소셜 로그인 설정",
							content:
							<div style={{display:'flex',flexDirection: 'column',width: '100%',minHeight: '230px'}}>
									<GridContainer   style={{width:'100%', margin:'auto', justifyContent:'space-between',alignItems: 'center' ,fontSize:'14px'}}>
										<GridItem xs={4} style={{display:'flex', alignItems: 'center'}}>
											<img src={KakaoIcon} alt="googlesns" width="40" height="40"></img>
											&nbsp;&nbsp;&nbsp;<span>카카오</span>
										</GridItem>
										<GridItem  style={{display:'flex', alignItems: 'center',justifyContent:'end',fontSize:'14px' }} height="40">
										{kakao?  `마지막 접속 일자 : ${kakao}`: '등록되지 않음'}
											<Switch
											id ='kakao'
											checked={kakao? true : false}
											onChange={
												// (event)=>onDialog(event)
												(event) => handleLink(event)
											}
											inputProps={{'aia-label':'checkbox'}}
											/>
										</GridItem>
									</GridContainer>
									<GridContainer   style={{width:'100%', margin:'auto', justifyContent:'space-between',alignItems: 'center' ,fontSize:'14px'}}>
										<GridItem xs={4} style={{display:'flex', alignItems: 'center'}}>
											<img src={NaverIcon} alt="naversns" width="40" height="40"/>	
											&nbsp;&nbsp;&nbsp;<span>네이버</span>
										</GridItem>
										<GridItem style={{display:'flex', alignItems: 'center',justifyContent:'end',fontSize:'14px' }} height="40">
										{naver?  `마지막 접속 일자 : ${naver}`: '등록되지 않음'}
											<Switch
											id="naver"
											checked={naver? true : false}
											onChange={(event) => handleLink(event)}
											inputProps={{'aia-label':'checkbox'}}
											/>
										</GridItem>
									</GridContainer>
									<GridContainer   style={{width:'100%', margin:'auto', justifyContent:'space-between',alignItems: 'center' ,fontSize:'14px'}}>
										<GridItem xs={4}  style={{display:'flex', alignItems: 'center'}}>
											<img src={FaceIcon} alt="googlesns" width="40" height="40"></img>
											&nbsp;&nbsp;&nbsp;<span>페이스북</span>
										</GridItem>
										<GridItem  style={{display:'flex', alignItems: 'center',justifyContent:'end',fontSize:'14px' }} height="40">
										{facebook?  `마지막 접속 일자 : ${facebook}`: '등록되지 않음'}
											<Switch
											id = 'facebook'
											checked={facebook? true : false}
											onChange={(event) => handleLink(event)}
											inputProps={{'aia-label':'checkbox'}}
											/>
										</GridItem>
									</GridContainer>
									<GridContainer   style={{width:'100%', margin:'auto', justifyContent:'space-between',alignItems: 'center' ,fontSize:'14px'}}>
										<GridItem xs={4}style={{display:'flex', alignItems: 'center'}}>
											<img src={GoogleIcon} alt="googlesns" width="40" height="40"></img>
											&nbsp;&nbsp;&nbsp;<span>구글</span>
										</GridItem>
										<GridItem style={{display:'flex', alignItems: 'center',justifyContent:'end',fontSize:'14px' }} height="40">
										{google?  `마지막 접속 일자 : ${google}`: '등록되지 않음'}
											<Switch
											id='google'
											checked={google? true : false}
											onChange={(event) => handleLink(event)}
											inputProps={{'aia-label':'checkbox'}}
											/>
										</GridItem>
									</GridContainer>
							</div>
							}
						
						]}
						/>
						





					{/* {//socialUse &&
					(kakao||naver||facebook||google)?
					<Card style={{paddingTop:'25px',marginTop:'0',paddingLeft:'10px',paddingRight:'10px',marginBottom:'0'}}>
					{kakao?
					<GridContainer>
						<GridItem xs={12} sm={12} md={4}>
							<CustomInput
								labelText="Social Name"
								id="kakao"
								formControlProps={{
									style:{paddingTop:'0'},
									fullWidth: true,
								}}
								labelProps={{
									style:{top:'-17px'},
								}}
								inputProps={{disabled: true,value:"KAKAO"}}
							/>
						</GridItem>
						<GridItem xs={12} sm={8} md={8}>
							<CustomInput
								labelText="KAKAO 접속 일자"
								id="socaildate"
								labelProps={{
									style:{top:'-17px'},
								}}
								formControlProps={{
									style:{paddingTop:'0'},
									fullWidth: true,
								}}
								inputProps={{disabled: true,value:kakao}}
								/>
						</GridItem>
					</GridContainer>:null}
					{naver?
							<GridContainer>
								<GridItem xs={12} sm={12} md={4}>
									<CustomInput
										labelText="Social Name"
										id="naver"
										formControlProps={{
											style:{paddingTop:'0'},
											fullWidth: true,
										}}
										labelProps={{
											style:{top:'-17px'},
										}}
										inputProps={{disabled: true,value:"NAVER"}}
									/>
								</GridItem>
								<GridItem xs={12} sm={8} md={8}>
									<CustomInput
										labelText="NAVER 접속 일자"
										id="socaildate2"
										labelProps={{
											style:{top:'-17px'},
										}}
										formControlProps={{
											style:{paddingTop:'0'},
											fullWidth: true,
										}}
										inputProps={{disabled: true,value:naver}}
										/>
								</GridItem>
							</GridContainer>:null}
					{facebook?
							<GridContainer>
								<GridItem xs={12} sm={12} md={4}>
									<CustomInput
										labelText="Social Name"
										id="facebook"
										formControlProps={{
											style:{paddingTop:'0'},
											fullWidth: true,
										}}
										labelProps={{
											style:{top:'-17px'},
										}}
										inputProps={{disabled: true,value:"FACEBOOK"}}
									/>
								</GridItem>
								<GridItem xs={12} sm={8} md={8}>
									<CustomInput
										labelText="FACEBOOK 접속 일자"
										id="socaildate3"
										labelProps={{
											style:{top:'-17px'},
										}}
										formControlProps={{
											style:{paddingTop:'0'},
											fullWidth: true,
										}}
										inputProps={{disabled: true,value:facebook}}
										/>
								</GridItem>
							</GridContainer>:null}
					{google? 
							<GridContainer>
								<GridItem xs={12} sm={12} md={4}>
									<CustomInput
										labelText="Social Name"
										id="google"
										formControlProps={{
											style:{paddingTop:'0'},
											fullWidth: true,
										}}
										labelProps={{
											style:{top:'-17px'},
										}}
										inputProps={{disabled: true,value:"GOOGLE"}}
									/>
								</GridItem>
								<GridItem xs={12} sm={8} md={8}>
									<CustomInput
										labelText="GOOGLE 접속 일자"
										id="socaildate4"
										labelProps={{
											style:{top:'-17px'},
										}}
										formControlProps={{
											style:{paddingTop:'0'},
											fullWidth: true,
										}}
										inputProps={{disabled: true,value:google}}
										/>
								</GridItem>
							</GridContainer>:null}
					</Card>:null} */}
				
				</CardBody>
				{/* <CardFooter>
				<Button color="primary" onClick={onSubmit}>Update Profile</Button>
				</CardFooter> */}
			</Card>
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={klnet} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>KL-NET</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem> */}
   {/* </GridContainer> */}
   		<Dialog
            open={dialogOpen}
            onClose={dialogClose}
			>
            <DialogContent>
                <DialogContentText>
                 계정 연동을 위해 페이지 이동을 하시겠습니까?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={dialogClose} color="primary">
                    취소
                </Button>
                <Button autoFocus onClick= {()=>window.location.href=url} color="primary">
                    확인
                </Button>
            </DialogActions>
        </Dialog>

		<Dialog
            open={changePW}
            onClose={()=>setChangePW(false)}
			>
            <DialogContent>
			<div>
				<div style={{textAlignLast:'center'}}><LockOpenOutlined style={{marginTop:'20px',marginBottom:'10px',width:'64px',height:'64px'}}/></div>
				<div style={{textAlignLast:'center'}}>
				<font size="3" style={{fontWeight:'bold'}}>비밀번호 변경</font><br/><font size="2" style={{color:'silver'}}>비밀번호는 영문,숫자,특수문자등 2종류 이상 문자를 조합하여<br/> 최소 8~15자 입력해주세요.</font></div>
				<GridItem xs={12} sm={12}>
					<CustomInput
						labelText={
							<span>
							<font size="2">현재 비밀번호</font>
							</span>
						}
						id="currentPW"
						formControlProps={{
							fullWidth: true, variant:'outlined',size:'small',style:{marginTop:'15px',marginBottom:'15px'}
						}}
						inputProps={{
							onChange:e=>setCurrentPW(e.target.value),
							type: "password",
							labelWidth:110,
							autoComplete: "off",
						}}   
					/>
				</GridItem>
	      		<GridItem xs={12} sm={12}>
					<CustomInput
					labelText={
						<span>
						<font size="2">새 비밀번호</font><small>(required)</small>
						</span>
					}
					id="password"
					labelProps={{style:{top:'0'}}}
					formControlProps={{
						fullWidth: true, variant:'outlined',size:'small',error:passwordCheck,style:{marginTop:'3px'}
					}}
					helperText="8자 이상의 숫자/영문(대문자)/특수문자를 포함해야 합니다."
					inputProps={{
						onChange: event => change(event.target.value.toUpperCase(), "password"),
						type: "password",
						autoComplete: "off",
						labelWidth:130
					}}
					/>
					<CustomInput
					labelText={
						<span>
						<font size="2">새 비밀번호 확인</font> <small>(required)</small>
						</span>
					}
					id="passwordConfirm"
					labelProps={{style:{top:'0'}}}
					formControlProps={{
						fullWidth: true,variant:'outlined',size:'small',error:repasswordCheck, style:{marginTop:'3px'}
					}}
					helperText={repasswordCheck?"비밀번호가 일치하지 않습니다.":" "}
					inputProps={{
						onBlur: event => change(event.target.value.toUpperCase(), "passwordConfirm"),
						type: "password",
						autoComplete: "off",
						labelWidth:160
					}}
					/> 
				</GridItem>
				<DialogActions style={{textAlign:'center'}}>
					<Button color="primary" onClick={updatePwHandler}>변경</Button>
					<Button color="primary" onClick={()=>setChangePW(false)} >취소</Button>
				</DialogActions>
			</div>
			</DialogContent>            
        </Dialog>
		<Snackbar open={alertOpen} autoHideDuration={2500} onClose={handleAlertClose}>
		<Alert 
			onClose={handleAlertClose}
			severity={severity}>
				{errMessage}
		</Alert>
	</Snackbar>
    </>
  );
}
