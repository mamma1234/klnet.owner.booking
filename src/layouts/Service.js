import React,{useCallback, useEffect} from "react";
import cx from "classnames";
// import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {CircularProgress,Backdrop} from '@material-ui/core';
// core components
import ServiceNavbar from "components/Navbars/ServiceNavbar.js";
import SweetAlert from "components/CustomAlert/CustomSweetAlert.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/ServiceSidebar.js";
//import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import LoginPage from 'views/Login/LoginPage.js';
import routes from "service_routes.js";
import axios from 'axios';
import styles from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.js";
import {observer,useObserver} from 'mobx-react-lite';
import { userStore} from 'store/userStore.js';

var ps;

const useStyles = makeStyles(styles);

const ServiceLayout=(props)=>{
  const { ...rest } = props;
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [miniActive, setMiniActive] = React.useState(true); // default true로  설정
  const image = require("assets/img/logo_plus.png");
  const color = "blue";
  const bgColor = "white";
  const logo = require("assets/img/logo_new.png");
  const [open,setOpen] = React.useState(false);
  const [viewAlert,setViewAlert] = React.useState(null);

  const host = window.location.hostname;
  let klnetUrl = '';
    if( host.indexOf('localhost') >= 0 ){
      klnetUrl = 'http://localhost:5002/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=http://localhost:5000/auth/klnet/callback&response_type=code&state=12345';
    }else if( host.indexOf('dev') >= 0 ) {
      klnetUrl = 'https://devauth.plism.com/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=https://devbooking.plism.com/auth/klnet/callback&response_type=code&state=12345';
    } else {
      klnetUrl = 'https://auth.plism.com/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=https://booking.plism.com/auth/klnet/callback&response_type=code&state=12345';
    }
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
    // console.log('service.js setUserData',data)
    userStore.user =data
  }
  const userData =useObserver( ()=>{
    // console.log('service.js userData',userStore.user)
    return  userStore.user
    })
  const isLogOut = useCallback(()=>{
      userStore.logout()
      props.history.push('/newhome');
      // alertMessage('로그아웃 되었습니다.', 'success');
  },[])
  const authLoading = useObserver( ()=>{
    // if(userData){ userStore.loading = false}
      // console.log('service.js userStore.loading',userStore.loading,',get >>:', userStore.getLoading )
      // return userStore.getLoading
      return userStore.loading
  })
  React.useEffect(() => {
    axios.interceptors.request.use(function(config){
      // config.headers.Authorization = userStore.accssToken;
      // console.log(userStore.getLoading,'----------request >>', config.url);
      if(!userStore.loading){
      
        return config
      }
        return Promise.reject(config)
    } , function (error) {
        console.log('axios is loading')
      return Promise.reject(error)
    })
    axios.interceptors.response.use(function (response) {
      // console.log('=============>response',response.config.url);
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setMiniActive(!miniActive);
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
  let windowPopObj= null;
  const onOpenHandle = () => {
    //const klnetUrl ="https://auth.plismplus.com/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=https://www.plismplus.com/auth/klnet/callback&response_type=code&state=12345";
    // const klnetUrl ="https://devauth.plismplus.com/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=https://dev.plismplus.com/auth/klnet/callback&response_type=code&state=12345";
    if(!userStore.getLoading&&userData){   
      console.log('onOpenHandle getLoading >>>>>>>>>',userStore.loading ) 
    }else if(!userStore.getLoading&&!userData){
      // const host = window.location.hostname;
     
      var return_uri=document.location.href;
        /**Login 페이지이동 개발진행중
        window.location.href= klnetUrl;*/
       
      /**팝업로그인창 */
        let popWidth = '500';
        let popHeight = '700';
        let winWidth = document.body.clientWidth;//현재창의너비
        let winHeight = document.body.clientHeight;//현재창의 높이
        let winX = window.screenX||window.screenLeft||0;//현재창의 x좌표
        let winY = window.screenY||window.screenTop||0;// 현재창의 y좌표
        let left = winX + (winWidth -popWidth)/2;
        let top = winY + (winHeight -popHeight)/2;
        // window.open(klnetUrl+`&path=${window.location.pathname}`


        //팝업창 열려있는지 확인
        if(!(!windowPopObj||windowPopObj.closed)){ 
          windowPopObj.close();
        }
        windowPopObj =window.open(klnetUrl+`&path=/returnClose`,'_blank','left='+left+',top='+top+',width='+popWidth+',height='+popHeight+',left='+left+',top='+top);
        windowPopObj.focus();
    }
 
  }
  
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
 
      if (prop.layout === "/svc") {
        return (
          <Route
            path={prop.layout + prop.path}
            //component={prop.component}
          	render={() =><prop.component openLogin={onOpenHandle} loginClose={event=>handleLoginClose(event)} //user={userData} 
                  userData={userData} isLogOut={isLogOut} authLoading={authLoading}
                  alert={(onConfirm,title,type,show,reverseButtons,btnSize,subtitle,showConfirm,showCancel, onCancel)=>onSetAlertStatus(onConfirm,title,type,show,reverseButtons,btnSize,subtitle,showConfirm,showCancel,onCancel)} 
          	      {...rest}/>}
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
  
  const handleLoginClose=user => {
	  setOpen(false);
	  //console.log("popup close:",user);
	  if(user) {
		 // setIsAuthenticated(true);
		  setUserData(user);
	  } else {
		 // setIsAuthenticated(false);
		  setUserData([]); 
	  }
	  //setIsAuthenticated(true);
	  //setUserData(user);
  }
  


  const onSetAlertStatus=(onConfirm,title,type,show,reverseButtons,btnSize,subtitle,showConfirm,showCancel, onCancel)=>{
     if(show) {
    	 setViewAlert(	
    				<SweetAlert onConfirm={onConfirm?onConfirm:null} ontitle={title?title:""} 
    	              type={type?type:'default'} show={show?true:false} reverseButtons={reverseButtons?reverseButtons:false} 
    	              btnSize={btnSize?btnSize:'lg'} subtitle={subtitle?subtitle:null} showConfirm={showConfirm?showConfirm:false}
    	              showCancel={showCancel?showCancel:false} onCancel={onCancel?onCancel:null} />
    	         );
     } else {
    	 setViewAlert(null);
     }
  }
  return (
    <div className={classes.wrapper} style={{backgroundColor:'#FFF'}}>
      <Sidebar
        routes={routes}
        logoText={"Plism plus"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
       // isAuthenticated={isAuthenticated}
        userData={userData}
        onLoginPageOpen={onOpenHandle}
        open={mobileOpen}
        color={color}
        bgColor={bgColor}
        miniActive={miniActive}
        isLogOut={isLogOut}
        authLoading={authLoading}
        {...rest}
      />
      <div className={mainPanelClasses} ref={mainPanel} >
        <ServiceNavbar
          sidebarMinimize={sidebarMinimize.bind(this)}
          miniActive={miniActive}
          brandText={getActiveRoute(routes)}
          handleDrawerToggle={handleDrawerToggle}
         // isAuthenticated={isAuthenticated}
          // onLoginPageOpen={()=>setOpen(true)}
          authLoading={authLoading}
          onLoginPageOpen={onOpenHandle}
          userData={userData}
          isLogOut={isLogOut}
          {...rest}
        />


{!authLoading? 
      getRoute() 
      ?   <div className={classes.content} style={{padding:'0px'}}>
                <div className={classes.container}>
                <Switch>
                    {getRoutes(routes)}
                    <Redirect from="/svc" to="/svc/fcl" />
                  </Switch>
                  {viewAlert} 
                </div>
              </div>
      :
          <div className={classes.map}>
            <Switch>
              {getRoutes(routes)}
              <Redirect from="/svc" to="/svc/fcl" />
            </Switch>
          </div>
 
:
<div className={classes.content} style={{padding:'0px'}}>
  <div className={classes.container}>
    <div style={{position:'fixed',top:'50%',left:'50%',zIndex:'100'}} open={true}> 
         <CircularProgress />
    </div>
    {viewAlert} 
  </div>
</div>
}

{/* 
        {getRoute() 
        ? 
        (//getRoute() true
          <div className={classes.content} style={{padding:'0px'}}>
            <div className={classes.container}>
            {!authLoading?
            //autoloding false //getRoute() true
              <Switch>
                 {getRoutes(routes)}
                <Redirect from="/svc" to="/svc/fcl" />
              </Switch>
              : 
                //autoloding true //getRoute() true
                  <div style={{position:'fixed',top:'50%',left:'50%',zIndex:'100'}} open={true}> 
                    <CircularProgress />
                  </div>
            }
                {viewAlert} 
            </div>
          </div>
        ) 
        : 
        (//autoloding false getRoute() false 
          <div className={classes.map}>
            <Switch>
              {getRoutes(routes)}
              <Redirect from="/svc" to="/svc/fcl" />
            </Switch>
          </div>
        )
        }
         */}





        {/* <Footer fluid store={auth.getUser()} /> */}
        <Footer fluid store={userData} />
        
{/*      <div className={"fixed-plugin"} style={{top:'85%',width:'35px'}}>
	    <div onClick={handleClick}>
	    	<Tooltip title="Scroll Top">
	    		<i className="fa fa-angle-double-up fa-2x" style={{color:'white'}}/>
	    	</Tooltip>
	    </div>
      </div>*/}
      <Dialog
      	open={open}
        onClose={()=>setOpen(false)}
      >
       <DialogContent style={{maxWidth:'400px',minWidth:'350px'}}><LoginPage onClose={event=>handleLoginClose(event)}/></DialogContent>   
      </Dialog>
      </div> 
    </div>
  );
}

export default observer(ServiceLayout);