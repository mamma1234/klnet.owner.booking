/* eslint-disable */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { Link,Redirect  } from "react-router-dom";
import Button from "components/CustomButtons/Button.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
//import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import {
  AttachMoney as DemDetIcon, 
  DirectionsBoatOutlined as LocationIcon, 
  Link as CustomsIcon, 
  // Error as Error, 
  ShoppingBasketOutlined as ShoppingBasket,
  Fingerprint as Fingerprint,
  PersonAdd as PersonAdd,
  Layers as Layers,
  // LineStyle as LineStyle, 
  InsertChartOutlinedOutlined as InsertChartOutlinedOutlinedIcon,
  DirectionsBoatOutlined as DirectionsBoat,
  // BuildOutlined as Build,
  // ListOutlined as ListIcon,
  // PeopleOutlined as People,
  // AssignmentOutlined as Assignment,
  // MonetizationOnOutlined as MonetizationOn,
  // ChatOutlined as Chat,
  // CallOutlined as Call,
  // ShoppingCart as ShoppingCart,
  // ViewCarouselOutlined as ViewCarousel,
  ScheduleOutlined as Schedule,
  AccountBalanceOutlined as AccountBalance,
  // ArtTrackOutlined as ArtTrack,
  // ViewQuiltOutlined as ViewQuilt,
  LocationOnOutlined as LocationOn,
  // AttachMoneyOutlined as AttachMoney,
  StoreOutlined as Store,
  AccountCircleOutlined as AccountCircle,
  Settings as SettingIcon,
  ImportExport as ImportExport,
  LocalShipping as LocalShipping,
  // Link as LinkIcon,
  Public as Public,
  // Info as Info,
  // Dns as Dns,
  // ViewDay as ViewDay,
  // Apps as Apps,
  NoteAdd as PostAddIcon,
  CloudUploadOutlined as CloudUploadOutlined,
  ViewList as ListIcon,
  Adjust, } from '@material-ui/icons'
