import React, { useEffect,useCallback }  from "react";
// import { Link } from "react-router-dom";
// nodejs library that concatenates strings
// import classnames from "classnames";
// JavaScript plugin that hides or shows a component based on your scroll
// import Headroom from "headroom.js";
// reactstrap components
// import Select from "react-select";
import {
  Button,
  //   Navbar,
  //   NavItem,
  //   Nav,
//   FormGroup,
  ButtonDropdown,
  DropdownToggle,NavItem,Badge,Card,CardBody,Tooltip,UncontrolledDropdown,
   DropdownMenu,
   DropdownItem,
   UncontrolledTooltip,

   CustomInput,Form, FormGroup,Label
} from "reactstrap";
import axios from "axios";

import { Link } from "react-router-dom";
import Popover from "reactstrap/lib/Popover";
import UncontrolledPopover from "reactstrap/lib/UncontrolledPopover";
import PopoverHeader from "reactstrap/lib/PopoverHeader";
import PopoverBody from "reactstrap/lib/PopoverBody";
import Switch from "react-bootstrap-switch";
import MyProfile from "components/Modals/MyProfile";
import MyMsg from "components/Modals/MyMessage";
import CompanyModal from 'components/Modals/Company.js';
import CompanyMappingAlert from 'components/Modals/MappingAlert.js'
import { runInAction } from 'mobx';
import {observer,useLocalObservable,} from 'mobx-react-lite';
import { userStore, timerStore } from 'store/UserStore.js';

