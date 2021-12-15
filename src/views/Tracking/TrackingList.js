import React,{ useState, useEffect } from "react";
import { Link } from 'react-router-dom';

//@material-ui/core components
import {Collapse,Grid,Snackbar,FormControl,InputLabel,Select,Tooltip,TextField, Popover, Typography, IconButton} from '@material-ui/core';

//@material-ui/lab components
import {Autocomplete,Alert} from '@material-ui/lab';

//Customs components
import Card from "components/Card/Card.js";
//import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "views/Tracking/TrackingDetail.js";
//icon
import SearchIcon from '@material-ui/icons/Search';
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Assignment from "@material-ui/icons/Assignment";
//import CardIcon from "components/Card/CardIcon.js";
import ArrowUp from "@material-ui/icons/ArrowUpward";
import ArrowDown from "@material-ui/icons/ArrowDownward";
// other import
import axios from 'axios';
import Moment from 'moment';
import queryString from 'query-string';

let numCnt =1;
let initialValue = null;
let updateCount = 0; // 수정이력

export default function TrackingList(props) {

  const query = queryString.parse(window.location.search);
	
  //const {token} =props;
  let setStartDate = new Date();
  let setEndDate = new Date();
  const setStartDateOld = new Date();
  const setEndDateOld = new Date();
  const [dategb,setDategb] = useState(query.dategb?query.dategb:"D");
  const [dategbOld,setDategbOld] = useState(query.dategb?query.dategb:"D");
  
  const [ietype,setIetype] = useState(query.ietype?query.ietype:"A");
  const [ietypeOld,setIetypeOld] = useState(query.ietype?query.ietype:"A");
  //const [labelName,setLabelName] = useState("BL & BK NO.");
  const [sPort,setSPort] = useState("");
  const [ePort,setEPort] = useState("");
  const [sPortOld,setSPortOld] = useState("");
  const [ePortOld,setEPortOld] = useState("");
  const [sort, setSort] = useState("");
  const [copySort,setCopySort] = useState("");
  const [searchKey,setSearchKey] = useState("");
  const [searchKeyOld,setSearchKeyOld] = useState("");
  const [lineCode,setLineCode] = useState([]);
  const [carrierCode,setCarrierCode] = useState("");
  const [carrierCodeOld,setCarrierCodeOld] = useState("");

  const [portData,setPortData] = useState([]);
  const [trackingList,setTrackingList] = useState([]);
  const [fromDate,setFromDate] = useState(query.from === "T"?setStartDate:query.from === "7"?setStartDate.setDate(setStartDate.getDate()-7):query.from === "1"?setStartDate.setDate(setStartDate.getDate()-1):setStartDate.setDate(setStartDate.getDate()-3));
  const [toDate,setToDate] = useState(query.to=== "T"?setEndDate:setEndDate.setDate(setEndDate.getDate()+3));
  const [fromDateOld,setFromDateOld] = useState(query.from === "T"?setStartDate:query.from === "7"?setStartDate.setDate(setStartDate.getDate()-7):query.from === "1"?setStartDate.setDate(setStartDate.getDate()-1):setStartDateOld.setDate(setStartDateOld.getDate()-3));
  const [toDateOld,setToDateOld] = useState(query.to === "T"?setEndDate:setEndDateOld.setDate(setEndDateOld.getDate()+3));

  const [totCnt,setTotCnt] = useState(0);
  const [severity, setSeverity] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errMessage, setErrmessage] = useState("");
  const [selectCurpage,setSelectCurpage] = useState(10);
  const [selectedRowData,setSelectedRowData] = useState({});
  const [sortEl, setSortEl] = useState(null);
  

  

