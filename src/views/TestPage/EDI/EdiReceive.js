import React,{ useState, useEffect } from "react";

import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Moment from 'moment';
import GridItem from "components/Grid/GridItem.js";
import CardIcon from "components/Card/CardIcon.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js"
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import CardHeader from "components/Card/CardHeader.js";
import {
	CardContent,
	Grid,
	Snackbar,
	TableContainer,
	Table,
	TableHead,
	TableCell,
	TableBody,
	TableRow,
	Paper,
	TableFooter,
	TextField,
	Icon,
} from '@material-ui/core';

import {//KeyboardArrowUp, KeyboardArrowDown,
   Delete as DeleteIcon, Search as SearchIcon} from '@material-ui/icons';

import {
	Autocomplete as Autocomplete,
	Alert as MuiAlert
} from '@material-ui/lab';
//import { red } from '@material-ui/core/colors';


import Row from 'views/TestPage/EDI/ReceiveRow.js'

const styles = {
	cardCategoryWhite: {
	  "&,& a,& a:hover,& a:focus": {
		color: "rgba(255,255,255,.62)",
		margin: "0",
		fontSize: "14px",
		marginTop: "0",
		marginBottom: "0"
	  },
	  "& a,& a:hover,& a:focus": {
		color: "#FFFFFF"
	  }
	},
	formControl: {
		minWidth: 120,
		maxWidth: 300,
	},
	cardTitleWhite: {
	  color: "#FFFFFF",
	  marginTop: "0px",
	  minHeight: "auto",
	  fontWeight: "300",
	  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
	  marginBottom: "3px",
	  textDecoration: "none",
	  "& small": {
		color: "#777",
		fontSize: "65%",
		fontWeight: "400",
		lineHeight: "1"
	  }
	},
	buttonProgress: {
	  color: '#00ACC1',
	  position: 'absolute',
	  bottom: '1%',
	  left: '50%',
	  marginTop: -12,
	  marginLeft: -12
	},
	cardTitleBlack: {
	  textAlign: "left",
	  color: "#000000",
	  minHeight: "auto",
	  fontWeight: "300",
	  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
	  marginBottom: "3px",
	  textDecoration: "none",
	  "& small": {
		color: "#777",
		fontSize: "65%",
		fontWeight: "400",
		lineHeight: "1"
		}
	},
	tablecontainer: {
	  maxHeight:'750px',
	},
	table: {
	  minWidth: 750,
	},
	buttonSuccess: {
	  backgroundColor: '#00ACC1',
	  '&:hover': {
		  backgroundColor: '#00ACC1'
	  }
	},
	tableRoot:{
		width:'100%'
	}
  };