// function WeidongAuthNavbar(props) {
const WeidongAuthNavbar = (props) => {
  const [company, setCompany] = React.useState(false);
	const [msg,setMsg] = React.useState(0);
	const [msgData,setMsgData] = React.useState([]);
	const [section,setSection] = React.useState(false);
  const [klnetId, setKlnetId] = React.useState("");
  const [companyState, setCompanyState] = React.useState(false);// 위동 거래처 등록 알림
  
	// const [hoursSpan, setHoursSpan] = React.useState('00');
	// const [minutesSpan, setMinutesSpan] = React.useState('00');
	// const [secondsSpan, setSecondsSpan] = React.useState('00');

  const {user, setUser,setLogin, 
	  // autoLogin, setAutoLogin,
    // onLogOut 
  } = props

    // const verifyUser = ()=>{	axios.get("/auth/verify")
    // .then(res => {
    //     var data = res.data.user;
    //     // setUser(data);
    //     console.log('dy')
    //     UserStore.setUser=data;
    //   });
    // }
    // useEffect(()=>{
    //   console.log('1번')
    //   verifyUser();
    // },[])
	React.useEffect(() => {
    // props.setUser(props.user)
    // console.log(user)
    if(user) {
      if(user.klnet_id) {
        setSection(false);
        setKlnetId(user.klnet_id);
      }else {
        setSection(true);
      }
      onHandleUserMessageCheck();
    }else {
      setMsg(0);
    }
	},[]);


     
  React.useEffect(() => {
    if(klnetId) {
      axios.post("/com/checkWDFCLineCompany",{param:klnetId, lineCode:'WDFC'}).then(
        res=> {
          if(res.statusText==="OK"){
            if(res.data.length !== 0) {
              setCompanyState(false)
            }else {
              setCompanyState(true)
            }
          }
      });
    }
  },[klnetId])

  React.useEffect(() => {
    if(section) {
      const timeout = setInterval(()=>{
        setSection(false)
      },3000);
      return () => clearInterval(timeout)
    }
    
  },[section]);

  const onHandleUserMessageCheck = ()=>{
	  axios.post("/shipper/getUserMessageCheck",{user_no:props.user?props.user.user_no:''})
      .then(res => {
               var data = res.data;
               if(data) {setMsg(parseInt(data[0].count));}else{setMsg(0);}
    	  });
  }
  
  

  const onReadUserMessage = () => {
	  axios.post("/shipper/getUserMessage",{user_no:props.user?props.user.user_no:'',mini:'Y'})
      .then(res => {
               var data = res.data;
               if(data) {setMsgData(data);}else{setMsgData([]);}
      });
  }
  
  const onAllReadMessage = (data) => { 
	  axios.post("/shipper/setUserReadMeassage",{user_no:props.user?props.user.user_no:'',data:data})
	  .then(res =>{onHandleUserMessageCheck();onReadUserMessage();});
  }
 

  const onLogintoggle = (e)=>{
    timerStore.setAutoLogin=!e;
    // console.log(timerStore.getAutoLogin, timerStore.autoLogin)
  }

  const onLogout = useCallback(() => {
    userStore.logout()
    setUser(userStore.user)
  }, []);

  const Timer =observer( ()=>{
    return (
     <> [{timerStore.timer}]</>
    )
  })


  return (
    <div id="test" className="float-right"  style={{display:'flex', alignItems:'center'}}>
    {!userStore.getUser?<>
        <Button
            className="pt-0 pb-0 mt-0 mb-0 text-dark"
            size="sm"
            onClick={()=>props.openLogin(!props.openLogin)}
            style={{backgroundColor:'transparent',border:'0',fontFamliy:'굴림',fontSize:'11px',color:'#666'}}
        >로그인
        </Button>
        <Button
            className="pt-0 pb-0 mt-0 mb-0 text-dark"
            size="sm"
            onClick={()=>props.openRegister(!props.openRegister)}
            style={{backgroundColor:'transparent',border:'0',fontFamliy:'굴림',fontSize:'11px',color:'#666'}}
        >회원가입
        </Button>
        </>:                    
        	<>
		<Button
		className="text-dark padding_custom"
		size="sm"
		onClick={onLogout}
		style={{backgroundColor:'transparent',border:'0',fontFamliy:'굴림',fontSize:'11px',color:'#666' ,margin:'0 5px 0 0', padding:'0px'}}
		>로그아웃
		</Button>
		<font style={{fontFamliy:'굴림',fontSize:'11px',color:'#666',paddingRight:'5px'}} >{userStore.user?userStore.user.user_name+'님':''} </font>
    <span style={{backgroundColor:'tansparent',border:'0',fontFamliy:'굴림',fontSize:'11px',color:'#666', pointerEvents:'none'}}> <Timer/> </span>
    {/* <Timer/> */}
    {/* <span style={{backgroundColor:'tansparent',border:'0',fontFamliy:'굴림',fontSize:'11px',color:'#666', pointerEvents:'none'}}> [ {hoursSpan}:{minutesSpan}:{secondsSpan} ] </span> */}
    <div className="custom-control custom-switch" id="customSwitch22" style={{display:'inline-block'}}>
        <input type='checkbox' className="custom-control-input" id="customSwitch" checked={timerStore.getAutoLogin}  onChange={()=> onLogintoggle(timerStore.getAutoLogin)}></input>
        <label className= "custom-control-label" htmlFor="customSwitch"></label>     
      </div>
      <UncontrolledTooltip placement="bottom" className="customToggle" target="customSwitch22" trigger="hover" >
         {timerStore.autoLogin? '자동 로그인 갱신' : '자동 로그아웃'}
        </UncontrolledTooltip>
                       
    <Button id="profile" style={{backgroundColor:'transparent',border:'0',fontFamliy:'굴림',fontSize:'11px',color:'#666'}}
      className="p-0 mt-0 mb-1">
      <i className="fa fa-user-o fa-2X" />
    </Button>
    <UncontrolledPopover className="popover" trigger="legacy" placement="bottom" target="profile">
      <MyProfile style={{zIndex:'9999'}} user={user} openCompany ={() => setCompany(!company)} />
    </UncontrolledPopover>
     {section===true &&
    <Tooltip placement="bottom" target="test" isOpen={section} toggle={() => setSection(false)}>
      <CompanyMappingAlert msg="업체등록이 필요합니다."/>
    </Tooltip>}
    {companyState=== true &&
    <Tooltip placement="bottom" target="profile" isOpen={companyState} toggle={() => setCompanyState(false)}>
      <CompanyMappingAlert msg="등록된 업체가 없습니다. 관리자에게 문의해 주세요."/>
    </Tooltip>}
    <Button id="alram" style={{backgroundColor:'transparent',border:'0',fontFamliy:'굴림',fontSize:'11px',color:'#666'}}
      className="p-0 mt-0 mb-1" onClick={(e) => {e.preventDefault();onReadUserMessage();}}>
      <i className="fa fa-bell-o fa-2X" />{msg === 0?<Badge color="danger" pill style={{display:'unset',paddingTop:'2px',top:'-3px'}}>{msg}</Badge>:<span >{' '}</span>} 
	  </Button>
	    <UncontrolledPopover className="popover" trigger="legacy" placement="bottom" target="alram">
	    	<MyMsg msgdata={msgData} readmsg={(data)=>onAllReadMessage(data)} {...props}/>
	    </UncontrolledPopover>
    </>}

      <Link to="/sitemap">
        <Button
            className="p-0 mt-0 mb-0 text-dark"
            size="sm"
            //onClick={()=>setRegister(!register)}
            style={{backgroundColor:'transparent',border:'0',fontFamliy:'굴림',fontSize:'11px',color:'#666'}}
        >사이트맵
        </Button>
      </Link>
        <ButtonDropdown>
            <DropdownToggle size="sm" className="mt-0 mb-0 mr-0 border-0 rounded-0" style={{backgroundColor:'#0098e1',paddingTop:'5px'}}
            	href="https://www.weidong.com/index.do?lang=ko_KR"
            	target="_blank">여객사이트</DropdownToggle>
        </ButtonDropdown>
        <ButtonDropdown>
        <DropdownToggle size="sm" className="mt-0 mb-0 mr-0 ml-0 border-0 rounded-0" style={{backgroundColor:'#0098e1',paddingTop:'5px'}}
        	href="https://www.cargo.weidong.com/index.do?lang=ko_KR"
        	target="_blank">화물사이트</DropdownToggle>
         </ButtonDropdown>
        {/* <ButtonDropdown isOpen={dropdownOpen} toggle={()=>setDropdownOpen(!dropdownOpen)} >
            <DropdownToggle caret size="sm" className="mt-0 mb-0 ml-0 border-0 rounded-0" style={{paddingTop:'5px',backgroundColor:'#333'}}>{langTitle}</DropdownToggle>
            <DropdownMenu className="mt-0" style={{minWidth:'6rem'}}>
                <DropdownItem className="p-0 pl-2 rounded-0" style={{backgroundColor:'#333',color:'#ffffff'}} onClick={()=>setLangTitle("KOREA")}>KOREA</DropdownItem>
                <DropdownItem className="p-0 pl-2 rounded-0" style={{backgroundColor:'#333',color:'#ffffff'}} onClick={()=>setLangTitle("CHINESE")}>CHINESE</DropdownItem>
                <DropdownItem className="p-0 pl-2 rounded-0" style={{backgroundColor:'#333',color:'#ffffff'}} onClick={()=>setLangTitle("ENGLISH")}>ENGLISH</DropdownItem>
            </DropdownMenu>
        </ButtonDropdown> */}
        <CompanyModal 
          isUser={props.user}
          openCompany={company}
          setOpenCompany={(e)=>setCompany(e)}
          {...props}
      />
    </div>
  );
}
;

export default observer(WeidongAuthNavbar);
