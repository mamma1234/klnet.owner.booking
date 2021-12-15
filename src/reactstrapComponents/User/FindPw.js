import React,{useEffect,useState} from "react";
import { Row,Col,Card, CardBody, Input, Label, Button,UncontrolledTooltip,InputGroup,InputGroupAddon,InputGroupText,Tooltip} from "reactstrap";
import CardTitle from "reactstrap/lib/CardTitle";
import FooterWeidong from "components/Footers/FooterWeidong.js";
import * as validation from 'components/common/validation.js';
import AlertWindow from "components/Alert/AlertMessage.js";
import axios from "axios";
import { Link,useHistory } from "react-router-dom";

export default function FindId(props) {
    document.documentElement.classList.remove("nav-open");
    // function that is being called on scroll of the page
    const checkScroll = () => {
      // it takes all the elements that have the .add-animation class on them
      const componentPosition = document.getElementsByClassName("add-animation");
      const scrollPosition = window.pageYOffset;
      for (var i = 0; i < componentPosition.length; i++) {
        var rec =
          componentPosition[i].getBoundingClientRect().top + window.scrollY + 100;
        // when the element with the .add-animation is in the scroll view,
        // the .animated class gets added to it, so it creates a nice fade in animation
        if (scrollPosition + window.innerHeight >= rec) {
          componentPosition[i].classList.add("animated");
          // when the element with the .add-animation is not in the scroll view,
          // the .animated class gets removed from it, so it creates a nice fade out animation
        } else if (scrollPosition + window.innerHeight * 0.8 < rec) {
          componentPosition[i].classList.remove("animated");
        }
      }
    };
    const history = useHistory();
    const [message, setMessage] = useState("")//Alert Message
    const [alertOpen, setAlertOpen] = useState(false)//Alert Open State
    const [alertColor, setAlertColor] = useState("success");
    const [phoneNum, setPhoneNum] = useState("");// 본인인증 완료 후 휴대폰번호
    const [userName, setUserName] = useState("");// 본인인증 완료 후 이름
    const [birthDay, setBirthDay] = useState("");// 본인인증 완료 후 생년월일
    const [gender, setGender] = useState("");// 본인인증 완료 후 성별
    const [certifyStatus, setCertifyStatus] = useState(false); //본인인증 완료 여부
    const [viewPw, setViewPw] = useState(true)
    const [id,setId]=useState("")
    const [viewChange,setViewChange] = useState(false);
    const [pw, setPw] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");
    const [firstPasswordMessage, setFirstPasswordMessage] = useState("");
    const [firstPasswordState, setFirstPasswordState] = useState(true);
    const [secondPasswordState,setSecondPasswordState] = useState(true);
    const [secondPasswordMessage,setSecondPasswordMessage] = useState("");
    const [gubun, setGubun] = useState("")
    useEffect(() => {
        document.body.classList.add("sr-request-page");
        window.addEventListener("scroll", checkScroll);
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        
        return function cleanup() {
            document.body.classList.remove("sr-request-page");
            window.removeEventListener("scroll", checkScroll);
        };
    });
    useEffect(()=> {
        setGubun(props.location.state.gubun?props.location.state.gubun:"");
    },[]);
    useEffect(()=> {
        if(certifyStatus) {
            axios.post("/api/myAccoutFind",{id:id
                ,gubun:'pw'
                /****반영시 주석풀기  */
                ,phoneNum:phoneNum
                // ,birthDay:birthDay
                ,userName:userName
                // ,gender:gender

                /**TEST 개발 */
                // ,phoneNum:'01011112222'
                // ,birthDay:'20210101'
                // ,userName:'테스트'
                // ,gender:'F'
            }).then(
                res => {
                    console.log(res.data)
                    if(res.statusText==="OK"){
                        if(res.data.length>0) {
                            setViewChange(true);
                        }else {
                            AlertMessage("해당 아이디와 가입 정보가 불일치 합니다.");
                            setViewChange(false);
                        }
                    }else {
                        setViewChange(false);
                    }
                }
            )
        }
    },[certifyStatus])
    useEffect(()=> {
        if(pw.length === 0) {
            setFirstPasswordState(true);
            setFirstPasswordMessage("");
        }else {
            if(pw.length < 8 ) {
                setFirstPasswordState(false);
                setFirstPasswordMessage("비밀번호는 8자 이상으로 입력해주세요.");
            }else {
                if(validation.verifyPassword(pw)) {
                    setFirstPasswordState(true);
                    setFirstPasswordMessage("");
                }else {
                    setFirstPasswordMessage("변경할 비밀번호는 영문(대문자),숫자,특수문자(!@#$%^&*?_~) 조합, 8~12자리 입니다.");
                    setFirstPasswordState(false);
                }
            }
            if(pwConfirm.length>0) {
                if(pw !== pwConfirm) {
                    setSecondPasswordMessage("비밀번호 가 일치하지않습니다.");
                    setSecondPasswordState(false);
                }else {
                    setSecondPasswordMessage("");
                    setSecondPasswordState(true);
                }
            }
        }
        
    },[pw]);
    const onConfirmPassword = (value) => {
        setPwConfirm(value);
        if(value.length === 0) {
            setSecondPasswordState(true);
            setSecondPasswordMessage("");
        }else {
            if(pw === value) {
                setSecondPasswordMessage("");
                setSecondPasswordState(true);
            }else {
                setSecondPasswordMessage("비밀번호 가 일치하지않습니다.");
                setSecondPasswordState(false);
            }
        }

    }
    const AlertMessage = (message,icon) => {
        setAlertOpen(true);
        setMessage(message);
        setAlertColor(icon);
    }
    const handleClose = () => {
        setAlertOpen(false);
    }

    const Serti =() => {
        if(id.length===0) {
            AlertMessage("아이디를 입력해주세요.","danger");
            return;
        }
        axios.post("/api/selectId",{id:id}).then(
            res=>{
                // console.log(res.data)
                if(res.data > 0) {
                    // setCertifyStatus(true); //테스트용
                    /***********************반영시 주석풀기 */
                    return axios ({
                        url:'/auth/sertify_weidong',
                        method:'POST',
                        data: {}
                    }).then(res=>{ 
                        var form = document.form3;
                        window.open("", "auth_popup", "width=430,height=640,scrollbar=yes");	
                        form.target = "auth_popup";
                        form.tc.value="kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd";
                        form.action = "https://safe.ok-name.co.kr/CommonSvl";
                        form.method = "post";
                        form.cp_cd.value=res.data.CP_CD;
                        form.mdl_tkn.value=res.data.MDL_TKN;
                        form.submit();
                    
                    }
                    )
                    .catch(err => {
                        AlertMessage(String(err),"danger");
                    });
               
                }else {
                    AlertMessage("존재하지 않는 아이디입니다.","danger")
                }
            }
        )



        
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
            AlertMessage("document.kcbResultForm.RSLT_MSG.value \n error: 사용자 본인 인증에 실패 하였습니다. 다시 시도해주세요.",'error');
        }
    }
    const onSubmit = () => {
        if(pw.length===0) {
            AlertMessage("비밀번호가 입력 되지 않았습니다.","danger");
            return;
        }
        if(pw!==pwConfirm) {
            AlertMessage("두 비밀번호가 불일치 합니다.","danger");
            return;
        }
        if(!validation.verifyPassword(pw)) {
            AlertMessage("비밀번호가 형식에 맞지않습니다.","danger");
            return;
        }
        
        axios.post("/auth/findpw",{
            id:id,pw:pw
            // 반영시 주석풀기
            ,phoneNum:phoneNum,userName:userName
            // ,birthDay:birthDay,gender:gender       
        

            //test 개발
            // ,phoneNum:'01011112222'
            // ,birthDay:'20210101'
            // ,userName:'테스트'
            // ,gender:'F'
        
        }).then(
            res=> {
                if(res.statusText==="OK") {
                    if(res.data.code==="OK"){
                        AlertMessage("비밀번호 변경이 완료되었습니다. 메인화면에서 로그인 해주세요. ","success");
                        // history.push('/weidongIndex');
                        setTimeout(()=>{history.push('/weidongIndex');},2000)
                    }else {
                        AlertMessage("비밀번호를 변경하실 수 없습니다. ","danger");
                    }
                }else {
                    AlertMessage("비밀번호를 변경하실 수 없습니다. 잠시 후 다시 시도해 주세요.","danger");
                }
            }
        )
    }
    return(
        
        <div className="section section-white">
            <form name="form3">
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
            <div className="bg-white page-header page-header-xss">
            </div>
            <Col className="ml-auto mr-auto mt-3" xl="6" lg="7" md="8" sm="9" xs="10">
                <Row>
                    <Col>
                        <Card className="card-raised card-form-horizontal no-transition mb-4" id="card">
                            <CardTitle>
                                <Row>
                                    <Col className="ml-4">
                                        <Link to={{pathname:"/account"}}>
                                            <i id="back" className="fa fa-angle-left fa-2x"/>
                                            <UncontrolledTooltip placement="bottom" target="back">
                                                뒤로가기
                                            </UncontrolledTooltip>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    {gubun==="forget"&&
                                        <Col className="text-center">
                                            <span style={{fontSize:'1.5em',fontWeight:'bold'}}>{viewChange===false?"아이디 입력 후 본인인증을 진행 해주세요.":"변경하실 비밀번호를 입력 하세요."}</span>
                                        </Col>}
                                    {gubun==="lock"&&
                                        <>
                                        {viewChange===false?(
                                            <Col className="text-center">
                                                <span style={{fontSize:'1.5em',fontWeight:'bold'}}>{"아이디 입력 후 본인인증을 진행 해주세요."}</span>
                                            </Col>
                                        ):(
                                            <>
                                                <Col className="text-center">
                                                    <span style={{fontSize:'1.5em',fontWeight:'bold'}}>{"계정 잠금이 해제되었습니다."}</span>
                                                </Col>
                                                <Col className="text-center">
                                                    <span style={{fontSize:'1.5em',fontWeight:'bold'}}>{"새 비밀번호로 변경해주세요."}</span>
                                                </Col>
                                            </>
                                        )}
                                        </>
                                    }
                                </Row>
                            </CardTitle>
                            <CardBody className="pt-5">
                                {viewChange===false?(
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col className="text-left pb-3" xl="8" lg="8" md="8" sm="8" xs="8">
                                                <Input placeholder="ID" value={id} onChange={(e)=> setId(e.target.value.toUpperCase())}></Input>
                                            </Col>
                                            <Col className="" xl="4" lg="4" md="4" sm="4" xs="4">
                                                <Button color="primary" style={{minWidth:'100%'}} onClick={()=> Serti()}>본인인증</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>    
                                ):(
                                <Row>
                                    <Col xs="12" xl="12" lg="12" md="12" sm="12">
                                        <InputGroup >
                                        <Input
                                            id="pwGroup"
                                            type={viewPw?"password":"text"}
                                            value={pw}
                                            placeholder="비밀번호"
                                            onChange={(e)=>setPw(e.target.value.toUpperCase())}/>
                                        <Tooltip placement="top" target="pwGroup" isOpen={!firstPasswordState}>
                                            {firstPasswordMessage}
                                        </Tooltip>    
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText style={{padding:'0'}}>
                                            <Button style={{textAlignLast:'right'}} size="sm" color="link" onClick={()=>setViewPw(!viewPw)}><i className={viewPw?"fa fa-eye-slash":"fa fa-eye"}/></Button>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col xs="12" xl="12" lg="12" md="12" sm="12">
                                        <InputGroup >
                                        <Input
                                            id="pwCheck"
                                            type={viewPw?"password":"text"}
                                            value={pwConfirm}
                                            onChange={(e)=>onConfirmPassword(e.target.value.toUpperCase())}
                                            placeholder="비밀번호 확인"/>
                                        <Tooltip placement="top" target="pwCheck" isOpen={!secondPasswordState}>
                                            {secondPasswordMessage}
                                        </Tooltip>
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText>
                                            {pwConfirm.length > 0 && 
                                                <i className={secondPasswordState===true?"fa fa-check text-success":"fa fa-exclamation-triangle text-danger"} />}
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </Row>)}
                                {(pw.length > 0 && pwConfirm.length > 0 && firstPasswordState === true && secondPasswordState === true) &&
                                    <Row>
                                        <Col>
                                            <Button color="primary" style={{minWidth:'100%'}} onClick={()=> onSubmit()}>변경하기</Button>
                                        </Col>
                                    </Row>}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <div style={{position:'fixed',bottom:'0',width:'100%'}}>
            <FooterWeidong />
            </div>
            <AlertWindow 
                message={message}
                isOpen={alertOpen}
                isClose={handleClose}
                // fontColor={"black"}   //선택사항
                alertColor={alertColor} //선택사항
                timeOut={2000} //선택사항
            ></AlertWindow>
        </div>
    )
}