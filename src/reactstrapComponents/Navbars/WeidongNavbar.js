import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
// import classnames from "classnames";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
import axios from "axios";
// reactstrap components
import {
  // Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  // NavItem,
  Nav,
  Container,
  UncontrolledTooltip,
  // Row,Col
} from "reactstrap";
// core components
import WeidingAuth from "components/Navbars/WeidongAuthNavbar.js";
import LoginModal from "components/Modals/Login.js";
import RegisterModal from "components/Modals/Register.js";
import {observer} from 'mobx-react-lite';

const WeidongNavbar = observer((props) => {
// function WeidongNavbar(props) { 
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [bodyClick, setBodyClick] = React.useState(false);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  const [register, setRegister] = React.useState(false);
  const [clickMenu, setClickMenu] = React.useState("");
  const [overMenu, setOverMenu] = React.useState("");
  const [overBottom, setOverBottom] = React.useState("");
  const [clickBottom, setClickBottom] = React.useState("");
  
  const {user, setUser, errcode}=props;

  // 약한 파란색
  React.useEffect(() => {
    if( overMenu ) {
      setOverBottom("4px solid #9dcbe0");
    }
  },[overMenu]);
  // 클릭했을땐 진한 파란색
  React.useEffect(() => {
    
    if( clickMenu ) {
      setClickBottom("4px solid #0098e1");
    }
  },[clickMenu]);

  React.useEffect(() => {
	  if(props.errcode){setLogin(true)}
  },[props.errcode]);
  
  // 메뉴클릭 정보는 들고다닌다.
  React.useEffect(() => {
    
	  if(props.clickMenu){
      setClickMenu(props.clickMenu)
    }
  },[props.clickMenu]);

  React.useEffect(() => {


    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
    
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 140 ||
        document.body.scrollTop > 140
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 100 ||
        document.body.scrollTop < 100
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    window.addEventListener("click", fncOnClick);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
      window.removeEventListener("click", fncOnClick);
    };
  });

  const isSign = (data) => {console.log(data.pw);
	  axios ({
			url:'/auth/join',
			method:'POST',
			data: {provider:'local',
				   id:data.id,password:data.password,
				   name:'',
				   phone:'',
				   email:'',
				   linkyn:'N'}
		}).then(res=>{
		              alert('가입되었습니다. 로그인 하여 서비스 사용이 가능합니다.');
					  props.history.push("/");
		}
		)
		.catch(err => {
			if(err.response != undefined) {
				if(err.response.status == "300") {
					alert(err.response.data);
				}
			}
		});
  }


  const fncOnClick =(e)=>{
    // console.log("NAV BBAR ",e.target.id)
    if( e.target.id ) {
      if( "NAV_DASHBOARD" === e.target.id || "NAV_SCHEDULE" === e.target.id
        || "NAV_REQUEST" === e.target.id || "NAV_CONFIRM" === e.target.id
        || "NAV_SR" === e.target.id || "NAV_BL" === e.target.id
        || "NAV_LOCATION" === e.target.id ){
          
          // 연관된 아이디만 적용
          setClickMenu(e.target.id);
          props.fncClickMenu(e.target.id);
        }
    }
  }
  
  return (
    <>
      {bodyClick ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setBodyClick(false);
            setCollapseOpen(false);
          }}
        />
      ) : null} 
      <Navbar
        className={"fixed-top pt-0"}
        expand="lg"
        id="navbar-main"
        style={{borderBottom:'1px solid #0098e1',backgroundImage:
        "url(" + require("assets/img/bg_header_wrap.gif") + ")"}}
      >
        <Container>
          <div  className="container padding_custom" style={{top:'0',position:'absolute'}} >
            <WeidingAuth  openLogin={()=>setLogin(!login)}
                          openRegister={()=>setRegister(!register)}
                          // onLogOut={logOut} 
                          // setUser={props.setUser}
                          // loginContent={loginContent}
                          // setLoginContent={setLoginContent}
                          //hoursSpan={hoursSpan}
                          //minutesSpan={minutesSpan}
                          //secondsSpan={secondsSpan}
                          user={user}
                          setUser={setUser}
                          //autoLogin ={autoLogin}
                          //setAutoLogin={ setAutoLogin}
                          // userStore={userStore}
                          {...props}
                          />
          </div>
          <div className="navbar-translate" style={{marginTop:'30px'}} >
            <NavbarBrand className="p-0 m-0" id="navbar-brand" to="/weidongIndex" tag={Link} >
              <img alt="logo" src={require("assets/img/logo.gif")}/>
            </NavbarBrand>
            <UncontrolledTooltip placement="bottom" target="navbar-brand">
              WEIDONG FERRY
            </UncontrolledTooltip>
            <button
              className="navbar-toggler"
              id="navigation"
              type="button"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setBodyClick(true);
                setCollapseOpen(true);
              }}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse navbar isOpen={collapseOpen} style={{paddingTop:'40px'}}>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar  className="mb-0"
                style={{borderBottom:
                  "NAV_DASHBOARD"===overMenu?overBottom:"NAV_DASHBOARD"===clickMenu?clickBottom:'4px solid transparent'
                  }}>
                <DropdownToggle nav to="/dashboard" tag={Link}
                  style={{fontSize:'15px',color:'#444444'}}
                  onMouseOver={()=>setOverMenu("NAV_DASHBOARD")}
                  onMouseOut={()=>setOverMenu("")}
                  onClick={(e)=>document.documentElement.classList.remove("nav-open")}// onClick={(e)=>fncOnClick(e)}
                  id='NAV_DASHBOARD'
                  >
                    DASHBOARD
                </DropdownToggle>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar 
                style={{borderBottom:
                  "NAV_SCHEDULE"===overMenu?overBottom:"NAV_SCHEDULE"===clickMenu?clickBottom:'4px solid transparent'
                }}>
                <DropdownToggle nav to="/schedule" tag={Link}
                  style={{fontSize:'15px',color:'#444444'}}
                  onClick={(e)=>document.documentElement.classList.remove("nav-open")}
                  onMouseOver={()=>setOverMenu("NAV_SCHEDULE")}
                  onMouseOut={()=>setOverMenu("")}
                  id='NAV_SCHEDULE'
                  >
                  SCHEDULE
                </DropdownToggle>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar
                style={{borderBottom:
                  "NAV_REQUEST"===overMenu?overBottom:"NAV_REQUEST"===clickMenu?clickBottom:'4px solid transparent'
                }}>
                <DropdownToggle nav to="/bookinglist" tag={Link}
                  style={{fontSize:'15px',color:'#444444'}}
                  onClick={(e)=>document.documentElement.classList.remove("nav-open")}
                  onMouseOver={()=>setOverMenu("NAV_REQUEST")}
                  onMouseOut={()=>setOverMenu("")}
                  id="NAV_REQUEST"
                  >
                REQUEST
                </DropdownToggle>
              </UncontrolledDropdown> 
              <UncontrolledDropdown nav inNavbar
                style={{borderBottom:
                  "NAV_CONFIRM"===overMenu?overBottom:"NAV_CONFIRM"===clickMenu?clickBottom:'4px solid transparent'
                }}>
                <DropdownToggle nav to="/confirmList" tag={Link}
                  style={{fontSize:'15px',color:'#444444'}}
                  onClick={(e)=>document.documentElement.classList.remove("nav-open")}
                  onMouseOver={()=>setOverMenu("NAV_CONFIRM")}
                  onMouseOut={()=>setOverMenu("")}
                  id='NAV_CONFIRM'
                  >
                CONFIRM
                </DropdownToggle>
              </UncontrolledDropdown> 
              <UncontrolledDropdown nav inNavbar
                style={{borderBottom:
                  "NAV_SR"===overMenu?overBottom:"NAV_SR"===clickMenu?clickBottom:'4px solid transparent'
                }}>
                <DropdownToggle nav to="/srlist" tag={Link}
                  style={{fontSize:'15px',color:'#444444'}}
                  onClick={(e)=>document.documentElement.classList.remove("nav-open")}// onClick={(e)=>fncOnClick(e)}
                  onMouseOver={()=>setOverMenu("NAV_SR")}
                  onMouseOut={()=>setOverMenu("")}
                  id='NAV_SR'
                  >
                SR
                </DropdownToggle>
              </UncontrolledDropdown>   
              <UncontrolledDropdown nav inNavbar
                style={{borderBottom:
                  "NAV_BL"===overMenu?overBottom:"NAV_BL"===clickMenu?clickBottom:'4px solid transparent'
                }}>
                <DropdownToggle nav to="/bllist" tag={Link}
                  style={{fontSize:'15px',color:'#444444'}}
                  onClick={(e)=>document.documentElement.classList.remove("nav-open")}// onClick={(e)=>fncOnClick(e)}
                  onMouseOver={()=>setOverMenu("NAV_BL")}
                  onMouseOut={()=>{setOverMenu("")}}
                  id='NAV_BL'
                  >
                BL
                </DropdownToggle>
              </UncontrolledDropdown>                   
              <UncontrolledDropdown nav inNavbar
                style={{borderBottom:
                  "NAV_LOCATION"===overMenu?overBottom:"NAV_LOCATION"===clickMenu?clickBottom:'4px solid transparent'
                }}>
                <DropdownToggle nav to="/vslocation" tag={Link} style={{fontSize:'15px',color:'#444444'}}
                  onClick={(e)=>document.documentElement.classList.remove("nav-open")}// onClick={(e)=>fncOnClick(e)}
                  onMouseOver={()=>setOverMenu("NAV_LOCATION")}
                  onMouseOut={()=>setOverMenu("")}
                  id='NAV_LOCATION'
                  >
                  LOCATION
                </DropdownToggle>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      {/*login modal*/}
      <LoginModal 
          openLogin={login}
          setOpenRegister={(e)=>{setLogin(false);setRegister(true)}}
          setOpenLogin={(e)=>{setLogin(e);if(props.errcode){props.history.push("/");props.clearCode();}}}
          //onSetIsAuthenticated ={(state)=>props.onSetIsAuthenticated(state)}
          //onLogin={(data)=>isLogin(data)} 
          {...props}
        />
      {/*login modal*/}
      <RegisterModal 
          openRegister={register}
          setOpenRegister={(e)=>setRegister(e)}
          openLogin={() => setLogin(true)}
      />
      
    </>
  );
}
)

export default WeidongNavbar;