function AlertComponent(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles(styles);
export default function EdiReceive(props) {
	const classes = useStyles();
	const setEndDate = new Date();
    const [severity, setSeverity] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const [errMessage, setErrmessage] = useState("");
	const [fromDate,setFromDate] = useState(new Date(setEndDate.setDate(setEndDate.getDate()-7)));
	const [toDate,setToDate] = useState(new Date());
	const [copyFromDate, setCopyFromDate] = useState(null);
	const [copyToDate, setCopyToDate] = useState(null);
	const [copyOriginator, setCopyOriginator] = useState("");
	
	const [searchData,setSearchData] = useState([]);
	const [num, setNum] = useState(1);
	const [originatorList, setOriginatorList] = useState([]);
	const [originator, setOriginator] = useState("");

	const [fromRecipient,setFromRecipient] = useState("");
	const [toRecipient,setToRecipient] = useState("");
	const [copyFromRecipient, setCopyFromRecipient] = useState("");
	const [copyToRecipient, setCopyToRecipient] = useState("");

	const [copyFromXmlId, setCopyFromXmlId] = useState("");
	const [copyToXmlId, setCopyToXmlId] = useState("");
	const [fromXmlId, setFromXmlId] = useState("");
	const [toXmlId, setToXmlId] = useState("");

	useEffect(()=>{
		if(props.userData){
			axios.post("/com/originator",{}).then(
				res=> {
					if(res.statusText==="OK"){
						setOriginatorList(res.data);
					}
				}
			)
		}
	},[])
	const handleAlertClose = (event, reason) => {
		if(reason ==='clickaway') {
			return;
		}
		setAlertOpen(false);
	  }
	
	const alertMessage = (message,icon) => {
		setErrmessage(message);
		setSeverity(icon);
		setAlertOpen(true);
	}
	
	const onChangeOriginator = (e,data) => {
		if(data) {setOriginator(data.originator);} else {setOriginator("");}
	  }
	const onSubmit = () => {
		if(props.userData) {
			if(originator.length ===0) {
				alertMessage("ORIGINATOR 를 선택해주세요","error");
				return;
			}
			let formatFromDate = fromDate;
			let formatTodate = toDate;
			if((Moment(fromDate).isValid()&&(Moment(fromDate).isValid()))){
				if( Moment.duration( Moment(toDate).diff(Moment(fromDate))).asDays() > 7) {
					alertMessage("날짜 간격을 7일 이내로 선택 해 주세요.","error");	
					return;
				}
				formatFromDate = Moment(new Date(Moment(fromDate).subtract(1,'days'))).format('YYYYMMDD');
				formatTodate = Moment(new Date(Moment(toDate).add(1,'days'))).format('YYYYMMDD');
			}else {
				alertMessage("날짜 형식에 맞지 않습니다..","error");
				return;
			}
			axios.post("/com/oraMapin",{
				fromRecipient:fromRecipient,
				toRecipient:toRecipient,
				fromXmlId:fromXmlId,
				toXmlId:toXmlId,
				originator:originator,
				fromDate:formatFromDate,
				toDate:formatTodate,
				num:1
			}).then(
				res=>{
					if(res.statusText==="OK"){
						if(res.data.length>0){
							console.log(res.data)
							alertMessage("조회가 완료되었습니다.","success");
							setSearchData(res.data);
							setCopyFromDate(formatFromDate);
							setCopyToDate(formatTodate);
							setCopyOriginator(originator);
							setCopyFromRecipient(fromRecipient);
							setCopyToRecipient(toRecipient);
							setCopyToXmlId(toXmlId);
							setCopyFromXmlId(fromXmlId);
							setNum(1);
						}else {
							alertMessage("조회 결과가 없습니다..","error");
							setSearchData([]);
						}
					}
				}
			)
		}else {
			alertMessage("로그인 정보가 없습니다.","error");
		}
	}
	const onMore = () => {
		if(props.userData){
			axios.post("/com/oraMapin",{
				fromRecipient:copyFromRecipient,
				toRecipient:copyToRecipient,
				fromXmlId:copyFromXmlId,
				toXmlId:copyToXmlId,
				originator:copyOriginator,
				fromDate:copyFromDate,
				toDate:copyToDate,
				num:num+1
			}).then(
				res=>{
					if(res.statusText==="OK"){
						setNum(ev => ev+1);
						if(res.data.length>0){
							
							alertMessage("조회가 완료되었습니다.","success");
							setSearchData([...searchData,...res.data]);
						}
					}
				}
			)
		}else {
			alertMessage("로그인 정보가 없습니다.","error");
		}
	}
	return (	
		<div style={{paddingLeft:'10px',paddingRight:'10px'}}>
            <Card style={{marginBottom:'1px'}}>
				<CardHeader color="info" stats icon >
					<CardIcon color="info" style={{height:'55px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
					</CardIcon>
					<h4>EDI 수신</h4>
				</CardHeader>
				<CardContent style={{padding:'2px' ,marginBottom: '5px'}}>
					<GridItem>
						<Grid container spacing={2}>
							<Grid item xs={4} sm={4} md={4}>
								<TextField
									label="From Recipient"
									value={fromRecipient}
									onChange={(e)=>setFromRecipient(e.target.value)}
									fullWidth
								/>
							</Grid>
							<Grid item xs={4} sm={4} md={4}>
								<TextField
									label="To Recipient"
									value={toRecipient}
									onChange={(e)=>setToRecipient(e.target.value)}
									fullWidth
								/>
							</Grid>
							<Grid item xs={4} sm={4} md={4}>
								<Autocomplete
									options = {originatorList}
									getOptionLabel = { option => option.originator}
									id="originator"
									onChange={(e,v)=> onChangeOriginator(e,v)}
									renderInput={params => (
										<TextField inputProps={{maxLength:4}} {...params} label="ORIGINATOR" fullWidth />
									)}
								/>
							</Grid>
						</Grid>
					</GridItem>
					<GridItem>
						<Grid container spacing={2}>
							<Grid item xs={4} sm={4} md={4}>
								<TextField
									label="From XML ID"
									value={fromXmlId}
									onChange={(e)=>setFromXmlId(e.target.value)}
									fullWidth
								/>
							</Grid>
							<Grid item xs={4} sm={4} md={4}>
								<TextField
									label="To XML ID"
									value={toXmlId}
									onChange={(e)=>setToXmlId(e.target.value)}
									fullWidth
								/>
							</Grid>
						</Grid>
					</GridItem>
					<GridItem>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} md={3}>
								<CalendarBox
									labelText ="from"
									id="fromDate"
									format="yyyy-MM-dd"
									setValue={fromDate}
									autoOk
									onChangeValue={date => setFromDate(date)}
									formControlProps={{fullWidth: true}}/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<CalendarBox
									labelText ="to"
									id="toDate"
									format="yyyy-MM-dd"
									setValue={toDate}
									autoOk
									onChangeValue={date => setToDate(date)}
									formControlProps={{fullWidth: true}} 
								/>
							</Grid>
							
							<Grid item xs={12} sm={12} md={2}>
								<Grid >
									<Button variant="contained" endIcon={<SearchIcon></SearchIcon>} color="primary" fullWidth onClick={() => onSubmit()} >Search</Button>
								</Grid>
							</Grid>
						</Grid>
					</GridItem>
				</CardContent>
			</Card>
			<Paper className={classes.tableRoot}>
			<TableContainer className={classes.tablecontainer}>
				<Table 	
					// stickyHeader
					aria-label="sticky table"
					className={classes.table}
					size='medium'
					style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
					<TableHead>
						<TableRow>
							<TableCell style={{borderRight:'1px solid', backgroudColor:'#333333'}} colSpan={12} align="center">
								From
							</TableCell>
							<TableCell colSpan={12} align="center">
								To
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">No.</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">DOC MSG ID</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">XML MSG ID</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">LOGIN ID</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">ORIGINATOR</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">RECIPIENT</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">TIMESTAMP</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">DOC NAME</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">DOC CODE</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">ERROR CODE</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">ERROR MSG</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">DOC NO</TableCell>

							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">XML MSG ID</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">ORIGINATOR</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">RECIPIENT</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">DOC NAME</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">DOC CODE</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">CUR STATUS</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">TIMESTAMP</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">SOURCE XML MSG ID</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">ERROR CODE</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">ERROR MSG</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">TIMESTAMP</TableCell>
							<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">CUR STATUS</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{searchData.map((row,index) => (
						<Row key={index} value={row} />
						))}
					</TableBody>
					{searchData.length >= 10 ?searchData[0]!==null? Number(searchData[0].TOT_PAGE) !== num ? (
					<TableFooter>
						<TableRow>
							<TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={31}>
								<Button
									style={{minWidth:'100%'}}
									variant="contained"
									color="info"
									onClick={() => onMore()}>
									{`MORE( ${num} / ${searchData[0].TOT_PAGE} )`}
									
								</Button>
							</TableCell>
						</TableRow>
					</TableFooter>): null : null : null } 
				</Table>
			</TableContainer>
			</Paper>
			<Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
				<AlertComponent 
					onClose={handleAlertClose}
					severity={severity}>
						{errMessage}

				</AlertComponent>
			</Snackbar>
		</div>

	);
}		