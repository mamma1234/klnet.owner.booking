import React,{useEffect,useState} from "react";
import { Row,Col,Card, Button, CardBody, Input, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Tooltip, UncontrolledTooltip, Modal} from "reactstrap";
import CardTitle from "reactstrap/lib/CardTitle";
import WeidongNavbar from "components/Navbars/WeidongNavbar.js";
import FooterWeidong from "components/Footers/FooterWeidong.js";
import * as validation from 'components/common/validation.js';
import AlertWindow from "components/Alert/AlertMessage.js";
import axios from "axios";
import { //Link, useLocation, 
    useHistory } from "react-router-dom";
export default function PwChange(props) {
    const history = useHistory()
    document.documentElement.classList.remove("nav-open");
    // function that is being called on scroll of the page
    const checkScroll = () => {
      // it takes all the elements that have the .add-animation class on them
      const componentPosition = document.getElementsByClassName("add-animation");
      const scrollPosition = window.pageYOffset;
      for (var i = 0; i < componentPosition.length; i++) {
        var rec = componentPosition[i].getBoundingClientRect().top + window.scrollY + 100;
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
    // const [user, setUser] = useState(props.user);
    const {user, setUser} = props;
    const [password,setPassword] = useState("");

    const [firstPassword, setFirstPassword] = useState("");
    const [firstPasswordState, setFirstPasswordState] = useState(true);
    const [firstPasswordMessage, setFirstPasswordMessage] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const [secondPasswordState, setSecondPasswordState] = useState(true);
    const [secondPasswordMessage, setSecondPasswordMessage] = useState("");
    const [message, setMessage] = useState("")//Alert Message
    const [alertOpen, setAlertOpen] = useState(false)//Alert Open State
    const [alertColor, setAlertColor] = useState("success");
    const [ConfirmOpen,setConfirmOpen] = useState(false);
    // useEffect(()=> {
    //     setUser(props.user)
    // },[props])
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
        if(firstPassword.length === 0) {
            setFirstPasswordState(true);
            setFirstPasswordMessage("");
        }else {
            if(firstPassword.length < 8 ) {
                setFirstPasswordState(false);
                setFirstPasswordMessage("비밀번호는 8자 이상으로 입력해주세요.");
            }else {
                if(validation.verifyPassword(firstPassword)) {
                    setFirstPasswordState(true);
                    setFirstPasswordMessage("");
                }else {
                    setFirstPasswordMessage("8자 이상의 숫자/대문자/소문자/특수문자를 포함해야 합니다.");
                    setFirstPasswordState(false);
                }
            }
        }
    },[firstPassword])

    const onConfirmPassword = (value) => {
        setSecondPassword(value);
        if(value.length === 0) {
            setSecondPasswordState(true);
            setSecondPasswordMessage("");
        }else {
            if(firstPassword === value) {
                setSecondPasswordMessage("");
                setSecondPasswordState(true);
            }else {
                setSecondPasswordMessage("비밀번호 가 일치하지않습니다.");
                setSecondPasswordState(false);
            }
        }

    }
    
    useEffect(()=> {
        if((firstPassword.length !==0) && (secondPassword.length !== 0)){
            if(firstPassword === secondPassword) {
                setSecondPasswordMessage("");
                setSecondPasswordState(true);
            }else {
                setSecondPasswordMessage("비밀번호 가 일치하지않습니다.");
                setSecondPasswordState(false);
            }
        }

    },[firstPassword,secondPassword])

    const AlertMessage = (message,icon) => {
        setAlertOpen(true);
        setMessage(message);
        setAlertColor(icon)
    }
    const onsubmit = () => {
        if(password.length===0) {
            AlertMessage("현재 비밀번호를 입력해주세요.","danger");
            return;
        }
        if(firstPassword.length===0) {
            AlertMessage("변경하실 비밀번호를 입력해주세요.","danger");
            return;
        }
        if(secondPassword.length===0) {
            AlertMessage("새 비밀번호를 입력해주세요.","danger");
            return;
        }
        if(!firstPasswordState) {
            AlertMessage("해당 비밀번호는 안전하지 않습니다.","danger");
            return;
        }
        if(!secondPasswordState) {
            AlertMessage("비밀번호가 일치하지 않습니다. 변경할 비밀번호를 확인해주세요.","danger");
            return;
        }
        if(user){
            axios.post('/auth/changepassword',{user:user.user_no,pw:password, changepw:firstPassword}).then(
                res=> {
                    console.log(res)
                    if(res.status=="200"&&res.data.status =='success'){
                        // AlertMessage(res.data.msg,res.data.status);
                        setConfirmOpen(true);
                    }else{
                        AlertMessage(res.data.msg,"danger");
                    }
                }
            )
        }
    }
    const handleClose = () => {
        setAlertOpen(false);
    }
    const onPwChangeSuccess  = (e) => {
        setConfirmOpen(false);
        props.logOut();
        setTimeout(history.push('/weidongIndex'),1000);
    }
    return(
        <div className="section section-white">
            <div className="bg-white page-header page-header-xss">
            </div>
            <WeidongNavbar {...props}  />
            <Col className="ml-auto mr-auto mt-3" xl="6" lg="6" md="6" sm="6" xs="6">
                <Row>
                    <Col>
                        <Card className="card-raised card-form-horizontal no-transition mb-4" id="card">
                            <CardTitle>
                                <Row>
                                    <Col>
                                        <Button color="link" id="back" onClick={()=>  history.push('/usersetting')}>
                                            <i className="fa fa-angle-left fa-2x"/>
                                            <UncontrolledTooltip placement="bottom" target="back">
                                                뒤로가기
                                            </UncontrolledTooltip>
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <span style={{fontSize:'20px',fontWeight:'bold'}}>비밀번호 변경</span>
                                    </Col>
                                </Row>
                            </CardTitle>
                            <CardBody>
                                <Col>
                                    <Row>
                                        <Col className="text-left pb-3">
                                            <ul>
                                                <li><span>비밀번호는 8자 이상의 숫자/대문자/소문자/특수문자를 포함해야 합니다.</span></li>
                                            </ul>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="text-left pb-3">
                                            <ul>
                                                <li><span>타 사이트에서 사용하였거나 쉬운 비밀번호가 아닌 비밀번호로 등록해주세요.</span></li>
                                            </ul>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="text-left pb-3">
                                            <ul>
                                                <li><span>비밀번호 변경은 3개월 이내로 변경하는 것이 안전합니다.</span></li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className="text-center">
                                    <Row>
                                        <Col>
                                            <FormGroup style={{ marginLeft:'5px', fontSize:'16px',fontWeight:'bold' }}>
                                            <label>현재 비밀번호</label>
                                            <Input 
                                                type="password"
                                                placeholder="현재 비밀번호"
                                                maxLength="16"
                                                value={password}
                                                onChange={(e)=>setPassword(e.target.value)}
                                                ></Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <FormGroup style={{ marginLeft:'5px', fontSize:'16px',fontWeight:'bold' }}>
                                                <Col className="text-center">
                                                    <label>변경할 비밀번호</label>
                                                </Col>
                                                <InputGroup>
                                                    <Input
                                                        id="passCheck"
                                                        type={"password"}
                                                        value={firstPassword}
                                                        maxLength="16"
                                                        onChange={(e)=>setFirstPassword(e.target.value)}
                                                        placeholder="새 비밀번호"/>
                                                    <Tooltip placement="top" target="passCheck" isOpen={!firstPasswordState}>
                                                        {firstPasswordMessage}
                                                    </Tooltip>
                                                    <InputGroupAddon addonType="append">
                                                        <InputGroupText>
                                                            {firstPassword.length!==0?(
                                                                <i className={firstPasswordState?"fa fa-check text-success":"fa fa-exclamation-triangle text-danger"}/>
                                                            ):null}
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                <InputGroup>
                                                    <Input
                                                        id="passConfirm"
                                                        type={"password"}
                                                        value={secondPassword}
                                                        onChange={(e)=>onConfirmPassword(e.target.value)}
                                                        placeholder="새 비밀번호 확인"/>
                                                        <Tooltip placement="top" target="passConfirm" isOpen={!secondPasswordState}>
                                                        {secondPasswordMessage}
                                                    </Tooltip>
                                                    <InputGroupAddon addonType="append">
                                                        <InputGroupText>
                                                            {secondPassword.length!==0?(
                                                                <i className={secondPasswordState?"fa fa-check text-success":"fa fa-exclamation-triangle text-danger"}/>
                                                            ):null}
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                <label></label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Button color="primary" style={{minWidth:'100%'}} onClick={()=> onsubmit()}>확인</Button>
                                        
                                    </Row>
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Col>
            
            <FooterWeidong />
            <AlertWindow 
                message={message}
                isOpen={alertOpen}
                isClose={handleClose}
                // fontColor={"black"}   //선택사항
                alertColor={alertColor} //선택사항
                timeOut={2000} //선택사항
            ></AlertWindow>
            <Modal
                size="sm"
                isOpen={ConfirmOpen}
                // toggle={() => onPwChangeSuccess()}
                >
                
                <div className="modal-header no-border-header">
                    <button
                        className="close"
                        type="button"
                        onClick={(e) => onPwChangeSuccess(e)}
                    >×</button>
                </div>
                <div className="modal-body text-center pl-0 pr-0">
                    <div>
                    <span>{"비밀 번호가 변경되었습니다."}</span>
                    </div>
                    <div>
                    <span>{"변경된 비밀번호로 로그인 하세요."}</span>
                    </div>
                </div>
                <div className="modal-footer">
                    <Button className="btn-link" color="danger" type="button" onClick={(e)=> onPwChangeSuccess(e)}>확인</Button>
                </div>
            </Modal>  
        </div>
    )
}