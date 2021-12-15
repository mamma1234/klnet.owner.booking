import React,{ useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import Grid from '@material-ui/core/Grid';
//import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {TextField,Collapse, FormControlLabel,FormControl,Backdrop} from '@material-ui/core';
import InputLabel from "@material-ui/core/InputLabel";
import Select from '@material-ui/core/Select';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import {IconButton,CircularProgress} from '@material-ui/core';
import Popover from "@material-ui/core/Popover";
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import InfoIcon from '@material-ui/icons/Info';
import Filter1 from '@material-ui/icons/Filter1';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import SearchIcon from '@material-ui/icons/Search';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import CustomTabs from "components/CustomTabs/CustomScheduleTabs.js";

// other import
import axios from 'axios';
import moment from 'moment';
import ProgressBar from './ProgressBar/ProgressBar.js';

import ScheduleTable from "views/Schedule/FclScheduleTable.js";
import SchLinePicPop from "views/Schedule/SchLinePicPop.js";
import SchDetailPop from "views/Schedule/SchDetailPop.js";

import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";

const localizer = momentLocalizer(moment);
var curCount = 1;
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme)=> ({
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
  carrierList: {
	    padding: '0 0 0 12px !important',
	},
	carrierListGrid: {
	    padding: '0 10px !important',
	},
	backdrop:{zIndex:theme.zIndex.drawer +1,color:'#fff'}
}));


