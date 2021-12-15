import React,{ useState, useEffect } from "react";
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Card from "components/Card/Card.js";
import {Avatar, Card as MessageCard, MenuItem, CardContent, CardHeader, Paper, Grid, Button, ButtonGroup, ListItemText,// AppBar,
	//Tabs, Tab, Box, 
	Typography, //Table,
	IconButton, 
	//Collapse, TableHead, TableRow, TableCell, TableFooter, TableBody, Divider, 
	CardActions, 
	//Popover, 
	Menu, ListItemIcon} from '@material-ui/core';
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import {//KeyboardArrowUp, KeyboardArrowDown,
	Assignment,AttachMoney,Navigation, MoreVert, NotificationsActive, Delete as DeleteIcon, Settings} from '@material-ui/icons';
//import { red } from '@material-ui/core/colors';
import Moment from 'moment';
import {Link} from "react-router-dom";
import { withStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
	root: {
	  position: 'fixed',
	  bottom: theme.spacing(2),
	  right: theme.spacing(2),
	},
	container:{
		display:'flex',
		alignItems:'center'
	},
	border: {
		borderBottom:'2px solid #BDBDBD',
		width:'100%'
	},
	content: {
		padding: '10px',
		whiteSpace:'nowrap'
	},
	wrapButton: {
		marginTop:'10px'
	},
	putComponent:{
		margin:'0 auto',
		textAlign:'center',
		textAlignLast:'center',
	}
	
  }));
const StyleMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5'
	},
})((props)=> (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical:'bottom',
			horizontal:'center'
		}}
		transformOrigin={{
			vertical:'top',
			horizontal:'center'
		}}
		{...props}/>
))
  
const StyleMenuItem = withStyles((theme) => ({
	root: {
	}
}))(MenuItem)

function TabPanel(props) {
	const{ children, value, index, ...other} = props;

	return(
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			{...other}>
			{value === index && (
				<div>
				{children}
				</div>
			)}
		</div>
	);
}

TabPanel.propTypes= {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
}
/*function a11yProps(index) {
	return{ 
		id: `tab-${index}`,
		'aria-controls': `tabpanel-${index}`
	}
}*/

