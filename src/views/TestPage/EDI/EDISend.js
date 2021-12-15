import React,{ useState, useEffect } from "react";
import {
	makeStyles
} from '@material-ui/core/styles';
import clsx from 'clsx';
import axios from 'axios';
import Moment from 'moment';
import GridItem from "components/Grid/GridItem.js";
import CardIcon from "components/Card/CardIcon.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js"
import CardHeader from "components/Card/CardHeader.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";

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
	CircularProgress,
	Icon,
	TextField
} from '@material-ui/core';

import {
	//KeyboardArrowUp, 
	//KeyboardArrowDown,
	//    Delete as DeleteIcon,
	   Search as SearchIcon
} from '@material-ui/icons';
    
//import { red } from '@material-ui/core/colors';

import {Alert} from '@material-ui/lab';
import Row from 'views/TestPage/EDI/SendRow.js'

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
	return <Alert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles(styles);
export default function EdiSend(props) {
	const classes = useStyles();
    const [severity, setSeverity] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const [errMessage, setErrmessage] = useState("");
	const [fromDate,setFromDate] = useState(new Date(Moment(new Date()).subtract(7,'days')));
	const [toDate,setToDate] = useState(new Date());
	const [copyFromDate, setCopyFromDate] = useState(null);
	const [copyToDate, setCopyToDate] = useState(null);
	const [searchData,setSearchData] = useState([]);
	const [num, setNum] = useState(1);

	const [fromRecipient, setFromRecipient] = useState("");
	const [beforeRecipient, setBeforeRecipient] = useState("");
	const [afterRecipient, setAfterRecipient] = useState("");

	const [copyFromRecipient, setCopyFromRecipient] = useState("");
	const [copyBeforeRecipient, setCopyBeforeRecipient] = useState("");
	const [copyAfterRecipient, setCopyAfterRecipient] = useState("");
	
	const [fromXmlId, setFromXmlId] = useState("");
	const [copyFromXmlId, setCopyFromXmlId] = useState("");

	const [beforeXmlId, setBeforeXmlId] = useState("");
	const [copyBeforeXmlId, setCopyBeforeXmlId] = useState("");

	const [afterXmlId, setAfterXmlId] = useState("");
	const [copyAfterXmlId, setCopyAfterXmlId] = useState("")
	
	useEffect(()=> {
		onSubmit();
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
	
	const onSubmit = () => {
		if(props.userData) {
			axios.post("/com/mapout",{
				recipient:fromRecipient,
				beforeRecipient:beforeRecipient,
				afterRecipient:afterRecipient,
				fromXmlId:fromXmlId,
				beforeXmlId:beforeXmlId,
				afterXmlId:afterXmlId,
				fromDate:new Date(Moment(fromDate).subtract(1,'days')),
				toDate:new Date(Moment(toDate).add(1,'days')),
				num:1
			}).then(
				res=>{
					if(res.statusText==="OK"){
						if(res.data.length>0){
							setSearchData(res.data);
							setCopyFromDate(new Date(Moment(fromDate).subtract(1,'days')));
							setCopyToDate(new Date(Moment(toDate).add(1,'days')));
							setCopyFromRecipient(fromRecipient);
							setCopyBeforeRecipient(copyBeforeRecipient);
							setCopyAfterRecipient(copyAfterRecipient);
							setCopyFromXmlId(fromXmlId);
							setCopyBeforeXmlId(beforeXmlId);
							setCopyAfterXmlId(afterXmlId);
							setNum(1);
							alertMessage('조회가 완료되었습니다.','success');
						}else {
							alertMessage('조회결과가 없습니다.','error');
							setSearchData([]);
						}
					}else {
						alertMessage('조회 할 수 없습니다. 잠시후 다시 시도해주세요.','error');
					}
				}
			)
		}else {
			alertMessage('로그인 정보가 없습니다.','error');
		}
	}
	
	const onMore = () => {
        if(props.userData){
            setNum(ev => ev+1);
            axios.post("/com/mapout",{
				recipient:copyFromRecipient,
				beforeRecipient:copyBeforeRecipient,
				afterRecipient:copyAfterRecipient,
				fromDate:copyFromDate,
				toDate:copyToDate,
				fromXmlId:copyFromXmlId,
				beforeXmlId:copyBeforeXmlId,
				afterXmlId:copyAfterXmlId,
				num:num+1
			}).then(
                res=>{
                    if(res.statusText==="OK"){
						alertMessage('조회가 완료되었습니다.','success');
                        if(res.data.length>0){
                            setSearchData([...searchData,...res.data]);
                        }
                    }else {
						alertMessage('조회 할 수 없습니다. 잠시후 다시 시도해주세요.','error');
					}
                }
            )
        }else {
			alertMessage('로그인 정보가 없습니다.','error');
        }
	}
	
	return (	
		<div style={{paddingLeft:'10px',paddingRight:'10px'}}>
            <Card style={{marginBottom:'1px'}}>
				<CardHeader color="info" stats icon >
					<CardIcon color="info" style={{height:'55px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
					</CardIcon>
					<h4>EDI 전송목록</h4>
				</CardHeader>
				<CardContent style={{padding:'2px' ,marginBottom: '5px'}}>
					<GridItem>
						<Grid container spacing={2}>
							<Grid item xs={4} sm={4} md={4}>
								<TextField
									label="Recipient From"
									value={fromRecipient}
									onChange={(e)=>setFromRecipient(e.target.value)}
									fullWidth
								/>
							</Grid>
							<Grid item xs={4} sm={4} md={4}>
								<TextField
									label="Recipient Before"
									value={beforeRecipient}
									onChange={(e)=>setBeforeRecipient(e.target.value)}
									fullWidth
								/>
							</Grid>
							<Grid item xs={4} sm={4} md={4}>
								<TextField
									label="Recipient After"
									value={afterRecipient}
									onChange={(e)=>setAfterRecipient(e.target.value)}
									fullWidth
								/>
							</Grid>
						</Grid>
					</GridItem>
					<GridItem>
						<Grid container spacing={2}>
							<Grid item xs={4} sm={4} md={4}>
								<TextField
									label="XML ID From"
									value={fromXmlId}
									onChange={(e)=>setFromXmlId(e.target.value)}
									fullWidth
								/>
							</Grid>
							<Grid item xs={4} sm={4} md={4}>
								<TextField
									label="XML ID Before"
									value={beforeXmlId}
									onChange={(e)=>setBeforeXmlId(e.target.value)}
									fullWidth
								/>
							</Grid>
							<Grid item xs={4} sm={4} md={4}>
								<TextField
									label="XML ID After"
									value={afterXmlId}
									onChange={(e)=>setAfterXmlId(e.target.value)}
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
								<TableCell style={{borderRight:'1px solid', backgroudColor:'#333333'}} colSpan={14} align="center">
									From
								</TableCell>
								<TableCell style={{borderRight:'1px solid', backgroudColor:'#333333'}} colSpan={8} align="center">
									Before To
								</TableCell>
								<TableCell colSpan={8} align="center">
									After To
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">No.</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">XML MSG ID</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">LOGIN ID</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">ORIGINATOR</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">RECIPIENT</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">DOC NAME</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">SEND METHOD</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">STATUS</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">TARGET XML MSG ID</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">TIMESTAMP</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">ERROR CODE</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">ERROR MSG</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">ERROR TIMESTAMP</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7',borderRight:'1px solid'}} align="center">CUR STATUS</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">DOC MSG ID</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">XML MSG ID</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">LOGIN ID</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">ORIGINATOR</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">RECIPIENT</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">ERROR CODE</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">CUR STATUS</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">TIMESTAMP</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">DOC MSG ID</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">XML MSG ID</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">LOGIN ID</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">ORIGINATOR</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">RECIPIENT</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">ERROR CODE</TableCell>
								<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">CUR STATUS</TableCell>
									<TableCell style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center">SEND TIME</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{searchData.map((row,index) => (
								<Row key={index} value={row}/>
							))}
						</TableBody>

						{searchData.length >= 10 ? searchData[0] !==null ? Number(searchData[0].out_p.tot_page) !== num ? (
						<TableFooter>
							<TableRow>
								<TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={31}>
									<Button
										style={{minWidth:'100%'}}
										variant="contained"
										color="info"
										onClick={() => onMore()}>
										{`MORE( ${num} / ${searchData[0].out_p.tot_page} )`}
						
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