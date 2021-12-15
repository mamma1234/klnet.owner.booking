/*eslint-disable*/
import React,{useState, useEffect} from "react";
// reactstrap components
import {
  Button,
  FormGroup,
  Modal,
  Input,Row,Col,Label, InputGroup,InputGroupAddon,InputGroupText,Tooltip,Card
} from "reactstrap";
import axios from 'axios'
import { Link } from "react-router-dom";
import TermsOfService from "components/Modals/TermsOfService.js"
import PrivacyPolicy from "components/Modals/PrivacyPolicy.js"
import AlertModal from 'components/Modals/Alert.js';
import CardBody from "reactstrap/lib/CardBody";
import CardFooter from "reactstrap/lib/CardFooter";
import * as validation from 'components/common/validation.js';




export default function RegisterPage(props) {
  // carousel states and functions
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [idDupCheckMessage,setIdDupCheckMessage] = useState("");
  const [idDupCheckState,setIdDupCheckState] = useState(false);
  const [firstPass, setFirstPass] = useState("");
  const [firstPassColor, setFirstPassColor] = useState(false);
  const [secondPass, setSecondPass] = useState("");
  const [secondPassColor, setSecondPassColor] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [email,setEmail] = useState("");
  const [emailState, setEmailState]= useState("");
  const [message, setMessage] = useState("")//Alert Message
  const [alertOpen, setAlertOpen] = useState(false)//Alert Open State
  const [viewPw, setViewPw] =useState(true);
  const [pwCheck,setPwCheck] = useState(false);
  const [term, setTerm] = useState(false);
  const [valueTerm, setValueTerm] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [valuePrivacy, setValuePrivacy] = useState(false);
  const [ConfirmOpen, setConFirmOpen] = useState(false);
  const [phoneCheck, setPhoneCheck] = useState(false);
  const [successUser, setSuccessUser] = useState(false);
  const [failUser, setFailUser] = useState(false);
  const [userName,setUserName] = useState("");
  const [phoneNum,setPhoneNum] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [gender, setGender] = useState("");
  const [certifyStatus, setCertifyStatus] = useState(false);//본인인증 완료여부
  useEffect(()=> {
    if(pwConfirm.length > 0){
      if(pw===pwConfirm) {
        
        setSecondPass('');
        setSecondPassColor(false);
        setPwCheck(true)

      }else {
        setPwCheck(false)
        setSecondPass('비밀번호가 일치하지 않습니다.');
        setSecondPassColor(true)
      }
    }else {
      setPwCheck(false);
      setSecondPass('');
      setSecondPassColor(true)
    }

  },[pwConfirm]);
  useEffect(()=> {
    if(pw===pwConfirm) {
      setSecondPass('');
      setSecondPassColor(false);
      setPwCheck(true);
    }else {
      if(pwConfirm.length >0) {
        setPwCheck(false)
        setSecondPass('비밀번호가 일치하지 않습니다.');
        setSecondPassColor(true);
      }
    }

    if(validation.verifyPassword(pw)) {

      setFirstPass("");
      setFirstPassColor(false);
    }else {
      if(pw.length===0){
        setFirstPass("");
        setFirstPassColor(false);
      }else {
        setFirstPass("8자 이상의 숫자/영문(대문자)/특수문자를 포함해야 합니다.");
        setFirstPassColor(true);
      }
    }
  },[pw])
  const AlertMessage = (message) => {
    setAlertOpen(true);
    setMessage(message);
  }
  const onChangeIdBlur =(id) => {
    if(!idDupCheckState){
      setIdDupCheckMessage("");
    }
  }
  const onChangeId = (value) => {
    value=value.toUpperCase();
    // console.log(value)
    if(value.length===0){
        setIdDupCheckMessage("");
        setIdDupCheckState(true);
    }else {
      if(value.length < 5 ||value.length>12) {
        setIdDupCheckState(true);
        setIdDupCheckMessage("ID 5자 이상 12자 이하로 입력해주세요.");
      }else {
        if(validation.checkSpace(value)) {
          setIdDupCheckState(true);
          setIdDupCheckMessage("ID에 공백문자는 입력 하실 수 없습니다.");
          return;
        } 
        if(!validation.validationNo(value)) {
          setIdDupCheckState(true);
          // setIdDupCheckMessage("ID는 대/소 영문자 및 숫자 조합으로만 입력하실 수 있습니다.");
          setIdDupCheckMessage("ID는 영문(대문자) 및 숫자 조합으로만 입력하실 수 있습니다.");
          return;
        }
        
        if(value.toUpperCase() === "admin".toUpperCase()) {
          setIdDupCheckState(true);
          setIdDupCheckMessage("ID를 ADMIN으로 입력 하실 수 없습니다.");
          return;
        }
        
        if(value.length>0){
          axios ({
            url:'/auth/dupcheck',
            method:'POST',
            data: {id:value}
          }).then(res=>{
            if(res.status===200){
              console.log(res.data)
              if(res.data==="OK"){
                setIdDupCheckState(false)
                setIdDupCheckMessage("가입 하실 수 있는 ID입니다.");
              }else {
                setIdDupCheckState(true);
                setIdDupCheckMessage("이미 등록된 아이디 입니다.");
              }
            }else {
              setIdDupCheckMessage("잠시 후 다시 시도해 주세요.");
              setIdDupCheckState(true)
            }
            })
          .catch(err => {
            setIdDupCheckState(true);
          });
        }
      }
    }
    setId(value);
    
   
  }
  useEffect(()=> {
    if(phoneNum.length > 0) {
      axios.post("/auth/dupcheckPhone",{num:phoneNum}).then(
        res=> {
          console.log('phonCHECK>>>>>>>>>>>>>',res.status,res.data)
          if(res.status===200) {
            if(res.data==="OK") {
              setPhoneCheck(false);
            }else {
              setPhoneCheck(true);
            }
          }else {
            setPhoneCheck(true);
          }
          
        }
      )
    }
  },[phoneNum])
  const onChangeEmail = (value) => {

    if(value.length===0){
      setEmailState("");
      setEmailCheck(true);
    }else {
      
      if(validation.validationEmail(value)){
        axios ({
          url:'/auth/dupcheckMail',
          method:'POST',
          data: {mail:value.toUpperCase()}
        }).then(res=>{
          if(res.status===200){
            if(res.data==="OK"){
              setEmailCheck(false)
              setEmailState("");
            }else {
              setEmailCheck(true);
              setEmailState("이미 등록된 이메일 입니다.");
            }
          }else {
            setEmailCheck("잠시 후 다시 시도해 주세요.");
            setEmailState(true)
          }
          })
        .catch(err => {
          setEmailCheck(true);
        });
       }else {
        setEmailCheck(true);
        setEmailState("이메일 형식에 맞지 않습니다.")
       }
    }
    setEmail(value.toUpperCase());
  }


  const onTerm = (value) => {
    setValueTerm(value)
  }
  const onPrivacy =(value) => {
    setValuePrivacy(value);
  }
  const Serti =() => {

	  return axios ({
			url:'/auth/sertify_weidong',
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
			AlertMessage(String(err));
		});
  }


  const onsubmit = () => {
    if(id.length===0) {
      AlertMessage("ID가 입력 되지 않았습니다.");
      return;
    }
    if(idDupCheckState) {
      AlertMessage("이미 사용중인 ID 입니다.");
      return;
    }
    if(pw.length===0){
      AlertMessage("비밀번호 가 입력 되지 않았습니다.");
      return;
    }
    if(firstPassColor) {
      AlertMessage("8자 이상의 숫자/영문(대문자)/특수문자를 포함해야 합니다.");
      return;
    }
    if(pwConfirm.length===0) {
      AlertMessage("비밀번호 확인 이 입력 되지 않았습니다.");
      return;
    }
    if(!pwCheck) {
      AlertMessage("비밀번호 가 일치하지 않습니다.");
      return;
    }
    if(email.length===0) {
      AlertMessage("이메일은 필수 입력 입니다.");
      return;
    }
    if(emailCheck) {
      AlertMessage("이메일이 형식에 맞지 않습니다.");
      return;
    }
    if(!valueTerm) {
      AlertMessage("서비스 이용약관에 동의 해야합니다.");
      return;
    }
    if(!valuePrivacy) {
      AlertMessage("개인정보처리방침에 동의 해야합니다.");
      return;
    }
    /****반영시 주석풀기  */
    if(!certifyStatus) {
      AlertMessage("사용자 본인 인증이 완료 되지 않았습니다.");
      return;
    }
    if(phoneCheck) {
      AlertMessage("이미 가입된 이력이 존재합니다.");
      return;
    }
    setConFirmOpen(true);
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
		  AlertMessage("document.kcbResultForm.RSLT_MSG.value \n error: 사용자 본인 인증에 실패 하였습니다. 다시 시도해주세요.");
	  }
  }
  const onCreateUser = () => {
      axios ({
        url:'/auth/join',
        method:'POST',
        data: {
            status:'klnet',
            provider:'local',
            id:id, 
            password:pw,

            /***테스트 개발 */
            // kname:'테스트',//userName,
            // phone:'01011112222',//phoneNum, 
            // email:email,
            // gender:'F',//gender,
            // birthDay:'20210101',//birthDay,
            // kakaoid:'', tokenkakao:'',naverid:'',tokennaver:'',faceid:'',tokenface:'',googleid:'',tokengoogle:'',linkyn:'N'

             //수정     /****반영시 주석풀기  */
            kname:userName,
            phone:phoneNum, 
            email:email.toUpperCase(),
            gender:gender,
            birthDay:birthDay,

            //기존
            // name:userName,
            // phone:phoneNum,
            // email:email,
            // gender:gender,
            // birthDay:birthDay,
            // kakaoid:'',
            // tokenkakao:'',naverid:'',tokennaver:'',faceid:'',tokenface:'',googleid:'',tokengoogle:'',linkyn:'N'

          }
      }).then(res=>{
        // alert(res)
        if(res.statusText==="OK") {
          setSuccessUser(true);
        }else {
          setFailUser(true);
          handleClose();
        }
                    
      }).catch(err => {
        console.log(err);
        setFailUser(true);
        handleClose();
        setConFirmOpen(false);
      })
  }



  const reset = () => {
    setId("");
    setPw("");
    setPwConfirm("");
    setIdDupCheckMessage("");
    setIdDupCheckState(false);
    setFirstPass("");
    setFirstPassColor(false);
    setSecondPass("");
    setSecondPassColor(false);
    setEmailCheck(false);
    setEmail("");
    setEmailState("");
    setMessage("")//Alert Message
    setAlertOpen(false)//Alert Open State
    setViewPw(true);
    setPwCheck(false);
    setTerm(false);
    setValueTerm(false);
    setPrivacy(false);
    setValuePrivacy(false);
    setConFirmOpen(false);
    setSuccessUser(false);
    setFailUser(false);
    setUserName("");
    setPhoneNum("");
    setBirthDay("");
    setGender("");
    setPhoneCheck(false);
    setCertifyStatus(false);//본인인증 완료여부
  }
  const handleClose = () => {
    reset()
    props.setOpenRegister(false);
  }
  const onKeyUp = (event)=>{
    var capitalizeID = event.target.value.toUpperCase();
    document.getElementById('idGroup').value=capitalizeID;
  }
  return (
    <>
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
            <input type="hidden" name="RSLT_BIRTHDAY" />
            <input type="hidden" name="RSLT_SEX_CD" />
          </form>  	
        <Modal
          isOpen={props.openRegister}
          toggle={() => handleClose()}
          className="modal-register">
          <div className="modal-header no-border-header text-center">
            <button
              className="close"
              type="button"
              onClick={() => handleClose()}
            >×
            </button>
            <h3 className="modal-title">CREATE ACCOUNT</h3>
          </div>
          <div className="modal-body">
          <Col>
            <Row>
              <Col xs="12" xl="12" lg="12" md="12" sm="12">
                <InputGroup >
                  <Input
                    id="idGroup"
                    type="text" 
                    maxLength="50"
                    placeholder="ID"
                    autoComplete="off"
                    onChange={(e)=>onChangeId(e.target.value)} 
                    onBlur={(e)=>onChangeIdBlur(e.target.value)}
                    value={id}
                    // onKeyUp={onKeyUp}
                    />
                     <InputGroupAddon addonType="append">
                    <InputGroupText>
                      {id.length > 0 &&<i className={idDupCheckState===false?"fa fa-check text-success":"fa fa-exclamation-triangle text-danger"} />}
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <label className={idDupCheckState===false?"text-success":"text-danger"}>{idDupCheckMessage}</label>
              </Col>
            </Row>
            <Row>
              <Col xs="12" xl="12" lg="12" md="12" sm="12">
                <InputGroup >
                  <Input
                    id="pwGroup"
                    type={viewPw?"password":"text"}
                    value={pw}
                    maxLength="16"
                    placeholder="비밀번호"
                    onChange={(e)=>setPw(e.target.value.toUpperCase())}/>
                  <InputGroupAddon addonType="append">
                    <InputGroupText style={{padding:'0'}}>
                      <Button style={{textAlignLast:'right'}} size="sm" color="link" onClick={()=>setViewPw(!viewPw)}><i className={viewPw?"fa fa-eye-slash":"fa fa-eye"}/></Button>
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <label className={firstPassColor===false?"text-success":"text-danger"}>{firstPass}</label>
              </Col>
              <Col xs="12" xl="12" lg="12" md="12" sm="12">
                <InputGroup >
                  <Input
                    id="pwCheck"
                    type={viewPw?"password":"text"}
                    value={pwConfirm}
                    maxLength="16"
                    onChange={(e)=>setPwConfirm(e.target.value.toUpperCase())}
                    placeholder="비밀번호 확인"/>
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      {pwConfirm.length > 0 &&<i className={pwCheck===true?"fa fa-check text-success":"fa fa-exclamation-triangle text-danger"} />}
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <label className={secondPassColor===false?"text-success":"text-danger"}>{secondPass}</label>
              </Col>
              <Col xs="12" xl="12" lg="12" md="12" sm="12">
                <InputGroup >
                  <Input
                    id="emailCheck"
                    type="text"
                    maxLength="50"
                    onChange={(e)=>onChangeEmail(e.target.value.toUpperCase())}
                    value={email}
                    autoComplete="off"
                    placeholder="이메일"/>
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        {email.length > 0 && <i className={emailCheck===false?"fa fa-check text-success":"fa fa-exclamation-triangle text-danger"} />}
                      </InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
                <label className={emailCheck===false?"text-success":"text-danger"}>{emailState}</label>
              </Col>
              {certifyStatus===false?(
                <Col xs="12" xl="12" lg="12" md="12" sm="12">
                  <Button style={{width:'100%'}} onClick ={() => Serti()}><i className="fa fa-address-card"/>본인인증</Button>
                </Col>
              ):(
                <>
                {
                  phoneCheck===true?(
                    <>
                    <Col xs="12" xl="12" lg="12" md="12" sm="12" className="border-bottom">
                      <span style={{fontSize:'15px',fontWeight:'bold'}}>해당 번호로 가입된 이력이 존재합니다.</span>
                    </Col>
                    <Col xs="12" xl="12" lg="12" md="12" sm="12">
                      <Link to={{pathname:'/account'}}><Button style={{width:'100%'}}> ID 찾기</Button></Link>
                    </Col>
                    </>
                  ):(
                    <>
                    <Col xs="12" xl="12" lg="12" md="12" sm="12" className="border-bottom">
                      <span style={{fontSize:'15px',fontWeight:'bold'}}>본인 인증이 완료 되었습니다.</span>
                    </Col>
                    <Col xs="6" xl="6" lg="6" md="6" sm="6" className="pt-3">
                      <FormGroup>
                        <label>이름</label>
                        <Input
                          value={userName}
                          style={{readOnly:true}}
                        ></Input>
                        </FormGroup>
                    </Col>
                    <Col xs="6" xl="6" lg="6" md="6" sm="6" className="pt-3">
                      <FormGroup>
                        <label>HP</label>
                        <Input
                          value={phoneNum}
                          style={{readOnly:true}}
                        ></Input>
                        </FormGroup>
                    </Col>
                    <Col xs="6" xl="6" lg="6" md="6" sm="6" className="pt-3">
                      <FormGroup>
                        <label>생년월일</label>
                        <Input
                          value={birthDay}
                          style={{readOnly:true}}
                        ></Input>
                        </FormGroup>
                    </Col>
                    <Col xs="6" xl="6" lg="6" md="6" sm="6">
                      <Row style={{marginTop:'30%'}}>
                        <Col xs="6" xl="6" lg="6" md="6" sm="6">
                          <div className="form-check-radio">
                            <Label check>
                              <Input
                                checked={gender==="M"?true:false}
                                type="radio"
                              />
                              남 <span className="form-check-sign" />
                            </Label>
                          </div>
                        </Col>
                        <Col xs="6" xl="6" lg="6" md="6" sm="6">
                          <div className="form-check-radio">
                            <Label check>
                              <Input
                                checked={gender==="F"?true:false}
                                type="radio"
                              />
                              여 <span className="form-check-sign" />
                            </Label>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </>)}
                </>
              )}
              
              <Col xs="12" xl="12" lg="12" md="12" sm="12">
                <Row className="border-bottom pt-3">
                     <Col xl="6" sm="6" md="6" lg="6" xl="6" className="text-left"><span>서비스 이용 약관</span>
                  </Col>
                </Row>
                <Row>
                  <Col xl="12" sm="12" md="12" lg="12" xl="12">
                    <FormGroup className="mt-3" check>
                      <Label check>
                        <Input type="checkbox" checked={valueTerm} onChange={() => setTerm(true)}/><span className="form-check-sign" /><span>이용약관에 동의 합니다.(필수)</span>
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col xs="12" xl="12" lg="12" md="12" sm="12">
                <Row className="border-bottom pt-3">
                     <Col xl="6" sm="6" md="6" lg="6" xl="6" className="text-left"><span>개인정보처리방침</span>
                  </Col>
                </Row>
                <Row>
                  <Col xl="12" sm="12" md="12" lg="12" xl="12">
                    <FormGroup className="mt-3" check>
                      <Label check>
                        <Input type="checkbox" checked={valuePrivacy} onChange={() => setPrivacy(true)}/><span className="form-check-sign" /><span>개인정보 처리방침에 동의 합니다.(필수)</span>
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col xs="12" xl="12" lg="12" md="12" sm="12">
                <Row>
                  <Col xl="12" sm="12" md="12" lg="12" xl="12">
                    <Button color="success" style={{width:'100%'}} onClick={()=> onsubmit()}>가입 신청</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </div>
      </Modal>
      <Modal
        role="document"
        isOpen={term}
        toggle={()=> setTerm(!term)}>
          <TermsOfService clickTerm={(value)=> onTerm(value)} modalClose={() => setTerm(false)}/>
      </Modal>
      <Modal
        role="document"
        isOpen={privacy}
        toggle={()=> setPrivacy(!privacy)}>
          <PrivacyPolicy clickPrivacy={(value)=> onPrivacy(value)} modalClose={() => setPrivacy(false)}/>
      </Modal>
      <AlertModal 
        message={message}
        open={alertOpen}
        close={()=>setAlertOpen(false)}
        toggle={() => setAlertOpen(false)}
        fncOpenMessage={(e)=>setAlertOpen(e)}
        status ="error"/>
      <Modal
        size="sm"
        //toggle={() => setOpen(false)}
        isOpen={ConfirmOpen}>
        <div className="modal-header no-border-header">

        </div>
        <div className="modal-body text-center pl-2 pr-2">
          <h5>해당 정보로 가입을 진행 하시겠습니까?</h5>
        </div>
        <div className="modal-footer">
          <div className="left-side">
            <Button className="btn-link" color="danger" type="button" onClick={()=> onCreateUser()}>Yes</Button>
          </div>
          <div className="divider" />
          <div className="right-side">
              <Button
              className="btn-link"
              color="default"
              type="button"
              onClick={() => setConFirmOpen(false)}>
              No
            </Button>
          </div>
        </div>
      </Modal>    
      <Modal
        size="lg"
        //toggle={() => setOpen(false)}
        // toggle={()=>setSuccessUser(!successUser)}
        isOpen={successUser}>
          <div className="card-raised card-form-horizontal no-transition card-profile">
            <img src={id.length%2===0?require("assets/img/welcome2.png"):require("assets/img/welcome.png")}/>
            <CardBody>
              {/* <h5 className="card-description">(대충 가입축하글)</h5> */}
              <Col className="text-center">
                <span>회원 가입이 완료 되었습니다. {userName}님의 아이디는</span>&nbsp;<span className="text-danger">{id}</span>&nbsp;<span>입니다.</span>
              </Col>
            </CardBody>
            <CardFooter className="text-center">
              <Link to={{pathname:`/weidongIndex`}}><Button className="mr-3" onClick={()=> {setSuccessUser(false);setConFirmOpen(false); handleClose();}}>메인 페이지로</Button></Link>
              <Button className="ml-3" onClick={() => {setSuccessUser(false);setConFirmOpen(false); handleClose();props.openLogin();}}>로그인</Button>
            </CardFooter>
          </div>
        
      </Modal>
      <Modal
        size="lg"
        //toggle={() => setOpen(false)}
        toggle={()=>setFailUser(!failUser)}
        isOpen={failUser}>
          <div className="card-raised card-form-horizontal no-transition card-profile">
            <CardBody>
              {/* <h5 className="card-description">(대충 가입축하글)</h5> */}
              <Col className="text-center">
                <span>회원 가입이 실패 하였습니다. 잠시 후 다시 시도해 주세요.</span>
              </Col>
            </CardBody>
            <CardFooter className="text-center">
              <Button onClick={()=>setFailUser(!failUser)}>닫기</Button>
            </CardFooter>
          </div>
        
      </Modal>    
    </>
  );
}