function Row(props) {
    const { row } = props;
	const [div, setDiv] = React.useState(props.div);
	const [readFlag,setReadFlag]= React.useState(props.row.read_flag);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = (e) => {
		setAnchorEl(e.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
    return (
		<div style={{marginTop:div===true?'15px':'0px'}}>
		{div===true?(<Div component={Moment(row.insert_date).format('YYYY년 MM월 DD일')}/>):null}
		<MessageCard onClick= {() => {
			if(readFlag === "N") {
				axios.post("/com/readPush", {push_seq:row.push_seq}, {headers:props.userData}).then(
					res=> {
						if(res.statusText==="OK") {
							setReadFlag("Y")
						}
					}
				)
			}
		}
		} >  
			<CardHeader 
				avatar={<Avatar>{row.service_gubun==="NT"?<Assignment color="action"/>:row.service_gubun==="DD"?<AttachMoney color="action"/>:row.service_gubun==="TR"?<Navigation color="action"/>:null}</Avatar>}
				title={row.service_gubun==="NT"?"[공지사항]":row.service_gubun==="DD"?" [Dem Det]":row.service_gubun==="TR"? "[Tracking]":""}
				subheader={row.push_title}
				action={
					<IconButton onClick={handleClick}>
						<MoreVert/>
					</IconButton>}>
			</CardHeader>
			<StyleMenu
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}>
				<StyleMenuItem>
					<ListItemIcon>
						<DeleteIcon fontSize="small"/>
					</ListItemIcon>
					<ListItemText primary="삭제"/>
				</StyleMenuItem>
			</StyleMenu>
            <CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
				{row.push_body}
				</Typography>
			</CardContent>
			<CardActions style={{float:'right'}} disableSpacing>
				{readFlag!=="Y"?(<NotificationsActive color="error"/>):null}
				<span>{Moment(row.insert_date).format('HH:mm')}</span>
			</CardActions>
		</MessageCard>
		</div>
    );
}
function Div(props) {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<div className={classes.border}/>
				<span className={classes.content}>{props.component}</span>
			<div className={classes.border}/>
		</div>
	)
}
export default function PushHistory(props) {
	const setEndDate = new Date();
	const isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
	const classes = useStyles();
	const [searchRow, setSearchRow] = useState([])
	const [toDate, setToDate] = useState(Moment(setEndDate).format('YYYY-MM-DD'));
	const [fromDate, setFromDate]= useState(Moment(new Date(setEndDate.setDate(setEndDate.getDate()-7))).format('YYYY-MM-DD'));
	const [token] = useState(props.token);
	let temp = "";
	useEffect(() => {
		console.log(props.userData)
		if (isMobile) {
			if(props.userData) {
			axios.post("/com/pushMessageSearch",{deviceId:window.deviceId, param:'A'}).then(
				res=> {
					if(res.statusText ==="OK") {
						setSearchRow(res.data)
					}
				})
				.catch(err => {
					if(err.response !== undefined ) {
						if(err.response.status === 403||err.response.status === 401) {
						// props.openLogin();
						}
					}
				}); 
			}
		}
        return () => {
            console.log('cleanup');
        };
	   },[]);
	
	const onChangeView = (param) => {
		axios.post("/com/pushMessageSearch",{deviceId:window.deviceId, param:param}).then(
			res=> {
				if(res.statusText ==="OK") {
					setSearchRow(res.data)
				}
			})
			.catch(err => {
				if(err.response !== undefined ) {
					if(err.response.status === 403||err.response.status === 401) {
					// props.openLogin();
					}
				}
			}); 
	}
	const onChangeSearchTime = (e, position) => {

		let time= Moment(e).format('YYYY-MM-DD')
		if(position ==="start") {
			

			if(time < toDate){ 
				axios.post("/com/pushMessageSearch",{deviceId:window.deviceId, param:'TIME', startDate: time, endDate: toDate}).then(
					res=> {
						if(res.statusText ==='OK') {
							setSearchRow(res.data);
							setFromDate(time);
						}
				}).catch(err => {
					if(err.response !== undefined ) {
						if(err.response.status === 403||err.response.status === 401) {
						// props.openLogin();
						}
					}
				}); 
			}else {
				alert('종료시간보다 시작시간이 더 큽니다');
				return;
			}

		}else {
			if(time > fromDate){ 
				axios.post("/com/pushMessageSearch",{deviceId:window.deviceId, param:'TIME', startDate: fromDate, endDate: time}).then(
					res=> {
						if(res.statusText ==='OK') {
							setSearchRow(res.data);
							setToDate(time);
						}
					})
					// .catch(err => {
					// 	if(err.response !== undefined ) {
					// 		if(err.response.status === 403||err.response.status === 401) {
					// 		props.openLogin();
					// 		}
					// 	}
					// }); 
				
			}else {
				alert('종료시간이 시작시간보다 작습니다.');
				return;
			}
		}

	}
	return (	
		<div>
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					<Grid container spacing={1}>
						<Grid item xs={6} sm={6} md ={6}> 
							<CalendarBox
								labelText ="From"
								id="fromDate"
								variant="inline"
								format="yyyy-MM-dd"
								//inputVariant="outlined"
								//margin="dense"
								setValue={fromDate}
								autoOk={true}
								onChangeValue={date => onChangeSearchTime(date,'start')}
								formControlProps={{fullWidth: true}} 
							/>
						</Grid>
						<Grid item xs={6} sm={6} md ={6}>
							<CalendarBox
								labelText ="To"
								id="toDate"
								variant="inline"
								format="yyyy-MM-dd"
								//inputVariant="outlined"
								//margin="dense"
								setValue={toDate}
								autoOk={true}
								onChangeValue={date => onChangeSearchTime(date,'end')}
								formControlProps={{fullWidth: true}}
							/>
						</Grid>
					</Grid>
						
					<Grid container spacing={1}>
						<Grid item xs={12} sm={12} md ={12}> 
							<ButtonGroup size="small" variant="text" color="primary" fullWidth>
								<Button size="small" onClick= {() => onChangeView('D')}>Today</Button>
								<Button size="small" onClick= {() => onChangeView('W')}>This Week</Button>
								<Button size="small" onClick= {() => onChangeView('M')}>This Month</Button>
								<Button size="small" onClick= {() => onChangeView('Y')}>This Year</Button>
								<Button size="small" onClick= {() => onChangeView('A')}>All</Button>
							</ButtonGroup>
						</Grid>
					</Grid>
				</GridItem>
			</GridContainer>
			{searchRow.length > 0?(
			<Paper>
				{searchRow.map((row,index) => {
					console.log('temp =====',temp)
					if(index === 0 ){
						temp = Moment(row.insert_date).format('YYYY-MM-DD');
						return(<Row key={index} row={row} token={token} div={true}/>)
					}else {
						if(temp === Moment(row.insert_date).format('YYYY-MM-DD')) {
							return(<Row key={index} row={row} token={token} div={false}/>)
						}else {
							temp = Moment(row.insert_date).format('YYYY-MM-DD');
							return(<Row key={index} row={row} token={token} div={true}/>)
						}
						
					}
				})}
			</Paper>
			):(	
				<div className={classes.putComponent} style={{textAlignLast:'center',height:'340px'}}>
					<div style={{marginTop:'30%'}}>
					<span> No Result</span><br></br>
					<Link to={{
						pathname : `/svc/setting`,}}>
						<IconButton>
							<Settings className={classes.iconSize}/>Go To Setting
						</IconButton>
					</Link>
					</div>
				</div>
			)}
		</div>

	);
}		