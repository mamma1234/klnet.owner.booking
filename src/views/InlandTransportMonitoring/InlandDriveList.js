import React,{useState,useEffect} from "react";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';
import loadJs from "load-js";


import {Select,Table,Grid,TableHead,TableRow,TableBody,TableCell,TableFooter,Popover
    ,Card,CardHeader,TextField,Box,Collapse,FormControl,TableContainer
	,Tooltip,Icon, CircularProgress,Snackbar,

} from "@material-ui/core";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import Button from "components/CustomButtons/Button.js";

import {
    Search as SearchIcon,
    Clear as ClearIcon 
  } from "@material-ui/icons";
  import {
	Autocomplete as Autocomplete,
	Alert
} from '@material-ui/lab';

import RowTable from './InlandDriveDetail.js'
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";


import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import moment from 'moment';
const useStyles = makeStyles(styles);


export default function InlandDriveList(props) {
const classes = useStyles();

const [severity, setSeverity] = useState("");
const [alertOpen, setAlertOpen] = useState(false);
const [errMessage, setErrmessage] = useState("");

const [iconstate,setIconstate] = useState("add_circle");
const [borderBottomStyleValue,setBorderBottomStyleValue] = useState("1px solid #e0e0e0");
const [open, setOpen] = React.useState(false);
const [selectedRowData,setSelectedRowData] = useState({});
const [expanded, setExpanded] = React.useState(false);
const [expanded1, setExpanded1] = React.useState(false);
// const [curPage,setCurPage] = useState(10);
const [totPage,setTotPage] = useState(0);
const [numCnt,setNumCnt] = useState(1);
const [tableData,setTableData] = useState([]);
const [loading, setLoading] = useState(false);
const [loading2, setLoading2] = useState(false);
const [carrierList, setCarrierList] =useState([]);
const [carrierValue1,setCarrierValue1] = useState(null);
// const [carrierValue2,setCarrierValue2] = useState('');

const [blNo1,setBlNo1] = useState('');
const [cntrNo1,setCntrNo1] = useState('');
const [bkgNo1,setBkgNo1] = useState('');

let setStartDate = new Date();
let setEndDate = new Date();
const apiKey = "987DB43F-A2A1-3C3B-818F-68E7B9D7E786";


const [inputs2, setInputs2] = useState({
	carrierValue2 :null
	,blNo:''
	,cntrNo:''
	,bkgNo:''
	,forwarderID:''
	// ,outgateTime:setStartDate.setDate(setStartDate.getDate()-61)
	// ,ingateTime:setEndDate.setDate(setEndDate.getDate())
	,outgateTime: moment().subtract(2,'months')
	,ingateTime: moment()
})

const {carrierValue2 ,blNo,cntrNo,bkgNo,forwarderID,outgateTime,ingateTime} =inputs2

const onChange2 =(value,id)=> {
	// console.log('value,id',value,id)
	// const {value, id} =e.target;
	setInputs2({
		...inputs2,
		[id]:value
	});

	// console.log(inputs2)
}

const onReset2 =()=>{
	setInputs2({
	carrierValue2:null
	,blNo:''
	,cntrNo:''
	,bkgNo:''
	,forwarderID:''
	,outgateTime: moment().subtract(2,'months')
	,ingateTime: moment()
	})
}
useEffect(() => {
	 axios.post("/sch/getCarrierInfo",{}).then(res => setCarrierList(res.data));
	 loadJSfunc()
}, []);
// useEffect(() => {
// 	setTableData([])
// }, [carrierValue2
// 	,forwarderID
// 	,outgateTime
// 	,ingateTime
// 	,blNo2
// 	,bkgNo2
// 	,cntrNo2]);

const loadJSfunc=(move)=>{
	setLoading(true)
    loadJs(`https://map.vworld.kr/js/vworldMapInit.js.do?version=2.0&apiKey=${apiKey}&domain=booking.plism.com`)
    .then(function () {loadJs("https://map.vworld.kr/jquery/ol3/jquery-1.11.3.min.js")
      .then(function () {loadJs("https://map.vworld.kr/jquery/ol3/jquery-ui.min.js")
      .then(function () {loadJs("https://map.vworld.kr/js/map/OpenLayers-3.10.1/ol.js")
        .then(function () {loadJs("https://map.vworld.kr/js/map/chart/ol3/v2.raphael.js")
        .then(function () {loadJs("https://map.vworld.kr/js/map/chart/ol3/v2.g.raphael.max.js")
          .then(function () {loadJs("https://map.vworld.kr/js/map/chart/ol3/v2.g.bar.max.js")
          .then(function () {loadJs("https://map.vworld.kr/js/map/chart/ol3/v2.g.pie.max.js")
            .then(function () {loadJs("/js/vw.ol3.2DMapClassInit_v30.js")
            .then(function () {loadJs(`https://map.vworld.kr/js/sopMapInit.js.do?version=2.0&amp;apiKey=${apiKey}`)
              .then(function () {loadJs(`https://map.vworld.kr/check2DNum.do?version=2.0&amp;key=${apiKey}`)
              .then(function () {console.log("loadedMap ready... ");
			  setLoading(false)
              });
              });
            });
            });
          });
          });
        });
        });
      });
      });
    });
  
    return () => {
      console.log("unload");
    //   window.jQuery(".ol-viewport").remove();
    };
}
const onSubmit = async(numCnt) => {
  if(props.userData) {
  //search
  	numCnt==1?setLoading(true):setLoading2(true)
	if(inputs2.blNo || inputs2.bkgNo ||inputs2.cntrNo) {
			await axios.post("/loc/getInlandDriveList",{
				...inputs2
				,page_index:numCnt
				,page_size:10
				,carrierCode : inputs2.carrierValue2?inputs2.carrierValue2.line_code:''
				,outgateTime :Moment(inputs2.outgateTime).format('YYYYMMDD')
				,ingateTime : Moment(inputs2.ingateTime).format('YYYYMMDD')
			})
			.then(res => {
					if(res.status === 200&&!res.data.msg) {
						console.log(res.data, '>>' ,res.data[0])
						numCnt==1?setTableData(res.data):setTableData([...tableData,...res.data])
						setTotPage(res.data[0].TOT_PAGE)
					} else {
						setTableData([]);
						setTotPage(0);
						alertMessage(res.data.msg,'error');	
					}
			})
			.catch(err => {
				if(err.response !== undefined ) {
					if(err.response.status === 403||err.response.status === 401) {
					props.openLogin();
					}
				} else {
					console.log("error ");
					alertMessage('조회된 데이터가 존재 하지 않습니다.','error');
				}
				
			});
			setLoading(false)
			setLoading2(false)
	}else{
		alertMessage('(BL, BOOKING, 컨테이너 번호) 중 1가지는 필수 입력값입니다 ','error');
		setLoading(false)
		setLoading2(false)
	}
  } else {
	  props.openLogin();
  }
}

function AlertComponent(props) {
	return <Alert elevation={6} variant="filled" {...props} />;
}

const alertMessage = (message,icon) => {
	console.log(message)
	setErrmessage(message)
	setSeverity(icon)
	setAlertOpen(true);
}


const handleAlertClose = (event, reason) => {
    if(reason ==='clickaway') {
      return;
    }
    setAlertOpen(false);
  }

const handleSearchButton = () => {
	onSubmit(1)
	setNumCnt(1)
}  

const handleMoreButton = (numCnt) => {
	console.log(numCnt)
	++numCnt;
	onSubmit(numCnt)
	setNumCnt(numCnt)
}  

// const handleCurPage = (event) => {
// 	// setNumCnt(1)
// 	setCurPage(event.target.value);
// }

const handleExpandClick = () => {
  setExpanded(!expanded);
};
const handleExpandClick1 = () => {
	setExpanded1(!expanded1);
  };
const onCarrierChange = (e,data) => {
	console.log(e, data)
	e==1&&data?setCarrierValue1(data) :setCarrierValue1("")	
	// e==2&&data?setCarrierValue2(data):setCarrierValue2("")	
	e==2&&data?onChange2(data,'carrierValue2'):onChange2('','carrierValue2')
	
}
return(
    <div style={{paddingLeft:'3%',paddingRight:'3%'}}>
        <GridContainer justifyContent="space-between" style={{marginBottom:'10px'}}>
            <GridItem md={12}>
                <GridContainer>
                    <GridItem xs={6} md={3}>
						<Autocomplete
							options = {carrierList}
							getOptionLabel = { option =>"["+option.line_code+"]"+option.line_name }
							id="carrierValue1"
							onChange={(_,selectedOptions)=>onCarrierChange(1,selectedOptions)}
							renderInput={params => (
							<TextField {...params}  fullWidth id="shipperID" label="선사" fullWidth/>
						)}/>
                    </GridItem>
					<GridItem xs={6} md={3}>
						<TextField fullWidth id="bkgNo1" label="BOOKING 번호"
							onChange={event => setBkgNo1(event.target.value)} 
									value={bkgNo1}
						/>
					</GridItem>
                    <GridItem xs={6} md={4}>
                        <FormControl fullWidth style={{marginBottom:'10px'}}>
                            <CalendarBox
                            labelText ="등록일자"
                            id="in_date"
                            format="yyyy-MM-dd"
                            setValue={new Date()}
                            autoOk
                            //onChangeValue={date => setToDate(date)}
                            formControlProps={{fullWidth: true}} 
                            />
                        </FormControl>
                    </GridItem>
					<GridItem style={{textAlign:'end', display:'flex'}}  xs={6} md={2}>
						<Button color="info" fullWidth endIcon={<SearchIcon/>} disabled >등록 건 조회</Button>
						{/* <Button color="info" style={{width:'50%'}} endIcon={<ClearIcon/>}>초기화</Button>  */}
					</GridItem>
				</GridContainer> 
				<Collapse in={expanded1} timeout="auto" unmountOnExit style={{width:'100%'}}>
					<GridContainer> 
						<GridItem xs={6} md={6}>
							<TextField fullWidth id="blNo1" label="B/L NO"  
									onChange={event => setBlNo1(event.target.value)} 
									value={blNo1}
							/>
						</GridItem>
						<GridItem xs={6} md={6}>
							<TextField fullWidth id="cntrNo1" label="컨테이너 번호"
							onChange={event => setCntrNo1(event.target.value)} 
							value={cntrNo1}
							/>
						</GridItem>
					</GridContainer>
				</Collapse>
            </GridItem>
        </GridContainer> 
		<GridContainer spacing={1}>
			<GridItem xs={12} style={{textAlignLast:'center',height:'30px',paddingTop:'15px',paddingLeft:'20px',paddingRight:'20px'}} onClick = {handleExpandClick1}>
				{expanded1?<ExpandLess style={{color:'#00acc1'}}/>:<ExpandMore  style={{color:'#00acc1'}}/>}
			</GridItem>
		</GridContainer>
        <GridContainer justifyContent="space-between" style={{marginBottom:'10px'}}>
            <GridItem md={12}>
                <GridContainer>
					<GridItem xs={4} md={3}>
						<TextField fullWidth id="blNo" label="수입 B/L NO"
						// onChange={event => setBlNo2(event.target.value)} 
						onChange={(e)=>onChange2(e.target.value, e.target.id)}
						value={blNo}/>
					</GridItem>
					<GridItem xs={4} md={3}>
						<TextField fullWidth id="bkgNo" label="수출 BOOKING"
						// onChange={event => setBkgNo2(event.target.value)} 
						onChange={(e)=>onChange2(e.target.value, e.target.id)}
						value={bkgNo}/>
					</GridItem>
					
					<GridItem xs={4} md={3}>
						<TextField fullWidth id="cntrNo" label="컨테이너번호"
						// onChange={event => setCntrNo2(event.target.value)} 
						onChange={(e)=>onChange2(e.target.value, e.target.id)}
						value={cntrNo}/>
					</GridItem>
					<GridItem style={{textAlign:'end', display:'flex'}}  xs={12} md={3}>
						<Button color="info" style={{width:'50%'}} endIcon={<SearchIcon/>}  onClick = {()=>handleSearchButton()}>조회</Button>
						<Button color="info" style={{width:'50%'}} endIcon={<ClearIcon/>} onClick={onReset2}>초기화</Button> 
					</GridItem>
				</GridContainer> 
				<Collapse in={expanded} timeout="auto" unmountOnExit style={{width:'100%',marginTop:'13px'}}>
					<GridContainer> 
						<GridItem xs={6} md={3}>
							<Autocomplete
										options = {carrierList}
										getOptionLabel = { option =>"["+option.line_code+"]"+option.line_name }
										id="carrierValue2"
										value={carrierValue2}
										onChange={(_,selectedOption)=>onCarrierChange(2,selectedOption)}
										renderInput={params => (
										<TextField  {...params} id="shipperCode" label="선사" fullWidth/>
							)}/>							
						</GridItem>
						<GridItem xs={6} md={3}>
							<TextField md={6} fullWidth id="forwarderID" label="포워더 ID"
							// onChange={event => setForwarderID(event.target.value)} 
							onChange={(e)=>onChange2(e.target.value, e.target.id)}
							value={forwarderID}/>
						</GridItem>
						<GridItem xs={6} md={3}>
							<FormControl fullWidth style={{marginBottom:'10px'}}>
								<CalendarBox
								labelText ="터미널 반출일자"
								id="fromDate"
								variant="inline"
								format="yyyy-MM-dd"
								// setValue={e =>console.log(e.target.value)}
								setValue={inputs2.outgateTime}
								autoOk={true}
								// onChangeValue={date =>setOutgateTime(date)}
								onChangeValue={data =>onChange2(data, 'outgateTime')}
								formControlProps={{fullWidth: true}} 
								/>
							</FormControl>
						</GridItem>
						<GridItem xs={6} md={3}>
							<FormControl fullWidth style={{marginBottom:'10px'}}>
								<CalendarBox
								labelText ="터미널 반입일자"
								id="toDate"
								variant="inline"
								format="yyyy-MM-dd"
								setValue={inputs2.ingateTime}
								autoOk={true}
								onChangeValue={data =>onChange2(data, 'ingateTime')}
								// onChangeValue={date => setIngateTime(date)}
								formControlProps={{fullWidth: true}} 
								/>
							</FormControl>
						</GridItem>						
					</GridContainer>
				</Collapse>
            </GridItem>
        </GridContainer> 
		<GridContainer spacing={1}>
			<GridItem xs={12} style={{textAlignLast:'center',height:'30px',paddingTop:'15px',paddingLeft:'20px',paddingRight:'20px'}} onClick = {handleExpandClick}>
				{expanded?<ExpandLess style={{color:'#00acc1'}}/>:<ExpandMore  style={{color:'#00acc1'}}/>}
			</GridItem>
		</GridContainer>
		<GridContainer   justifyContent="center">
			<GridItem xs={12} sm={12} md={12} style={{marginBottom: '25px'}} >
				<div style = {{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>
				<h4 className={classes.cardIconTitle}>컨테이너 리스트</h4>	            
				<span style={{color:"#000000" ,marginTop:'15px'}}>[ Data Count: {tableData.length}건 / {tableData.length!==0?tableData[0].TOTAL:0}건 ]</span>
				</div>
				{/* <Card style={{marginTop:'15px',marginBottom:'0'}} > */}
					{/* <CardHeader 
					style={{paddingLeft:'5px',paddingBottom:'0',paddingTop:'0'}}>
					</CardHeader> */}
					{/* <CardBody style={{padding:'1%'}}> */}

					<TableContainer className={classes.tablecontainer}>
						<Table  style={{ borderBottom:'2px solid #00b1b7' }}>
							<TableHead color='info' style={{borderTop:'2px solid #00b1b7',}} >
								<TableRow className={classes.tableRow + " " + classes.tableRowHead}>
										<TableCell  rowSpan={2} align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver',borderLeft:'1px solid silver'}}>NO</TableCell>
										<TableCell  rowSpan={2} align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>등록</TableCell>
										<TableCell  rowSpan={2} align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>선사</TableCell>
										<TableCell  rowSpan={2} align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>수출입</TableCell>
										<TableCell  rowSpan={2} align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>컨넘버</TableCell>
										<TableCell  colSpan={3} align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>운송현황</TableCell>
										<TableCell  colSpan={2} align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>반출 운송사</TableCell>
										<TableCell  colSpan={5} align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>컨테이너 정보</TableCell>
								</TableRow>
								<TableRow >
										<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>현재위치</TableCell>
										<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>차량번호(ID)</TableCell>
										<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>기사 연락처</TableCell>
										<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>운송사명</TableCell>
										<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>운송사 연락처</TableCell>
										<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>반출기한</TableCell>
										<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>반입기한</TableCell>
										<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>반출 SEAL NO</TableCell>
										<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>반입 SEAL NO</TableCell>
										<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>more</TableCell>
								</TableRow>
							</TableHead>
							<TableBody  style={{borderTop:'2px solid #00b1b7',}}>
								{loading ? (<TableRow><TableCell colSpan={15} style={{textAlignLast:'center'}}><CircularProgress /></TableCell></TableRow>):
									tableData.length>0?
										tableData.map((prop, key) => { 
										return (
											<RowTable key={key} index={key + 1} data={prop}  //handleSelectedRow={handleSelectedRow}
											/>
										);
										})
									:
									<TableRow >
										<TableCell colSpan="15" align="center" style={{fontSize:"13px"}}>No Data</TableCell>	
									</TableRow>
								}
							</TableBody>
							{(tableData.length >= 10 ?
							<TableFooter >
								<TableRow  >
									<TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={15}>
										<Button
											color="info"
											onClick={()=>handleMoreButton(numCnt)}
											style={{paddingLeft:'60px',paddingRight:'60px'}}
											disabled={loading2}
											endIcon={loading2 && <CircularProgress size={24} />}
										>
										{!loading2? `MORE(${numCnt}/${totPage})` : ''}
										</Button>
										&nbsp;&nbsp;&nbsp;				
										{/* <Select
										native
										id = "CURPAGE"
										value={curPage}
										label=""
										onChange={handleCurPage}
										>
										<option value="10">10</option>
										<option value="20">20</option>
										<option value="30">30</option>
										</Select> */}
									</TableCell>
								</TableRow>
							</TableFooter>: null )}
						</Table>
					</TableContainer>
					{/* </CardBody> */}
				{/* </Card> */}
			</GridItem>
			<Snackbar open={alertOpen} autoHideDuration={2500} onClose={handleAlertClose}>
				<AlertComponent 
					onClose={handleAlertClose}
					severity={severity}>
						{errMessage}
				</AlertComponent>
			</Snackbar>
		</GridContainer>
    </div>
)}


// function RowTable(props) {
// 	const [iconstate,setIconstate] = useState("add_circle");
// 	const [borderBottomStyleValue,setBorderBottomStyleValue] = useState("1px solid #e0e0e0");
// 	const [open, setOpen] = React.useState(false);
// 	const [rowdata, setRowdata] = React.useState('');
// 	const classes = useStyles();
// 	const tableClasses = tableStyles();
// 	// const RegularMap = withScriptjs(
// 	// 	withGoogleMap(() => (
// 	// 	  <GoogleMap
// 	// 		defaultZoom={8}
// 	// 		defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
// 	// 		defaultOptions={{
// 	// 		  scrollwheel: false
// 	// 		}}
// 	// 	  >
// 	// 		<Marker position={{ lat: 40.748817, lng: -73.985428 }} />
// 	// 	  </GoogleMap>
// 	// 	))
// 	//   );  
	    


// 	const handleCollOpen = () => {
// 		if (!open) {
// 			setBorderBottomStyleValue("1px dotted #e0e0e0");
// 			setIconstate("remove_circle");
// 			setOpen(true);
// 		} else {
// 			setBorderBottomStyleValue("1px solid #e0e0e0");
// 			setIconstate("add_circle");
// 			setOpen(false);
// 		}		  
// 	}
// 	// const steps =	[
// 	// 					{
// 	// 						"req_seq": "20210623001656977872",
// 	// 						"move_time": "2021-08-03 07:16",
// 	// 						"loc_name": "USNYC",
// 	// 						"move_name": "Customs Released"
// 	// 					},
// 	// 					{
// 	// 						"req_seq": "20210623001656977872",
// 	// 						"move_time": "2021-07-29 17:15",
// 	// 						"loc_name": "USNYC",
// 	// 						"move_name": "Unloaded from Vessel"
// 	// 					},
// 	// 					{
// 	// 						"req_seq": "20210623001656977872",
// 	// 						"move_time": "2021-07-26 07:07",
// 	// 						"loc_name": "USNYC",
// 	// 						"move_name": "Vessel Arrival, Vessel scheduled to arrive"
// 	// 					},
// 	// 					{
// 	// 						"req_seq": "20210623001656977872",
// 	// 						"move_time": "2021-07-04 22:25",
// 	// 						"loc_name": "KRPUS",
// 	// 						"move_name": "Estimated Time of Departure (ETD) Delay"
// 	// 					}
// 	// 				]

// 		const [bookmarkIcon,setBookmarkIcon] = useState(false);
// 		const handleStarClick = () => {
// 			setBookmarkIcon(!bookmarkIcon) 
// 		}
	  		
// 	return (
// 	    <>
// 			<TableRow className={classes.tableRow + " " + classes.tableRowHead}  key={props.index}>
// 					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver',borderLeft:'1px solid silver'}}>{props.index}</TableCell>
// 					 <TableCell className={classes.tableMainDtlCell} style={{paddingTop:'0',paddingBottom:'0',borderRight:'1px solid silver',textAlign:'center'}}>
// 					  {/* ,textAlignLast:'left',borderBottom:borderBottomStyleValue}}> */}
// 						 {bookmarkIcon
// 						 ?<Tooltip title="등록"><StarIcon onClick={handleStarClick} style={{color:'#00acc1',verticalAlign:'bottom'}} /></Tooltip>
// 						 :<Tooltip title="등록"><StarBorderIcon onClick={handleStarClick} style={{color:'#00acc1',verticalAlign:'bottom'}} /></Tooltip>}
// 					</TableCell>
// 					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
// 					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
// 					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
// 					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
// 					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
// 					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
// 					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
// 					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
// 					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
// 					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>data </TableCell>
// 					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>GG1231 </TableCell>
// 					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>GG1231 </TableCell>
// 					<TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>
// 						<Tooltip title="more"><Icon style={{color:'#00acc1',paddingTop:'1px'}} onClick={handleCollOpen}>{iconstate}</Icon></Tooltip>
// 					</TableCell>
// 			</TableRow>
// 			<TableRow >
// 				<TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor:'#f5f5f5' }} colSpan={15}>
// 					<Collapse in={open} timeout="auto" unmountOnExit>
// 						<Box margin={1} style={{marginLeft:'0',marginRight:'0'}}>
// 							<Grid container spacing={1} justify="space-between">
// 								<Grid item xs={12} sm={12} md={4} style={{display: 'flex', alignItems: 'center'}}>
// 									<InlandDriveVmap data={props.data} key={props.index}/>
// 								</Grid>
// 	    		          		<Grid item xs={12} sm={12} md={8}>
// 									 <TimelineNew/>
// 								</Grid>
// 							</Grid>
// 						</Box>
// 					</Collapse>
// 				</TableCell>
// 			</TableRow>
// 	    </>
// 	  );
// }
