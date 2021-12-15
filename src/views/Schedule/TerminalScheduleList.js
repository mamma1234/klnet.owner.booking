import React,{ useState, useEffect } from "react";
import { Link } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';

import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Chip from '@material-ui/core/Chip';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import SearchIcon from '@material-ui/icons/Search';
import HighlightOff from '@material-ui/icons/HighlightOff';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

// other import
import axios from 'axios';
import {CSVLink} from 'react-csv';
import TerminalSchTable from "views/Schedule/TerminalScheduleDetailTable.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
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
};

const useStyles = makeStyles(styles);

class Clock extends React.Component {
	  state = {
		minutes: 0,
		seconds: 0,
		initTime:this.props.deadline
	  };

	componentWillMount() {
	  this.getTimeUntil(this.props.deadline);
	}
	componentDidMount() {
	  this.timerID = setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
	}

	componentWillUnmount() {
      clearInterval(this.timerID);
	}

	getName(data) {
		this.setState({initTime:data});
	}

 	componentDidUpdate(prevProps) {
		if(prevProps.deadline != this.props.deadline) {
			this.setState({ initTime:this.props.deadline});
		}
	}

	leading0(num) {
	  return num < 10 ? "0" + num : num;
	}
	getTimeUntil(deadline) {

	  let time = this.state.initTime;
	  if(this.props.remainTime == "reset") {
		this.props.setRemainTime(0);
		time = this.props.deadline;
	  }

	  //console.log("카운트다운!!!" + time);
	
	  if (time < 0) {
		this.setState({ minutes: 0, seconds: 0 });
		if(this.props.deadline != 0) this.props.setRemainTime(-1000);
		this.setState({initTime:this.props.deadline});
	  } else {
		const seconds = Math.floor((time / 1000) % 60);
		const minutes = Math.floor((time / 1000 / 60) % 60);
		this.setState({ minutes, seconds, initTime:time - 1000});
		
	  }
	}
	render() {
	  return (
		  <div>
			남은시간 : {this.leading0(this.state.minutes)}:{this.leading0(this.state.seconds)}
		  </div>
	  );
	}
  }

