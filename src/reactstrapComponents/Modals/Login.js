/*eslint-disable*/
import React from "react";
// reactstrap components
import {
  Button,
  FormGroup,
  Modal,
  Input,
  Row,Col,Form,FormFeedback
} from "reactstrap";
import axios from 'axios';
import { Link } from "react-router-dom";

function LoginPage(props) {
  //console.log("login props :",props);
  // modals states
  
  // carousel states and functions

  //const [animating, setAnimating] = React.useState(false);
  //const [classic, setClassic] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  //const [checkIdMsg, setCheckIdMsg] = React.useState("");
  const host = window.location.hostname;
  let klnetUrl = '';
  let redirectUrl='';
  if( host.indexOf('localhost') >= 0 ){
    klnetUrl = 'http://localhost:5002/oauth/authorize2';
    redirectUrl='http://localhost:5000/auth/local/callback';
	} else {
		klnetUrl = '/oauth/authorize2';
    redirectUrl='/auth/local/callback';
	}

  React.useEffect(() => {
	  setEmail("");setPassword("");
  },[props.openLogin]);
/*  React.useEffect(() => {
	 if(props.setLogin) {
		 axios.post("/auth/logout");
	 }
  },[props.setLogin]);*/
  
  /*const onSubmit =() => {
	  var frm = document.forms[0];

  if(email !== '' && password !== '') {
	  
	  console.log(">>>>> ok");
	  frm.submit();
  } else {
	   if(frm.id.value === '') {
		  props.onAlert("error","아이디는 필수 입력값 입니다.");
	   } else {
		   props.onAlert("error","비밀번호는 필수 입력값 입니다.");
	   }
	   
  }
  }*/
  
  const fncOnKeyPress = (e) => {

	  if("Enter" === e.key && (email !== undefined && password !== undefined) ) {
		  onSubmit();
		  //document.forms[0].submit();
		}
  }
  


  const login = (e) => {
    e.preventDefault();

    axios.post("/auth/login", {id : email, password : password,})
    .then(res => {
        store.setting(res.data.token, res.data.user);
    })
    .catch(err => {
        console.log(err);
    })

  }

  const logout = (e) => {
    e.preventDefault();
    store.logout();
  }
  
  const onSubmit=(event)=> {

	  if(event) {
		  event.preventDefault();
	  }
	  if(email && password && !emailError) {
			  document.loginForm.submit();
		  } else {
			 if(!email) {
				 setEmailError(true);
			 } 
			 if (!password) {
				 setPasswordError(true);
			 }
		  }
  }
  
  const onCheckedID = (e) => {
	  if(!props.validation.validationHanSpc(e.target.value)) {
		  // setEmail(e.target.value);
      setEmail(e.target.value.toUpperCase())
		  setEmailError(true);
	  } else {
		  // setEmail(e.target.value);
      setEmail(e.target.value.toUpperCase())
		  setEmailError(e.target.value?false:true);
	  }
  }
  const onKeyUp = (event)=>{
    var capitalizeID = event.target.value.toUpperCase();
    document.getElementById('id').value=capitalizeID;
  }
  return (
    <>
      <Modal
              isOpen={props.openLogin}
              toggle={() => props.setOpenLogin(false)}
              className="modal-login" autoFocus={false}>
              <div className="modal-header no-border-header text-center">
                <button
                  className="close"
                  type="button"
                  onClick={() => props.setOpenLogin(false)}
                >
                  <span>×</span>
                </button>
                <h6 className="text-muted">Welcome</h6>
                <h3 className="modal-title text-center">WEIDONG FERRY</h3>
                <p>Log in to your account</p>
              </div>
              <div className="modal-body">
                
              <Form name="loginForm" action={klnetUrl} method="POST" onSubmit={onSubmit}>
                    {/* <Form name="loginForm" action="http://localhost:5002/oauth/authorize2" method="POST" onSubmit={onSubmit}> */}
                    {/*서버 반영 시 <Form name="loginForm" action="/oauth/authorize2" method="POST" onSubmit={onSubmit}>*/}
                    <input type='hidden' name='client_id' value='bWFtbWEgTTAwMDAwMA=='></input>
                    <input type='hidden' name='redirect_uri' value={redirectUrl}></input>
                    {/* <input type='hidden' name='redirect_uri' value='http://localhost:5000/auth/local/callback'></input> */}
                    {/* 서버 반영 시  <input type='hidden' name='redirect_uri' value='/auth/local/callback'></input>*/}
                    <input type='hidden' name='response_type' value='code'></input>
                    <input type='hidden' name='state' value='12345'></input>
                <FormGroup>
                  <label>ID</label>
                  <Input id="id" name="id" placeholder="" type="text" invalid={emailError} value={email} onChange={(e)=>onCheckedID(e)}  
                  // onKeyUp={onKeyUp}
                  autoFocus/>
                  <FormFeedback>{props.validation.REQ_MSG+props.validation.NO_CHECK_MSG}</FormFeedback>
                </FormGroup>
                <FormGroup className="mb-2">
                  <label>Password</label>
                  <Input id="pw" name="pw" invalid={passwordError}
                    placeholder=""
                    type="password"
                    onChange={(e)=>{setPassword(e.target.value.toUpperCase());setPasswordError(e.target.value.toUpperCase()?false:true)}}
                    onKeyPress ={(e)=>fncOnKeyPress(e)}
                    value={password}
                  />
                  <FormFeedback>{props.validation.REQ_MSG}</FormFeedback>
                </FormGroup>
                {props.setLogin?<label className="text-danger text-center">사용자 인증 시간이 만료 되었습니다.다시 로그인 해주세요.</label>:<div className="mb-3" />}
                {props.errcode?<label className="text-danger text-center">{props.errcode ==='E1001'?props.validation.E1001:props.validation.E1002}</label>:<div className="mb-3" />}
                
                <Button block className="btn-round" color="default"  type="submit">
                  Log in
                </Button>
                </Form>
            </div>
            <div className="modal-body">
              <Row>
                <Col>
                    <Row>
                      <Col xl="7" sm="7" md="7" lg="7" xl="7">
                        <Link to={{pathname:'/account'}} style={{color:'black'}}>Forgot Account?</Link>
                      </Col>
                      <Col xl="5" sm="5" md="5" lg="5" xl="5" className="text-right">
                        <span style={{cursor:'pointer'}} onClick={()=> props.setOpenRegister()}><i className="fa fa-user-plus"/>Create Account</span>
                      </Col>
                    </Row>
                </Col>
              </Row>
            </div>
      </Modal>
    </>
  );
}

export default LoginPage;