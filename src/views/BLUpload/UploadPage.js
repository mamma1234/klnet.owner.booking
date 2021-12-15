import React,{useState,useEffect} from "react";
//npm install
import axios from 'axios';
import leftPad from "left-pad";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles} from '@material-ui/core/styles';
import Moment from 'moment';
// @material-ui/core components
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	Toolbar,
	Typography,
	Paper,
	Checkbox,
	Tooltip,
	RadioGroup,
	Radio,
	FormControlLabel,
	FormControl,
	IconButton,
	TableFooter,
	Collapse,
	Grid,
	Icon,
	Popover,
	Snackbar,
	TextField,
	CircularProgress,
	MenuItem
} from '@material-ui/core';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import CustomSelect from "components/CustomInput/CustomSelect.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import Button from 'components/CustomButtons/Button.js';
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import SearchButton from "components/CustomButtons/Button.js";
//icon
import {
	Backup as BackupIcon,
	Stars as StarIcon,
	Search as SearchIcon,
	Refresh as RefreshIcon,
	DeleteForever as DeleteForeverIcon
} from "@material-ui/icons"

import {
	Autocomplete as Autocomplete,
	Alert as MuiAlert
} from '@material-ui/lab';
// import page
import CarrierPage from "views/BLUpload/CarrierInfoPage.js";
import Excel from "views/BLUpload/ExcelUpload.js";


function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'num', numeric: true, disablePadding: true, label: 'No' },
  { id: 'ie_type', numeric: false, disablePadding: false, label: <span>Import<br></br>Export</span> },
  { id: 'carrier_code', numeric: false, disablePadding: false, label: 'Carrier' },
  { id: 'bl_no', numeric: false, disablePadding: false, label: 'B/L No.' },
  { id: 'bkg_no', numeric: false, disablePadding: false, label: 'B/K No.' },
  { id: 'remark', numeric: false, disablePadding: false, label: 'Remark'},
  { id: 'cntr_no', numeric: false, disablePadding: false, label: 'Container No.' },
  { id: 'insert_date', numeric: false, disablePadding: false, label: 'Insert Date' }
];

function EnhancedTableHead(props) {

  	const { classes, onSelectAllClick, order, orderBy, numSelected, onRequestSort } = props;
  	const createSortHandler = (property) => (event) => {
	  onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox" style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}}>
					<Checkbox
						indeterminate={numSelected > 0 }
						checked={numSelected > 0}
						onChange={onSelectAllClick}
						inputProps={{ 'aria-label': 'select all desserts' }}
					/>
				</TableCell>
				{headCells.map((headCell) => (
				<TableCell
					key={headCell.id}
					align="left"
					padding={headCell.disablePadding ? 'none' : 'default'}
					sortDirection={orderBy === headCell.id ? order : false}
					style={{borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}}>
					<TableSortLabel
					active={orderBy === headCell.id}
					direction={orderBy === headCell.id ? order : 'asc'}
					onClick={createSortHandler(headCell.id)}
					>
					{headCell.label}
					{orderBy === headCell.id ? (
						<span className={classes.visuallyHidden}>
						{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
						</span>
					) : null}
					</TableSortLabel>
				</TableCell>
				))}
			</TableRow>
		</TableHead>
  	);
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  marginRightForm: {
	  right:0
  },

  Toolbarroot: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  Toolbarhighlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  Toolbartitle: {
    flex: '1 1 15%',
  },
  FooterStyle: {
	backgroundColor:"#EEEEEE",
	padding: "20px",
	position: "fixed",
	left: "1",
	bottom:"0",
	right:"1",
	height:"100px",
	width:"100%",
	whiteSpace:'nowrap',
	overflow: 'auto'
  },
  Footerphantom: {
	  display:"block",
	  padding:"20px",
	  height:"100px",
	  width:"100%",
  },
  buttonClass: {
	  margin: theme.spacing(1)
  },
  Cardroot: {
	display: 'flex',
  },
  Carddetails: {
	display: 'flex',
	flexDirection: 'column',
  },
  Cardcontent: {
	flex: '1 0 auto',
  },
  Cardcover: {
	width: 151,
  },
  Cardcontrols: {
	display: 'flex',
	alignItems: 'center',
	paddingLeft: theme.spacing(1),
	paddingBottom: theme.spacing(1),
  },
  iconSize: {
	height: "65px",
	width: "65px",
	marginRight:"10px",
	//padding: "20px",
  },
  tablecontainer: {
	  width:'100%',
	  maxHeight:590
  },
  buttonProgress: {
	  color: '#00ACC1',
	  position: 'absolute',
	  top: '50%',
	  left: '50%',
	  marginTop: -12,
	  marginLeft: -12
  },
  buttonSuccess: {
	backgroundColor: '#00ACC1',
	'&:hover': {
		backgroundColor: '#00ACC1'
	}
  }
}));

