import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import {Collapse} from "@material-ui/core";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
//import VerifiedUser from "@material-ui/icons/VerifiedUser";
//import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//import InfoArea from "components/InfoArea/InfoAreaLanding.js";
//import bgimage from "assets/img/tracking.png";

import styles from "assets/jss/material-kit-pro-react/components/infoStyle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Button from "components/CustomButtons/Button.js";
import {Select,TextField,Grid} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Close from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";


import axios from 'axios';

const useStyles = makeStyles(styles);

export default function ProductSection() {

  const classes = useStyles();
  const [hsData, setHsData] = React.useState([]);
  const [hsCode, setHsCode] = React.useState("");
  const [hscodeOpen, setHscodeOpen] = React.useState(false);
  
  
  const hs_search = () => {
	  if(hsCode) {
	  axios.post("/api/elasticHsSearch",{hs:hsCode})
	    .then(setHsData([]))
	    .then(res => {
	    	if(res.data) {console.log("hs data",res.data);	
	    			  setHsData(res.data);
	                  setHscodeOpen(true);	
		    } else {
		    	setHsData({satmntPrdlstNm:"???????????? ???????????? ????????????."});
	            setHscodeOpen(true);	
		    }}
	    		)
	    .catch(err => {
	       alert(err);
	       setHscodeOpen(false);
	    });
	  } else {
		  alert("????????? ????????? ??????????????????.");
		  setHscodeOpen(false);
	  }
  }
  
  const reset = () => {
	  setHscodeOpen(false)
	  setHsCode("");
  }
  
  
  
  return (
		<div  className={classes.infoArea} style={{padding:'0'}}>
	 		<div className={classes.descriptionWrapper}>
	 			<h4 style={{color:'#555',minHeight:'unset',textDecoration:'none',fontFamily:'"Roboto Slab", "Times New Roman", serif',marginTop:'0',marginBottom:'3px'}}>HS CODE ??????</h4>
	 			<p style={{marginBottom:'3px',color:'#555'}}>???????????? ????????????????????? ?????? ?????? ???????????? ????????? ??????????????? ????????? ?????? ?????? ??????</p>
			</div>	
			<GridContainer justify="center">
				<GridItem xs={12} sm={8} md={7} >
					<TextField id="searchBar1"
						onChange={event => setHsCode(event.target.value)} 
				    	variant="outlined" size="small" value={hsCode} fullWidth  />
				</GridItem>
				<GridItem xs={12} sm={4} md={5} >
					<Button  color="info" size="sm"  onClick={hs_search} 
				    	endIcon={<SearchIcon/>} 
				      	style={{paddingTop:'11px',paddingBottom:'11px',marginTop:'0'}} 
				      	fullWidth>????????????</Button>
				</GridItem>
			</GridContainer>
			<Dialog
            classes={{
              root: classes.modalRoot,
              paper: classes.modal
            }}
            open={hscodeOpen}
           // TransitionComponent={Transition}
            keepMounted
            onClose={() => reset()}
            aria-labelledby="notice-modal-slide-title"
            aria-describedby="notice-modal-slide-description"
          >
			<DialogTitle
            id="notice-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <h4 >
              HSCODE ?????? ??????
            </h4>
          </DialogTitle>
          
            <DialogContent
              id="notice-modal-slide-description"
              className={classes.modalBody}
            >
		            <Table>
				     <TableHead>
			            <TableRow>
				            <TableCell style={{paddingBottom:'0'}}>????????????</TableCell>
				            <TableCell style={{paddingBottom:'0'}}>??????</TableCell>
				        </TableRow>
				     </TableHead>
				     <TableBody>
					     <TableRow>
				            <TableCell style={{paddingBottom:'0'}}>{hsData.prdlstCd}&nbsp;{hsData.prdlstCdDetail}</TableCell>
				            <TableCell style={{paddingBottom:'0'}}>{hsData.satmntPrdlstNm}</TableCell>
				         </TableRow>
				     </TableBody>
			     </Table>
            </DialogContent>
            <DialogActions
              className={
                classes.modalFooter + " " + classes.modalFooterCenter
              }
            >
              <Button
                onClick={() => reset()}
                color="info"
                round
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
    </div>
  );
}
