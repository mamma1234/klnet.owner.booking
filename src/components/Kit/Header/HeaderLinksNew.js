/* eslint-disable */
import React, { useEffect, useCallback,useRef } from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { Grid, FormControlLabel, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  PersonAdd,
  AccountBalanceOutlined as AccountBalance,
  AccountCircleOutlined as AccountCircle,
  Settings as SettingIcon,
} from '@material-ui/icons';
import FaceIcon from '@material-ui/icons/Face';
import Tooltip from '@material-ui/core/Tooltip';
import styles from 'assets/jss/material-kit-pro-react/components/headerLinksStyle.js';
import img_ico_utill_login_png from 'assets/img/ico_utill_login.png';

const useStyles = makeStyles(styles);
const ico_utill_login = { src: img_ico_utill_login_png, alt: 'my image' };
import { observer } from 'mobx-react-lite';
import { userStore, timerStore } from 'store/userStore.js';

const HeaderLinks = (props) => {
  //const klnetUrl ="https://auth.plismplus.com/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=https://www.plismplus.com/auth/klnet/callback&response_type=code&state=12345";
  //const klnetUrl ="https://devauth.plismplus.com/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=https://dev.plismplus.com/auth/klnet/callback&response_type=code&state=12345";
  // const klnetUrl ="http://localhost:5002/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=http://localhost:5000/auth/klnet/callback&response_type=code&state=12345";

  const host = window.location.hostname;
  let klnetUrl = '';
  if (host.indexOf('localhost') >= 0) {
    klnetUrl =
      'http://localhost:5002/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=http://localhost:5000/auth/klnet/callback&response_type=code&state=12345';
  } else if (host.indexOf('dev') >= 0) {
    klnetUrl =
      'https://devauth.plism.com/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=https://devbooking.plism.com/auth/klnet/callback&response_type=code&state=12345';
  } else if (host.indexOf('panlogis') >= 0) {
    klnetUrl =
      'https://auth.plism.com/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=https://service.panlogis.co.kr/auth/panlogis/callback&response_type=code&state=12345';
  } else {
    klnetUrl =
      'https://auth.plism.com/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=https://booking.plism.com/auth/klnet/callback&response_type=code&state=12345';
  }

  const {
    dropdownHoverColor,
    isAuthenticated,
    userData,
    setUserData,
    logOut,
    authLoading,
  } = props;

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScroll = (e, target) => {
    if (window.location.pathname === '/sections') {
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

  const classes = useStyles();

  const Timer = observer(() => {
    return <> [{timerStore.timer}]
     <Switch 
      checked={timerStore.getAutoRenew} 
      onChange={event => onLogintoggle(event.target.checked)}
      name='checkedA'
      color="primary"
      inputProps={{"aria-labelledby":"자동로그인갱신"}}
      size= "small"
      // edge="start"
      /></>;
  });
  const onLogintoggle = (e)=>{
    timerStore.setAutoRenew=e;
    // console.log(e,'>>>',timerStore.getAutoLogin, timerStore.autoLogin)
  }
  return (
    <div className="app-header__utill">
      {authLoading || !userStore.user ? (
        //http://localhost:5002/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=http://localhost:5000/auth/local/callback&response_type=code&state=12345
        //https://devauth.plismplus.com/oauth/join?client_id=bWFtbWEgTTAwMDAwMA==&redirect_uri=http://dev.plismplus.com/auth/klnet/callback&response_type=code&state=12345
        <ul style={{ width: '165px' }}>
          <li className="app-header__utill--item2">
            <a href={klnetUrl} className="app-header__utill--anchor">
              <img
                src={ico_utill_login.src}
                alt={ico_utill_login.alt}
                className={classes.dropdownIconsUtil}
                style={{ width: '19px', height: '14px', marginRight: '5px' }}
              />
              LOGIN
            </a>
          </li>
          <li className="app-header__utill--item2">
            <Link to="/authpage/register" className="app-header__utill--anchor">
              <PersonAdd className={classes.dropdownIconsUtil} />
              SIGN UP
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
        {/* {userStore.user && userStore.admin 
          ?(
            <li className="app-header__utill--item" >
              <div className="app-header__utill--anchor" style={{ cursor:'pointer'}}>
                <FaceIcon
                  className={classes.dropdownIconsUtil}
                  style={{ width: '15px', height: '15px' }}
                  />
                  관리자 : {userStore.admin.user_name}
              </div>
            </li>
          ) 
                
              // :userStore.user.role == 'Y' 
              //     ?(
              //       // <li className="app-header__utill--item" >
              //       //   <div className="app-header__utill--anchor" onClick={()=>{props.setModalGb("changeSession"); props.setOpen(true);}}style={{ cursor:'pointer'}}>
              //       //     <FaceIcon
              //       //       className={classes.dropdownIconsUtil}
              //       //       style={{ width: '15px', height: '15px' }}
              //       //     />
              //       //     세션전환
              //       //   </div>
              //       // </li>

              //       <li className="app-header__utill--item">
              //         <Link to="/admin" className="app-header__utill--anchor">
              //             <FaceIcon className={classes.dropdownIconsUtil} style={{width: '15px', height: '15px'}}/>ADMIN MENU
              //         </Link>	
              //       </li>
              //     ) 
          :''
        } */}
          <li className="app-header__utill--item">
            <Link to="/svc/profile" className="app-header__utill--anchor">
              <SettingIcon
                className={classes.dropdownIconsUtil}
                style={{ width: '15px', height: '15px' }}
              />
              PROFILE
            </Link>
          </li>
          {userStore.user && !userStore.admin ?(
              <li className="app-header__utill--item">
                <Link to="#" onClick={logOut} className="app-header__utill--anchor">
                  <AccountCircle
                    className={classes.dropdownIconsUtil}
                    style={{ width: '15px', height: '15px' }}
                  />
                  LOGOUT
                </Link>
              </li>)
            :(
              <li className="app-header__utill--item">
                <Link to="#" onClick={userStore.sessionOut} className="app-header__utill--anchor">
                  <AccountCircle
                    className={classes.dropdownIconsUtil}
                    style={{ width: '15px', height: '15px' }}
                  />
                  세션아웃
                </Link>
              </li>
            )
          }
        </ul>
      )}

      {/** <div style={{textAlign:'end', marginTop: '3px',fontWeight: '400'}}>*/}
      <div className="app-header__utill__isUser">
        {/* {isAuthenticated && userData.role=="Y"?<Link to="/admin">[ADMIN] </Link> :null} */}
        {!authLoading && userStore.user ? (
          <>
            {userData.user_name}님
            <Tooltip title={timerStore.autoRenew? '자동 로그인 갱신' : '자동 로그아웃'} aria-label="autoLogout">
            <span style={{cursor:'pointer'}} onClick={()=>{onLogintoggle(!timerStore.getAutoRenew)}}>
              <Timer />
            </span>
            </Tooltip>
            {/* <FormControlLabel
                    label="자동로그인"
                    control={
                      <Switch
                      // checked={isChecked}
                      // onChange={switchHandleChange}
                      name="only null"
                      size='small'
                      color="primary" />
                    }              
                    labelPlacement='bottom'
                    /> */}
          </>
        ) : null}
      </div>
    </div>
  );
};
//))

export default observer(HeaderLinks);

HeaderLinks.defaultProps = {
  hoverColor: 'primary',
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    'dark',
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'rose',
  ]),
};