import axios from 'axios';
// core components
import CustomDropdown from "components/CustomDropdown/CustomKitDropdown.js";
//import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";
// import { observer, inject} from 'mobx-react'; // 6.x
const useStyles = makeStyles(styles);


 export default function HeaderLinks(props) {
//const HeaderLinks = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => {   
//console.log("header prop:",props);
	const { dropdownHoverColor ,isAuthenticated, userData} = props;

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScroll = (e, target) => {
    if (window.location.pathname === "/sections") {
      var isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      );
      if (isMobile) {
        // if we are on mobile device the scroll into view will be managed by the browser
      } else {
        e.preventDefault();
        var targetScroll = document.getElementById(target);
        scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
      }
    }
  };
  const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function() {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };
  //var onClickSections = {};

  
  const classes = useStyles();
   
  const logout = () => {
    //console.log(">>>logout button click");
	    axios.post("/auth/logout" )
	    .then(res => {
	        if (res.data.message){
	        	alert(res.data.message);
	        } else {
	        	// auth.logOut();
                //userStore.setUser('');
                //userStore.setToken('');
	        	props.logOut();
	        }
	    })
	    .catch(err => {
	        console.log(err);
	        //window.location.href = "/Landing";
	    })

  }
  
  const clean = () => {
	  //userStore.setUser('');
	  //userStore.setToken('');
  }

  return (
		  <div className={classes.mlAuto}>
		  	<GridItem xs={12} sm={12} md={12} >
			  	<List className={classes.list + " " + classes.mlAuto} style={{flexFlow:'row-reverse'}}>
			  		{isAuthenticated==false?
			  		<>
			  		<ListItem className={classes.listItem} >
					   <Link to="/authpage/register" className={classes.dropdownLink}
					   onClick={clean}
					   style={{paddingTop:'0',paddingBottom:'0'}}
					   >
				         <PersonAdd className={classes.dropdownIcons} /> SIGNUP
				       </Link>
				  </ListItem>
				  <ListItem className={classes.listItem}>
				     <Link to="#" 
				    	 className={classes.dropdownLink}
				     	onClick={props.onLoginOpen}
				     style={{paddingTop:'0',paddingBottom:'0'}}>
			              <Fingerprint className={classes.dropdownIcons} /> LOGIN
			       </Link>
				  </ListItem>
				  </>
				  
		    :
		    <div>
		    <ListItem className={classes.listItem}>
			     <Link   to="/svc/setting"  className={classes.dropdownLink} style={{paddingTop:'0',paddingBottom:'0'}}>
		       <SettingIcon className={classes.dropdownIcons} /> Setting
		      </Link>
		    </ListItem>    
			  <ListItem className={classes.listItem} >
			     <Link   to="#"   // component="button"
		          //variant="body2"
		          onClick={
		            logout
		          } className={classes.dropdownLink}
			     style={{paddingTop:'0',paddingBottom:'0'}}>
		           <AccountCircle className={classes.dropdownIcons} /> LOGOUT
		           </Link>
			  </ListItem>
		    </div>
		        }
			{isAuthenticated && userData.role=="Y"?"[ADMIN] "+userData.user_name:isAuthenticated?userData.user_name:null} {isAuthenticated?" 님 환영합니다.":null}
		    </List>  
		  	</GridItem>
		  	<GridItem xs={12} sm={12} md={12}>
    <List className={classes.list + " " + classes.mlAuto}>
    
    {isAuthenticated && userData.role=="Y"?
	    <ListItem className={classes.listItem}>
		    <Link to="/admin" 
		   	 className={classes.dropdownLink}
		    style={{paddingTop:'5px',paddingBottom:'5px'}}
		    >
		         <AccountBalance className={classes.dropdownIcons} /> ADMIN MENU
		  </Link>
		  </ListItem>
		  :null}
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="BL UPLOAD"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
            style:{paddingTop:'5px',paddingBottom:'5px'}
          }}
          buttonIcon={CloudUploadOutlined}
          
          dropdownList={[
            <Link to="/svc/uploadbl" className={classes.dropdownLink} refresh="true">
              <PostAddIcon className={classes.dropdownIcons} /> M-B/L
            </Link>,
            <Link to="/svc/hblupload" className={classes.dropdownLink}>
              <CloudUploadOutlined className={classes.dropdownIcons} /> H-B/L
            </Link>
          ]}
        />
      </ListItem>

      {/* Booking  */}
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="BOOKING"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
            style:{paddingTop:'5px',paddingBottom:'5px'}
          }}
          buttonIcon={Adjust}
          dropdownList={[
            <Link to="/svc/bkdash" className={classes.dropdownLink} refresh="true">
              <InsertChartOutlinedOutlinedIcon className={classes.dropdownIcons} /> BOOKING DASHBOARD
            </Link>,
            <Link to="/svc/bookinglist" className={classes.dropdownLink} refresh="true">
              <ListIcon className={classes.dropdownIcons} /> BOOKING LIST
            </Link>,
            <Link to="/svc/confirmlist" className={classes.dropdownLink} refresh="true">
              <ListIcon className={classes.dropdownIcons} /> CONFIRM LIST
            </Link>,
            <Link to="/svc/srlist" className={classes.dropdownLink} refresh="true">
              <ListIcon className={classes.dropdownIcons} /> SR LIST
            </Link>,
            <Link to="/svc/bllist" className={classes.dropdownLink} refresh="true">
              <ListIcon className={classes.dropdownIcons} /> BL LIST
            </Link>,
            
          ]}
        />
      </ListItem>




      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="LOCATION"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
            style:{paddingTop:'5px',paddingBottom:'5px'}
          }}
          buttonIcon={LocationOn}
          dropdownList={[
            <Link to="/svc/tracking" className={classes.dropdownLink} refresh="true">
              <LocationIcon className={classes.dropdownIcons} /> TRACKING
            </Link>,
            <Link to="/svc/flightinfo" className={classes.dropdownLink}>
              <Layers className={classes.dropdownIcons} /> SHIP FLIGHT INFO
            </Link>
          ]}
        />
      </ListItem>
        <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="DEM/DET/OSC"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
            style:{paddingTop:'5px',paddingBottom:'5px'}
          }}
          buttonIcon={DemDetIcon}
          dropdownList={[
            <Link to="/svc/demDet/Import" className={classes.dropdownLink} refresh="true">
              <DirectionsBoat className={classes.dropdownIcons} /> IMPORT
            </Link>,
            <Link to="/svc/demDet/Export" className={classes.dropdownLink}>
              <Layers className={classes.dropdownIcons} /> EXPORT
            </Link>,
            <Link to="/svc/mapService" className={classes.dropdownLink}>
              <Layers className={classes.dropdownIcons} /> SUMMARY
            </Link>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="Schedule"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
            style:{paddingTop:'5px',paddingBottom:'5px'}
          }}
          buttonIcon={Schedule}
          dropdownList={[
            <Link
              to="/svc/fcl"
              className={classes.dropdownLink}
              onClick={e => smoothScroll(e, "headers")}
            >
              <ShoppingBasket className={classes.dropdownIcons} /> FCL-SEA
            </Link>,
            <Link
            to="/svc/cal"
            className={classes.dropdownLink}
            onClick={e => smoothScroll(e, "headers")}
          >
            <LocalShipping className={classes.dropdownIcons} /> TERMINAL
          </Link>
          ]}
        />
      </ListItem>
        <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="CUSTOMS"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
            style:{paddingTop:'5px',paddingBottom:'5px'}
          }}
          buttonIcon={CustomsIcon}
          dropdownList={[
            <Link
              to="/svc/unipassapi"
              className={classes.dropdownLink}
              onClick={e => smoothScroll(e, "headers")}
            >
              <ImportExport className={classes.dropdownIcons} /> UNIPASS API SERVICE
            </Link>
          ]}
        />
      </ListItem>
     {/*   <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="COMMON"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
            style:{paddingTop:'5px',paddingBottom:'5px'}
          }}
          buttonIcon={AccountBalance}
          dropdownList={[
            <Link
              to="#"
              className={classes.dropdownLink}
              onClick={e => smoothScroll(e, "headers")}
            >
              <ImportExport className={classes.dropdownIcons} /> HS CODE
            </Link>,
            <Link
            to="#"
            className={classes.dropdownLink}
            onClick={e => smoothScroll(e, "headers")}
          >
            <Public className={classes.dropdownIcons} /> IMO
          </Link>,
          <Link
          to="#"
          className={classes.dropdownLink}
          onClick={e => smoothScroll(e, "headers")}
        >
          <Public className={classes.dropdownIcons} /> 품명
        </Link>,
          <Link
          to="#"
          className={classes.dropdownLink}
          onClick={e => smoothScroll(e, "headers")}
        >
          <Public className={classes.dropdownIcons} /> CRM 계산기
        </Link>
          ]}
        />
      </ListItem>*/}
    </List>
    </GridItem>
    </div>
  );
}
//))

//export default HeaderLinks;

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};

