import React,{useCallback} from "react";
import cx from "classnames";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {CircularProgress} from '@material-ui/core';
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/AdminSidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import LoginPage from 'views/Login/LoginPage.js';
import routes from "admin_routes.js";

import {observer,useObserver} from 'mobx-react-lite';
import { userStore, timerStore } from 'store/userStore.js';

import styles from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.js";

var ps;

const useStyles = makeStyles(styles);

const AdminLayout=(props)=>{
//const Dashboard = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => { 

  const { ...rest } = props;
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [miniActive, setMiniActive] = React.useState(true);
  const image = require("assets/img/logo_plus.png");
  const [color, setColor] = React.useState("blue");
  const [bgColor, setBgColor] = React.useState("black");
  // const [hasImage, setHasImage] = React.useState(true);
  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  //const [logo, setLogo] = React.useState(require("assets/img/pp_logo.gif"));
  const logo = require("assets/img/logo_new.png");
  // const [isAuthenticated,setIsAuthenticated] =React.useState(false);
  const [open,setOpen] = React.useState(false);
  // const [userData,setUserData] =React.useState([]);
  // const setUserData =  (data)=>{
  //   userStore.user =data
  // }
  // const userData =useObserver( ()=>{
  //   return  userStore.user
  // })
  // const isLogOut = useCallback(()=>{
  //   console.log('logout>>>')
	// 	userStore.logout();
	// },[])
  //const store =userStore;
  
  //console.log("adminlayout token",token);
  const host = window.location.hostname;
  let klnetUrl = '';
	if( host.indexOf('localhost') >= 0 ){
    klnetUrl = 'http://localhost:5002/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=http://localhost:5000/auth/klnet/callback&response_type=code&state=12345';
  }else if( host.indexOf('dev') >= 0 ) {
		klnetUrl = 'https://devauth.plism.com/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=https://devbooking.plism.com/auth/klnet/callback&response_type=code&state=12345';
	} else {
		klnetUrl = 'https://auth.plism.com/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=https://booking.plism.com/auth/klnet/callback&response_type=code&state=12345';
	}
  React.useEffect(() => {
	      // axios.get("/auth/verify")
	      //   .then(res => 
	      //     {
	      //   	    //setIsAuthenticated(res.data.isAuth);
	      //   	  if(res.data) {
		    //         setUserData(res.data.user);
		            if(!userData||userData&&userData.role !== "Y"
                  // res.data.user.role !== "Y"
                  ) {
		            	alert("페이지 접근할 수 없습니다. 메인 화면으로 이동됩니다.");
		    	    	props.history.push('/newhome');
		            }
	      //   	  } else {
	      //   		  setUserData([]);
	      //   	  }
		    //        // auth.setAuthHeader(res.data);
	      //     }
	      //   )
	      //   .catch(err => {
		    //     //setIsAuthenticated(false);
		    //     setUserData([]);
	      // });  

	  }, []);
  
  // styles
  const classes = useStyles();
  const mainPanelClasses =
    classes.mainPanel +
    " " +
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1
    });
  // ref for main panel div
  const mainPanel = React.createRef();
  // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
  const setUserData =  (data)=>{
    console.log('service.js setUserData',data)
    userStore.user =data
  }
  const userData =useObserver( ()=>{
    console.log('service.js userData',userStore.user)
    return  userStore.user
    })
  const isLogOut = useCallback(()=>{
      userStore.logout()
      props.history.push('/newhome');
      // alertMessage('로그아웃 되었습니다.', 'success');
  },[])
  
  
  const authLoading = useObserver( ()=>{
    // if(userData){ userStore.loading = false}
      console.log('Admin.js userStore.loading',userStore.loading,',get >>:', userStore.getLoading )
      // return userStore.getLoading
      return userStore.loading
  })
  React.useEffect(() => {
    axios.interceptors.request.use(function(config){
      // config.headers.Authorization = userStore.accssToken;
      console.log(userStore.getLoading,'----------request >>', config.url);
      if(!userStore.loading){
      
        return config
      }
        return Promise.reject(config)
    } , function (error) {
        console.log('axios is loading')
      return Promise.reject(error)
    })
    axios.interceptors.response.use(function (response) {
      console.log('=============>response',response.config.url);
        return response;
      }, function (error) {
      // const originalRequest = error.config;
        if(error&&error.response){
          if(error.response.status === 403) {	
            setUserData(null);
            // onOpenHandle();
            console.log("error [code:"+error.response.status+"]");
          } else if(error.response.status === 401) {
            setUserData(null);
            console.log("error Code:",error.response.status);
            // onOpenHandle();
          } else if(error.response.status === 419) {
            console.log(">>>>>>error [code:"+error.response.status+"]");
            onOpenHandle();
          } else if(error.response.status === 500) {
            console.log("error [code:"+error.response.status+"]");
          } else if(error.response.status === 400) {
            console.log("error [code:"+error.response.status+"]");
          } else {
            console.log("error:",error);
          }
        }
        return Promise.reject(error);
        }
    );		
    },[]);
    React.useEffect(() => {

    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  });
  // functions for changeing the states from components
