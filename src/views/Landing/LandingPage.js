/*eslint-disable*/ import React from "react";
// nodejs library to set properties for components
//import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Kit/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Kit/Header/HeaderLinks.js";
import Parallax from "components/Kit/Parallax/Parallax.js";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import landingPageStyle from "assets/jss/material-kit-pro-react/views/landingPageStyle.js";
import CardFooter from "components/Card/CardFooter.js";
// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import SectionProduct from "./Sections/SectionProduct.js";
import SectionTeam from "./Sections/SectionTeam.js";
import SectionWork from "./Sections/SectionWork.js";
import CommonSearch from "./Sections/SearchBar.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import SectionCarousel from "./Sections/SectionCarousel.js";
import SectionCarouselPs from "./Sections/SectionCarouselPs.js";
//import SectionEmpty from "./Sections/SectionEmpty.js";

//import SectionHsn from "./Sections/SectionHsn.js";
//import SectionImo from "./Sections/SectionImo.js";
import SectionHsnImo from "./Sections/SectionHsnImo.js";

//import Dashboard from "./Sections/Dashboard.js";

import Board from "./Sections/SectionBoard.js";
// import Cookies from "js-cookie";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import LoginPage from 'views/Login/LoginPage.js';
import SignPage from 'views/Member/RegisterPage.js';
import GridContainer from "components/Grid/GridContainer.js";
import axios from 'axios';

import {auth} from 'views/Login/Service/Service.js';

//import { observer, inject } from 'mobx-react'; // 6.x
//import { useCookies  } from 'react-cookie';

const useStyles = makeStyles(landingPageStyle);

let numCnt =1;
var callbacks = {};
var promiseChain = Promise.resolve();
window.deviceId ="";
window.fcmToken = ""; 
window.deviceModel = "";
window.deviceOS = "";
var isMobile = navigator.userAgent.match(
  /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
);
window.document.addEventListener('message', event => {

  var message;
  if(isMobile) {
    try {
      message= JSON.parse(event.data);
    }catch(err) {
      console.log(err);
      return;
    }
    if(message.data) {
      window.deviceId=message.data.deviceId;
      window.fcmToken=message.data.token;
      window.deviceModel=message.data.deviceModel;
      window.deviceOS=message.data.os;
    }
  }
})
window.addEventListener('message', event => {
  var message;
  if(isMobile) {
    try {
      message= JSON.parse(event.data);
    }catch(err) {
      console.log(err);
      return;
    }
    if(message.data) {
      window.deviceId=message.data.deviceId;
      window.fcmToken=message.data.token;
      window.deviceModel=message.data.deviceModel;
      window.deviceOS=message.data.os;
    }
  }
})