useEffect(() => {
	// axios.get("/image/bg.jpg",{}).then(
	// 	res=> {
	// 		console.log(res)
	// 	}
	// )
	if(query.ietype) {
		onSubmit();
	}

	    return () => {
	      console.log('cleanup');
	     // window.removeEventListener("touchmove",handleTouchMove);
	    };
}, []);
const sortOpen = Boolean(sortEl);
const sortId = sortOpen ? 'simple-popover' :undefined;
	function AlertComponent(props) {
		return <Alert elevation={6} variant="filled" {...props} />;
	}
	const handlesortClose = (param) => {
		if(param !== undefined) {
			setSort(param)
		}
		setSortEl(null);

	}
	const handleSortClick = (event) => {
		setSortEl(event.currentTarget)
	}
	const handleAlertClose = (event, reason) => {
		if(reason ==='clickaway') {
			return;
		}
		setAlertOpen(false);
	  }
	
	function  alertMessage (message,icon) {
		setErrmessage(message);
		setSeverity(icon);
		setAlertOpen(true);
	}

  const onPortSearchValue = (e) => {
	    const values = e.target.value;
	    if(values !== undefined && values !== "" && values.length >= 2) {
	    	if(props.userData) {
		    	axios.post("/com/getTrackingPortCode",{ portCode:values})
		    	.then(setPortData([]))
			    .then(res => setPortData(res.data))
			    .catch(err => {
			        if(err.response.status === 403||err.response.status === 401) {
			        	props.openLogin();
					}
			    });
	    	} else {
	    		props.openLogin();
	    	}
	    }  
}
  
  const onLineSearchValue = (e) => {
	    const values = e.target.value;
	    if(values != undefined && values != "" && values.length >= 1) {
	    	if(props.userData) {
		    	axios.post("/loc/getCustomLineCode",{})
		    	.then(setLineCode([]))
			    .then(res => setLineCode(res.data))
			    .catch(err => {
			        if(err.response.status === 403||err.response.status === 401) {
			        	props.openLogin();
					}
			    });
	    	} else {
	    		props.openLogin();
	    	}
	    }  
}

// 자식으로부터 클릭한 데이터 받기
const fncSelectedGridRowDataMain = (data ) => {
	setSelectedRowData(data);
}

// BL REPORT 출력하기
// const onBlReport = () => {
// 	// console.log("=============================");
// 	// console.log(selectedRowData);
// 	// console.log("=============================");
// 	if( selectedRowData.req_seq == undefined ) {
// 		alert(" 출력할 BL을 선택 후 다시 시도하세요. ");
// 		return false;
// 	}
	
// 	if(props.userData) {
// 		let host = ''
// 		if( window.location.hostname == 'localhost') {
// 			host = 'http://localhost:5008';
// 		} else if ( window.location.hostname == 'dev.plismplus.com' ) {
// 			host = 'https://dev.plismplus.com';
// 		} else if ( window.location.hostname == 'www.plismplus.com' ) {
// 			host = 'https://www.plismplus.com';
// 		}

// 		var bodyFormData = new FormData();
		
// 		bodyFormData.append('user_no', props.userData.userno);
// 		bodyFormData.append('req_seq', selectedRowData.req_seq);
// 		bodyFormData.append('bl_bkg', selectedRowData.bl_bkg);

