/* eslint-disable */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { Link,Redirect  } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
//import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
//import ShoppingCart from "@material-ui/icons/ShoppingCart";
import ViewDay from "@material-ui/icons/ViewDay";
import Dns from "@material-ui/icons/Dns";
//import Build from "@material-ui/icons/Build";
//import ListIcon from "@material-ui/icons/List";
//import People from "@material-ui/icons/People";
//import Assignment from "@material-ui/icons/Assignment";
//import MonetizationOn from "@material-ui/icons/MonetizationOn";
//import Chat from "@material-ui/icons/Chat";
//import Call from "@material-ui/icons/Call";
//import ViewCarousel from "@material-ui/icons/ViewCarousel";
//import AccountBalance from "@material-ui/icons/AccountBalance";
//import ArtTrack from "@material-ui/icons/ArtTrack";
//import ViewQuilt from "@material-ui/icons/ViewQuilt";
//import LocationOn from "@material-ui/icons/LocationOn";
import Fingerprint from "@material-ui/icons/Fingerprint";
//import AttachMoney from "@material-ui/icons/AttachMoney";
//import Store from "@material-ui/icons/Store";
//import AccountCircle from "@material-ui/icons/AccountCircle";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Layers from "@material-ui/icons/Layers";
//import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import LineStyle from "@material-ui/icons/LineStyle";
//import Error from "@material-ui/icons/Error";
import axios from 'axios';
// core components
import CustomDropdown from "components/CustomDropdown/CustomKitDropdown.js";
//import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
	const { dropdownHoverColor,isAuthenticated } = props;
	console.log("header page IsAuthenticated status:",isAuthenticated);
  //console.log("header Link props:",props);
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
	    axios.post("/auth/logout")
	    .then(res => {
	        if (res.data.message){
	        	alert(res.data.message);
	        } else {
	        	props.logOut();
	        }
	        	//window.location.href = "/login"; //alert(res.data.userid + " �α��� ����");
	    })
	    .catch(err => {
	        console.log(err);
	        //window.location.href = "/Landing";
	    })

  }

  return (
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="SCHEDULE"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/admin/schedule" className={classes.dropdownLink}>
              <LineStyle className={classes.dropdownIcons} /> SCHEDULE
            </Link>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="CODE"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={ViewDay}
          dropdownList={[
            <Link
              to="/admin/portcode"
              className={classes.dropdownLink}
              onClick={e => smoothScroll(e, "headers")}
            >
              <Dns className={classes.dropdownIcons} /> PORT CODE
            </Link>,
          ]}
        />
      </ListItem>
        <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="MANAGE"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={ViewDay}
          dropdownList={[
            <Link
              to="/admin/manage"
              className={classes.dropdownLink}
              onClick={e => smoothScroll(e, "headers")}
            >
              <Dns className={classes.dropdownIcons} /> MANAGE
            </Link>,
          ]}
        />
      </ListItem>
      {isAuthenticated==false?
	  <ListItem className={classes.listItem}>
	     <Link to="#" 
	    	 className={classes.dropdownLink}
	     	onClick={props.onLoginOpen}>
              <Fingerprint className={classes.dropdownIcons} /> Login
       </Link>
	  </ListItem>
	  :
	  <ListItem className={classes.listItem}>
	     <Link   to="#"   // component="button"
          //variant="body2"
          onClick={
            logout
          } className={classes.dropdownLink}>
           <Fingerprint className={classes.dropdownIcons} /> LogOut
           </Link>
	  </ListItem>
        }
    </List>
  );
}

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