/*  const handleImageClick = image => {
    setImage(image);
  };*/
  const handleColorClick = color => {
    setColor(color);
  };
/*  const handleBgColorClick = bgColor => {
    switch (bgColor) {
      case "white":
        setLogo(require("assets/img/logo.svg"));
        break;
      default:
        setLogo(require("assets/img/logo-white.svg"));
        break;
    }
    setBgColor(bgColor);
  };*/
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };
  const getActiveRoute = routes => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  const onOpenHandle = () => {
	  // setOpen(true);
	  // setIsAuthenticated(false);

  //const klnetUrl ="https://auth.plismplus.com/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=https://www.plismplus.com/auth/klnet/callback&response_type=code&state=12345";
  // const klnetUrl ="https://devauth.plismplus.com/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=https://dev.plismplus.com/auth/klnet/callback&response_type=code&state=12345";
  if(!userStore.getLoading&&userData){    

    console.log('onOpenHandle getLoading >>>>>>>>>',userStore.loading ) 
  }else if(!userStore.getLoading&&!userData){
    // console.log(userStore.getLoading , ';',userData)
    // alert (' onOpenHandle getLoading>>>> userStore.loading : ', userStore.loading)
    // window.location.href= klnetUrl+`&path=${window.location.pathname}`;

 
  // var return_uri=document.location.href;
    /**Login 페이지이동 개발진행중
    window.location.href= klnetUrl;*/
    
       /***song210624 login popup*/
    let popWidth = '500';
    let popHeight = '700';
    let winWidth = document.body.clientWidth;//현재창의너비
    let winHeight = document.body.clientHeight;//현재창의 높이
    let winX = window.screenX||window.screenLeft||0;//현재창의 x좌표
    let winY = window.screenY||window.screenTop||0;// 현재창의 y좌표
    let left = winX + (winWidth -popWidth)/2;
    let top = winY + (winHeight -popHeight)/2;
    window.open(klnetUrl+`&path=/returnClose`
              ,'_blank'
              // ,'width=500px, height=800px');
              ,'left='+left+',top='+top+',width='+popWidth+',height='+popHeight+',left='+left+',top='+top
              );
   }
   
  }
//   React.useEffect(() => {
//     onOpenHandle()
// },[userStore.getLoading,userData]);
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            //component={prop.component}
            render={() =><prop.component openLogin={onOpenHandle} loginClose={event=>handleLoginClose(event)} //user={userData}
            userData={userData} isLogOut={isLogOut} adminRole = {userStore.user.role}
            {...rest} /> }
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const sidebarMinimize = () => {
    setMiniActive(!miniActive);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  
  const handleLoginClose=(user) => {
	  setOpen(false);
	  if(user) {
		  //console.log(">>user:",user);
		  // setIsAuthenticated(true);
		  setUserData(user);
		  if(user.type !="A") {
			  alert("페이지 접근할 수 없습니다.");
			  props.history.push('/newhome');
		  }
		  
	  } else {
		  // setIsAuthenticated(false);
		  setUserData([]); 
	  }
  }

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
      	logoText={"Plism plus"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
      	//isAuthenticated={isAuthenticated}
        userData={userData}
      	// onLoginPageOpen={()=>setOpen(true)}
        onLoginPageOpen={onOpenHandle}
        open={mobileOpen}
        color={color}
        bgColor={bgColor}
        miniActive={miniActive}
        isLogOut={isLogOut}
        {...rest}
      />
      <div className={mainPanelClasses} ref={mainPanel}>
        <AdminNavbar
          sidebarMinimize={sidebarMinimize.bind(this)}
          miniActive={miniActive}
          brandText={getActiveRoute(routes)}
          handleDrawerToggle={handleDrawerToggle}
          //isAuthenticated={isAuthenticated}
          // onLoginPageOpen={()=>setOpen(true)}
          onLoginPageOpen={onOpenHandle}
          userData ={userData}
          isLogOut={isLogOut}
          {...rest}
        />
        {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>
            {!authLoading?
              <Switch>
                {getRoutes(routes)}
                <Redirect from="/admin" to="/admin/userlist" />
              </Switch>
               :<div style={{position:'fixed',top:'50%',left:'50%',zIndex:'100'}}><CircularProgress /></div>}
            </div>
          </div>
        ) : (
          <div className={classes.map}>
            <Switch>
              {getRoutes(routes)}
              <Redirect from="/admin" to="/admin/userlist" />
            </Switch>
          </div>
        )}
        {getRoute() ? <Footer fluid store={userData}/> : null}
       {/* <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          handleBgColorClick={handleBgColorClick}
          color={color}
          bgColor={bgColor}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
          sidebarMinimize={sidebarMinimize.bind(this)}
          miniActive={miniActive}
        />
*/ }     </div>
        <Dialog
      	open={open}
        onClose={()=>setOpen(false)}
      >
       <DialogContent style={{maxWidth:'400px',minWidth:'400px'}}><LoginPage onClose={event=>handleLoginClose(event)}/></DialogContent>   
      </Dialog>
    </div>
  );
}
//))
export default observer(AdminLayout);
