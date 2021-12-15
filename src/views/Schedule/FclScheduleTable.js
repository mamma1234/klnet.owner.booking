import React,{ useState,useEffect } from "react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { makeStyles } from "@material-ui/core/styles";
import MapIcon from "@material-ui/icons/Map";
import {FormLabel,Tooltip,Popover} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoatOutlined';
import SchLinePicPop from "views/Schedule/SchLinePicPop.js";
import TerminalSch from "views/Schedule/TerminalScheduleList.js";
import ChargeSch from "views/Schedule/OceanFreightSearch.js";
import ShipMap from "components/Map/ShipMap.js";
import axios from 'axios';
import { Link  } from "react-router-dom";
const styles = {
  header: {
    padding: '15px 10px !important',
    borderTop:'2px solid #00b1b7', 
    borderBottom:'2px solid #00b1b7',
    color:'#717172',
    fontWeight:'bold',
    textAlign: 'center'
  },
  grid: {
    padding: '0px 10px !important',
    textAlign: 'center',
    alignSelf: 'center'
  },
   gridLabel: {
		    textAlign:'left',
		    marginTop:'12px',
		  },
};
const useStyles = makeStyles(styles);

export default function FclScheduleTable(props) {

	const classes = useStyles();
	const {propsData,curPage ,userData,...rest} = props;

	const [open1,setOpen1] = React.useState(false);
	const [open2,setOpen2] = React.useState(false);
	const [open3,setOpen3] = React.useState(false);
	const [open4,setOpen4] = React.useState(false);
	const [terminalCode,setTerminalCode] = React.useState([]);
	const [area,setArea] = React.useState([]);
	
	const [popupComp,setPopupComp] = React.useState(null);
	// console.log('propsData>> ' , propsData?propsData:'noData')
	const openPopup = (gubun,data)=> { 
	  	
	    if(gubun === 'V') {
			var start_port = data?data.start_port:'KRPUS';
		    var terminalArea = start_port.substring(2,5);
		    console.log("terminalArea:",terminalArea);
		    
			setArea(area);
			
			axios.post("/sch/getTerminalCodeList",{area:terminalArea})
			.then(res => {
			
				//var open = true;
				//setOpen2(open);
				if(res.data) {
				setPopupComp(<Popover
			                 id="pop2"
			                 open={true}
			                 onClose={()=>setPopupComp(null)}
			                 anchorReference="anchorPosition"
			                 anchorPosition={{top:100,left:550}}
			                 anchorOrigin={{vertical:'center',horizontal:'center',}}
			                 transformOrigin={{vertical:'center',horizontal:'center'}}
			               	>
			    				<TerminalSch detailParam={data} startDay={data.start_day} areaProps={terminalArea} terminalList={res.data} onClose={()=>setPopupComp(null)}  {...props}/>
	
			               </Popover>);
				}
		
			});
		
	    } else if(gubun === 'L') {
	    	setPopupComp(<Popover
                    id="pop"
	                    open={true}
	                    onClose={()=>setPopupComp(null)}
	                    anchorReference="anchorPosition"
	                    anchorPosition={{top:80,left:550}}
	                        anchorOrigin={{vertical:'bottom',horizontal:'center',}}
	                        transformOrigin={{vertical:'top',horizontal:'center',}}
		                  >
						  <SchLinePicPop detailParam = {data} onClose={()=>setPopupComp(null)}/>
	                  </Popover>);
	    } else if(gubun === 'C') {
	    	setPopupComp(<Popover
                    id="pop3"
		                   open={true}
		                    onClose={()=>setPopupComp(null)}
		                    anchorReference="anchorPosition"
		                    anchorPosition={{top:0,left:550}}
		                        anchorOrigin={{vertical:'bottom',horizontal:'center',}}
		                        transformOrigin={{vertical:'top',horizontal:'center',}}
		                  >
						<ChargeSch detailParam = {data} onClose={()=>setPopupComp(null)}/>
	                  </Popover>);
	    } else if(gubun === 'M') {
	    	setPopupComp(								
	                  <Popover
	                    id="popover_map"
		                    open={true}
		                    onClose={()=>setPopupComp(null)}
	                        anchorReference="anchorPosition"
	                        anchorPosition={{top:80,left:550}}
		                    anchorOrigin={{vertical:'bottom',horizontal:'center',}}
		                    transformOrigin={{vertical:'top',horizontal:'center',}}>
		                    <ShipMap parameter={data} onClose={()=>setPopupComp(null)}>
	                    </ShipMap>
	                  </Popover>);	    	
	    }
		
	}

	const goPlism = (row) => {
		if(userData) {
		//   console.log('goPrism', row)
		  const host = window.location.hostname;
		  let url = '';
		  if( host.indexOf('localhost') >= 0 ){
		  url = 'http://localhost:8088/uat/uia/ownerMain.do?';
		  }else if( host.indexOf('dev') >= 0 ) {
		  url = 'https://test.plism.com/uat/uia/ownerMain.do?';
		  } else {
		  url = 'https://www.plism.com/uat/uia/ownerMain.do?';
		  }
		  
		  axios.get("/auth/readyplism" )
		  .then(res => {
		  if (res.data.auth_code){
			window.open(url+'id='+userData.user_no+'&auth_code='+res.data.auth_code+'&link=Y&link_menu_no=31088&line_code='+row.line_code+'&vessel_name='+row.vsl_name+'&voyage_no='+row.voyage_no+'&e_port='+row.end_port+'&s_port='+row.start_port+'&etd='+row.start_day.replace(/-/g, ""), '_plism');
		  } else {
			// isLogOut();
		  }
		  })
		  .catch(err => {
		  console.log(err);
		  //window.location.href = "/Landing";
		//   isLogOut();
		  })
		} else {
		//   alertMessage('로그인이 필요한 서비스입니다.', 'error');
	  }
  }

	return (
		<>
			<div style={{marginLeft:'20px',marginRight:'20px'}}>
				<GridContainer justify="center" style={{backgroundColor:'#fafafa'}}>
						<GridItem lg={1} md={1} sm={3} xs={3} className={classes.header}>Carrier</GridItem>
						<GridItem lg={2} md={2} sm={3} xs={5} className={classes.header}>Vessel Name</GridItem>
						<GridItem lg={1} md={1} sm={2} xs={4} className={classes.header}>Voyage No</GridItem>
						<GridItem lg={2} md={2} sm={4} xs={5} className={classes.header}>출발지</GridItem>
						<GridItem lg={2} md={2} sm={4} xs={2} className={classes.header}>양하지</GridItem>
						<GridItem lg={2} md={2} sm={4} xs={5} className={classes.header}>최종 도착지</GridItem>
						{/* <GridItem lg={1} md={1} sm={3} xs={2} className={classes.header}>Charge</GridItem> */}
						<GridItem lg={1} md={1} sm={2} xs={6} className={classes.header}>T/Time</GridItem>
						{/* <GridItem lg={1} md={1} sm={3} xs={3} className={classes.header}>T/S</GridItem> */}
						<GridItem lg={1} md={1} sm={2} xs={6} className={classes.header}>Booking</GridItem>
				</GridContainer>
			</div>
			{propsData.length > 0?
				<div style={{marginLeft:'5px', marginRight:'5px'}} >
					{propsData.map((data,key) => (
					<Card style={{margin:'5px 0'}} key={"table_"+key} >
						<CardBody style={{padding:'5px 10px'}}>
							<GridContainer justify="center">
								<GridItem lg={1} md={1} sm={3} xs={3} className={classes.grid}>
									<Tooltip title={data.line_nm}>
										{data.image_yn=='Y'?<img width='40' height='40' src={require("assets/img/carrier/"+data.line_code+".gif")} onClick={()=>openPopup('L',data)}/>:
										<img width='40' height='40' src={require("assets/img/carrier/No-Image.gif")} //onClick={()=>setOpen1(!open1)} 
										 />}
									</Tooltip>
								</GridItem>
								<GridItem lg={2} md={2} sm={3} xs={5} className={classes.grid} style={{display:'flex', alignItems: 'center', justifyContent:'center'}}>
									<Tooltip title="Terminal Schedule"  style={{cursor: "pointer",textDecoration:"underline"}}><span onClick={()=>openPopup('V',data)} >{data.vsl_name}</span>
									</Tooltip>
									<Tooltip title="현재 선박위치 조회">
										{/* <MapIcon onClick={()=>openPopup('M',data)} //onClick={()=>setOpen4(!open4)} 
										size="20" style={{verticalAlign:'bottom',color:'#00acc1',width:'20px',height:'20px',cursor: "pointer"}} /> */}
										<DirectionsBoatIcon style={{verticalAlign:'bottom',color:'#00acc1',width:'40px',height:'30px',cursor:'pointer'}} 
										onClick={()=>openPopup('M',data)} />
									</Tooltip>
								</GridItem>
								<GridItem lg={1} md={1} sm={2} xs={4} className={classes.grid}>{data.voyage_no}</GridItem>
								<GridItem lg={2} md={2} sm={4} xs={5} className={classes.grid}>{data.start_port_name}<br/>({data.start_day})</GridItem>
								<GridItem lg={2} md={2} sm={4} xs={2} className={classes.grid}>{data.pod_port_name}<br/>({data.pod_date})</GridItem>
								<GridItem lg={2} md={2} sm={4} xs={5} className={classes.grid}>{data.end_port_name}<br/>({data.end_day})</GridItem>
								
								{/* <GridItem lg={1} md={1} sm={3} xs={2} className={classes.grid}>
									<Tooltip title="Charge"  style={{cursor: "pointer",textDecoration:"underline"}}><span onClick={()=>openPopup('C',data)} //onClick={()=>setOpen3(!open3)}
									>{data.charge}</span>
									</Tooltip></GridItem> */}
								<GridItem lg={1} md={1} sm={2} xs={6} className={classes.grid}>{data.tt}</GridItem>
								{/* <GridItem lg={1} md={1} sm={3} xs={4} className={classes.grid}>{data.ts}</GridItem> */}
								<GridItem lg={1} md={1} sm={2} xs={6} className={classes.grid}>
									{("WDFC" === data.line_code_4)?
									<Link 
										style={{color:'#2196f3',fontWeight:'bold'}}
										to={{pathname: data.line_code_4==='WDFC'?`/svc/bookingWdfc`:`/svc/booking`,
										state:{
											user_no:userData.user_no,
											sch_vessel_name:data?data.vsl_name:null,
											sch_vessel_voyage:data?data.voyage_no:null,
											sch_pol:data?data.start_port:null,
											sch_pod:data?data.end_port:null,
											schedule_yn:'Y',
											line_code:data?data.line_code_4:null,
											sch_etd:data?data.start_day:null,
											sch_eta:data?data.end_day:null,
											vsl_type:null,
											sch_call_sign:null,  	  
										}}}>BOOKING
									</Link>
									:
									("JCSC" === data.line_code_4 || "YTFF" === data.line_code_4)?
									<Button size="sm" target="_blank" onClick={()=>goPlism(data)} color="info" >BOOKING</Button>
									:
									<>{data.line_url && ( <Button size="sm" target="_blank" href={data.line_url} color="info" >BOOKING</Button>)}</>
									}
								</GridItem>
							</GridContainer>
						</CardBody>
					</Card>
					))}
				</div>:<div style={{padding:'15px 0',textAlignLast:'center',color:'#717172'}}>조회된 (스케쥴) 정보가 없습니다.</div>}
			{propsData.length > 0 && Number(curPage) !== Number(propsData[0].tot_page)?
			<div style={{marginLeft:'20px',marginRight:'20px',textAlign:'center'}}>
				<Button target="_blank" color="info" onClick={()=>props.nextPage(Number(curPage)+1)}>Next ({curPage}/{propsData[0].tot_page})</Button>
			</div>
			:<></>}   
			 {popupComp}
		</>
	);
}