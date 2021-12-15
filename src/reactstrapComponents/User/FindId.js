import React,{useEffect,useState} from "react";
import { Row,Col,Card, CardBody, Input, Label, Button, Collapse, ListGroup, UncontrolledTooltip} from "reactstrap";
import CardTitle from "reactstrap/lib/CardTitle";
import FooterWeidong from "components/Footers/FooterWeidong.js";
import * as validation from 'components/common/validation.js';
import AlertWindow from "components/Alert/AlertMessage.js";
import axios from "axios";
import { Link } from "react-router-dom";
import ListGroupItem from "reactstrap/lib/ListGroupItem";
import moment from 'moment';
import Select from "react-select";

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
    const [message, setMessage] = useState("")//Alert Message
    const [alertOpen, setAlertOpen] = useState(false)//Alert Open State
    const [alertColor, setAlertColor] = useState("success");
    const [phoneAuth, setPhoneAuth] = useState(false); //휴대폰인증을 통한 아이디찾기 창 열기
    const [memberInfoAuth, setMemberInfoAuth] = useState(false); // 본인 정보를 통한 아이디찾기 창 열기
    const [phoneNum, setPhoneNum] = useState("");// 본인인증 완료 후 휴대폰번호
    const [userName, setUserName] = useState("");// 본인인증 완료 후 이름
    const [birthDay, setBirthDay] = useState("");// 본인인증 완료 후 생년월일
    const [gender, setGender] = useState("");// 본인인증 완료 후 성별
    const [certifyStatus, setCertifyStatus] = useState(false); //본인인증 완료 여부
    const [idList, setIdList] = useState([]); // 유저의 ID목록

    const [year, setYear] = useState({value:moment(new Date()).format('YYYY'),label:`${moment(new Date()).format('YYYY')}년`});
    const [month, setMonth] = useState({value:moment(new Date()).format('MM'),label:`${moment(new Date()).format('MM')}월`});
    const [day, setDay] = useState({value:moment(new Date()).format('DD'),label:`${moment(new Date()).format('DD')}일`});
    const [yearList,setYearList]= useState([]);
    const [monthList,setMonthList] = useState([]);
    const [dayList,setDayList] = useState([]);
    const [searchState,setSearchState] =useState(false)
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

    const AlertMessage = (message,icon) => {
        setAlertOpen(true);
        setMessage(message);
        setAlertColor(icon);
    }
    const handleClose = () => {
        setAlertOpen(false);
    }
    useEffect(() => {
        let tempYear = [];
        let tempMonth = [];
        let tempDay = [];
        for(var i = Number(moment(new Date()).format('YYYY'))-100;i< Number(moment(new Date()).format('YYYY')); i++){
            tempYear.push({value:i,label:`${i}년`});
        }
        for(var i=0;i< 12; i++){
            tempMonth.push({value:i+1,label:`${i+1}월`});
        }
        for(var i=0;i< 31; i++){
            tempDay.push({value:i+1,label:`${i+1}일`});
        }
        setYearList(tempYear);
        setMonthList(tempMonth);
        setDayList(tempDay)
        return function cleanup() {
        
        };
    },[]);
    useEffect(() => {
        setDay(null);
        setDayList([])
        let tempDay = [];
        if(new Date(Number(year.value),Number(month.value),0).getDate() !== NaN) {
            for(var i = 0; i<new Date(Number(year.value),Number(month.value),0).getDate(); i++) {
                tempDay.push({value:i+1,label:`${i+1}일`});
            }
        }else {
            for(var i = 0; i<31; i++) {
                tempDay.push({value:i+1,label:`${i+1}일`});
            }
        }
        setDayList(tempDay)
        return function cleanup() {
        
        };

    },[year,month]);
    useEffect(()=> {
        if(!memberInfoAuth){
            rollback()
        }
    },[memberInfoAuth])
    useEffect(()=> {
        if(!phoneAuth){
            authRollback()
        }
    },[phoneAuth])

    const Serti =() => {
        return axios ({
                url:'/auth/sertify_weidong',
                method:'POST',
                data: {}
            }).then(res=>{ 
                var form = document.form2;
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
                AlertMessage(String(err));
            });
        // setCertifyStatus(true);
        // axios.post("/api/myAccoutFind",
        //         {gubun:'phone',
        //         phoneNum:'01089307772',
        //         userName:'이동기',
        //         birthDay:'19920814',
        //         gender:'M'}).then(
        //         res=>{
        //             console.log(res)
        //             if(res.statusText==="OK") {
        //                 if(res.data.length > 0){
        //                     setIdList(res.data);
        //                 }else {
        //                     setIdList([])
        //                 }
                        
        //             }
        //         }
        //     )
    }
    window.event_popup = function() {
        if(document.kcbResultForm.RSLT_CD.value === "B000"){
            setPhoneNum(document.kcbResultForm.TEL_NO.value);
            setUserName(document.kcbResultForm.RSLT_NAME.value);
            setBirthDay(document.kcbResultForm.RSLT_BIRTHDAY.value);
            setGender(document.kcbResultForm.RSLT_SEX_CD.value);
            setCertifyStatus(true);

            axios.post("/api/myAccoutFind",
                {gubun:'phone',
                phoneNum:document.kcbResultForm.TEL_NO.value,
                userName:document.kcbResultForm.RSLT_NAME.value,
                // birthDay:document.kcbResultForm.RSLT_BIRTHDAY.value,
                // gender:document.kcbResultForm.RSLT_SEX_CD.value
            }).then(
                res=>{
                    if(res.statusText==="OK") {
                        
                        if(res.data.length > 0){
                            setIdList(res.data);
                        }else {
                            setIdList([])
                        }
                        
                    }
                }
            )

        } else {
            setCertifyStatus(false);
            AlertMessage("document.kcbResultForm.RSLT_MSG.value \n error: 사용자 본인 인증에 실패 하였습니다. 다시 시도해주세요.",'error');
        }
    }
    // const onSearch = () => {
    //     if(userName.length <= 0) {
    //         AlertMessage('이름 (을)를 입력해 주세요.','danger');
    //         return;
    //     }
    //     if(!gender) {
    //         AlertMessage('성별 (을)를 선택해 주세요.','danger');
    //         return;
    //     }
        
    //     if(!year.value){
    //         AlertMessage('년도 (을)를 선택해 주세요.','danger');
    //         return;
    //     }
    //     if(!month.value){
    //         AlertMessage('월 (을)를 선택해 주세요.','danger');
    //         return;
    //     }
    //     if(!day){
    //         AlertMessage('일 (을)를 선택해 주세요.','danger');
    //         return;
    //     }
    //     if(!moment(`${year.value}-${month.value}-${day.value}`,"YYYY-MM-DD").isValid()) {
    //         AlertMessage('알맞지 않는 날짜 형식입니다.','danger');
    //         return;
    //     }
    //     axios.post("/api/myAccoutFind",
    //             {gubun:'birth',
    //             userName:userName,
    //             // birthDay:moment(new Date(year.value,month.value-1,day.value)).format('YYYYMMDD'),
    //             // gender:gender
    //         }).then(
    //             res=>{
    //                 if(res.statusText==="OK") {
    //                     console.log(res.data)
    //                     if(res.data.length > 0){
    //                         setIdList(res.data);
    //                     }else {
    //                         setIdList([])
    //                     }
    //                     setSearchState(true);
                        
    //                 }
    //             }
    //         )
    // }

    const rollback = () => {
        setUserName("");
        setGender("");
        setYear({value:moment(new Date()).format('YYYY'),label:`${moment(new Date()).format('YYYY')}년`});
        setMonth({value:moment(new Date()).format('MM'),label:`${moment(new Date()).format('MM')}월`});
        setDay({value:moment(new Date()).format('DD'),label:`${moment(new Date()).format('DD')}일`});
        setIdList([]);
        setSearchState(false);

    }
    const authRollback = () => {
        setCertifyStatus(false);
        setUserName("");
        setGender("");
        setPhoneNum("");
        setIdList([]);
        window.kcbResultForm.RSLT_CD.value = null;
        window.kcbResultForm.RSLT_MSG.value = null;
        window.kcbResultForm.TEL_NO.value = null;
        window.kcbResultForm.RSLT_NAME.value = null;
        window.kcbResultForm.RSLT_BIRTHDAY.value = null;
        window.kcbResultForm.RSLT_SEX_CD.value = null;

    }

    return(
        
        <div className="section section-white">
            <form name="form2">
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
                                    <Col className="text-center">
                                        <span style={{fontSize:'20px',fontWeight:'bold'}}>아래 항목으로 아이디를 찾으실 수 있습니다.</span>
                                    </Col>
                                </Row>
                            </CardTitle>
                            <CardBody className="pt-5">
                                <Col>
                                    <Row>
                                        <Col className="text-left pb-3">
                                            <Button block color="primary" onClick={()=> {setPhoneAuth(!phoneAuth); setMemberInfoAuth(false)}}>내 이름으로 가입된 휴대폰 인증</Button>
                                            <Collapse navbar isOpen={phoneAuth}>
                                                {certifyStatus===true?(
                                                        <>
                                                            {idList.length > 0 ?(
                                                                <Col>
                                                                    <Row>
                                                                        <Col className="text-center pt-3">
                                                                            <span>해당 정보로 가입된 계정이 총 {idList.length}건이 있습니다. </span>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col className="text-center pt-3">
                                                                            <ListGroup>
                                                                                {
                                                                                    idList.map((value,index)=>{
                                                                                        return(
                                                                                            <ListGroupItem key={index}>{value.USER_ID}</ListGroupItem>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </ListGroup>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            ):(
                                                                <Col>
                                                                    <Row>
                                                                        <Col className="text-center pt-3">
                                                                            <span>해당 정보로 가입된 계정이 존재하지 않습니다.</span>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col className="text-center">
                                                                            <Button onClick={()=> authRollback()}>돌아가기</Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            )}   
                                                        </>):(
                                                        <>
                                                            <Col>
                                                                <Row>
                                                                    <Col className="text-center pt-3">
                                                                        <span>회원 가입 인증시 사용된 휴대폰 번호로 아이디를 찾으실 수 있습니다.</span>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col className="text-center">
                                                                        <Button className="mt-5" onClick={() => Serti()}>본인인증</Button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </>)
                                                    }
                                                
                                            </Collapse>
                                        </Col>
                                    </Row>
                                    {/* <Row>
                                        <Col className="text-left pb-3">
                                            <Button block color="primary" onClick={()=> { setMemberInfoAuth(!memberInfoAuth); setPhoneAuth(false);}}>이름 / 성별 / 생년월일로 찾기</Button>
                                            <Collapse navbar isOpen={memberInfoAuth}>
                                                {searchState===true?(
                                                    <>
                                                    {idList.length > 0 ?(
                                                        <Col>
                                                            <Row>
                                                                <Col className="text-center pt-3">
                                                                    <span>해당 정보로 가입된 계정이 총 {idList.length}건이 있습니다. </span>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col className="text-center pt-3">
                                                                    <ListGroup>
                                                                        {
                                                                            idList.map((value,index)=>{
                                                                                return(
                                                                                    <ListGroupItem key={index}>{value.USER_ID}</ListGroupItem>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ListGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row className="mt-3 text-right">
                                                                <Col>
                                                                    <span>'*' 문자 내용을 확인 하시고싶으시면 상단 휴대폰 본인 인증을 이용하시기 바랍니다.</span>
                                                                </Col>
                                                            </Row>
                                                            <Row className="mt-3">
                                                                <Col>
                                                                    <Button onClick={()=> rollback()}>돌아가기</Button>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    ):(
                                                        <Col>
                                                            <Row>
                                                                <Col className="text-center pt-3">
                                                                    <span>해당 정보로 가입된 계정이 존재하지 않습니다.</span>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col className="text-center">
                                                                    <Button onClick={()=> rollback()} className="mt-5">돌아가기</Button>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    )
                                                    }
                                                </>
                                                ):(
                                                <Col className="mt-5">
                                                    <Row>
                                                        <Col xl="6" sm="6" md="6" lg="6" xl="6"><Input placeholder="이름" value={userName} onChange={(e)=>setUserName(e.target.value)}></Input></Col>
                                                        <Col xl="3" sm="3" md="3" lg="3" xl="3" className="pt-3">
                                                            <div className="form-check-radio">
                                                                <Label check>
                                                                <Input
                                                                    defaultValue="M"
                                                                    id="exampleRadios3"
                                                                    name="exampleRadios"
                                                                    type="radio"
                                                                    onClick={(e)=>{setGender("M")}}
                                                                />
                                                                남 <span className="form-check-sign" />
                                                                </Label>
                                                            </div>
                                                        </Col>
                                                        <Col xs="3" xl="3" lg="3" md="3" sm="3" className="pt-3">
                                                            <div className="form-check-radio">
                                                                <Label check>
                                                                <Input
                                                                     defaultValue="F"
                                                                     id="exampleRadios3"
                                                                     name="exampleRadios"
                                                                     type="radio"
                                                                     onClick={(e)=>{setGender("F")}}/>
                                                                여 <span className="form-check-sign" />
                                                                </Label>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xl="4" sm="4" md="4" lg="4" xl="4">
                                                        <Select
                                                            className="react-select react-select-primary"
                                                            classNamePrefix="react-select"
                                                            value={year}
                                                            onChange={(value)=>setYear(value)}
                                                            options={yearList}
                                                            placeholder="연도"
                                                        />
                                                        </Col>
                                                        <Col xl="4" sm="4" md="4" lg="4" xl="4">
                                                        <Select
                                                            className="react-select react-select-primary"
                                                            classNamePrefix="react-select"
                                                            value={month}
                                                            onChange={(value)=>{setMonth(value)}}
                                                            options={monthList}
                                                            placeholder="월"
                                                        />
                                                        </Col>
                                                        <Col xl="4" sm="4" md="4" lg="4" xl="4">
                                                        <Select
                                                            className="react-select react-select-primary"
                                                            classNamePrefix="react-select"
                                                            value={day}
                                                            onChange={(value)=>setDay(value)}
                                                            options={dayList}
                                                            placeholder="일"
                                                        />
                                                        </Col>
                                                    </Row>
                                                    <Row className="mt-3">
                                                        <Col>
                                                            <Button block color="success" onClick={()=>{onSearch()}}>찾기</Button>
                                                        </Col>
                                                    </Row>
                                                </Col>)}
                                                
                                            </Collapse>
                                        </Col>
                                    </Row> */}
                                </Col>
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