export default function EnhancedTable(props) {

	const classes = useStyles();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [num, setNum] = useState(1);
	//입력값
	const [insertIeType, setInsertIeType] = useState("I");
	const [insertCarrier,setInsertCarrier] = useState("");
	const [insertBlNo, setInsertBlNo] = useState("");
	const [insertBkNo, setInsertBkNo] = useState("");
	const [insertCntrNo, setInsertCntrNo] = useState("");
	const [insertRemark, setInsertRemark] = useState("");
	const [insertCarriernm,setInsertCarriernm] =useState("");
	//에러메시지
	const [errMessage, setErrmessage] = useState("");
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const timer = React.useRef();
	//검색조건
	const [fromDate,setFromDate] = useState(Moment(new Date()).subtract(7,'days').format('YYYY-MM-DD'));
	const [toDate,setToDate] = useState(Moment(new Date()).format('YYYY-MM-DD'));
	const [ieGubun, setIeGubun] = useState('');
	const [lineCode,setLineCode] = useState([]);
	const [searchKey,setSearchKey] = useState("");
	const [selectData,setSelectData] = useState([]);
	const [carrierCode,setCarrierCode] = useState("");

	const [copyFromDate, setCopyFromDate] = useState(fromDate);
	const [copyToDate, setCopyToDate] = useState(toDate);
	const [copyIeGubun, setCopyIeGubun] = useState(ieGubun);
	const [copyCarrier, setCopyCarrier] = useState(carrierCode);
	const [copySearchKey, setCopySearchKey] = useState(searchKey);

	const [totCnt, setTotCnt] = useState(0);
	const [anchorE, setAnchorE] = useState(null);
	const [anchorU, setAnchorU] = useState(null);
	const [anchorD, setAnchorD] = useState(null);  
	const [severity, setSeverity] = useState("");
	const [alertOpen, setAlertOpen] = useState(false);
	const [bladdCard, setBladdCard] = useState(false);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const [saveMessage, setSaveMessage] = useState("ADD");
	
	useEffect(() => {
		if(props.userData){
			axios.post("/loc/getCustomLineCode",{}).then(res => setLineCode(res.data));
		}else {
			AlertMessage('로그인 정보가 없습니다.','error');
			props.openLogin();
		}
		return () => {
		};
	}, []);

	const carrier_open = Boolean(anchorE);
	const upload_open = Boolean(anchorU);
	const delete_open = Boolean(anchorD);
	const carrier = carrier_open ? 'simple-popover1':undefined;
	const upload = upload_open ? 'simple-popover2':undefined;
	const deletePop = delete_open ? 'simple-popover3':undefined;
	const handleClose = () => {
		setAnchorE(null);
		setAnchorU(null);
		setAnchorD(null);
	};
	const buttonClassname = clsx({
		[classes.buttonSuccess]: success,
	})
	const handleAlertClose = (event, reason) => {
		if(reason ==='clickaway') {
			return;
		}
		setAlertOpen(false);
	}
	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = []
				selectData.forEach(function(n,index) {
					newSelecteds.push(n);
				});
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};
	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex),selected.slice(selectedIndex + 1),);
		}

		setSelected(newSelected);
	};
	  
	const onCarrierChange = (e,data) => {
		if(data) {setCarrierCode(data.id);} else {setCarrierCode("");}
  	}
	const onInsertCarrierChange = (e,data) => {
		if(data) {
			setInsertCarrier(data.id);
			setInsertCarriernm(data.nm);
		} else {
			setInsertCarrier("");
			setInsertCarriernm("");
		}

	}  
	const isSelected = (name) => selected.indexOf(name) !== -1;


	const onSubmit = () => {
		
		setNum(1);
		let fromYMD = fromDate.replaceAll('-',"");
		let toYMD = toDate.replaceAll('-',"");
		if( fromYMD > toYMD ) {
			AlertMessage( "종료일자가 시작 일자보다 빠릅니다. 다시 확인하세요.",'error');
			return false;
		}
		if(props.userData) {
			axios.post("/loc/getMyBlList",{num:1, carrierCode:carrierCode, fromDate:fromYMD, toDate:toYMD, typeGubun:ieGubun, searchKey:searchKey},{}).then(res => {
				if(res.statusText==="OK") {
					setSelectData(res.data);
					setCopyCarrier(carrierCode);
					setCopyFromDate(fromYMD);
					setCopyToDate(toYMD);
					setIeGubun(ieGubun);
					setCopySearchKey(searchKey);
					if(res.data.length > 0) {
						setTotCnt(res.data[0].tot_cnt);
					}else {
						setTotCnt(0);
					}
				}
			})
		} else {
			// auth.logOut();
			props.openLogin();
		}
	};
	const onMore = () => {
		if(num !== Number(selectData[0].tot_page)) {
			if(props.userData) {
			axios.post("/loc/getMyBlList",{num:num+1, carrierCode:copyCarrier, fromDate:copyFromDate, toDate:copyToDate, typeGubun:copyIeGubun, searchKey:copySearchKey},{}).then(
				res => {
					if(res.statusText==="OK") {
						setNum(prv => prv + 1);
						setSelectData([...selectData,...res.data])
					}
				})
			} else {
				props.openLogin();
			}
		}
	}

	const initState = () => {
		setErrmessage("");
		setSeverity("success");
	}
	const AlertMessage = (message,icon) => {
		setErrmessage(message)
		setSeverity(icon)
		setAlertOpen(true);
	}
	const onRowReset = () => {
		initState();
		setInsertIeType("I");
		setInsertCarrier("");
		setInsertBlNo("");
		setInsertBkNo("");
		setInsertCntrNo("");
		setInsertCarriernm("");
		setInsertRemark("");
	}
	const onRowAdd = () => {
		
		if(!loading) {
			setSuccess(false);
			setLoading(true);
			setSaveMessage("Saving..")
		}
		initState();
		
		if (insertCarrier === "") {
			AlertMessage('선사(CARRIER)를 선택해주세요.','error');
			setSuccess(true);
			setLoading(false);
			setSaveMessage("ADD")
			return;
		}

		if (insertBlNo === "" && insertBkNo === "") {
			AlertMessage('B/L No. 혹은 B/K No. 를 입력해주세요','error');
			setSuccess(true);
			setLoading(false);
			setSaveMessage("ADD");
			return;
		}

		if(insertBlNo !== "" && insertBlNo.length > 16) {
			AlertMessage('B/L No.는 최대 16자리 입니다.','error');
			setSuccess(true);
			setLoading(false);
			setSaveMessage("ADD");
			return;
		}

		if(insertBkNo !== "" && insertBkNo.length > 35) {
			AlertMessage('B/K No.는 최대 35자리 입니다.','error');
			setSuccess(true);
			setLoading(false);
			setSaveMessage("ADD");
			return;
		}

		if(insertCntrNo !== "" && insertCntrNo.length > 20) {
			AlertMessage('Container No.는 최대 20자리입니다.','error');
			setSuccess(true);
			setLoading(false);
			setSaveMessage("ADD");
			return;
		}
		if(insertRemark.length > 25) {
			AlertMessage('Remark 는 최대 25자리입니다.','error');
			setSuccess(true);
			setLoading(false);
			setSaveMessage("ADD");
			return;
		}
		let bl_bkg = "";

		if(insertBkNo !== "" && insertBlNo === "") {
			bl_bkg = insertBkNo;
		}else {
			bl_bkg = insertBlNo;
		}

		if(props.userData){
			axios.post("/loc/getPkMyBlList",{carrierCode:insertCarrier,ie_type:insertIeType,bl_bkg:bl_bkg,cntrNumber:insertCntrNo}).then(res => {
				if(res.data.length > 0) {
					AlertMessage(' 이미 등록 되어있습니다.', 'error');
				}else {
					axios.post("/loc/insertBlRequest",{
						carrierCode:insertCarrier,
						ie_type:insertIeType,
						bl_no:insertBlNo,
						bkg_no:insertBkNo,
						bl_bkg:bl_bkg,
						cntrNumber:insertCntrNo,
						remark:insertRemark
					}).then(res => {
						if(res.statusText==="OK"){
							AlertMessage(' 저장이 완료 되었습니다.', 'success');
							onSubmit();
						}else {
							AlertMessage(' 저장 하지 못했습니다. 잠시 후 다시 시도해주세요.', 'error');
						}
					});
				}
			})
			timer.current = setTimeout(() => {
				setSuccess(true);
				setLoading(false);
				setSaveMessage("ADD")
			},1000);
		} else {
			props.openLogin();
		}
	}
	const rowDelete = () => {
		if(selected.length === 0) {
			AlertMessage('삭제할 행이 존재하지 않습니다.', 'error');
			return;
		}else {
			if(props.userData){
				selected.forEach(element => {
					axios.post("/loc/deleteMyBlNo",{sendData:element})					
				})
			} else {
				props.openLogin();
			}
			AlertMessage(`${selected.length} 개의 행을 삭제 하였습니다.`, 'success');
			setSelected([]);
			handleClose();
			onSubmit();
		}
		
	}

	return (
		<div>
			<Card style={{marginBottom:'1px'}}>
				<CardHeader color="info" stats icon >
					<CardIcon color="info" style={{height:'55px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
					</CardIcon>
					<h4 className={classes.cardTitleBlack}>B/L(B/K) MANAGEMENT</h4>
				</CardHeader>
				<CardBody style={{padding:'2px' ,marginBottom: '5px'}}>
					<GridItem>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} md={2}>
								<TextField 
									label="IMPORT & EXPORT"
									value={ieGubun}
									onChange={(e)=> setIeGubun(e.target.value)}
									select
									fullWidth>
									<MenuItem value="I">IMPORT</MenuItem>
									<MenuItem value="E">EXPORT</MenuItem>
								</TextField>
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<Autocomplete
									options = {lineCode}
									getOptionLabel = { option => option.id + '\n' +option.nm }
									id="carrierCode"
									onChange={onCarrierChange}
									renderInput={params => (
										<TextField inputProps={{maxLength:4}} {...params} label="Carrier" fullWidth />
								)}/>
							</Grid>
							<Grid item  xs={12} sm={12} md={2}>
								<TextField 
									id="blbk" 
									label="B/L No. & B/K No." 
									onChange={event => setSearchKey(event.target.value)} 
									value={searchKey}
									fullWidth />
							</Grid>
							<Grid item xs={6} sm={12} md={2}>
								<TextField
									label ="From"
									id="fromDate"
									type="date"
									value={fromDate}
									onChange={date => setFromDate(date.target.value)}
									InputLabelProps={{
										shrink: true
									}}
									fullWidth/>
							</Grid>
							<Grid item xs={6} sm={12} md={2}>
								<TextField
									label ="To"
									id="toDate"
									type="date"
									value={toDate}
									onChange={date => setToDate(date.target.value)}
									InputLabelProps={{
										shrink: true
									}}
									fullWidth/>
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<Grid >
									<SearchButton endIcon={<SearchIcon></SearchIcon>} color="info" fullWidth onClick={onSubmit} >Search</SearchButton>
								</Grid>
							</Grid>
						</Grid>
					</GridItem>
					<GridItem style={{textAlign:'-webkit-right'}}>
						<Grid item xs={12} sm={12} md={5}>
							<GridItem>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={12} md={4}>	
										<Button
											variant="contained"
											color="info"
											size="sm"
											startIcon={<BackupIcon/>}
											fullWidth
											onClick={()=>setBladdCard(!bladdCard)}>
											<span style={{fontSize:'1em'}}>B/L Insert</span>
										</Button>
									</Grid>
									<Grid item xs={12} sm={12} md={4}>
										<Button
											variant="contained"
											color="info"
											size="sm"
											startIcon={<BackupIcon/>}
											fullWidth
											onClick={e=>setAnchorU(e.currentTarget)}><span style={{fontSize:'1em'}}>Excel Upload</span>
										</Button>
										<Popover
											id={upload}
											open={upload_open}
											anchorEl={anchorU}
											onClose={handleClose}
											anchorReference="anchorPosition"
											anchorPosition={{top:10,left:550}}
											anchorOrigin={{vertical:'bottom',horizontal:'center',}}
											transformOrigin={{vertical:'top',horizontal:'center',}}>
											<Excel 
												params={lineCode}
												returnFunction={() => handleClose()}
												returnMessage={(message, state)=> AlertMessage(message, state)}
												returnState={()=>onSubmit()} 
												searchFunction={(param) => {
													setIeGubun(param[0]);
													setCarrierCode(param[1]);
													(param[2] !==null && param[3] !== null)?
														setSearchKey(param[2]):
														(param[2] !== null && param[3] === null)?
															setSearchKey(param[2]):
															setSearchKey(param[3]);
															onSubmit();}}
												{...props} 
											/>
										</Popover>
									</Grid>
									<Grid  item xs={12} sm={12} md={4}>
										<Button
											variant="contained"
											color="info"
											size="sm"
											startIcon={<StarIcon/>}
											fullWidth
											onClick={e=>setAnchorE(e.currentTarget)}><span style={{fontSize:'1em'}}>Carrier Info</span>
										</Button>
										<Popover
											id={carrier}
											open={carrier_open}
											anchorEl={anchorE}
											onClose={handleClose}
											anchorReference="anchorPosition"
											anchorPosition={{top:80,left:550}}
											anchorOrigin={{vertical:'bottom',horizontal:'center',}}
											transformOrigin={{vertical:'top',horizontal:'center'}}><CarrierPage returnMessage={(message, state)=> AlertMessage(message, state)} {...props} />
										</Popover>
									</Grid>
								</Grid>
							</GridItem>
						</Grid>
					</GridItem>
				</CardBody>
			</Card>
			<Paper style={{marginTop:'10px', marginBottom:'10px'}}>
				<Grid>
					<GridItem item xs={12} sm={12} md={12}>
						<Grid>
							<Collapse in={bladdCard} timeout="auto" unmountOnExit>
								<GridItem>
									<Grid container spacing={1}>
										<Grid item xs={12} sm={2} md={2}>
											<FormControl style={{marginLeft:'20px', position:"center"}} component="div">
												<RadioGroup row aria-label="position" name="position" defaultValue="I" value={insertIeType} >
													<FormControlLabel
														value="I"
														control={<Radio color="primary" size="small" />}
														label={<span style={{fontSize:'smaller', color:'#000000'}}>IMPORT</span>}
														style={{marginTop:'10px'}}
														onChange={(checked) => {if(checked){setInsertIeType('I')}}}
														/>
														
													<FormControlLabel
														value="E"
														style={{marginTop:'10px'}}
														control={<Radio color="primary" size="small" />}
														label={<span style={{fontSize:'smaller', color:'#000000'}}>EXPORT</span>}
														onChange={(checked) => {if(checked){setInsertIeType('E')}}}
														/>
												</RadioGroup>
											</FormControl>	
										</Grid>
							
										<Grid item xs={12} sm={12} md={2}>
											<Autocomplete
												options = {lineCode}
												getOptionLabel = { option => option.id + '\n' +option.nm }
												id="carrierCode"
												value={{id:insertCarrier,nm:insertCarriernm}}
												onChange={onInsertCarrierChange}
												renderInput={params => (
													<TextField inputProps={{maxLength:4}} {...params} label={<span style={{color:'#000000'}}>Carrier</span>} fullWidth/>
												)}/>
										</Grid>
										<Grid item xs={12} sm={12} md={2}>
											<TextField 
												id="insertBL" 
												label={<span style={{color:'#000000'}}>B/L No.</span>}
												value={insertBlNo}
												fullWidth
												onChange={event => setInsertBlNo(event.target.value)}/>
										</Grid>
										<Grid item xs={12} sm={12} md={1}>
											<TextField 
												id="insertBK" 
												label={<span style={{color:'#000000'}}>B/K No.</span>}
												value={insertBkNo}
												fullWidth
												onChange={event => setInsertBkNo(event.target.value)}/>
										</Grid>
										<Grid item xs={12} sm={12} md={1}>
											<TextField 
												id="CntrNum" 
												label={<span style={{color:'#000000'}}>Container No.</span>}
												value={insertCntrNo}
												fullWidth
												onChange={event => {setInsertCntrNo(event.target.value);}}/>
										</Grid>
										<Grid item xs={12} sm={12} md={2}>
											<TextField 
												id="CntrNum" 
												label={<span style={{color:'#000000'}}>Remark</span>}
												value={insertRemark}
												fullWidth
												onChange={event => {setInsertRemark(event.target.value);}}/>
										</Grid>
										<Grid item xs={12} sm={12} md={1}>
											<FormControl style={{textAlignLast:'right', marginRight:'50px'}} component="div" fullWidth>
												<IconButton>
													<Tooltip title="초기화" arrow>
														<RefreshIcon onClick = {() => onRowReset()}/>
													</Tooltip>
												</IconButton>
											</FormControl>
										</Grid>
										<Grid item xs={12} sm={12} md={1} >
											<FormControl className={classes.marginRightForm} component="div" fullWidth>
												<Button
													variant="contained"
													color="info" 
													disabled={loading}
													className= {buttonClassname}
													onClick = {() => onRowAdd()}>
													{saveMessage}
												</Button>
												{loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
											</FormControl>
										</Grid>
									</Grid>
								</GridItem>
							</Collapse>
						</Grid>
					</GridItem>
				</Grid>
			</Paper>	
			<Paper>
				<GridItem>
					<Grid container spacing={1}>
						<Grid item xs={4} sm={2} md={2}>
							{selected.length!==0 && <span style={{fontWeight:'bold'}}>{selected.length} SELECT ROW</span>}
						</Grid>
						<Grid item xs={8} sm={7} md={7}>
							{selected.length!==0 && 
							<>
							<Button
								variant="contained"
								color="info"
								size="sm"
								style={{marginLeft:'10px'}}
								onClick = {(e) => setAnchorD(e.currentTarget)}>DELETE
							</Button>
							<Button
								variant="contained"
								color="warning"
								onClick = {(e) => handleSelectAllClick(e)}
								style={{marginLeft:'10px'}}
								size="sm">CANCEL
							</Button>
							<Popover
								id={deletePop}
								open={delete_open}
								anchorEl={anchorD}
								onClose={handleClose}
								anchorOrigin={{vertical:'bottom',horizontal:'center',}}
								transformOrigin={{vertical:'top',horizontal:'center',}}>	
								<Typography component="div" style={{width:'400px', padding:'20px'}}>
									<GridItem>
										<GridContainer>
											<GridItem xs={12} sm={12} md={3}>
												<DeleteForeverIcon color="action" className={classes.iconSize } fontSize="large"></DeleteForeverIcon>											</GridItem>
											<GridItem xs={12} sm={12} md={9}>
												<GridContainer>
													<h4>Are you sure you want to delete?</h4>
												</GridContainer>	
												<GridContainer>
													<GridItem xs={12} sm={12} md={6}>
														<Button size="sm" color="info" onClick={() => rowDelete()} >Confirm</Button>
													</GridItem>
													<GridItem xs={12} sm={12} md={6}>
														<Button size="sm" color="warning" onClick={() => handleClose()} >Cancel</Button>
													</GridItem>
												</GridContainer>
											</GridItem>
										</GridContainer>
									</GridItem>
								</Typography>
							</Popover>
							</>}
						</Grid>
						<Grid item xs={12} sm={3} md={3}>
							{selectData.length > 0 && <span style={{paddingRight:"20px", paddingTop:"5px"}}>[ Data Count: {selectData.length} / {totCnt} ]</span>}
						</Grid>
					</Grid>
				</GridItem>
				<TableContainer className={classes.tablecontainer}>
					<Table
						stickyHeader aria-label="sticky table"
						className={classes.table}
						aria-labelledby="tableTitle"
						size='medium'
						style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={selectData.length}/>
						<TableBody>
						{stableSort(selectData, getComparator(order, orderBy)).map((row, index) => {
							const isItemSelected = isSelected(row);
							const labelId = `enhanced-table-checkbox-${index}`;
							return (
								<TableRow
									hover
									onClick={(event) => handleClick(event, row)}
									role="checkbox"
									aria-checked={isItemSelected}
									tabIndex={-1}
									key={row.num}
									selected={isItemSelected}>
									<TableCell padding="checkbox">
										<Checkbox
										checked={isItemSelected}
										inputProps={{ 'aria-labelledby': labelId }}/>
									</TableCell>
									<TableCell component="th" id={labelId} scope="row" padding="none">{row.num}</TableCell>
									<TableCell align="left">{row.ie_type==="I"?"IMPORT":"EXPORT"}</TableCell>
									<TableCell align="left"><Tooltip title={row.nm_kor} arrow><span>{row.carrier_code}</span></Tooltip></TableCell>
									<TableCell align="left">{row.bl_no}</TableCell>
									<TableCell align="left">{row.bkg_no}</TableCell>
									<TableCell align="left">{row.remark}</TableCell>
									<TableCell align="left">{row.cntr_no}</TableCell>
									<TableCell align="left">{row.insert_date}</TableCell>
								</TableRow>
							);
						})}
						</TableBody>
						{selectData.length >= 10 ? Number(selectData[0].tot_page) !== num ? (
						<TableFooter>
							<TableRow>
								<TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={9}>
									<Button
										color="info"
										onClick={() => onMore()}
									>MORE&nbsp;(&nbsp;{num}&nbsp;/&nbsp;{selectData[0].tot_page}&nbsp;)</Button>
								</TableCell>
							</TableRow>
						</TableFooter>):null:null }
					</Table>
				</TableContainer>
			</Paper>
		<Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
			<Alert 
				onClose={handleAlertClose}
				severity={severity}>
				<span>{errMessage}</span>
			</Alert>
		</Snackbar>
	</div>
  );
}