// 		axios.post(host+"/report2",
// 			bodyFormData,{
// 			headers:{
// 				'Accept':'application/pdf',
// 				// 'Authorization':'Bearer '+token
// 			}
// 			,responseType:'blob'
// 		}).then(
// 			res=>{
// 				Filesaver.saveAs(new Blob([res.data],{type:'application/pdf'}), selectedRowData.bl_bkg+'BL발급.pdf');
// 		});
// 	} else {
// 		props.openLogin();
// 	}
//   }

  
  const onSubmit = () => {
		// 초기값 구분 initialValue
		if(ietype === ietypeOld && dategb === dategbOld && fromDate === fromDateOld && toDate === toDateOld 
				&& searchKey === searchKeyOld && sPort === sPortOld && ePort === ePortOld && carrierCode === carrierCodeOld && updateCount === 0) {
			initialValue = "Y";
		} else {
			updateCount = updateCount++; // 변경 이력 카운트
			initialValue = "N";
		}
	 
	  if(props.userData) {
  
	  //search
	  numCnt=1;
	  setSelectCurpage(10);
	  axios.post("/loc/getTrackingList",{
		  ietype:ietype,
		  dategb:dategb,
		  from:Moment(fromDate).format('YYYYMMDD'),
		  to:Moment(toDate).format('YYYYMMDD'),
		  blbk:searchKey,
		  start:sPort,
		  end:ePort,
		  line:carrierCode,
		  initial:initialValue,
		  sort:sort,
		  cur:10,
		  num:numCnt}
		  )
		.then(setTrackingList([]))
		.then(setTotCnt(0))
	    .then(res => {
	    				if(res.status === 200) {
	    					setTrackingList(res.data);
	    					setTotCnt(res.data[0].tot_cnt);
	    				} else {
	    					setTrackingList([]);
	    					setTotCnt(0);	
	    				}
	    			})
	    .catch(err => {
	        if(err.response !== undefined ) {
	        	if(err.response.status === 403||err.response.status === 401) {
	        	props.openLogin();
	        	}
			} else {
				console.log("errod ");
				setTotCnt(0);
				alertMessage('조회된 데이터가 존재 하지 않습니다.','error');
				setTrackingList([]);		
			}
	        
	    });  
	  } else {
		  props.openLogin();
	  }
  }

   const handleAddRow = (curpage) => {
	   console.log(copySort)
		// 초기값 구분 initialValue
		if(ietype === ietypeOld && dategb === dategbOld && fromDate === fromDateOld && toDate === toDateOld 
				&& searchKey === searchKeyOld && sPort === sPortOld && ePort === ePortOld && carrierCode === carrierCodeOld && updateCount === 0) {
			initialValue = "Y";
		} else {
			initialValue = "N";
		}

	  if(props.userData) {
		  if(numCnt != trackingList[0].tot_page) {
			//page ++
		    numCnt=numCnt+1;
		    setSelectCurpage(curpage);
		    axios.post("/loc/getTrackingList",{
			    	  ietype:ietype,
					  dategb:dategb,
					  from:Moment(fromDate).format('YYYYMMDD'),
					  to:Moment(toDate).format('YYYYMMDD'),
					  blbk:searchKey,
					  start:sPort,
					  end:ePort,
					  line:carrierCode,
					  sort:copySort,
					  initial:initialValue,
					  cur:curpage,
					  num:numCnt})
				  .then(res => setTrackingList([...trackingList,...res.data]))
		          .catch(err => {
		            if(err.response.status === 403 || err.response.status === 401) {
			        	//setOpenJoin(true);
			        	props.openLogin();
			        }
		            });
		  }
	  } else {
		  props.openLogin();
	  }
  };
  
