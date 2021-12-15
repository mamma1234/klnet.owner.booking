import React,{ useState, useEffect } from "react";
import { makeStyles,useTheme } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {
	Button,
	Grid,
	Snackbar,
	Box,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton,
	TablePagination,
	InputBase,
	Divider,
	Paper,
	TableContainer,
	Tooltip
} from '@material-ui/core';
import {
	FirstPage as FirstPageIcon ,
	LastPage as LastPageIcon,
	KeyboardArrowRight as KeyboardArrowRight,
	KeyboardArrowLeft as KeyboardArrowLeft,
	Search as SearchIcon,
	ArrowForward as ArrowForward,
	Info as InfoIcon,
}from "@material-ui/icons";
import GridItem from "components/Grid/GridItem.js";
import axios from 'axios';
import {
	Alert as MuiAlert
} from '@material-ui/lab';
import Map from "components/Map/ImoSearchMap"
// import page
const styles = makeStyles((theme)=> ({
	root:{
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width:400
	},
	input: {
		marginLeft: theme.spacing(1),
		flex:2,
	},
	iconButton:{
		padding:10
	},
	divder: {
		height: 28,
		margin: 4
	},
	tablecontainer:{
		width:'100%'
	}

}));
const useStyles1 = makeStyles(theme => ({
	root:{
		flexShrink:0,
		marginLeft: theme.spacing(2.5),
	}
}));
function TablePageinationActions(props) {
	const classes = useStyles1();
	const theme = useTheme();


	const {count,page,rowsPerPage,onChangePage} = props;
	
	
	const handleFirstPageButtonClick = e => {
		onChangePage(e,0);
	}
	
	const handleBackButtonClick = e => {
		onChangePage(e,page -1);
	}
	
	const handleNextButtonClick = e => {
		onChangePage(e,page +1);
	}
	
	const handleLastPageButtonClick = e => {
		onChangePage(e,Math.max(0,Math.ceil(count / rowsPerPage)-1));
	}
	
	return (
		<div className = {classes.root}>
			<IconButton
				onClick = {handleFirstPageButtonClick}
				disabled={page === 0 }
				aria-label="first page">
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon/>}
			</IconButton>
			<IconButton
				onClick = {handleBackButtonClick}
				disabled={page === 0 }
				aria-label="previous page">
				{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick = {handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) -1 }
				aria-label="next page">
				{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick = {handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage)-1 }
				aria-label="last page">
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon/>}
			</IconButton>
		</div>
	);
	
}
TablePageinationActions.propTypes = {
	count:	PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage:PropTypes.number.isRequired,
}

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}

function Row(props) {
	const [value, setValue] = useState(props.row);

	useEffect(()=> {
		setValue(props.row);
		if(props.row.num === "1") {
			onSearch()
		}
	},[props.row]);


	const onSearch = () => {
		axios.post('/com/searchship', { param: value.imo }).then(
			res => {
				if(res.statusText==="OK"){
					if (res.data.length !== 0) {
						props.receiveData(res.data.response);
					}
				}
		})
	}

	return (
		<React.Fragment>
			<TableRow>
				<TableCell style={{paddingTop:'10px',paddingBottom:'10px'}}>
					{value.num}
				</TableCell>
				<TableCell align="center" style={{paddingTop:'10px',paddingBottom:'10px'}}>
					{value.imo}
				</TableCell>
				<TableCell align="center" style={{paddingTop:'10px',paddingBottom:'10px'}}>
					{value.call_sign}
				</TableCell>
				<TableCell align="center" style={{paddingTop:'10px',paddingBottom:'10px'}}>
					{value.mmsi}
				</TableCell>
				<TableCell align="center" style={{paddingTop:'10px',paddingBottom:'10px'}}>
					{value.ship_name}
				</TableCell>
				<TableCell style={{paddingTop:'10px',paddingBottom:'10px'}}>
					<IconButton onClick={()=>onSearch()}>
						<ArrowForward/>
					</IconButton>
				</TableCell>
			</TableRow>
		</React.Fragment>
	)
}

