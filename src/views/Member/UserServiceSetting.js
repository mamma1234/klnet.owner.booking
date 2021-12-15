import React,{useEffect,useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CardIcon from "components/Card/CardIcon.js";
import CustomInput from "components/CustomInput/CustomInputDay.js";

import Icon from "@material-ui/core/Icon";
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Access from "@material-ui/icons/AccessAlarm";
import Grid from '@material-ui/core/Grid';
import Assign from "@material-ui/icons/AssignmentTurnedIn";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Divider, InputLabel, FormLabel, Checkbox} from '@material-ui/core';

const borderRadiusStyle={borderRadius:2} // eslint-disable-line no-unused-vars
const styles = {
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
	gridheader:{
		backgroundColor:'#BDBDBD'
	}
};
const useStyles = makeStyles(styles);



export default function UserSettingPage(props) {
  const userAgent = navigator.userAgent.toLowerCase();
  const classes = useStyles();
  const {store} =props;
  const [etaDayCnt,setEtaDayCnt] =useState(0);
  const [etdDayCnt,setEtdDayCnt] =useState(0);
  const [pol,setPol] = useState("KRPUS");
  const [pod,setPod] = useState("");
  const [etaYn,setEtaYn] = useState(false);
  const [startTime, setStartTime]= useState("00:00");
  const [endTime, setEndTime] = useState("23:59");
  const [selectPort,setSelectPort] = useState([]);
  const [pushSettingFlag, setPushSettingFlag] = useState(false);
  const [notiPush, setNotiPush] = useState(false);
  const [demdetPush, setDemdetPush] = useState(false);
  const [trackingPush, setTrackingPush] = useState(false);
  const [timeSetting, setTimeSetting] = useState(false);
  const isMobile = navigator.userAgent.search(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
  
  useEffect(() => {

	if(isMobile !== -1) {
		if(props.userData) {
		axios.post("/com/checkPushUser",{deviceId:window.deviceId}).then(
			res => {
				if(res.data.length !==0) {
					if(res.data[0].fcm_token !== window.fcmToken) {
						axios.post("/com/updatePushToken",{deviceId:window.deviceId,fcmToken:window.fcmToken})
					}
					
					if(res.data[0].push_send_time_fm.substr(0,2)+':'+res.data[0].push_send_time_fm.substr(2,2) ==="00:00" && res.data[0].push_send_time_to.substr(0,2)+':'+res.data[0].push_send_time_to.substr(2,2) === "23:59") {
						setTimeSetting(false)
					}else {
						setTimeSetting(true)
					}
					setStartTime(res.data[0].push_send_time_fm.substr(0,2)+':'+res.data[0].push_send_time_fm.substr(2,2))
					setEndTime(res.data[0].push_send_time_to.substr(0,2)+':'+res.data[0].push_send_time_to.substr(2,2))
					setNotiPush(res.data[0].noti_service ==="Y"?true:false)
					setDemdetPush(res.data[0].demdet_service ==="Y"?true:false)
					setTrackingPush(res.data[0].tracking_service ==="Y"?true:false)
					setPushSettingFlag(true);
				} 
			})
			.catch(err => {
				if(err.response !== undefined ) {
					if(err.response.status === 403||err.response.status === 401) {
					props.openLogin();
					}
				}
			});  
		}
	}
	return () => {
	  console.log('cleanup');
	};
  }, []); 

  function InputCustom(props) {
	  return(
			  <CustomInput   
			    formControlProps={{
	              fullWidth: true,variant:'outlined',size:'small',style:{textAlignLast:'center',border:'1px',borderRadius:'4px',borderStyle:'outset',borderColor:'silver',height:'40px'}
	            }} 
			  labelProps={{style:{backgroundColor:'white'}}}
			  inputProps={{
				  style:{paddingBottom:'0',width:'45px'},
				  value:props.value
			  }}
			  handleadd={props.handleadd}
			  handleremove={props.handleremove}
			  id={props.id} labelText={props.text}/>
	 	);
  }

  const handleAdd = (event,name) => {
	  if(name === "eta"){
		  setEtaDayCnt(etaDayCnt+1);  
	  } else {
		  setEtdDayCnt(etdDayCnt+1);
	  }
  }
  
  const pushUserSetting = (param) => {
	
	console.log(param)
	if(param === "on") {
		
		if(isMobile) {
			
			axios.post("/com/pushUserInsert",
				{ deviceId:window.deviceId,
				fcm_token:window.fcmToken,
				deviceOS:window.deviceOS,
				deviceModel:window.deviceModel}).then(
					res => {
						if(res.statusText === "OK") {
							setPushSettingFlag(!pushSettingFlag)
							setNotiPush(true);
							setDemdetPush(true);
							setTrackingPush(true);
						}

					}
				).catch(err => {
					if(err.response !== undefined ) {
						if(err.response.status === 403||err.response.status === 401) {
						props.openLogin();
						}
					}
				}); 
		}else {
			alert("해당메뉴는 모바일에서만 가능합니다.")
			return;
		}
	}
	
	else {
		if(isMobile) {

			axios.post("/com/pushUserDelete",
				{ deviceId:window.deviceId }).then(
					res => {
						if(res.statusText === "OK") {
							setPushSettingFlag(!pushSettingFlag);
							setStartTime('00:00');
							setEndTime('23:59');
							setNotiPush(false);
							setDemdetPush(false);
							setTrackingPush(false);
						}
					}
				).catch(err => {
					if(err.response !== undefined ) {
						if(err.response.status === 403||err.response.status === 401) {
						props.openLogin();
						}
					}
				}); 

			
		}else {
			alert("해당메뉴는 모바일에서만 가능합니다.")
			return;
		}

		
	}

	
  }

  const handleRemove = (event,name) => {

	  if(name === "eta"){
		  if(etaDayCnt > 0){
			  setEtaDayCnt(etaDayCnt-1);
		  } else {
			  setEtaDayCnt(0);
		  }
	  } else {
		  if(etdDayCnt > 0){
			  setEtdDayCnt(etdDayCnt-1);
		  } else {
			  setEtdDayCnt(0);
		  }
	  }
  }
  
  const onPortSearchValue = (e) => {
	    const values = e.target.value;
	    if(values != undefined && values != "" && values.length >= 2) {
		    	if(store.token) {
			    	axios.post("/com/getTrackingPortCode",{ portCode:values})
			    	.then(setSelectPort([]))
				    .then(res => setSelectPort(res.data))
				    .catch(err => {
						if(err.response !== undefined ) {
							if(err.response.status === 403||err.response.status === 401) {
							props.openLogin();
							}
						}
					}); 
		    	} else {
		    		props.openLogin();
		    	}
	    }  
	}
	const changePushTime = (e, position) => {
		let time = e.target.value;
		if(time ===''){
			return;
		}
		if(position ==="start") {
			

			if(time < endTime){ 
				axios.post("/com/pushreciveTime",{
					deviceId:window.deviceId,
					updateGubun:'startTime',
					param:time.substr(0,2)+time.substr(3,2)
				}).then(
					res => {
						if(res.statusText === "OK") {
							setStartTime(time);
						}
					}
				)
				.catch(err => {
					if(err.response !== undefined ) {
						if(err.response.status === 403||err.response.status === 401) {
						props.openLogin();
						}
					}
				}); 
			}else {
				alert('종료시간보다 시작시간이 더 큽니다');
				return;
			}

		}else {
			if(time > startTime){ 
				axios.post("/com/pushreciveTime",{
					deviceId:window.deviceId,
					updateGubun:'endTime',
					param:time.substr(0,2)+time.substr(3,2)
				}).then(
					res => {
						if(res.statusText ==="OK") {
							setEndTime(time);
						}
					}
				)
				.catch(err => {
					if(err.response !== undefined ) {
						if(err.response.status === 403||err.response.status === 401) {
						props.openLogin();
						}
					}
				}); 
			}else {
				alert('종료시간이 시작시간보다 작습니다.');
				return;
			}
		}

	}
  const onTimeAny = (param) => {
	  setTimeSetting(!timeSetting);
	  if(param ==="off") {
		axios.post("/com/pushreciveTime",{
			deviceId:window.deviceId,
			updateGubun:'any',}).then(
				res => {
					if(res.statusText ==="OK") {
						setStartTime("00:00");
						setEndTime("23:59");
					}
				}
			).catch(err => {
				if(err.response !== undefined ) {
					if(err.response.status === 403||err.response.status === 401) {
					props.openLogin();
					}
				}
			}); 
	  }
  }
  const onPushServiceGubun = (e, gubun) => {
	if(gubun ==="NO") {
		axios.post("/com/pushreciveGubun",{
			deviceId:window.deviceId,
			updateGubun:'NOTICE',
			param:e.target.checked
		}).then(
			res => {
				if(res.statusText ==="OK") {
					setNotiPush(!notiPush);
				}
			}
		).catch(err => {
			if(err.response !== undefined ) {
				if(err.response.status === 403||err.response.status === 401) {
				props.openLogin();
				}
			}
		}); 

		
		
	}else if(gubun === "DD"){
		axios.post("/com/pushreciveGubun",{
			deviceId:window.deviceId,
			updateGubun:'DEMDET',
			param:e.target.checked
		}).then(
			res => {
				if(res.statusText ==="OK") {
					setDemdetPush(!demdetPush);
				}
			}
		).catch(err => {
			if(err.response !== undefined ) {
				if(err.response.status === 403||err.response.status === 401) {
				props.openLogin();
				}
			}
		}); 
	}else if(gubun === "TR"){
		axios.post("/com/pushreciveGubun",{
			deviceId:window.deviceId,
			updateGubun:'TRACKING',
			param:e.target.checked
		}).then(
			res => {
				if(res.statusText ==="OK") {
					setTrackingPush(!trackingPush);
				}
			}
		).catch(err => {
			if(err.response !== undefined ) {
				if(err.response.status === 403||err.response.status === 401) {
				props.openLogin();
				}
			}
		}); 
	}
  }
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <Card> 
        <CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
			<CardIcon color="info" style={{height:'56px'}}>
				<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
			</CardIcon>
		<h4 className={classes.cardTitleBlack}>Tracking Setting </h4>
		<Button
		color="info"
			size="sm"
			//style={{width:'76px'}}
		//startIcon={<MapIcon/>}
		onClick={()=>alert('서비스 준비중입니다.')}
		>Save</Button>
	  </CardHeader>
          <CardBody>
          	<GridContainer>
          		<GridItem xs={12} sm={12} md={12}>
	          		<h4 className={classes.cardTitleBlack}><Assign style={{color:'#00acc1'}} />기본조회 설정 
	          		</h4>
          		</GridItem>
          		<GridItem xs={12} sm={12} md={12} style={{marginTop:'8px'}}>
          			<Grid container spacing={1}>
			          	<Grid item xs={12} sm={12} md={6} style={{marginTop:'8px'}}>
			          	<Autocomplete
							options = {selectPort}
							getOptionLabel = { options => "["+options.port_code+"] "+options.port_name}
							id="POL"
							onChange={(e,data)=>setPol(!data?'':data.port_code)}
							noOptionsText="Please enter 2 characters ..."
							onInputChange={onPortSearchValue}
							renderInput={params => (
								<TextField {...params} label="POL"  variant="outlined" size="small" 
									value="test"fullWidth />	
							)}
						/>
			          	</Grid>
			          	<Grid item xs={12} sm={12} md={6} style={{marginTop:'8px'}}>
			          		<Autocomplete
								options = {selectPort}
								getOptionLabel = { options => "["+options.port_code+"] "+options.port_name}
								id="POD"
								onChange={(e,data)=>setPod(!data?'':data.port_code)}
								noOptionsText="Please enter 2 characters ..."
								onInputChange={onPortSearchValue}
								renderInput={params => (
									<TextField {...params} label="POD"  variant="outlined" size="small" 
										fullWidth />
								)}
							/>
			          	</Grid>
				        <Grid item xs={12} sm={12} md={6} style={{marginTop:'8px'}}>
				        	 <InputCustom handleadd={(event)=>handleAdd(event,'eta')} handleremove={(event)=>handleRemove(event,'eta')} id="ETA" text="ETA" value={etaDayCnt}/>
			          	</Grid>
				        <Grid item xs={12} sm={12} md={6} style={{marginTop:'8px'}}>
				        	<InputCustom handleadd={(event)=>handleAdd(event,'etd')} handleremove={(event)=>handleRemove(event,'etd')} id="ETD" text="ETD" value={etdDayCnt}/>
			          	</Grid>
			        </Grid>
			     </GridItem>
			     <GridItem xs={12} sm={12} md={12}>  		
          			<h4 className={classes.cardTitleBlack}><Access style={{color:'#00acc1'}} />NOTICE</h4>
      			</GridItem>
			    <GridItem xs={12} sm={12} md={12}>  
			    	<Grid container spacing={1}>
			    		<Grid item xs={12} sm={12} md={6} >
				    		<Grid container spacing={1}>
					    		<Grid item xs={12} sm={12} md={3} >
					    		<Switch
								//checked={searchGb}
								//onChange={onHandleChange('USER')}
								inputProps={{'aria-label':'checkbox'}}
							/>
 							</Grid>	
								<Grid item xs={12} sm={12} md={9} >
									<TextField id="etd" size="small" label="ETA" type="text" variant="outlined" fullWidth/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={12} md={6} >
			    		<Grid container spacing={1}>
				    		<Grid item xs={12} sm={12} md={3} >
								<Switch
									//checked={searchGb}
									//onChange={onHandleChange('USER')}
									inputProps={{'aria-label':'checkbox'}}
								/>
							</Grid>	
							<Grid item xs={12} sm={12} md={9} >
								<TextField id="etd" size="small" label="ETD" type="text" variant="outlined" fullWidth/>
							</Grid>
						</Grid>
						</Grid>
						<Grid item xs={12} sm={12} md={6} >
					    	<Grid container spacing={1}>
						   		<Grid item xs={12} sm={12} md={3} >
									<Switch
										//checked={searchGb}
										//onChange={onHandleChange('USER')}
										inputProps={{'aria-label':'checkbox'}}
									/>
								</Grid>	
								<Grid item xs={12} sm={12} md={9} >
									<TextField id="etd" size="small" label="DET" type="text" variant="outlined" fullWidth/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={12} md={6}>
				    		<Grid container spacing={1}>
					    		<Grid item xs={12} sm={12} md={3} >
									<Switch
										//checked={searchGb}
										//onChange={onHandleChange('USER')}
										inputProps={{'aria-label':'checkbox'}}
									/>
								</Grid>	
								<Grid item xs={12} sm={12} md={9} >
									<TextField id="etd" size="small" label="DEM" type="text" variant="outlined" fullWidth/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
       			</GridItem>
			    <GridItem xs={12} sm={12} md={12} style={{marginTop:'8px'}}>  
			    	<Grid container spacing={1}>
			    		<Grid item xs={12} sm={12} md={6}>
						    		<Switch
									//checked={searchGb}
									//onChange={onHandleChange('USER')}
									inputProps={{'aria-label':'checkbox'}}
								/>관리대상			
						</Grid>
						<Grid item xs={12} sm={12} md={6} >
								<Switch
									//checked={searchGb}
									//onChange={onHandleChange('USER')}
									inputProps={{'aria-label':'checkbox'}}
								/>INSPECT OFF
						</Grid>
					</Grid>
				</GridItem>
				<GridItem xs={12} sm={12} md={12} style={{marginTop:'8px'}}> 
							<Grid container spacing={1}>
							   		<Grid item xs={12} sm={12} md={2} >
										<Switch
											//checked={searchGb}
											//onChange={onHandleChange('USER')}
											inputProps={{'aria-label':'checkbox'}}
										/>
									</Grid>	
									<Grid item xs={12} sm={12} md={10} >
										<TextField id="etd" size="small" label="EMAIL ADDRESS" type="text" variant="outlined" fullWidth/>
									</Grid>
							</Grid>
				</GridItem>
				<GridItem xs={12} sm={12} md={12} style={{marginTop:'8px'}}>
					<Grid container spacing={1}>
					    		<Grid item xs={12} sm={12} md={2} >
									<Switch
										//checked={searchGb}
										//onChange={onHandleChange('USER')} 
										inputProps={{'aria-label':'checkbox'}}
									/>
								</Grid>	
								<Grid item xs={12} sm={12} md={10}>
									<TextField id="etd" size="small" label="PHONE NUMBER" type="text" variant="outlined" fullWidth/>
								</Grid>
					 </Grid>
				</GridItem>
          	</GridContainer>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
      <Card>
      <CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
		<CardIcon color="info" style={{height:'56px'}}>
			<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
		</CardIcon>
		<h4 className={classes.cardTitleBlack}>Dem & Det Setting </h4>
		<Button
		color="info"
			size="sm"
			//style={{width:'76px'}}
		//startIcon={<MapIcon/>}
				onClick={()=>alert('서비스 준비중입니다.')}
		>Save</Button>
	  </CardHeader>
        <CardBody>
          
        </CardBody>
      </Card>
    </GridItem>

	{isMobile !== -1?(
	<GridItem xs={12} sm={12} md={12}>
      <Card>
      <CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
		<CardIcon color="info" style={{height:'56px'}}>
			<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
		</CardIcon>
		<h4 className={classes.cardTitleBlack}>Push Setting </h4>
	  </CardHeader>
        <CardBody>
		<GridContainer>
			<GridItem className={classes.gridheader} xs={12} sm={12} md={12}>
				<Grid container spacing={1}>
					<Grid item xs={12} sm={12} md={12}>
						<FormControlLabel
							label="푸시 허용"
							value="end"
							style={{color:'black'}}
							control={<Checkbox color="primary" checked={pushSettingFlag} onChange={() => {
								pushUserSetting(pushSettingFlag===true?"off":"on");
							}} />}
							labelPlacement="end"/>			
					</Grid>
				</Grid>
			</GridItem>
			{pushSettingFlag===true?(
				
				<GridContainer>
					<Divider style={{height:3, margin:5}} orientation="horizontal"></Divider>
					<GridItem xs={12} sm={12} md={12}>
						<Grid container spacing={1}>
							<Grid item xs={6} sm={6} md={6}>
							<FormControlLabel
							label="알림 시간 설정"
							value="start"
							style={{color:'black'}}
							control={<Checkbox color="primary" checked={timeSetting} onChange={() => {
								onTimeAny(timeSetting===true?"off":"on");
							}} />}
							labelPlacement="start"/>
							
							</Grid>
						</Grid>
					</GridItem>	
					<Divider style={{height:3, margin:5}} orientation="horizontal"></Divider>
					<GridItem xs={12} sm={12} md={12}>
						<Grid container spacing={1}>
							<Grid item xs={6} sm={6} md={6}>
								<TextField
									onChange = {(e) => changePushTime(e,'start')}
									label="Start Time"
									value={startTime}
									disabled={!timeSetting}
									type="time"
									InputLabelProps={{
										shrink:true
									}}
									InputProps={{
										step:300
									}}
									fullWidth/>
							</Grid>
					
							<Grid item xs={6} sm={6} md={6}>
								<TextField
									onChange = {(e) => changePushTime(e,'end')}
									label="End Time"
									value={endTime}
									disabled={!timeSetting}
									type="time"
									InputLabelProps={{
										shrink:true
									}}
									InputProps={{
										step:300
									}}
									fullWidth/>

							</Grid>
						</Grid>
					</GridItem>






					<Divider style={{height:3, margin:5}} orientation="horizontal"></Divider>
					<GridItem xs={12} sm={12} md={12}>
						<Grid container spacing={1}>
							<Grid item xs={12} sm={12} md={12}>
								<span style={{fontSize:'1rem',fontWeight:400,lineHeight:1.5}}>푸시 타입 설정</span>
							</Grid>
						</Grid>
					</GridItem>	
					<Divider style={{height:3, margin:5}} orientation="horizontal"></Divider>
					<GridItem xs={12} sm={12} md={12}>
						<Grid container spacing={1}>
							<Grid item xs={4} sm={4} md={4}>
								<FormControlLabel
									value="noti"
									labelPlacement="end"
									label="NOTICE"
									control={<Switch checked={notiPush} onChange={(e)=> onPushServiceGubun(e,'NO')} inputProps={{'aria-label':'checkbox'}}/>}>
								</FormControlLabel>
							</Grid>
							<Grid item xs={4} sm={4} md={4}>
								<FormControlLabel
									value="DD"
									labelPlacement="end"
									label="DEM & DET"
									control={<Switch checked={demdetPush} onChange={(e)=> onPushServiceGubun(e,'DD')} inputProps={{'aria-label':'checkbox'}}/>}>
								</FormControlLabel>
							</Grid>
							<Grid item xs={4} sm={4} md={4}>
								<FormControlLabel
									value="TR"
									labelPlacement="end"
									label="Tracking"
									control={<Switch checked={trackingPush} onChange={(e)=> onPushServiceGubun(e,'TR')} inputProps={{'aria-label':'checkbox'}}/>}>
								</FormControlLabel>
							</Grid>
						</Grid>
					</GridItem>
				</GridContainer>



			):null
			}
		</GridContainer>
        </CardBody>
      </Card>
    </GridItem>
	):null}
    </GridContainer>
	
  );
}