export default function ScheduleList(props) {
	const {userData, openLogin, ...rest } = props;

	//const setDate = new Date();
	const setEndDate = new Date();
	//const [checkAll,setCheckAll] = useState(false);
	const [carrierValue,setCarrierValue] = useState([]);
	const [checkList,setCheckList] = React.useState([]);
	const [carrierCode,setCarrierCode] = useState(null);
	const [sPort,setSPort] = useState("");
	const [ePort,setEPort] = useState("");
	const [vesselName,setVesselName] = useState("");
	const [selectData,setSelectData] = useState([]);
	const [portData,setPortData] = useState([]);
	const [scheduleData,setScheduleData] = useState([]);
	const [tileData,setTileData] = useState([]);

	const [processOpen,setProcessOpen] = useState(false);
	const [sDate,setSDate] = useState(new Date());
	const [eDate,setEDate] = useState(setEndDate.setDate(setEndDate.getDate()+6));
	const [eWeek,setEWeek] = useState("4 week");
	const [formatter,setFormatter] = useState("yyyy-MM-dd");
	const [state, setState] = React.useState({
	checkedA: false,
	pop2: false,
	line_code: ""
	});

	const [searchCarrierList,setSearchCarrierList] = React.useState([]);

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};	

	const [anchorEl, setAnchorEl] = useState(null);
	const [expanded, setExpanded] = React.useState(false);
	const [detailParam, setDetailParam] = useState(null);
	const [progressList,setProgressList] = useState([]);
	const [processIcon,setProcessIcon] = React.useState(null)
	//const {token} = props;

	//console.log(">>>>",store);
	//const [cDate,setCDate] = useState(new Date());

	const [tapNum,setTapNum] = useState(0);

	//const [cookies, setCookie] = useCookies(['name']); 

	const handleTapsClick = (e) => {
		debugger;
		setTapNum(e);
		if(e==1) {
		const nDate = new Date(sDate);
		const pDate = nDate.setDate(1);
		setSDate(pDate);
		setFormatter("yyyy-MM");
		onSubmit(null,pDate,nDate,e,'C');
	} 

	if (e==0) {
		setFormatter("yyyy-MM-dd");
		onSubmit(null,null,null,e,'L');
	}

	if(e==2) getServiceCarrierList();
	}

	const handleEWeek = (e) => {
		// console.log("xx",e.target.value);
		setEWeek(e.target.value);	  
	}


  
  useEffect(() => {
		// console.log('FclSchduleList effect auth)',auth);
		//debugger;
		
		if(userData) {
		    axios.post("/sch/getCarrierInfo",{}).then(res => setSelectData(res.data));
		    //.then(res => console.log(JSON.stringify(res.data)));
		}
		
    	axios.post("/sch/getPortCodeInfo",{ portCode:'K'})
	    .then(res => setPortData(res.data))
	    .catch(err => {
	        if(err.response.status === 403||err.response.status === 401) {
	        	openLogin();
			}
	    });
    	
	    return () => {
	      console.log('cleanup');
	    };
	    
	    
	  }, [userData]);

  // carrier select box
  const onCarrierChange = (data) => {
	//debugger;
	 console.log(">>>>",data);
	//check box select data set
	setCheckList(data); 
	setSearchCarrierList(data);
	// select box data set   
	setCarrierValue(data);
    //데이터 변환
	let multiCarrier = "";

	for (let index in data) {
		console.log(data[index].line_code);

		multiCarrier = multiCarrier + "'" + data[index].line_code + "'";

		if(data.length-1 != index) multiCarrier = multiCarrier + ",";
	}
	if(data) {setCarrierCode([multiCarrier]);} else {setCarrierCode([]);}	  
  }
  
 /* const onPortSearchValue = (e) => {
	    const values = e.target.value;

	    //if(values != undefined && values != "" && values.length >= 2) {
	    	if(props.userData) {
		    	axios.post("/sch/getPortCodeInfo",{ portCode:values})
			    .then(res => setPortData(res.data))
			    .catch(err => {
			        if(err.response.status === 403||err.response.status === 401) {
			        	props.openLogin();
					}
			    });
	    	} else {
	    		props.openLogin();
	    	}
	    //}  
  }*/

  
  const onSPortChange = (e,data) => {
	  if(data) {
		  setSPort(data.port_code);
	  } else {
		  setSPort("");
	  }
  }

  const onEPortChange = (e,data) => {
	  if(data) {
		  setEPort(data.port_code);
	  } else {
		  setEPort("");
	  }
  }
  
  const onSubmit = (e,sPDate,ePDate,eTabnum,mode) => {

	//debugger;
	if(userData) {
	  	setProcessOpen(true);
		if(eTabnum == undefined && tapNum==2) {
			getServiceCarrierList();
		} else {
		
	  //let sQDate = "";
	  //let eQDate = "";
	  //let pTapnum = "";
	  
/* 	  if (sPDate != undefined) {
		sQDate = sPDate;
	  } else {
		sQDate = sDate;
	  }
	 
	  if (ePDate != undefined) {
		eQDate = ePDate;
	  } else {
		eQDate = eDate;
	  } */

/* 	  if (eTabnum != undefined) {
		pTapnum = eTabnum;
	  } else {
		pTapnum = tapNum;
	  } */

	
	  //search
	
	//console.log("SUBMIT",store.token);
	// 선사코드 변환 
	/*	let multiCarrier = "";
		
		if(carrierValue.length > 0) {
			
		
		  

			for (let index in carrierValue) {
				//console.log(carrierValue[index].line_code);

				multiCarrier = multiCarrier + "'" + carrierValue[index].line_code + "'";

				if(carrierValue.length-1 != index) multiCarrier = multiCarrier + ",";
			}

		}	  
			 // if(data) {setCarrierCode([multiCarrier]);} else {setCarrierCode([]);}
			  
		
			curCount=1;
			  //if(props.userData) {
				  
				//  if(!multiCarrier) { 
				axios.post("/sch/getScheduleCarrierList",{ carrierCode:multiCarrier,
							    startDate:moment(sPDate != undefined ? sPDate:sDate).format('YYYYMMDD'),
								endDate:moment(ePDate != undefined ? ePDate:eDate).format('YYYYMMDD'),
								eWeek:eWeek,curpage:'1',//tapNum:eTabnum != undefined ? eTabnum:tapNum,
							    startPort:sPort,
							    endPort:ePort,
								vesselName:vesselName,
								direct:state.checkedA
							})
						.then(res => {setSearchCarrierList(res.data);setCheckList(res.data);setCarrierValue(res.data);});
				//  }
				//스케줄 리스트   
				  axios.post("/sch/getScheduleList",{ carrierCode:multiCarrier,
					  								  startDate:moment(sPDate != undefined ? sPDate:sDate).format('YYYYMMDD'),
														endDate:moment(ePDate != undefined ? ePDate:eDate).format('YYYYMMDD'),
														eWeek:eWeek,curpage:curCount,//tapNum:eTabnum != undefined ? eTabnum:tapNum,
					  								    startPort:sPort,
					  								    endPort:ePort,
														vesselName:vesselName,
														direct:state.checkedA
				  									})
					.then(setScheduleData([])).then(res => setScheduleData(res.data)).then(()=>setProcessIcon(null))
				    .catch(err => {
				        if(err.response.status === 403||err.response.status === 401) {
				        	props.openLogin();
						}
				    }); */
	//	} else {
	//		props.openLogin();
	//	}
		//if(sDate.toString() != "Invalid Date") {
		//	setCDate(sDate);
		//}

		//select init count 1
			curCount=1; 
			//console.log("carrierCode:",carrierCode)
			//carrier check list select
			//console.log("::::",carrierCode)
			if(!carrierCode) {
				let multiCarrier ="";
				axios.post("/sch/getScheduleCarrierList",{ carrierCode:carrierCode,
					startDate:moment(sPDate != undefined ? sPDate:sDate).format('YYYYMMDD'),
					endDate:moment(ePDate != undefined ? ePDate:eDate).format('YYYYMMDD'),
					eWeek:eWeek,curpage:'1',//tapNum:eTabnum != undefined ? eTabnum:tapNum,
					startPort:sPort,
					endPort:ePort,
					vesselName:vesselName,
					direct:state.checkedA
				})
				.then(res=>{ 
						for (let index in res.data) {
							multiCarrier = multiCarrier + "'" + res.data[index].line_code + "'";
							if(res.data.length-1 != index) multiCarrier = multiCarrier + ",";
						}
						setSearchCarrierList(res.data);
						setCarrierValue(res.data);
						setCheckList(res.data);
				}) // check box data set
				.then(()=>{
					axios.post("/sch/getScheduleList",{ carrierCode:multiCarrier,
						startDate:moment(sPDate != undefined ? sPDate:sDate).format('YYYYMMDD'),
						endDate:moment(ePDate != undefined ? ePDate:eDate).format('YYYYMMDD'),
						eWeek:eWeek,curpage:curCount,//tapNum:eTabnum != undefined ? eTabnum:tapNum,
						startPort:sPort,
						endPort:ePort,
						vesselName:vesselName,
						direct:state.checkedA,mode:eTabnum ===1?'C':'L'
					})
				.then(setScheduleData([]))
				.then(res => setScheduleData(res.data))
				.then(()=>setProcessOpen(false));
				})
			} else {
				axios.post("/sch/getScheduleList",{ carrierCode:carrierCode,
					startDate:moment(sPDate != undefined ? sPDate:sDate).format('YYYYMMDD'),
					endDate:moment(ePDate != undefined ? ePDate:eDate).format('YYYYMMDD'),
					eWeek:eWeek,curpage:curCount,//tapNum:eTabnum != undefined ? eTabnum:tapNum,
					startPort:sPort,
					endPort:ePort,
					vesselName:vesselName,
					direct:state.checkedA,mode:eTabnum ===1?'C':'L'
				})
			.then(setScheduleData([]))
			.then(res => {console.log("cal:",res.data);setScheduleData(res.data);})
			.then(()=>setProcessOpen(false));
			}
			

		}

	}
  }

  function getServiceCarrierList() {
	 
	if(userData) {
		  return axios ({
			url:'/sch/getServiceCarrierList',
			method:'POST',
			data: {startPort:sPort,
				endPort:ePort
				 },
			headers:userData
		  }).then(setTileData([])).then(res => setTileData(res.data)).then(()=>setProcessOpen(false))
		  .catch(err => {
			if(err.response.status === 403||err.response.status === 401) {
				openLogin();
			}
		});
	} else {
		
		openLogin();
	}
	console.log(tileData[0]);
}
  
  const classes = useStyles();

  //const classes2 = useStyles2();
  //const [events, setEvents] = React.useState(calendarEvents);
  //const [alert, setAlert] = React.useState(null);
  const selectedEvent = (event,e) => {
	//window.alert(event.title);
	//debugger;
	setDetailParam(event);
	setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

/*   const handleClick = (event) => {
	  debugger;
    setAnchorEl("testpop");
  }; */
  
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const navigatedEvent = date => {
 	  //debugger;
	  const nDate = new Date(date);
	  const pDate = nDate.setDate(1);
	setSDate(pDate);
	nDate.setMonth( nDate.getMonth() + 1); 
	setEDate(nDate.setDate(0));
//	console.log(moment(sDate).format('YYYYMMDD') + moment(eDate).format('YYYYMMDD'));
	onSubmit(null,pDate,nDate,null,'L');
  };

  const handleClick2 = (e,line_code) => {
	  //debugger;
    setState({pop2:true, line_code:line_code});
  };

  const handleClose2 = () => {
    setState({pop2:false});
  };
  
  const onHangleTopEvent = () => {
	if(sPort === "" ) {
		alert("물동량 데이터 조회 시 출발지 는 필수 조회 값 입니다.");
	} else if (ePort === "") {
		alert("물동량 데이터 조회 시 도착지 는 필수 조회 값 입니다.");
	} else {
	
    if(!expanded) {
		  if(userData) {
				  return axios ({
					url:'/sch/getProgressInfo',
					method:'POST',
					data: {startPort:sPort,
						endPort:ePort
						 }
				  }).then(setProgressList([]))
				  .then(res => {setProgressList(res.data); setExpanded(!expanded);})
				  .catch(err => {
					if(err.response.status === 403||err.response.status === 401) {
						openLogin();
					}
				});
			} else {
				
				openLogin();
			}
    } else {
    	 setExpanded(!expanded);
    }
	}
	  
  }
  
  const onSearchDataSet = (data) => {
	  let multiCarrier = "";
	  
	  //setCarrierValue(data);
	 
	  for (let index in data) {
			//console.log(data[index].line_code);
			multiCarrier = multiCarrier + "'" + data[index].line_code + "'";
			if(data.length-1 != index) multiCarrier = multiCarrier + ",";
		}
		if(data) {setCarrierCode([multiCarrier]);} else {setCarrierCode([]);}
		
	  if(data.length > 0) {			  
			  axios.post("/sch/getScheduleList",{ carrierCode:multiCarrier,
				  								  startDate:moment(sDate).format('YYYYMMDD'),
													endDate:moment(eDate).format('YYYYMMDD'),
													eWeek:eWeek,
				  								  startPort:sPort,
				  								  endPort:ePort,
													vesselName:vesselName,
													direct:state.checkedA,mode:'L'
			  									})
				.then(setScheduleData([])).then(res => setScheduleData(res.data))
			    .catch(err => {
			        if(err.response.status === 403||err.response.status === 401) {
			        	openLogin();
					}
			    });
			}

  }
  
  const onNextPage= (data)=> {
	  setProcessIcon(<div style={{position:'fixed',top:'50%',left:'50%',zIndex:'100'}}>
	  	<CircularProgress />
		  </div>);
	  curCount = data;
	  axios.post("/sch/getScheduleList",{ carrierCode:carrierCode,
		  startDate:moment(sDate).format('YYYYMMDD'),
			endDate:moment(eDate).format('YYYYMMDD'),
			eWeek:eWeek,curpage:curCount,//tapNum:eTabnum != undefined ? eTabnum:tapNum,
			  startPort:sPort,
			  endPort:ePort,
			vesselName:vesselName,
			direct:state.checkedA,mode:'L'
			})
			.then(res => setScheduleData([...scheduleData,...res.data])).then(()=>setProcessOpen(false))

  }
  
  const onHandleCheckAll =(e) => {
	  setCheckList(e.target.checked ? searchCarrierList:[]);
	  setCarrierValue(e.target.checked ? searchCarrierList:[]);
	  if(e.target.checked && searchCarrierList.length > 0){
		setProcessIcon(<div style={{position:'fixed',top:'50%',left:'50%',zIndex:'100'}}><CircularProgress /></div>);
		let multiCarrier = "";
		for (let index in searchCarrierList) {
			//console.log(data[index].line_code);
			multiCarrier = multiCarrier + "'" + searchCarrierList[index].line_code + "'";
			if(searchCarrierList.length-1 != index) multiCarrier = multiCarrier + ",";
		}
		setCarrierCode(multiCarrier);

		axios.post("/sch/getScheduleList",{ carrierCode:multiCarrier,
			startDate:moment(sDate).format('YYYYMMDD'),
			endDate:moment(eDate).format('YYYYMMDD'),
			eWeek:eWeek,curpage:'1',//tapNum:eTabnum != undefined ? eTabnum:tapNum,
			startPort:sPort,
			endPort:ePort,
			vesselName:vesselName,
			direct:state.checkedA,mode:'L'
		}).then(setScheduleData([]))
		.then(res => setScheduleData(res.data))
		.then(()=>setProcessOpen(false));
	  }
  }

  const onChangeEach = (e,data) => {

	let multiCarrier = "";

	    if(e.target.checked) {
		  var list = [...checkList,data];

		  	setCheckList(list);
		  	setCarrierValue(list);
			//console.log("data:",list)
			

			if(list.length > 0) {

				setProcessIcon(<div style={{position:'fixed',top:'50%',left:'50%',zIndex:'100'}}><CircularProgress /></div>);

				for (let index in list) {
					//console.log(data[index].line_code);
					multiCarrier = multiCarrier + "'" + list[index].line_code + "'";
					if(list.length-1 != index) multiCarrier = multiCarrier + ",";
				}
				setCarrierCode(multiCarrier);
				
				axios.post("/sch/getScheduleList",{ carrierCode:multiCarrier,
					startDate:moment(sDate).format('YYYYMMDD'),
					endDate:moment(eDate).format('YYYYMMDD'),
					eWeek:eWeek,curpage:'1',//tapNum:eTabnum != undefined ? eTabnum:tapNum,
					startPort:sPort,
					endPort:ePort,
					vesselName:vesselName,
					direct:state.checkedA,mode:'L'
				}).then(setScheduleData([]))
				.then(res => setScheduleData(res.data))
				.then(()=>setProcessOpen(false));
			}
	  } else {
		 // setCheckList(checkList.filter((checkedid)=>checkedid != data));
		 // setCarrierValue(carrierValue.filter((checkedid)=>checkedid != data));
		  var list = checkList.filter((checkedid)=>checkedid != data);
		  setCheckList(list);
		  setCarrierValue(list);
		  //console.log("data:",list)
		  //console.log("checkList:",checkList)
		 // console.log("data:",data)

		  if(list.length > 0) {

			setProcessIcon(<div style={{position:'fixed',top:'50%',left:'50%',zIndex:'100'}}><CircularProgress /></div>);	

			for (let index in list) {
				//console.log(data[index].line_code);
				multiCarrier = multiCarrier + "'" + list[index].line_code + "'";
				if(list.length-1 != index) multiCarrier = multiCarrier + ",";
			}
			setCarrierCode(multiCarrier);

			axios.post("/sch/getScheduleList",{ carrierCode:multiCarrier,
				startDate:moment(sDate).format('YYYYMMDD'),
				endDate:moment(eDate).format('YYYYMMDD'),
				eWeek:eWeek,curpage:'1',//tapNum:eTabnum != undefined ? eTabnum:tapNum,
				startPort:sPort,
				endPort:ePort,
				vesselName:vesselName,
				direct:state.checkedA,mode:'L'
			}).then(setScheduleData([]))
			.then(res => setScheduleData(res.data))
			.then(()=>setProcessOpen(false));
		}
	  }
  }

  return (
		  <div  style={{paddingLeft:'10px',paddingRight:'10px'}}>
		  <Backdrop className={classes.backdrop} open={processOpen}>
		  	<CircularProgress color="primary" />
		  </Backdrop>
         	<Card style={{marginTop:'0',marginBottom:'5px'}}>
				<CardBody style={{paddingTop:'5px',paddingBottom:'5px'}}>
			      	<GridContainer spacing={1}>
			      				<GridItem lg={3} md={4} sm={4} xs={12}>
				      				<Autocomplete
					        			options = {portData}
					        			getOptionLabel = { options => "["+options.port_code+"] "+options.port_name}
					        			id="start"
					        			onChange={onSPortChange}
					        			//onInputChange={onPortSearchValue}
					        			renderInput={params => (
					        					<TextField {...params} label="Origin"  fullWidth />
					        			)}
					      				
					        		/>
					        	</GridItem>
					        	<GridItem lg={3} md={4} sm={4} xs={12}>
									<Autocomplete
					        			options = {portData}
					        			getOptionLabel = { options => "["+options.port_code+"] "+options.port_name}
					        			id="end"
					        			onChange={onEPortChange}
					        			//onInputChange={onPortSearchValue}
					        			renderInput={params => (
					        				<TextField {...params} label="Destination"  fullWidth />
					        			)}
					        		/>
					        	</GridItem>
								<GridItem lg={2} md={4} sm={4} xs={12}>
								{tapNum != 2 && (<CalendarBox
					        			labelText ="Start Date"
										id="portDate"
										disabled={tapNum != 0}
					      				format={formatter}
					      				setValue={sDate}
					        			onChangeValue={date => setSDate(date)}
					        			formControlProps={{fullWidth: true}}
					        	  	/>)}
					        	</GridItem>
{/* 					        	<GridItem xs={12} sm={4}>
									<TextField id="vesselName" label="Vessel Name" onChange={event => setVesselName(event.target.value)} value={vesselName} fullWidth />
					        	</GridItem> */}
					        	<GridItem lg={1} md={6} sm={6} xs={12}>
								{tapNum != 2 && (<FormControl fullWidth >
									<InputLabel></InputLabel>
									<Select 
									native
									id = "portDateWeek"
									disabled={tapNum != 0}
									value={eWeek}
									label=""
									onChange={handleEWeek}
									style={{marginTop:'13px'}}
									>
									<option value="2 week">2 Weeks</option>
									<option value="4 week">4 Weeks</option>
									<option value="6 week">6 Weeks</option>
									<option value="8 week">8 Weeks</option>
									</Select>
									</FormControl>)}
{/* 					        		<CalendarBox
					        			labelText ="입항일자"
					        			id="portDate"
					        			format="yyyy-MM-dd"
					        			setValue={eDate}
					        		    onChangeValue={
											date => setEDate(date)
										}
					        			formControlProps={{fullWidth: true}}
					        		/> */}
					        	</GridItem>
					        	<GridItem lg={3} md={6} sm={6} xs={12}>
								{tapNum != 2 && (<Autocomplete
									disabled={tapNum == 2}
										size="small"
										multiple
										options = {selectData}
										disableCloseOnSelect
										limitTags={3}
										value = {carrierValue}
					        			getOptionLabel = { option =>"["+option.line_code+"]"+option.line_name }
										getOptionSelected = {(option,value) => option.line_code === value.line_code}
					        			id="carrierCode"
					        			//onChange={onCarrierChange}
					        			onChange={(_,selectedOptions)=>onCarrierChange(selectedOptions)}
					        			renderInput={params => (
					        				<TextField {...params} label="Carrier" fullWidth />
										)}
										renderOption={(option, { selected }) => (
											<React.Fragment>
											  <Checkbox
												icon={icon}
												checkedIcon={checkedIcon}
												style={{ margin: '0'}}
												checked={selected}
											  />
											  <font size="2">{"["+option.line_code+"]"+option.line_name}</font>
											</React.Fragment>
										  )}
					        		/>)}
					        	</GridItem>
								{/* <GridItem lg={2} md={2} sm={2} xs={12}>
								{tapNum != 2 && (<FormControlLabel style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '0px',paddingRight: '15px'}}
								control={
								<Checkbox checked={state.checkedA} color="default" 
								onChange={handleChange} name="checkedA" />}
								label="Direct Only">
									</FormControlLabel>)} 
								</GridItem>*/}
								{searchCarrierList.length>0?
								<GridItem lg={12} md={12} sm={12} xs={12} style={{marginTop:'10px'}}>
									<GridContainer>
										<GridItem lg={1} md={1} sm={1} xs={2} className={classes.carrierList}>
											<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ margin: '0'}} checked={checkList.length === searchCarrierList.length} 
												onClick={(e)=>onHandleCheckAll(e)} /> 전체
										</GridItem>
										<GridItem lg={11} md={11} sm={11} xs={11}>
											<GridContainer>
												{searchCarrierList.map((data,key)=>(
														<GridItem key={key} lg={2} md={3} sm={4} xs={6} className={classes.carrierListGrid}>
															<Checkbox  style={{ margin: '0'}} 
																checked={(checkList.findIndex(x=>x.line_code===data.line_code)>=0)?true:false}
															    //checked={checkList.includes(data)}
															    onClick={(e)=>onChangeEach(e,data)}
															/>
																<font size="2">{data.line_name?data.line_name.length>11?data.line_name.substring(0,10)+"...":data.line_name:""}</font>
														</GridItem>
													))
												}
										    </GridContainer>
										</GridItem>
								    </GridContainer>	
								</GridItem>:<></>}
		        	</GridContainer>   	
		          </CardBody>
		          </Card>
		          <GridItem xs={12} style={{paddingBottom:'10px',textAlign:'-webkit-right'}}>
			      	<GridItem xs={9} sm={5} md={3} style={{textAlign:'center'}}>
			      		<GridContainer style={{margin:'0'}}>
			      		<GridItem xs={4} sm={4} md={4}>
			      			<Button color="info" onClick = {()=>onHangleTopEvent()} endIcon={<Filter1/>} 
			      			style={{paddingLeft:'15px',paddingRight:'15px'}}>TOP</Button>
			      		</GridItem>
				      <GridItem  xs={6} sm={6} md={6}>
				      	<Button color="info" onClick = {()=>onSubmit()} endIcon={<SearchIcon/>}>Search</Button>
				      </GridItem>
				      </GridContainer>
				    </GridItem>
			    </GridItem>
				<Collapse in={expanded} timeout="auto" unmountOnExit style={{width:'100%'}}>
				    <ProgressBar data={progressList} eventHandler={onSearchDataSet}/>
			    </Collapse>
				<div>
					<div style={{position:"absolute",zIndex:"1",right:"50px",top:"23px",display:"none"}}>
				    <Button size="sm" color="linkedin" target="_blank" href={"https://new.portmis.go.kr/portmis/websquare/websquare.jsp?w2xPath=/portmis/w2/si/pmb/mbrp/info/UI-SI-MBRP-201-51.xml&menuCd=M9106&menuNm=%BC%B1%BB%E7%BA%B0%20%BF%EE%C0%D3%B0%F8%C7%A5%20%B8%AE%BD%BA%C6%AE&w2xHome=/portmis/w2/main/&w2xDocumentRoot="}>해양수산부 운임 공표 조회</Button>
				    </div>
				  
				  <div style={{position:"relative",zIndex:"0"}}>
					  <CustomTabs headerColor="info"
					  handleTapsClick={handleTapsClick}
					  tabs={[
						  {
							tabName: "List"
							,tabIcon: (AssignmentOutlinedIcon)
							,tabContent: (
									<div style={{marginTop:'10px'}}>
									<div style={{textAlign: "end"}}>
									<span style={{textAlign: "end",paddingBottom: '0px',color:"#000000", paddingRight:"10px", paddingTop:"0px"}}>Total:{scheduleData.length>0?scheduleData[0].total_count:0}건</span>
									</div>
          			<GridContainer>
          			{/*<h5 style={{paddingBottom: '0px',paddingTop: '0px',paddingLeft: '15px',paddingRight: '15px',fontWeight:'bold',marginTop:'0px',marginBottom:'0px' }}>※ {scheduleData.length} 건 검색 완료</h5>*/}
						
						<GridItem xs={12}>
							<ScheduleTable propsData={scheduleData} curPage={curCount} nextPage={(data)=>onNextPage(data)} {...props}/>
								
          					{/*<ScheduleToggleTable 
		                        tableHeaderColor="info"
		                        tableHead={["Carrier", "Vessel Name", "Voyage No", "Origin", "Destination", "Charge", "T/Time", "T/S", "Booking"]}
								tableData={scheduleData}
		                     /> 
*/}		                </GridItem>
					</GridContainer></div>
							)
							},{
								tabName: "Calendar"
								//,tabIcon: Face
								,tabIcon: (TodayOutlinedIcon)
								,tabContent: (
									<GridContainer justify="center">
									<GridItem xs={12}>
									  <Card>
										<CardBody calendar>
										  <BigCalendar 
											selectable
											localizer={localizer}
											//events={events}
											events={scheduleData
/* 												[{
													title: "CMA CGM VOLGA\n0BX56E1MA",
													allDay: false,
													start: new Date(2020, 3, 10, 10, 0),
													end: new Date(2020, 3, 10, 11, 0)
												},
												{
													title: "SM JAKARTA\n1917W",
													allDay: false,
													start: new Date(2020, 3, 14),
													end: new Date(2020, 3, 14)
												},
												{
													title: "TEST\n12345",
													allDay: false,
													start: new Date(2020, 3, 14),
													end: new Date(2020, 3, 14)
												}
												] */
											}
											defaultView="month"
											popup
											//views={['month','agenda']}
											views={["month"]}
											scrollToTime={new Date(1970, 1, 1, 6)}
											//defaultDate={new Date()}
											defaultDate={new Date(sDate)}
											onSelectEvent={(event,e) => selectedEvent(event,e)}
											//onSelectSlot={slotInfo => addNewEventAlert(slotInfo)}
											//eventPropGetter={eventColors}
											onNavigate={date => navigatedEvent(date)}
											//elementProps={{ onClick: e => selectedEvent(e.currentTarget,e.event)}}
											style={{height: "700px"}}
											//eventPropGetter={(event) => {
											//	const backgroundColor = event.allday ? 'yellow' : 'blue';
											//	return { style: { backgroundColor } }
											//  }}
										  />
										<Popover
											id={id}
											open={open}
											anchorEl={anchorEl}
											onClose={handleClose}
											anchorReference="anchorPosition"
											anchorPosition={{top:80,left:550}}
											anchorOrigin={{vertical:'bottom',horizontal:'center',}}
											transformOrigin={{vertical:'top',horizontal:'center',}}
										>
											<SchDetailPop
												detailParam = {detailParam} //store={token}
												{...props}
											/>
										</Popover>
										</CardBody>
									  </Card>								  
									</GridItem>

								  </GridContainer>
								)
					 },
					 {
						tabName: "Carrier List"
						,tabIcon: (ListAltOutlinedIcon)
						,tabContent: (
								  <GridContainer>
									  <GridItem xs={12}>
									  <div className={classes.root}>
									      <GridList cellHeight={180} className={classes.gridList}>
									        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
									          <ListSubheader component="div"></ListSubheader>
									        </GridListTile>
									        {tileData.map((tile) => (
									          <GridListTile key={tile.rownum} style={{ height: '150px',width:'400px'}}>
									          <div align='center'>
											<img src={require("assets/img/carrier/"+tile.img+".gif")} alt={tile.title} width='100' height='100' />
											</div>
									            <GridListTileBar  
												  title={
													<IconButton className={classes.cardTitleWhite} onClick={(e) => handleClick2(e,tile.line_code)} size="small">{tile.title}
												  </IconButton>
												}
									              //subtitle={<span>by: {tile.author}</span>}
									              actionIcon={tile.line_url && (
									                <IconButton target="_blank" href={tile.line_url}>
									                  <InfoIcon className={classes.cardTitleWhite}/>
									                </IconButton>)
									              }
									            />
									          </GridListTile>
									        ))}
									      </GridList>
							    </div>
								<Popover
				                    id="pop2"
				                    open={state.pop2}
				                    onClose={handleClose2}
				                    anchorReference="anchorPosition"
				                    anchorPosition={{top:80,left:550}}
				                        anchorOrigin={{vertical:'bottom',horizontal:'center',}}
				                        transformOrigin={{vertical:'top',horizontal:'center',}}
				                  >
															<SchLinePicPop
																detailParam = {state} //store={token}
																{...props}
															/>
				                  </Popover>
									</GridItem>
								</GridContainer>
						)
						}
					 ]}>   
					</CustomTabs>
					</div>
					</div>
					<h6 style={{paddingBottom: '0px',paddingTop: '0px',paddingLeft: '15px',paddingRight: '15px',color:'red',fontWeight:'bold' }}>※ 상기 스케줄은 실제 운항 스케줄과 상이할수 있습니다. 업무 진행시 선사와 필히 확인하시기 바랍니다.</h6>

          </div>

  );
}
//))
//export default ScheduleList;