window.getData = function(paramdeviceId, paramToken, paramModel) {
  if(isMobile) {
    window.deviceId = paramdeviceId;
    window.fcmToken = paramToken;
    window.deviceModel = paramModel;
  }
}
 export default function LandingPage(props) {

//const LandingPage = inject('userStore', 'trackStore')(observer(({ userStore, trackStore}) => { 
  const userAgent = navigator.userAgent.toLowerCase();
  const [open,setOpen] = React.useState(false);
  const [modalGb,setModalGb] = React.useState("login");
  const [isAuthenticated,setIsAuthenticated] =React.useState(false);
  const [userData,setUserData] =React.useState([]);
  const [boardData,setBoardData] =React.useState([]);
  const [chainData,setChainData] =React.useState([]);
  const [totpage,setTotpage] = React.useState(0);
  const [severity, setSeverity] = React.useState("");
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [errMessage, setErrmessage] = React.useState("");

  React.useEffect(() => {
	 // console.log(">>>>>main userStore.token",userStore.token);
	  document.body.style.overflow = "unset";
    

    if(userAgent.indexOf("android") > -1 || userAgent.indexOf("iphone") > -1 || userAgent.indexOf("ipad") > -1 || userAgent.indexOf("ipod") > -1) {
      const msgObj = {
        targetFunc: 'getToken',
        data:{}
      };

      var msg = JSON.stringify(msgObj);
      

      promiseChain.then(function() {
        return new Promise(function (resolve, reject) {
          console.log("send message " + msgObj.targetFunc);
          
          window.ReactNativeWebView.postMessage(msg);
          resolve();
        })
      }).catch(e => {
        console.log('err',e)
      })


      
      // if(window.AndroidInterface !== undefined) {
      //   window.AndroidInterface.callData();
      // }
  
    }
/*	if (auth.getUser()) {
		
	//console.log("login check1");
	//console.log("login check value:",localStorageCheck.token);
      axios.get("/auth/user")
        //.then(res => console.log("return:",res.data))
        .then(res => 
          {if(res.data) {
        	  console.log("login check ok");
           // console.log("res.data.user", res.data.user);
        	 
            //userStore.setUser(res.data.user);
            //userStore.setToken(res.data.token);
            setIsAuthenticated(true);
            setUserData(res.data.user);
            auth.setAuthHeader(res.data);

          } else {
            setIsAuthenticated(false);
            setUserData([]);
          }}
        )
        .catch(err => {console.log("login check error");
			setIsAuthenticated(false);
			setUserData([]);
		    auth.logOut();
		    props.history.push('/landing');
      });    

    }*/

	      axios.get("/auth/verify")
	        //.then(res => console.log("verify landing:",res.data))
	        .then(res => 
	          {if(res.data) {
	        	  console.log("login check ok");
	            //console.log("res.data.user", res.data.user);	        	 
	            //userStore.setUser(res.data.user);
	            //userStore.setToken(res.data.token);
	            //setIsAuthenticated(true);
	        	setIsAuthenticated(res.data.isAuth);
	            setUserData(res.data.user);
	            auth.setAuthHeader(res.data);

	          } else {
	            setIsAuthenticated(false);
	            setUserData([]);
	          }}
	        )
	        .catch(err => {console.log("login check error");
				setIsAuthenticated(false);
				setUserData([]);
			    auth.logOut();
			    props.history.push('/landing');
	      });    

	
	  axios.post("/api/getChainportal")
	  //.then(res => console.log("return:",res.data))
	  .then(res =>setChainData(res.data) 	
	  ).catch(err => {console.log("login check error",err);
	});  
	  
	numCnt=1;
	  axios.post("/api/getBoardList",{type:"main",num:numCnt})
	  .then(setBoardData([]))
      .then(res => {setBoardData(res.data);setTotpage(res.data[0].tot_page);});

  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  
  const handleAddRow = () => {

	 if(numCnt != boardData[0].tot_page) {
			//page ++
		    numCnt=numCnt+1; 
		    axios.post("/api/getBoardList",{type:"main",num:numCnt})
				  .then(res => {setBoardData([...boardData,...res.data]);setTotpage(res.data[0].tot_page);} );
	 }   
  };
  
  const handleClickLoginPage = () => {
	  setModalGb("login");
	  setOpen(true);  
  }
  
  const handleClickSignPage = () => {
	  setModalGb("sign");
	  setOpen(true);
  }

  const handleClickClose = () => {
	  setOpen(false);
  }
  
  const handleLoginClose =(value) =>{
	  console.log("value ", value);
	  setUserData(value);
	  setOpen(false);
	  setIsAuthenticated(true);
  }
  
  const handleLogOut =() =>{
    setIsAuthenticated(false);
    //userStore.logout();
	  alertMessage('로그아웃 되었습니다.','success');
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
	
  
  const logo = require("assets/img/pp_logo.gif");

  return (
    <div>
      <Header
        color="transparent"
        brand="Plism Plus"
            links={<HeaderLinks dropdownHoverColor="info" 
					onLoginOpen={handleClickLoginPage} 
					onSignOpen={handleClickSignPage} 
					isAuthenticated={isAuthenticated} 
					userData={userData} 
					logOut={handleLogOut}/>}
                fixed
                changeColorOnScroll={{
                  height: 300,
                  color: "info"
                }}
      />
      <Dialog
      	open={open}
        onClose={handleClickClose}
      >
       {modalGb=="login"?
    		   <DialogContent style={{maxWidth:'400px',minWidth:'350px',paddingLeft:'10px',paddingRight:'10px'}} >
       				<LoginPage onClose={handleLoginClose}/>
       			</DialogContent>:
    	   <DialogContent style={{maxWidth:'950px',minWidth:'350px',paddingLeft:'15px',paddingRight:'15px'}}><SignPage onClose={e=>setOpen(false)}/></DialogContent>
       }
            
      </Dialog>
      <Parallax image={require("assets/img/main.jpg")} style={{height:'fit-content'}}>
        <div className={classes.container} style={{textAlign:'-webkit-right',marginTop:'2%'}}>
        <br/>
        <br/>
            <GridItem xs={12} sm={6} md={5} >
              <h3 className={classes.title} style={{marginTop:'10%',marginBottom:'0'}}>Welcome To Plism Plus.</h3>
              <h5>
                Every landing page needs a small description after the big bold
                title, that{"'"}s why we added this text here. Add here all the
                information that can make you or your product create the first
                impression.
              </h5>
                <br />
                <SectionCarousel />               
            </GridItem>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
      </Parallax>

       <div className={classNames(classes.main, classes.mainRaised)} style={{marginLeft:'15px',marginRight:'15px'}}>
        <div className={classes.container}>
			<GridContainer justify="space-between" style={{backgroundColor:'#FFF',width:'unset',margin:'unset'}}>
				<GridItem xs={12} sm={12} md={7}>
					<Board data={boardData} tableRownum={numCnt} onClickHandle ={handleAddRow} totPage={totpage}/>
				</GridItem>
				<GridItem xs={12} sm={12} md={4}>
					<SectionHsnImo />
				</GridItem>
			</GridContainer>
			<hr/>
			<GridItem xs={12}>
			<SectionCarouselPs data={chainData}/>
			</GridItem>
			
        </div>
      </div>
      {/* <GridItem xs={12} sm={12} md={12}>
      	<Board data={boardData} tableRownum={numCnt} onClickHandle ={handleAddRow} totPage={totpage}/>
      </GridItem>
      <Footer store={userStore}/>*/}
      <Footer token={auth.getUser()}/>
	   <Snackbar open={alertOpen} autoHideDuration={2500} onClose={handleAlertClose}>
		<Alert 
			onClose={handleAlertClose}
			severity={severity}>
				{errMessage}
		</Alert>
	</Snackbar>
    </div>
  );
}
//))


//export default LandingPage;