/*  const handleClose = () => {
	  setAnchorE1(null);
	  setAnchorE2(null);
	  setAnchorE3(null);
  }*/
    
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleIEGubun = (e) => {
	 // console.log("xx",e.target.value);
	  setIetype(e.target.value);	  
  }
  
  const handelLoginOpen = () => {
	  props.openLogin();
  }
  
  const handelSelectDate =(event) => {
	  if(event.target.value === "X") {
		  setDategb(event.target.value);
		  setFromDate(null);
		  setToDate(null);
	  } else {
		  setStartDate = new Date();
		  setEndDate = new Date();
		  setDategb(event.target.value);
		  setFromDate(setStartDate.setDate(setStartDate.getDate()-3));
		  setToDate(setEndDate.setDate(setEndDate.getDate()+3));
	  }
  }
  
  const handleClick = (event) => {
	  const anchor = document.querySelector('#scroll_top');
	  if(anchor) {
		  anchor.scrollIntoView();
	  }
  };
  
  //const classs = klnetStyles();
  return (
    <GridContainer>
    	<GridItem xs={12} sm={12} style={{marginBottom:'5px',padding:'0'}}>
          	<Card style={{marginTop:'0',marginBottom:'5px'}}>
          		<CardBody>
          		<Grid item xs={12} sm={12}>
		     	<Grid container spacing={3}>

	      			<Grid item xs={12} sm={12} md={12}>
	    			<Grid container spacing={2}>
	    				<Grid item xs={12} sm={12} md={2} >
	    					<FormControl fullWidth>
						        <InputLabel id = "ie_type" >IMPORT&EXPORT</InputLabel>
						        <Select
						          native
						          id = "IE_TYPE_SELECT"
						          value={ietype}
						          label="IMPORT&EXPORT"
						           onChange={handleIEGubun}
						        >
						        <option value="A">ALL</option>
						        <option value="I">IMPORT</option>
						        <option value="E">EXPORT</option>
						        </Select>
						   </FormControl>
	    				</Grid>
	    				<Grid item xs={12} sm={12} md={3}>
	    					<TextField id="blbk" label="B/L & B/K No. & Remark" onChange={event => setSearchKey(event.target.value)} value={searchKey} //variant="outlined" size="small" 
	    						fullWidth />
	    				</Grid>
	    				<Grid item xs={12} sm={12} md={2} >
	    					<FormControl fullWidth>
							        <InputLabel id = "ie_type" >Date</InputLabel>
							        <Select
							          native
							          id = "start_end"
							          value={dategb}
							          label="Date"
							           onChange={handelSelectDate}
							        >
							        <option value="D">ETD&ATD</option>
							        <option value="A">ETA&ATA</option>
							        <option value="X">No Period</option>
									<option value="I">등록일자</option>
							        </Select>
							 </FormControl>
					    </Grid>
	    				<Grid item xs={12} sm={12} md={5}>
	    					<Grid container spacing={1}>
	    						<Grid item xs={12} sm={12} md ={6}> 
	    							<CalendarBox
	    								labelText ="From"
	    								id="fromDate"
	    								variant="inline"
										format="yyyy-MM-dd"
										//inputVariant="outlined"
										//margin="dense"
	    								setValue={fromDate}
	    								autoOk={true}
	    								onChangeValue={date => setFromDate(date)}
	    								formControlProps={{fullWidth: true}} 
	    							/>
	    						</Grid>
	    						<Grid item xs={12} sm={12} md ={6}>
	    							<CalendarBox
	    								labelText ="To"
	    								id="toDate"
	    								variant="inline"
										format="yyyy-MM-dd"
										//inputVariant="outlined"
										//margin="dense"
	    								setValue={toDate}
	    								autoOk={true}
	    								onChangeValue={date => setToDate(date)}
	    								formControlProps={{fullWidth: true}}
	    							/>
	    						</Grid>
	    					</Grid>
	    				</Grid>
	    			</Grid>
	    		</Grid>	
						<Collapse in={expanded} timeout="auto" unmountOnExit style={{width:'100%'}}>
							<Grid item xs={12} sm={12}>
								<Grid container spacing={1}>
									<Grid item xs={12} md={12} sm={12} style={{paddingLeft:'12px',paddingRight:'12px'}}>
										<Grid container spacing={1}>
											<Grid item xs={12} sm={12} md={4}style={{paddingLeft:'8px',paddingRight:'8px'}}>
												<Autocomplete
													options = {portData}
													getOptionLabel = { options => "["+options.port_code+"] "+options.port_name}
													id="start"
													onChange={(e,data)=>setSPort(!data?'':data.port_code)}
													noOptionsText="Please enter 2 characters ..."
													onInputChange={onPortSearchValue}
													renderInput={params => (
														<TextField {...params} label="출발지"  //variant="outlined" size="small" 
															fullWidth />
													)}
												/>
											</Grid>
											<Grid item xs={12} sm={12} md={4}style={{paddingLeft:'8px',paddingRight:'8px'}}>
												<Autocomplete
													options = {portData}
													getOptionLabel = { options => "["+options.port_code+"] "+options.port_name}
													id="end"
													noOptionsText="Please enter 2 characters ..."
													onChange={(e,data)=>setEPort(!data?'':data.port_code)}
													onInputChange={onPortSearchValue}
													renderInput={params => (
														<TextField {...params} label="도착지"  //variant="outlined" size="small" 
															fullWidth />
													)}
												/>
											</Grid> 
											<Grid item xs={12} sm={12} md={4}style={{paddingLeft:'8px',paddingRight:'8px'}}>	
												<Autocomplete
												options = {lineCode}
												getOptionLabel = { option => option.id +' '+option.nm }
												noOptionsText="Please enter 1 characters ..."
												id="carrierCode"
												onInputChange={onLineSearchValue}
												onChange={(e,data)=>setCarrierCode(!data?'':data.id)}
												renderInput={params => (
													<TextField inputProps={{maxLength:4}} {...params} label="선사" fullWidth />
												)}
											/>
											</Grid> 	
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Collapse>

	        	
			</Grid>
		  </Grid> 
		  <Grid container spacing={1}>
		      	<Grid item xs={12} style={{textAlignLast:'center',height:'30px',paddingTop:'15px',paddingLeft:'20px',paddingRight:'20px'}} onClick = {handleExpandClick}>
		      		{expanded?<ExpandLess style={{color:'#00acc1'}}/>:<ExpandMore  style={{color:'#00acc1'}}/>}
		      	</Grid>
		  </Grid>
	  		</CardBody>
	  		</Card>


			  <Grid item xs={12} sm={12} md={12}  style={{textAlign:'-webkit-right'}}>
	    			<Grid container spacing={2}  style={{textAlign:'center'}}>

	    				<Grid item xs={1} sm={1} md={8}>
							

							{/* <Tooltip title="B/L(B/K) 출력">
								<Report
									// user_no
									user_id={props.userData.userno}
									// system_id
									system_id='plismplus'
									// japser file경로
									file_path='BL'
									file_id='BL_REPORT2.jrxml'
									// download 당시 파일명
									file_name='선사정보'
									// jasper report DB 접속 정보
									connect='pgsql'
									// jasper report DB 쿼리 변수
									parameters={{
										'user_no':props.userData.userno,
										'req_seq':selectedRowData.req_seq,
										'bl_bkg':selectedRowData.bl_bkg,
										'img':selectedRowData.line_code+'.gif'
									}}
									// parameters 에 정의된 변수 중 필수값 체크
									// key(필수값):value(안내문구)
									// 값이 null 이거나 undefined 또는 '' 이면 체크됨
									validation={{
										'req_seq':'BL을 선택해주시기 바랍니다.'
									}}></Report>
							</Tooltip>&nbsp;&nbsp; */}
	    				</Grid>
	    				<Grid item xs={3} sm={3} md={1} >
							<Button color="info" onClick ={(e)=>handleSortClick(e)} fullWidth>
								{
									sort===''?(<span>정렬 조건</span>):
									sort==="blup"?(<span>B/L<ArrowUp/></span>):
									sort==="bldw"?(<span>B/L<ArrowDown/></span>):
									sort==="bkup"?(<span>B/K<ArrowUp/></span>):
									sort==="bkdw"?(<span>B/K<ArrowDown/></span>):
									sort==="polup"?(<span>POL<ArrowUp/></span>):
									sort==="poldw"?(<span>POL<ArrowDown/></span>):
									sort==="podup"?(<span>POD<ArrowUp/></span>):
									sort==="poddw"?(<span>POD<ArrowDown/></span>):
									sort==="etdup"?(<span>ETD<ArrowUp/></span>):
									sort==="etddw"?(<span>ETD<ArrowDown/></span>):
									sort==="etaup"?(<span>ETA<ArrowUp/></span>):
									sort==="etadw"?(<span>ETA<ArrowDown/></span>):null
								}
							</Button>
							<Popover
								id={sortId}
								open={sortOpen}
								anchorEl={sortEl}
								onClose={()=>handlesortClose()}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal:'center'
								}}
								transformOrigin={{
									vertical:'top',
									horizontal:'center'
								}}
								>
								<Typography component="div">
									<Grid>
										<Button size="sm" color="info" fullWidth onClick={()=>handlesortClose('')}><span>정렬 조건 없음</span></Button>
									</Grid>
									<Grid>
										<span style={{fontSize:'20px', marginLeft:'15px'}}>B/L</span>
											<IconButton onClick={()=>handlesortClose('blup')}>
											<ArrowUp/>
											</IconButton>
											<IconButton onClick={()=>handlesortClose('bldw')}>
											<ArrowDown/>
											</IconButton>
									</Grid>	
									<Grid>
										<span style={{fontSize:'20px' , marginLeft:'15px'}}>B/K</span>
											<IconButton onClick={()=>handlesortClose('bkup')}>
											<ArrowUp/>
											</IconButton>
											<IconButton onClick={()=>handlesortClose('bkdw')}>
											<ArrowDown/>
											</IconButton>
									</Grid>	
									<Grid>
										<span style={{fontSize:'20px', marginLeft:'15px'}}>POL</span>
											<IconButton onClick={()=>handlesortClose('polup')}>
											<ArrowUp/>
											</IconButton>
											<IconButton onClick={()=>handlesortClose('poldw')}>
											<ArrowDown/>
											</IconButton>
									</Grid>	
									<Grid>
										<span style={{fontSize:'20px', marginLeft:'15px'}}>POD</span>
											<IconButton onClick={()=>handlesortClose('podup')}>
											<ArrowUp/>
											</IconButton>
											<IconButton onClick={()=>handlesortClose('poddw')}>
											<ArrowDown/>
											</IconButton>
									</Grid>	
									<Grid>
										<span style={{fontSize:'20px', marginLeft:'15px'}}>ETD</span>
											<IconButton onClick={()=>handlesortClose('etdup')}>
											<ArrowUp/>
											</IconButton>
											<IconButton onClick={()=>handlesortClose('etddw')}>
											<ArrowDown/>
											</IconButton>
									</Grid>	
									<Grid>
										<span style={{fontSize:'20px', marginLeft:'15px'}}>ETA</span>
											<IconButton onClick={()=>handlesortClose('etaup')}>
											<ArrowUp/>
											</IconButton>
											<IconButton onClick={()=>handlesortClose('etadw')}>
											<ArrowDown/>
											</IconButton>
									</Grid>	
								</Typography>
								
								{/* <FormControl variant="outlined" fullWidth>
									<InputLabel>정렬 조건</InputLabel>
									<Select
										value={sort}
										onChange={(e)=>setSort(e.target.value)}
										label="정렬 조건">
										<MenuItem key="polup" value={"polup"}><span>POL</span><ArrowUp></ArrowUp></MenuItem>
										<MenuItem key="poldw" value={"poldw"}><span>POL</span><ArrowDown></ArrowDown></MenuItem>
										<MenuItem key="podup" value={"podup"}><span>POD</span><ArrowUp></ArrowUp></MenuItem>
										<MenuItem key="poddw" value={"poddw"}><span>POD</span><ArrowDown></ArrowDown></MenuItem>
										<MenuItem key="etdup" value={"etdup"}><span>ETD</span><ArrowUp></ArrowUp></MenuItem>
										<MenuItem key="etddw" value={"etddw"}><span>ETD</span><ArrowDown></ArrowDown></MenuItem>
										<MenuItem key="etaup" value={"etaup"}><span>ETA</span><ArrowUp></ArrowUp></MenuItem>
										<MenuItem key="etadw" value={"etadw"}><span>ETA</span><ArrowDown></ArrowDown></MenuItem>

									</Select>
								</FormControl> */}
							</Popover>					
					    </Grid>
						<Grid item xs={4} sm={4} md={1}>
							
						<Tooltip title="B/L(B/K) Upload">
							<Button 
								fullWidth
								color="info" //onClick={() => setAnchorE1(true)}  
								component={Link} to="/svc/uploadbl"
								endIcon={<Assignment />}>B/L(B/K)</Button>
						</Tooltip>
						</Grid>
	    				<Grid item xs={4} sm={4} md={2}>
						<Button color="info" fullWidth onClick = {() => {setCopySort(sort);onSubmit();}} endIcon={<SearchIcon/>}>Search</Button>
	    				</Grid>
	    			</Grid>
	    		</Grid>	


      				<span style={{color:"#000000"}}>[ Data Count: {trackingList.length}건 / {totCnt}건 ]</span>

					<Table
						tableHeaderColor="info"
						tableRownum={numCnt}
						tableData={trackingList}
						sort={sort}
						onClickHandle ={(event)=>handleAddRow(event)}
						onLoginPage ={handelLoginOpen}
						curpage = {selectCurpage}
						fncSelectedGridRowDataMid = {(event)=>fncSelectedGridRowDataMain(event)}
		            />
		            {trackingList.length > 0?
		            <div className={"fixed-plugin"} style={{top:'85%',width:'45px',right:'2%',borderRadius:'8px'}}>
					    <div onClick={handleClick}>
					    	<Tooltip title="Scroll Top">
					    		<i className="fa fa-angle-double-up fa-3x" style={{color:'white'}}/>
					    	</Tooltip>
					    </div>
					</div>:null
		            }
		   </GridItem>
		   <Snackbar open={alertOpen} autoHideDuration={2500} onClose={handleAlertClose}>
			<AlertComponent 
				onClose={handleAlertClose}
				severity={severity}>
					{errMessage}
			</AlertComponent>
		</Snackbar>
    </GridContainer>
  );
}
