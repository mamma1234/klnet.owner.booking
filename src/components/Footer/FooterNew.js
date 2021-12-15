/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Terms from './TermsOfService.js';
import Privacy from './PrivacyPolicy.js';
import Baltic from './BalticDry.js';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import styles from "assets/jss/material-dashboard-pro-react/components/footerStyle.js";
import Scfi from './Scfipage';
import TeuRank from './teuRank';
import PushHistory from './PushHistory'


const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { fluid, white, rtlActive } = props;
  const [open, setOpen] = React.useState(false);
  const [serviceText, setServiceText] = React.useState(""); //약관구분
  const [dialogSize, setDialogSize] = React.useState("sm");
  const isMobile = navigator.userAgent.search(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
// console.log('footernew.js', props.userData)
  function DialogComponet() {
  	  return (	  
  		<Dialog
  			open={open}
  		    onClose={handleClose}
  		    PaperComponent={serviceText!=="PU"?PaperComponent:PaperComponentNoDrag}
          aria-labelledby="draggable-dialog-title"
          maxWidth ={dialogSize}
  		>
  		<DialogContent>
        {serviceText === "T"?<Terms handleClose={handleClose}/>:
         serviceText ==="B"?(<Baltic handleClose={handleClose} param={props} token={props.token} userData={props.userData}/>):
         serviceText === "S"?<Scfi handleClose={handleClose} param={props} token={props.token} userData={props.userData}/>:
         serviceText === "U"?<TeuRank handleClose={handleClose} param={props} token={props.token} userData={props.userData}/>:
         serviceText === "PU"?<PushHistory handleClose={handleClose} param={props} token={props.token} userData={props.userData}/>:
         <Privacy handleClose={handleClose} />}
  		</DialogContent>
  		</Dialog>
  	  );
  }
  
  const handleClose = () => {
  	  setOpen(false);
  }

  function PaperComponent(props) {
  	  return (
  			  <Draggable>
  			  	<Paper {...props} />
  			  </Draggable>
  			  );
  }
  function PaperComponentNoDrag(props) {
    return (
        <Paper {...props} />
      );
  }
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white
  });
  var anchor =
    classes.a +
    cx({
      [" " + classes.whiteColor]: white
    });
  var block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white
  });
  const handleClickOpen = (event,name) => {
	  
	  if(name === "terms") {
      setServiceText("T");
      setDialogSize("sm");
	  } else if(name === "privacy") {
      setServiceText("P");
      setDialogSize("sm");
	  } else if(name === "baltic"){
      setServiceText("B");
      setDialogSize(false);
	  } else if(name === "scfi") {
      setServiceText("S");
      setDialogSize(false);
    } else if(name === "teu") {
      setServiceText("U");
      setDialogSize(false);
    } else if(name === "PUSH") {
      setServiceText("PU");
      setDialogSize(false);
    }
	  setOpen(true);
  }
  
  return (

            <>
              <ul className="company__info">
                <li className="company__info--item" onClick={event => handleClickOpen(event,'terms')}>
                  {rtlActive ? "이용약관" : "Terms Of Service"}
                </li>                               
                <li className="company__info--item"  onClick={event => handleClickOpen(event,'privacy')}>
                  {rtlActive ? "기업소개" : "Privacy Policy"}</li>
        
                <li className="company__info--item">
                 <Link to="/svc/board" style={{all:'inherit' ,margin:'0'}}>{rtlActive ? "게시판": 'Board'}</Link>
                </li>
  
                <li className="company__info--item"  onClick={event => handleClickOpen(event,'baltic')}>
                  {rtlActive ? "BDIY" : "Baltic Dry"}</li>
          
                 <li className="company__info--item"  onClick={event => handleClickOpen(event,'scfi')}>
                  {rtlActive ? "SCFI" : "SCFI"}</li>
        
                <li className="company__info--item"  onClick={event => handleClickOpen(event,'teu')}>
                  {rtlActive ? "TEU" : "TOP 100 CARRIERS"}</li>          
                  {isMobile !==-1?(          
                      <div className="company__info--item"  onClick={event => handleClickOpen(event,'PUSH')}>
                       {rtlActive ? "PUSH" : "Message"}</div>
            
                   ):null}
              </ul>
              <DialogComponet />
            </>
    
    // <footer className={classes.footer}>
    //   <div className={container}>
    //     <div className={classes.left}>
    //       <List className={classes.list}>
    //         <ListItem className={classes.inlineBlock} >
    //         <Link to="#" onClick={event => handleClickOpen(event,'terms')}>
    //             {rtlActive ? "이용약관" : "Terms Of Service"}
    //             </Link>
    //         </ListItem>
    //         <ListItem className={classes.inlineBlock} >
    //         <Link to="#" onClick={event => handleClickOpen(event,'privacy')}>
    //           {rtlActive ? "기업소개" : "Privacy Policy"}</Link>
    //       </ListItem>
    //         <ListItem className={classes.inlineBlock}>
    //         	<Link to="/svc/board">
    //         	{rtlActive ? "게시판": "Board"}
    //         	</Link>
    //         </ListItem>
    //         <ListItem className={classes.inlineBlock} >
    //           <Link to="#" onClick={event => handleClickOpen(event,'baltic')}>
    //             {rtlActive ? "BDIY" : "Baltic Dry"}</Link>
    //         </ListItem> 
    //         <ListItem className={classes.inlineBlock} >
    //           <Link to="#" onClick={event => handleClickOpen(event,'scfi')}>
    //             {rtlActive ? "SCFI" : "SCFI"}</Link>
    //         </ListItem> 
    //         <ListItem className={classes.inlineBlock} >
    //           <Link to="#" onClick={event => handleClickOpen(event,'teu')}>
    //             {rtlActive ? "TEU" : "TOP 100 CARRIERS"}</Link>
    //         </ListItem> 
    //         {isMobile !==-1?(
    //         <ListItem className={classes.inlineBlock} >
    //           <Link to="#" onClick={event => handleClickOpen(event,'PUSH')}>
    //             {rtlActive ? "PUSH" : "Message"}</Link>
    //         </ListItem> 
    //         ):null}
    //       </List>
    //     </div>
       
    //     <DialogComponet />
    //   </div>
    // </footer>
    
  );
}

Footer.propTypes = {
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool
};
