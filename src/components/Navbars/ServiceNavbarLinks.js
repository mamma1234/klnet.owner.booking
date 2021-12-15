import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from '@material-ui/core/Tooltip';

import {Dialog,
  DialogTitle,
  DialogContent,
  Icon,
  Paper,
  Hidden,
  Popper,
  Divider,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Typography,
  Snackbar,FormControlLabel, Switch,
} from '@material-ui/core';

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import CardIcon from "components/Card/CardIcon.js";

// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Search from "@material-ui/icons/Search";
import HighlightOff from '@material-ui/icons/HighlightOff';
// core components
//import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.js";
import sidebarStyle from "assets/jss/material-dashboard-pro-react/components/sidebarStyle.js";
//import Cookies from "js-cookie";
//import { observer, inject} from 'mobx-react'; // 6.x
import TablePageing from 'components/Navbars/ServiceNotiTable.js';
import { timerStore ,userStore} from 'store/userStore.js';
import {observer} from 'mobx-react-lite';

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(sidebarStyle);

const HeaderLinks=(props)=> {
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openMsgMore, setOpenMsgMore] = React.useState(false);
  const [msgMoreData, setMsgMoreData] = React.useState([]);
  const [severity, setSeverity] = React.useState('');
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [errMessage, setErrmessage] = React.useState('');
  const [noticeModal, setNoticeModal] = React.useState(false);
  const { rtlActive, userData, isLogOut } = props;

  const [msgCnt, setMsgCnt] = React.useState('');
  const [msg, setMsg] = React.useState([]);

  //console.log("isAuthenticated:",isAuthenticated);

  React.useEffect(() => {
    // console.log(props.userData, '>>>>>', props.authLoading);
    let mounted = true;
    async function callAxio() {
      if (props.userData && !props.authLoading) {
        const res = await axios.post('/com/getUserNotice');
        mounted && setMsgCnt(res.data[0].noti_cnt);
      }
    }
    callAxio();
    return () => {
      console.log('cleanup');
      mounted = false;
    };
  }, [props.userData]);

  // const msgCheck = async() => {
  //   if(props.userData){

  // 	 await axios.post("/com/getUserNotice")
  // 	    .then(res =>  {
  //           if(res.data){
  //           setMsgCnt(res.data[0].noti_cnt)
  //           }else{
  //           }
  //         }
  //       ).catch(err => {
  // 	       console.log("getUserNotice err) loading",);
  // 	    });
  //     }
  //  }

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

  const handleClickNotification = event => {  
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const [openProfile, setOpenProfile] = React.useState(null);

  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const classes = useStyles();

  const classes2 = useStyles2();

  /*  const searchButton =
    classes.top +
    " " +
    classes.searchButton +
    " " +
    classNames({
      [classes.searchRTL]: rtlActive
    });*/
    const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover, {
      [classes.dropdownItemRTL]: rtlActive
    });
    const wrapper = classNames({
      [classes.wrapperRTL]: rtlActive
    });
    const managerClasses = classNames({
      [classes.managerClasses]: true
    });

  const handleLogout = ()=>{
    isLogOut()
    alertMessage('로그아웃이 되었습니다. 메인화면으로 이동됩니다.','success');
    setTimeout(()=>{props.history.push('/newhome')},1500);
    }

  const handleSelectMsg = (event) => {
    if (props.userData) {
      axios
        .post('/com/getUserMessage') //.then(res=>console.log(res.data))
        .then((res) => {
          setMsg(res.data);
          setMsgCnt(0);
        })
        .catch((err) => {
          if (err.response.status === 403 || err.response.status === 401) {
            handleLogout();
            //    auth.logOut();
            props.history.push('/newhome');
          }
        });
    }

    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };

  const handleMoreMessage = () => {
    axios
      .post('/com/getUserMoreNotice')
      .then((res) => {
        setMsgMoreData(res.data);
        setOpenNotification(null);
        setOpenMsgMore(true);
      })
      .catch((err) => {
        console.log('HeaderLinks err', err);
        if (err.response.status === 403 || err.response.status === 401) {
          handleLogout();
          //    auth.logOut();
          props.history.push('/newhome');
        }
      });
  };

  const handleClose = () => {
    setOpenMsgMore(false);
  };

  function DialogComponet(props) {
    return (
      <Dialog
        open={openMsgMore}
        onClose={handleClose}
        //PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogContent style={{padding:'0',minWidth:'430px',maxWidth:'680px'}}>
          <MsgMoreTable />
        </DialogContent>
      </Dialog>
    );
  }

  function DialogMessage(props) {
    return (
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.modal,
        }}
        open={noticeModal}
        //TransitionComponent={Transition}
        keepMounted
        onClose={() => setNoticeModal(false)}
        aria-labelledby="notice-modal-slide-title"
        aria-describedby="notice-modal-slide-description"
      >
        <DialogTitle
          id="notice-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <h4 className={classes.modalTitle}>
            How Do You Become an Affiliate?
          </h4>
        </DialogTitle>
        <DialogContent
          id="notice-modal-slide-description"
          className={classes.modalBody}
        >
          <p>
            If you have more questions, don{"'"}t hesitate to contact us or send
            us a tweet @creativetim. We{"'"}re here to help!
          </p>
        </DialogContent>
      </Dialog>
    );
  }

  const MsgMoreTable = () => {
    return (
      <div>
        <HighlightOff
          onClick={handleClose}
          style={{
            color: '#7a7a7a',
            top: '2',
            right: '2',
            position: 'absolute',
          }}
        />
        <Card className={classes.justifyContentCenter}>
          <CardHeader color="info" stats icon style={{ paddingBottom: '2px' }}>
            <CardIcon color="info" style={{ height: '56px' }}>
              <Icon
                style={{ width: '26px', fontSize: '20px', lineHeight: '26px' }}
              >
                content_copy
              </Icon>
            </CardIcon>
            <Typography
              variant="h6"
              style={{ flexGrow: '1', textAlign: 'start', color: '#7a7a7a' }}
            >
              More then Notice
            </Typography>
          </CardHeader>
          <CardBody style={{ paddingBottom: '2px' }}>
            <TablePageing
              tableHeaderColor="info"
              tableHead={['no', 'MSG', 'FROM', 'NOTI_DATE', 'EVENT']}
              tableData={msgMoreData}
              {...props}
            />
          </CardBody>
        </Card>
      </div>
    );
  };

  const MsgView = (props) => {
    return <h3> test </h3>;
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenNotification(null);
    }
  }
  const Timer = observer(() => {
    return ( 
    <>
      [{timerStore.timer}]
      <Switch 
      checked={timerStore.getAutoRenew} 
      onChange={event => onLogintoggle(event.target.checked)}
      name='checkedA'
      color="primary"
      inputProps={{"aria-labelledby":"자동로그인갱신"}}
      size= "small"
      // edge="start"
      />
      </>
    );
  });

  const onLogintoggle = (e)=>{
    timerStore.setAutoRenew=e;
  }

  return (
    <div className={wrapper} style={{fontWeight:'400'}}>
      <Hidden smDown >
        {userData?
        <>
           {userData.role == 'Y'
             ? `[ADMIN]    ${userData.user_name} 님  `
              : `${userData.user_name}님  `}
            {userStore.admin 
              ?(
                ` (관리자:${userStore.admin.user_name}) `
              ):''
            }
          <Tooltip title={timerStore.autoRenew? '자동 로그인 갱신' : '자동 로그아웃'} aria-label="autoLogout">
            <span style={{cursor:'pointer'}} onClick={()=>{onLogintoggle(!timerStore.getAutoRenew)}}>
              {/* padding: '10px 5px 10px 3px' , */}
                <Timer />  
            </span>
          </Tooltip>
        </>
          : null}
      </Hidden>
            
      {userData ? 
          <Button
            color="transparent"
            justIcon
            aria-label="Notifications"
            aria-owns={openNotification ? "notification-menu-list" : null}
            aria-haspopup="true"
            onClick={handleSelectMsg}
            className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
            muiClasses={{
              label: rtlActive ? classes.labelRTL : ""
            }}
          >
           <Notifications
    	            className={
    	              classes.headerLinksSvg +
    	              " " +
    	              (rtlActive
    	                ? classes.links + " " + classes.linksRTL
    	                : classes.links)
    	            }
    	    />
          {msgCnt > 0 ?<span className={classes.notifications}>{msgCnt}</span>:null}
          <Hidden mdUp implementation="css">
            <span
              onClick={handleClickNotification}
              className={classes.linkText}
            >
              {rtlActive ? 'إعلام' : 'Notification'}
            </span>
          </Hidden>
        </Button>
       : null}
      <div className={managerClasses}>
        <Popper
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openNotification,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true,
          })}
        >
          <Paper className={classes.dropdown}>
            <ClickAwayListener onClickAway={handleCloseNotification}>
              {msg.length > 0 ? 
                <MenuList  onKeyDown={(event)=>handleListKeyDown(event)}>
                  {msg.map((data, key) => {
                    return (
                      <MenuItem
                      key={key}
                      onClick={handleCloseNotification}
                      className={dropdownItem}
                      style={{whiteSpace:'unset',paddingTop:'3px',paddingBottom:'3px',paddingLeft:'10px',paddingRight:'10px'}}
                      >
                        <Typography variant="body2" style={{maxWidth:'400px',minWidth:'400px',color:'#999'}}>{data.message}<br/><font size="1">{data.message_from}({data.message_insert_date})</font></Typography>
                        <Divider />
                      </MenuItem>
                    );
                  })}
                    <MenuItem onClick={handleMoreMessage} className={dropdownItem}>
                    <Typography variant="body2" style={{color:'#999'}}>... 더보기</Typography></MenuItem>
                </MenuList>
               : 
                <MenuList>
                  <MenuItem className={dropdownItem}>
                    메시지가 존재하지 않습니다.
                  </MenuItem>
                </MenuList>
              }
            </ClickAwayListener>
          </Paper>
        </Popper>
      </div>

      <div className={managerClasses}>
        {userData ? (
          <Button
          color="transparent"
          aria-label="Person"
          justIcon
          aria-owns={openProfile ? "profile-menu-list" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : ""
          }}
        > 
           <Person
            className={
              classes.headerLinksSvg +
              " " +
              (rtlActive
                ? classes.links + " " + classes.linksRTL
                : classes.links)
            }
          /> 
            <Hidden mdUp implementation="css">
              <span onClick={handleClickProfile} className={classes.linkText}>
              {userData?userData.role=="Y"?"[ADMIN] "+userData.user_name+"님":userData.user_name+"님":null}
              </span>
            </Hidden>
          </Button>
        ) : (
          <Button
            color="transparent"
            justIcon
            aria-label="Notifications"
            aria-owns={openNotification ? 'notification-menu-list' : null}
            aria-haspopup="true"
            onClick={props.onLoginPageOpen}
            className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
            muiClasses={{
              label: rtlActive ? classes.labelRTL : '',
            }}
          >
            <Person
              className={
                classes.headerLinksSvg +
                ' ' +
                (rtlActive
                  ? classes.links + ' ' + classes.linksRTL
                  : classes.links)
              }
            />
          </Button>
        )}
    
        <Popper
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openProfile,
            [classes.popperNav2]: true,
          })}
        >
          {({ TransitionProps }) => (
            <Paper className={classes.dropdown}>
                {userData && (
                  <ClickAwayListener onClickAway={handleCloseProfile}>
                    <List style={{ marginLeft: '10px' }}>
                      {userData.role === 'Y' ? (
                        <ListItem
                          className={classes2.item + ' ' + classes2.userItem}
                        >
                          <NavLink
                            to={'/admin'}
                            style={{
                              color: '#636d79',
                              paddingTop: '8px',
                              paddingBottom: '8px',
                            }}
                            className={classes2.collapseItemLink}
                          >
                            {rtlActive ? '관리자메뉴전환' : 'Admin Menu Change'}
                          </NavLink>
                        </ListItem>
                      ) : null}
                      <ListItem
                        className={classes2.item + ' ' + classes2.userItem}
                      >
                        <NavLink
                          to={'/svc/profile'}
                          style={{
                            color: '#636d79',
                            paddingTop: '8px',
                            paddingBottom: '8px',
                          }}
                          className={classes2.collapseItemLink}
                        >
                          {rtlActive ? '사용자정보' : 'Profile'}
                        </NavLink>
                      </ListItem>
                      {/*<ListItem className={classes2.item + " " + classes2.userItem}>
                                  <NavLink
                                      to={"/svc/setting"}
                                      style={{color:'#636d79',paddingTop:'8px',paddingBottom:'8px'}
                                      }="}"
                                      className={classes2.collapseItemLink}>
                                      {rtlActive ? "설정" : "Settings"}</NavLink>
                              </ListItem>*/}
                      <ListItem
                        className={classes2.item + ' ' + classes2.userItem}
                      >
                        <NavLink
                          to={'#'}
                          style={{
                            color: '#636d79',
                            paddingTop: '8px',
                            paddingBottom: '8px',
                          }}
                          onClick={handleLogout}
                          className={classes2.collapseItemLink}
                        >
                          {
                          userStore.admin
                          ? 
                            rtlActive ? '세션아웃' : 'Session out'
                          : rtlActive ? '로그아웃' : 'Log out'
                          
                          }
                        </NavLink>
                      </ListItem>
                    </List>
                  </ClickAwayListener>
                )}
            </Paper>
          )}
        </Popper>
      </div>
      <DialogComponet />
      <Snackbar
        open={alertOpen}
        autoHideDuration={2500}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity={severity}>
          {errMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default observer(HeaderLinks);

HeaderLinks.propTypes = {
  rtlActive: PropTypes.bool,
};
