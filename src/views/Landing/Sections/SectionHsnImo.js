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

import NavPills from "components/NavPills/NavPillsMain.js";

import axios from 'axios';

const useStyles = makeStyles(styles);

export default function SectionHsnImo() {

  const classes = useStyles();
  const [activeTab, setActiveTab] = React.useState(0);
  
  const [hsData, setHsData] = React.useState([]);
  const [hsCode, setHsCode] = React.useState("");
  const [hscodeOpen, setHscodeOpen] = React.useState(false);
  
  const [imoData, setImoData] = React.useState([]);
  const [imo, setImo] = React.useState("");
  const [imoOpen, setImoOpen] = React.useState(false);
  
  const setStatData = (event) => {
	  
      console.log("reset");

  }
  
  const hs_search = () => {
	  if(hsCode) {
	  axios.post("/api/elasticHsSearch",{hs:hsCode})
	    .then(setHsData([]))
	    .then(res => {
	    	if(res.data) {console.log("hs data",res.data);	
	    			  setHsData(res.data);
	                  setHscodeOpen(true);	
		    } else {
		    	setHsData({satmntPrdlstNm:"데이터가 존재하지 않습니다."});
	            setHscodeOpen(true);	
		    }}
	    		)
	    .catch(err => {
	       alert(err);
	       setHscodeOpen(false);
	    });
	  } else {
		  alert("조회할 코드를 입력해주세요.");
		  setHscodeOpen(false);
	  }
  }
  
  const reset = () => {
	  setHscodeOpen(false)
	  setHsCode("");
  }
  
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
  
  const resetImo = () => {
	  setImoOpen(false)
	  setImo("");
  }
  
  
  
  return (
			<NavPills
		        color="info"
		        setStatData={event=>setStatData(event)}
		        active={activeTab}
		        tabs={[
		          {
		            tabButton: "HSCODE",
		            tabContent: (
		            		<div  className={classes.infoArea} style={{padding:'0'}}>
			        	 		<div className={classes.descriptionWrapper}>
			        	 			<p style={{marginTop:'15px',marginBottom:'3px',color:'#555'}}>국제통일 상품분류체계에 따라 대외 무역거래 상품을 총괄적으로 분류한 품목 분류 코드</p>
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
			        				      	fullWidth>조회하기</Button>
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
			                      HSCODE 조회 결과
			                    </h4>
			                  </DialogTitle>
			                  
			                    <DialogContent
			                      id="notice-modal-slide-description"
			                      className={classes.modalBody}
			                    >
			        		            <Table>
			        				     <TableHead>
			        			            <TableRow>
			        				            <TableCell style={{paddingBottom:'0'}}>품목번호</TableCell>
			        				            <TableCell style={{paddingBottom:'0'}}>품명</TableCell>
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
		            )
		          },
		          {
		            tabButton: "IMO",
		            tabContent: (
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
		                        onClick={() => resetImo()}
		                        color="info"
		                        round
		                      >
		                        Close
		                      </Button>
		                    </DialogActions>
		                  </Dialog>
		                 </div>
		            )
		          }
		        ]}
			/>
  );
}