export default function ImoSearch(props) {
	const classes = styles();
	const [shipName, setShipName] = useState(props.location.search?new URLSearchParams(props.location.search).get('search'):"");
	const [alertOpen,setAlertOpen] = useState(false);
	const [severity, setSeverity] = useState("");
	const [message,setMessage] = useState("");
	const [vslList,setVslList] = useState([]);
	const [num, setNum] = useState(0);
	const [geoData, setGeoData] = useState([]);
	const [openPage, setOpenPage] = useState("");
	useEffect(()=> {
		onSearch();
	},[]);


	const handleAlertClose = (event, reason) => {
		if(reason ==='clickaway') {
			return;
		}
		setAlertOpen(false);
	}
	const handleChagePage = (e,newPage) => {
		setNum(newPage);
	}
	const onSearch = () => {
		axios.post("/api/imoSearch",{shipName:shipName}).then(
			setVslList([])
		).then(
			res=> {
				if(res.statusText === "OK") {
					if(res.data.length > 0) {
						setVslList(res.data);
						AlertMessage('조회가 완료 되었습니다.','success');
					}else {
						AlertMessage('검색 결과가 없습니다.','warning');
					}
				}
 			}
		)
	}
	const AlertMessage = (message,icon) => {
		setMessage(message)
		setSeverity(icon)
		setAlertOpen(true);
	}
	return (
		<div>
			<Box>
				<GridItem>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12} md={12}>
							<Paper component="form" className={classes.root}>
								<InputBase 
									className={classes.input}
									placeholder="Search Ship Name"
									onChange={event => setShipName(event.target.value)} 
									value={shipName}/>
								<Divider className={classes.divder} orientation="vertical"/>
								<Button className={classes.iconButton} size="medium" color="primary" variant="outlined" onClick={() => onSearch()}>
									<SearchIcon/>
								</Button>
							</Paper>
						</Grid>
					</Grid>
				</GridItem>
			</Box>
			<Box>
				<GridItem>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={8}>
							<TableContainer className={classes.tablecontainer}>
								<Table>
									<TableHead style={{backgroundColor:'#f2fefd'}} className={classes["info" + "TableHeader"]}>
										<TableRow style={{borderBottomStyle:'solid',borderBottomColor:'#00bcd4'}}>
											<TableCell style={{width:'15%'}}>No</TableCell>
											<TableCell align="center" style={{width:'15%'}}>IMO</TableCell>
											<TableCell align="center" style={{width:'10%'}}>CALL SIGN</TableCell>
											<TableCell align="center" style={{width:'10%'}}>MMSI</TableCell>
											<TableCell align="center">SHIP NAME</TableCell>
											<TableCell align="center" style={{width:'10%'}}></TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
									{(10 > 0 ? vslList.slice(num * 10, num * 10 + 10) :  vslList).map((prop, key) => {
										return (
											<Row
												index={key} 
												key={key} 
												row={prop} 
												openNum={(e) => setOpenPage(e)} 
												receiveData={(data) => setGeoData(data)} 
												num={openPage}/>
										);
									})}
									</TableBody>
								</Table>
							</TableContainer>
							{(vslList.length >= 10 ?
							<TablePagination 
								rowsPerPageOptions={[10]}
								component="div"
								count={vslList.length}
								page={num}
								SelectProps={{
									inputProps: {'aria-label':'Rows Per Page'},
									native:true,
								}}
								onChangePage={handleChagePage}
								rowsPerPage={10}
								ActionsComponent={TablePageinationActions}/>: null )}
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<GridItem>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={12} md={12}>
										<Map data={geoData} openLogin={()=>props.openLogin()} userData={props.userData} />
									</Grid>
								</Grid>
							</GridItem>
							{geoData.length > 0 && (
							<GridItem style={{marginTop:'25px'}}>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={12} md={12}>
										<Box>
											<Grid container spacing={2}>
												<Grid item xs={12} sm={12} md={12} style={{backgroundColor:'#f2fefd', textAlignLast:'center'}}>
													<h4>Ship Info</h4> 
												</Grid>
												<Grid item xs={12} sm={12} md={12}>
													<Divider orientation="horizontal"/>
												</Grid>
											</Grid>
											<Grid container spacing={2}>
												<Grid item xs={6} sm={6} md={6}>
													<h4>Ship Type</h4>
												</Grid>
												<Grid item xs={6} sm={6} md={6}>
													<span>{geoData[0].shipType}</span>
												</Grid>
												<Grid item xs={12} sm={12} md={12}>
													<Divider orientation="horizontal"/>
												</Grid>
											</Grid>
											<Grid container spacing={2}>
												<Grid item xs={6} sm={6} md={6}>
													<h4>Year of Built</h4>
												</Grid>
												<Grid item xs={6} sm={6} md={6}>
													<span>{geoData[0].built}</span>
												</Grid>
												<Grid item xs={12} sm={12} md={12}>
													<Divider orientation="horizontal"/>
												</Grid>
											</Grid>
											<Grid container spacing={2}>
												<Grid item xs={6} sm={6} md={6}>
													<h4>Last Update</h4>
												</Grid>
												<Grid item xs={6} sm={6} md={6}>
													<span>{geoData[0].position?timeForToday(geoData[0].position.timestamp):""}</span>
													{geoData[0].position?(
														<Tooltip title={geoData[0].position.timestamp} placement="top-start">
															<IconButton>
																<InfoIcon/>
															</IconButton>
														</Tooltip>
													):(<span>위치 정보를 찾을 수 없습니다.</span>)}
												</Grid>
											</Grid>
										</Box>
									</Grid>
								</Grid>
							</GridItem>)}
						</Grid>
					</Grid>	
				</GridItem>
			</Box>
			<Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
				<Alert 
					onClose={handleAlertClose}
					severity={severity}>
					<span>{message}</span>
				</Alert>
			</Snackbar>
		</div>
	);
}