export default function ScheduleList(props) {
  const {detailParam,areaProps,terminalList,startDay} = props;
  let terminalCode = "";

  //console.log(">>>>admin:",store);
  //const [carrierCode,setCarrierCode] = useState("");
  const [vesselName,setVesselName] = useState("");
  const [terSchLogData,setTerSchLogData] = useState([]);
  const initSDate = startDay?new Date(startDay):new Date();
  const initEDate = startDay?new Date(startDay):new Date();
  let startDate = startDay?initSDate.setDate(initSDate.getDate()-3):new Date();
  let endDate = startDay?initEDate.setDate(initEDate.getDate()+3):initEDate.setDate(initEDate.getDate()+31);
  const [sDate,setSDate] = useState(startDate); 
  const [eDate,setEDate] = useState(endDate);
  //const [area,setArea] = useState(detailParam?detailParam.start_port.substring(2,5):"PUS");
  const [area,setArea] = useState(areaProps?areaProps:"PUS");
  const [gubun,setGubun] = useState("MNG");
  const [uniParam,setUniParam] = useState("");
  const [selectData,setSelectData] = useState([]);
  const [terminal,setTerminal] = useState('');
  const [value,setValue] = useState([]);
  //const [displayYn,setDisplayYn] = useState(detailParam?"none":"true");
  const [state, setState] = React.useState({
    checkedA: false,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const [updateDate,setUpdateDate] = useState(new Date());
  const [remainTime,setRemainTime] = useState("600000");

  const [refreshTime, setRefreshTime] = React.useState("600000");

  const refHandleChange = (event) => {
	setRefreshTime(event.target.value);
  };

  const headers = [
	{ label: 'Port', key: 'port_name' },
	{ label: 'Terminal', key: 'terminal_name' },
	{ label: '선박명', key: 'vessel_name' },
	{ label: '항차', key: 'voyage_no' },
	{ label: '접안예정일시', key: 'atb' },
	{ label: 'Closing Time', key: 'closing_time' },
	{ label: '출항예정일시', key: 'atd' },
	{ label: '선사', key: 'carrier_code' },
	{ label: '양하', key: 'unload_container' },
	{ label: '적하', key: 'load_container' },
	{ label: 'Shift', key: 'shifting_container' },
	{ label: '상태', key: 'status' },
	{ label: '문서작성일', key: 'CALSCH_DATE' }
  ];

  //const [openJoin,setOpenJoin] = useState(false);
  
  useEffect(() => {

	// console.log('TerminalList props',props)
		//debugger;
		if(areaProps) {		  
			setSelectData(terminalList);		
			setVesselName(detailParam?detailParam.vsl_name:"");
			terminalCode= setTerminalCode(terminalList)
			setValue(terminalList);
			onHandleSubmit(startDate,endDate,detailParam?detailParam.vsl_name:"",terminalCode,areaProps);
		}else{
			axios.post("/sch/getTerminalCodeList",{area})
			.then(res =>  {
				// console.log(res.data)
				setTerminalCode(res.data)
				setSelectData(res.data)
				// setValue(res.data)
			
			})
			.then(setValue([]))
			.catch(err => {
				if(err.response.status === 403||err.response.status === 401) {
					props.openLogin();
				}
			});
		}
		return () => {
		  console.log('cleanup');
		};
	  }, [areaProps,area]);
	  
/*  useEffect(() => {
	console.log('effect');
	
	//debugger;

		axios.post("/sch/getTerminalCodeList",{area})
		.then(res => setTerminalCode(res.data)).then(setValue([]))
		//.then(res => console.log(JSON.stringify(res.data)));
		.catch(err => {
			if(err.response.status === 403||err.response.status === 401) {
				props.openLogin();
			}
		});

	return () => {
	  console.log('cleanup');
	};
  }, [area]);*/

/*  useEffect(() => {
	console.log('effect');
	//debugger;
	if(detailParam&&terminal) onSubmit();
	return () => {
	  console.log('cleanup');
	};
  }, [terminal]);*/
  
  const handleArea = (e) => {
	  //debugger;
	// console.log("xx",e.target.value);
	setArea(e.target.value);
	//onSubmit2(e.target.value);
 }

 const handleGubun = (e) => {
	//debugger;
  // console.log("xx",e.target.value);
  setGubun(e.target.value);
}
  
  const onSubmit = () => {
 
	  onHandleSubmit(sDate,eDate,vesselName,terminal,area);
  }
  
  
  const onHandleSubmit = (start,end,vessel,terminal,area) => {
		if(props.userData) {
			// console.log('terminal>>>>',terminal)
			  axios.post("/sch/getTerminalScheduleList",{
			      vesselName:vessel,
				  startDate:moment(start).format('YYYYMMDD'),
				  endDate:moment(end).format('YYYYMMDD'),
				  terminal:terminal,
				  working:state.checkedA,
				  area:area
				})
				.then(setTerSchLogData([]))
			    .then(res => {
					// console.log(res.data)
					setTerSchLogData(res.data)}).then(setUpdateDate(new Date())).then(setRemainTime("reset"))
			    .catch(err => {
			        if(err.response.status === 403||err.response.status === 401) {
			        	props.openLogin();
			        }
				});
			} else {
				props.openLogin();
			}
  }

  const onTerminalChange = (e,data) => {
	setValue(data);
	let multiTerminal = "";

  for (let index in data) {
	  console.log(data[index].code);

	  multiTerminal = multiTerminal + "'" + data[index].code + "',";
  }
	
  if(multiTerminal) {setTerminal(multiTerminal);} else {setTerminalCode(selectData);}
	
}

const setTerminalCode = (data) => {
	setSelectData(data);

	for (let index in data) {
		// console.log(data[index].code);
	
		terminalCode = terminalCode + "'" + data[index].code + "',";
	}
	setTerminal(terminalCode);

	return terminalCode;
}

if(remainTime < 0) {
	onSubmit();
}

  const classes = useStyles();
  
  return (

		  <GridItem lg={12} md={12} sm={12} xs={12} style={{marginTop:'20px', marginBottom:'10px'}}>
		  {areaProps?<HighlightOff onClick={()=>props.onClose()} style={{color:'#7a7a7a',top:'2',right:'2',position:'absolute'}}/>:null}
        	<Card style={{marginTop:'0',marginBottom:'5px'}}>
        		<CardBody style={{paddingTop:'10px',paddingBottom:'10px'}}>
	          		<Grid item xs={12} sm={9} md={12}>
				     	<Grid container spacing={1}>
						 <Grid item xs={12} md={'auto'}>
						 <FormControl fullWidth>
										<InputLabel >Port</InputLabel>
										<Select 
										native
										id = "areaSelect"
										//disabled={tapNum != 0}
										value={area}
										label=""
										onChange={handleArea}
										>
										<option value="PUS">부산</option>
										<option value="INC">인천</option>
										<option value="KAN">광양</option>
										<option value="PTK">평택</option>
										<option value="KUV">군산</option>
										<option value="USN">울산</option>
										<option value="GIN">경인</option>
										<option value="TSN">대산</option>
										<option value="KPO">포항</option>
										<option value="MAS">마산</option>
										{/* <option value="">DONGHAE</option> */}
										{/* <option value="MOK">MOKPO</option> */}
										</Select>
										</FormControl>
										</Grid>
										<Grid item xs={12} md={3} >
										<Autocomplete 
											size="medium"
											//disabled={tapNum == 2}
											multiple
											options = {selectData}
											disableCloseOnSelect
											limitTags={1}
											getOptionLabel = { option => option.name}
											id="terminalCode"
											value={value}
											onChange={onTerminalChange}
											renderTags={(value, getTagProps) =>
												value.map((option, index) => (
												  <Chip
													variant="outlined"
													label={option.name}
													size="small"
													{...getTagProps({ index })}
												  />
												))
											  }
						        			renderInput={params => (
						        				<TextField {...params} label="Terminal" fullWidth/>
											)}
											renderOption={(option, { selected }) => (
												<React.Fragment>
												  <Checkbox   size="small" 
													icon={icon}
													checkedIcon={checkedIcon}
													style={{ marginRight: 8}}
													checked={selected}
												  />
												  {option.name}
												</React.Fragment>
											  )}
						        		/>
										</Grid>
							<Grid item xs={12} md={2}>
							 <TextField id="cntrNo" label="선박명" onChange={event => setVesselName(event.target.value)} value={vesselName} fullWidth />
							 </Grid>
				     		<Grid item xs={12} md={2}>
								 <CalendarBox
						        			labelText ="도착예정일(ETB)"
						      				id="portDate"
						      				format="yyyy-MM-dd"
						      				setValue={sDate}
						        			onChangeValue={date => setSDate(date)}
						        			formControlProps={{fullWidth: true}}
						        />
				     		</Grid>	
				     		<Grid item xs={12} md={2}>
							 <CalendarBox
						        			labelText =" "
						        			id="portDate"
						        			format="yyyy-MM-dd"
						        			setValue={eDate}
						        		    onChangeValue={
												date => setEDate(date)
											}
						        			formControlProps={{fullWidth: true}}
						        		/>
							</Grid>
							<Grid item xs={12} md={2}>
							<FormControlLabel style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '0px',paddingRight: '0px'}}
									control={
									<Checkbox checked={state.checkedA} color="default" size="small"
									onChange={handleChange} name="checkedA" />}
									label="작업중">
							</FormControlLabel>
							</Grid>
			      		</Grid>
			      	</Grid>
			     </CardBody>
			   </Card>
      
       <Grid item xs={12} style={{paddingBottom:'10px',textAlign:'-webkit-right'}}>
	    	<Grid item xs={12} sm={3} md={2} style={{textAlign:'center'}}>
		      {/* <Button color="info" onClick = {onSubmit} startIcon={<CancelIcon/>}>초기화</Button> */}
		      {/* <Button color="info" onClick = {onSubmit}  >조회</Button>*/}
		      <Button color="info" onClick = {onSubmit} endIcon={<SearchIcon/>}
				fullWidth>Search</Button>	
		      {/* <Button color="info" >삭제</Button>
		      <Button color="info" //onClick = {Download} 
		        id='btnExport' >엑셀다운로드</Button> */}
		    </Grid>
	    </Grid>
      


	  {detailParam?null:(<Grid item xs={12} sm={9} md={12}>
			     	<Grid container spacing={1}>
	  <Grid item xs={12} md={2}>			
					 <FormControl fullWidth>
									<InputLabel >수입화물 통관조회</InputLabel>
									<Select 
									native
									id = "unipassSelect"
									value={gubun}
									label=""
									onChange={handleGubun}
									>
									<option value="MNG">화물관리번호</option>
									<option value="MBL">Master B/L</option>
									<option value="HBL">House B/L</option>
									</Select>
									</FormControl>
									</Grid>
									<Grid item xs={12} md={4}>
										<TextField id="cntrNo" label="화물관리번호 또는 M-B/L 또는 H-B/L을 입력해주세요." onChange={event => setUniParam(event.target.value)} value={uniParam} fullWidth />
										</Grid>
										{/* <Grid item xs={12} md={5}></Grid> */}
										<Grid item xs={12} md={1} >
							<Button color="info" component={Link} to={{pathname:"/svc/unipassapi",search:"?gubun="+ gubun +"&param="+ uniParam}} endIcon={<SearchIcon/>}
							fullWidth>Search</Button>							
						</Grid>
										</Grid>
										</Grid>)}

		  

	  <Grid item xs={12} sm={9} md={12}>
	  	<Grid container spacing={1} justify="space-between">
	  		<Grid item xs={12} md={3} style={{paddingTop: '10px'}}>최종 업데이트 : {moment(updateDate).format('YYYY-MM-DD HH:mm')}</Grid>
	  		<Grid item xs={12} md={2} style={{paddingTop: '10px',display:'none'}}><Clock deadline={refreshTime} setRemainTime={setRemainTime} remainTime={remainTime}/></Grid>
			<Grid item xs={12} md={7} style={{paddingTop: '0px',display:'none'}}>
				  <FormControl component="fieldset">
		          	<RadioGroup aria-label="gender" name="gender1" value={refreshTime} onChange={refHandleChange} >
					  <div>
				        <FormControlLabel value="0" control={<Radio size='small'/>} label="수동" size='small' />
				        <FormControlLabel value="300000" control={<Radio size='small'/>} label="5분" size='small' />
				        <FormControlLabel value="600000" control={<Radio size='small'/>} label="10분" size='small' />
				      </div>
				    </RadioGroup>
				 </FormControl>
			</Grid>
			<Grid item xs={12} md={1} >
				<CSVLink
									data={terSchLogData}
									headers={headers}
			                        filename="terminal_sch_data.csv"><Button fullWidth color="info" size="sm">EXCEL 다운로드</Button>
				</CSVLink>
		    </Grid>
	    </Grid>
	</Grid>
	  <TerminalSchTable
	  	tableHeaderColor="info"
	    tableHead={[  "Port","Terminal","선박명","항차","접안예정일시","Closing Time","출항예정일시","선사","양하","적하","Shift","상태","문서작성일"]}
	    tableData={terSchLogData}
		{...props}
	  />
	</GridItem>
  );
}
