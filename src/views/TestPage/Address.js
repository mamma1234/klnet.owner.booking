import React,{ useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
//core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
//import Button from "components/CustomButtons/Button.js";
// core components
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import styles from "assets/jss/material-dashboard-pro-react/components/tableStyle.js";
//import axios from 'axios';
import TextField from '@material-ui/core/TextField';
//import CalendarBox from "components/CustomInput/CustomCalendar.js";
import LocalAddress from 'components/LocalAddress/LocalAddress.js';
import { Divider } from "@material-ui/core";

const useStyles = makeStyles(styles);
//let numCnt =1;

export default function ScrapResultList(props) {

	//주소검색
	const[addressPrarams, setAddressPrarams] = useState("");
	const[open, setOpen] = useState(false);
	const[returnAddress, setReturnAddress] = useState({});
	const[roadAddress, setRoadAddress] = useState("");
	const[jibunAddress, setJibunAddress] = useState("");
    useEffect(()=>{
		setRoadAddress(returnAddress.roadAddr);
		setJibunAddress(JSON.stringify(returnAddress, null, 4));
    }, [returnAddress]);
  const classes = useStyles();
  


  // OnBlur Addr 
  const fncOnBlurAddr = (e) => {
	// console.log(e.target.value);
	if( "" === e.target.value) return false;
	setAddressPrarams(e.target.value);
	setOpen(true);
  }

  // Enter Event Addr
  const fncOnKeyDownAddr = (e) => {
	if( "Enter" === e.key ) {
		if( "" === e.target.value) return false;
		setAddressPrarams(e.target.value);
		setOpen(true);
	}
  }

  

  return (
	<GridContainer>
		<GridItem xs={12} sm={12} md={12}>
			<Card style={{marginBottom:'0px'}}>
				<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
					<CardIcon color="info" style={{height:'26px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
					</CardIcon>
					<h4 className={classes.cardTitleBlack}>Search To Tacking Info </h4>
				</CardHeader>
			<CardBody>
				{/* 주소검색 */}
				<TextField id="addr" 
						label="주소입력"
						placeholder="예) 케이엘넷"
						onBlur={fncOnBlurAddr}
						onKeyDown={fncOnKeyDownAddr}
						fullWidth
						/>
				<Divider/>
				<TextField value={roadAddress} fullWidth></TextField>
				<TextField value={jibunAddress} 
				multiline
				rows={10}
				fullWidth></TextField>
			</CardBody>
		</Card>
		</GridItem>
		<LocalAddress
			open={open}
			params={addressPrarams}
			onClose={()=> setOpen(!open)}
			setReturnAddress={setReturnAddress}
			setOpen={setOpen}/>
	</GridContainer>
	
  );
}
//))
//export default ScrapResultList;
