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
  
  const [imoData, setImoData] = React.useState([]);
  const [imo, setImo] = React.useState("");
  const [imoOpen, setImoOpen] = React.useState(false);

  
  const imo_search = () => {
	  if(imo) {
	  axios.post("/api/elasticImoSearch",{imo:imo})
	    .then(setImoData([]))
	    .then(res => {  console.log("imo data",res.data);		
	    			if(res.data) {
	    				setImoData(res.data);
	    				setImoOpen(true);
	    			} else {
						setImoData({imo:"",name:"데이터가 존재 하지 않습니다."});
						setImoOpen(true);
	    			}
	    		})
	    .catch(err => {
	       alert(err);
	       setImoOpen(false);
	    });
	  } else {
		  setImoOpen(false);
	  }
  }
  
  const reset = () => {
	  setImoOpen(false)
	  setImo("");
  }
  
  return (
	 	<div className={classes.infoArea} style={{padding:'0'}}>
	 		<div className={classes.descriptionWrapper}>
				<img src={require("assets/img/imo_image.png")} />
			</div>		      	   
			<GridContainer justify="center">
				<GridItem xs={12} sm={7} md={7} >
			    	<TextField id="searchBar2" //label={<font size="2">IMO CODE</font>} //onChange={event => setEmail(event.target.value)}
			      	      		onChange={event => setImo(event.target.value)} 
			      	      		variant="outlined" size="small" fullWidth style={{marginTop:'5px'}} value={imo}/>
			    </GridItem>
			    <GridItem xs={12} sm={5} md={5} >
			    	<Button  color="info" size="sm"  onClick={imo_search}
			    		endIcon={<SearchIcon/>} 
			    		style={{paddingTop:'11px',paddingBottom:'11px'}}
			    		fullWidth>조회하기</Button>
			    </GridItem>
		   	 </GridContainer>  	  
		   	<Dialog
            classes={{
              root: classes.modalRoot,
              paper: classes.modal
            }}
            open={imoOpen}
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
              IMO CODE 조회 결과
            </h4>
          </DialogTitle>
          
            <DialogContent
              id="notice-modal-slide-description"
              className={classes.modalBody}
            >
            <Table>
		     <TableHead>
	            <TableRow>
		            <TableCell style={{paddingBottom:'0'}}>IMO CODE</TableCell>
		            <TableCell style={{paddingBottom:'0'}}>IMO NAME</TableCell>
		        </TableRow>
		     </TableHead>
		     <TableBody>
		    	 <TableRow>
			            <TableCell style={{paddingBottom:'0'}}>{imoData.imo}</TableCell>
			            <TableCell style={{paddingBottom:'0'}}>{imoData.name}</TableCell>
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
