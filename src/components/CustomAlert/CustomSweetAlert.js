/*eslint-disable*/
import React,{useEffect} from "react";
import PropTypes from "prop-types";
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import { Card, IconButton, InputLabel, Checkbox, Input} from "@material-ui/core";
import {OpenInNew} from "@material-ui/icons";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(styles);

export default function SweetAlertPage(props) {
	const classes = useStyles();
	
	const {
		onConfirm,
		ontitle,
		type, // default,info,success,warning,danger,error,input,custom,controlled
		show, //type: boolean , default: true
		reverseButtons, // //type: boolean , default: false
		btnSize, // type: lg,sm,xs default:lg 
		confirmBtnText,
		cancelBtnText,
		subtitle,
		showConfirm,
		showCancel,
		onCancel,
		fncSetShowAlert
	} = props;

	const [showAlert,setShowAlert] = React.useState(false);
	// const [ontitle, setOntitle] = React.useState("");
	const [checkTerm, setCheckTerm] = React.useState(false);
	
	React.useEffect(()=>{
		// console.log("PROPS : ",props);
	  if(show) {
		  setShowAlert(show);
	  } else {
		  setShowAlert(false); 
	  }
	},[props]);

	// React.useEffect(()=>{
	// 	if( props.ontitle ) {
	// 		if( "CHECK_TERM" === props.ontitle ) {
	// 			const title = fncBookingTerms();
	// 			setOntitle(title);
	// 		} else {
	// 			setOntitle(props.ontitle);
	// 		}
	// 	}
	// },[props.ontitle]);

	// React.useEffect(()=>{
	// 	console.log("onConfirm : ",props.onConfirm);
	// 	return ()=>{
	// 		console.log("onConfirm CLREAR: ",props.onConfirm);
	// 	}


	
	const fncCheckConfirm=()=> {
        if( "CHECK_TERM_WDFC" === props.ontitle ) {
			// console.log(checkbox, checkbox.value);
            if( checkTerm ) {
				if( onConfirm ) {
					onConfirm();
				}
				hideAlert();
            } else {
                return false;
            }
        } else {
			if( onConfirm ) {
				onConfirm();
			}
			hideAlert();
		}
	}
	// },[props.onConfirm]);
	const hideAlert =()=>{
		setShowAlert(false);
	}

	const checkTermProps = (checkTermProps)=> {
		setCheckTerm(checkTermProps)
	}
	return (
	 <SweetAlert
	     type={type}
		 show={showAlert}
		 title={("CHECK_TERM_WDFC" === ontitle)
		 	?<BookingTerms
			 checkTermProps={checkTermProps}
			 />
			 : ontitle}
		 onConfirm={()=> fncCheckConfirm()}
	    //  onConfirm={()=>{
		// 	 if( onConfirm ) {
		// 		 onConfirm();
		// 	 }
		// 	 hideAlert();
		// }}
	     onCancel={()=>{
			if( onCancel ) {
				onCancel();
			}
			hideAlert();
	   }}
	     reverseButtons ={reverseButtons}
	     confirmBtnCssClass={classes.button + " " + classes.success}
	     cancelBtnCssClass={classes.button + " " + classes.danger}
	     showConfirm={showConfirm}
		 showCancel={showCancel}
	   >
     {subtitle}
	 <form id="termsForm" name="termsForm" >
		<input type="hidden" name="menuKey"     value="219" />
		<input type="hidden" name="contentKey"  value="45" />
	</form>
     </SweetAlert>
     );
}


const BookingTerms =(props)=>{
	const [checkTerm, setCheckTerm] = React.useState(false);

	useEffect(()=>{
		props.checkTermProps(checkTerm);
	}, [checkTerm])

	return(
		<GridContainer>
			{/* <GridContainer> */}
				<GridItem xl={1} lg={1} md={1} sm={1} className="ml-2 mr-0 pr-0 text-center">
					<Checkbox 
						checked={checkTerm}
						onChange={(e)=>setCheckTerm(!checkTerm)} 
						id="CONFIRM_CHECK_BOX"
						inputProps={{'aria-label':'secondary checkbox'}}>
					</Checkbox>
					</GridItem>
				<GridItem xl={9} lg={9} md={9} sm={9} className="mt-2 mr-0 pr-0 text-center">
					<h3 >
						위동 해운 화물 운송 동의 합니다.(필수)
					</h3>
				</GridItem>
				<GridItem xl={1} lg={1} md={1} sm={1} className="ml-0 mr-0 pr-0 text-center">
					<IconButton onClick={()=>{
						let form = document.termsForm;
						form.action = 'https://cargo.weidong.com/content/view.do';
						form.target = 'popReport'; // window.open() 의 두번째 변수와 동일해야.
						window.open('', 'popReport', 'width=1050px, height=850px');
						form.submit();

					}}>
					<OpenInNew 
						fontSize={'large'} />
					</IconButton>
					</GridItem>
	  
				{/* </GridContainer> */}
					{/* <UncontrolledTooltip delay={0} target="lineview">위동 해운 약관 상세 바로가기</UncontrolledTooltip> */}
		</GridContainer>
	)
}