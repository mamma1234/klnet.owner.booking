import React,{ useState, useEffect, memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card,Select,MenuItem,FormControl, InputLabel,TextField} from "@material-ui/core";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import {Autocomplete} from "@material-ui/lab";
import moment from 'moment';
//import {useStyles} from 'views/Pages/Booking/SR/styles';
import {observer} from 'mobx-react-lite';
import {useSrStore}  from 'store/srStore.js';
const styles = makeStyles((theme) => ({

	grid: {
		padding: '0px 10px !important',
	},
	gridLabel: {
		padding: '0px 10px !important',
		textAlign:'left',
		marginTop:'12px',
	},
	divider: {
		marginTop:'10px',
		marginBottom:'20px',
		//backgroundColor:'#00acc1'
	},
}));

//const ScheduleBody = (props) => { 
//const ScheduleBody = observer((props) => {
//const ScheduleBody = inject('UserStore')(observer(({ UserStore, ...props }) => { 
//const ScheduleBody = (observer(({UserStore, ...props}) => {
function ScheduleBody(props) {
	const classes = styles();
	const store =  useSrStore();
	const {type,schProps,sPort,ePort} = props;
	
	const [scheduleData,setScheduleData] = useState({'schedule_bookmark_name':'','schedule_bookmark_seq':'','sch_vessel_name':'',
		'sch_vessel_code':'',
		'sch_vessel_voyage':'',
		'sch_pol':'',
		'sch_pol_name':'',
		'sch_pod':'',
		'sch_pod_name':'',
		'sch_pld':'',
		'sch_pld_name':'',
		'sch_bl_issue_name':'',
		'sch_por':'',
		'sch_por_name':'',
		'sch_fdp':'',
		'sch_fdp_name':'',
		'sch_srd':''});

		
	// useEffect(() => { 
	//	setScheduleData(store.sr);
	//}, [store.sr]);

	useEffect(() => {
		if(schProps.sch_bl_issue_name) {
			setScheduleData(schProps);
		}else {
			setScheduleData({...schProps,sch_bl_issue_name:'SEOUL, KOREA'});
		}
	}, [schProps]);
	useEffect(() => { 
		if('B' === type && props.bodyProps) { 
			setScheduleData(props.bodyProps);
		}
	}, [props.bodyProps]);
	
	const handleSchChange = (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setScheduleData({...scheduleData, [prop]:event.target.value});		 
		store.setSr({...scheduleData, [prop]:event.target.value});   	
	}
		
	const handleSchChangePort = (prop,value) => { 
		setScheduleData({...scheduleData, [prop]:value,
				[prop+"_name"]:(store.sr_start_port_code.findIndex(x=>x.value===value)>=0)?store.sr_start_port_code[store.sr_start_port_code.findIndex(x=>x.value===value)].port_name:
					(store.sr_end_port_code.findIndex(x=>x.value===value)>=0)?
								store.sr_end_port_code[store.sr_end_port_code.findIndex(x=>x.value===value)].port_name:''});
	}

	return (
		<GridItem className={classes.grid} lg={12} md={12} sm={12} xs={12}>
		{(type ==="B") &&
			<GridContainer>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Bookmark Name</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={true}
								feedback={type==="B"?"schedule_b":"schedule"}
								maxLength="35"
								id="schedule_bookmark_name"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:scheduleData.schedule_bookmark_name?scheduleData.schedule_bookmark_name:'',
									onChange: handleSchChange('schedule_bookmark_name'),
									onBlur: (e)=>e.target.value?props.mergeSchProps(scheduleData):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
			</GridContainer>}
			<GridContainer>
				<GridItem lg={12} md={12} sm={12} xs={12}>
					<GridContainer>
						<GridItem lg={2} md={2} sm={3} xs={12} className={classes.gridLabel}>
							<InputLabel style={{ color: "#AAAAAA" }}>Vessel / Voyage</InputLabel>
						</GridItem>
						<GridItem lg={10} md={10} sm={9} xs={12}>
							<GridContainer>
								<GridItem lg={5} md={5} sm={5} xs={12}>
									<CustomInput
										validtype="text"
										required={type ==="B"?false:true}
										feedback="schedule"
										maxLength="35"
										formControlProps={{
											fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
										}}
										inputProps={{
											value:scheduleData.sch_vessel_name?scheduleData.sch_vessel_name:'',
											onChange: handleSchChange('sch_vessel_name'),
											//onBlur: (e)=>e.target.value?'B'===type?setScheduleData(scheduleData):store.sr.sch_vessel_name !== e.target.value?store.setSr({sch_vessel_name:e.target.value}):null:null,
											onBlur: (e)=>'B'===type?props.mergeSchProps(scheduleData):e.target.value && (e.target.value !== store.sr.sch_vessel_name)?store.setSr({sch_vessel_name:e.target.value}):null,
											style:{height:'30px'}
										}}
									/>
								</GridItem>/
								<GridItem lg={3} md={3} sm={3} xs={12}>
									<CustomInput
										validtype="text"
										required={type ==="B"?false:true}
										feedback="schedule"
										labelText=""
										maxLength="35"
										formControlProps={{
											fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
										}}
										inputProps={{
											value:scheduleData.sch_vessel_voyage?scheduleData.sch_vessel_voyage:'',
											onChange: handleSchChange('sch_vessel_voyage'),
											onBlur: (e)=>'B'===type?props.mergeSchProps(scheduleData):e.target.value && (e.target.value !== store.sr.sch_vessel_voyage)?store.setSr({sch_vessel_voyage:e.target.value}):null,
											style:{height:'30px'}
										}}
									/>
								</GridItem>
							</GridContainer>         
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem lg={6} md={6} sm={6} xs={12}>
					<Card style={{marginBottom:'15px'}}>
						<InputLabel style={{ color: "#AAAAAA" }}>Start</InputLabel>
							<CardBody>
								<GridContainer>
									<GridItem lg={3} md={3} sm={3} xs={12} className={classes.gridLabel}>
										<InputLabel style={{ color: "#AAAAAA" }}>POL</InputLabel>
									</GridItem>
									<GridItem lg={9} md={9} sm={9} xs={12}>
										<GridContainer>
											<GridItem lg={5} md={12} sm={12} xs={12}>
												<Autocomplete
													options = {store.sr_start_port_code?store.sr_start_port_code:[]}
													getOptionLabel = { option => option.label?option.label||'':'' }
													getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
													id="sch_pol"
													value={{label:store.sr_start_port_code && store.sr_start_port_code.find(v=>v.value === scheduleData.sch_pol)?
															store.sr_start_port_code.find(v=>v.value === scheduleData.sch_pol).label:''
														}}
													onChange={(e,option)=>handleSchChangePort('sch_pol',option?option.value:'')}
													onBlur={()=>'B'===type?props.mergeSchProps(scheduleData):scheduleData.sch_pol && (scheduleData.sch_pol !== store.sr.sch_pol)?
															store.setSr({sch_pol:scheduleData.sch_pol,sch_pol_name:scheduleData.sch_pol_name}):null}
													renderInput={
														params =>(
															<TextField
															{...params} label=""
															fullWidth
															required={('B'===type)?false:true}
															error={('B'===type)?false:scheduleData.sch_pol?false:true}
															helperText={('B'===type)?false:scheduleData.sch_pol?null:'필수'}
														/>)
													}/>
											</GridItem>
											<GridItem lg={7} md={12} sm={12} xs={12}>
												<CustomInput
													validtype="text"
													required={type ==="B"?false:true}
													feedback="schedule"
													maxLength="35"
													formControlProps={{
														fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
													}}
													inputProps={{
														value:scheduleData.sch_pol_name?scheduleData.sch_pol_name:'',
														onChange: handleSchChange('sch_pol_name'),
														onBlur: (e)=>'B'===type?props.mergeSchProps(scheduleData):e.target.value && (e.target.value !== store.sr.sch_pol_name)?store.setSr({sch_pol_name:e.target.value}):null,
														style:{height:'30px'}
													}}/>
											</GridItem>
										</GridContainer>
									</GridItem>
								</GridContainer>
								<GridContainer>
									<GridItem lg={3} md={3} sm={3} xs={12} className={classes.gridLabel}>
										<InputLabel style={{ color: "#AAAAAA" }}>Place Of Receipt</InputLabel>
									</GridItem>
								<GridItem lg={9} md={9} sm={9} xs={12}>
									<GridContainer>
										<GridItem lg={5} md={12} sm={12} xs={12}>
											<Autocomplete
												options = {store.sr_start_port_code?store.sr_start_port_code:[]}
												getOptionLabel = { option => option.label?option.label||'':'' }
												getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
												id="sch_por"
												value={{label:store.sr_start_port_code && store.sr_start_port_code.find(v=>v.value === scheduleData.sch_por)?
														store.sr_start_port_code.find(v=>v.value === scheduleData.sch_por).label:''}}
												onChange={(e,option)=>handleSchChangePort('sch_por',option?option.value:'')}
												onBlur={()=>'B'===type?props.mergeSchProps(scheduleData):scheduleData.sch_por && (scheduleData.sch_por !== store.sr.sch_por)?
														store.setSr({sch_por:scheduleData.sch_por,sch_por_name:scheduleData.sch_por_name}):null}
												renderInput={
													params =>(
														<TextField
															{...params} label=""
															fullWidth
															required={('B'===type)?false:true}
															error={('B'===type)?false:scheduleData.sch_por?false:true}
															helperText={('B'===type)?false:scheduleData.sch_por?null:'필수'}
													/>)
												}
											/>
										</GridItem>
										<GridItem lg={7} md={12} sm={12} xs={12}>
											<CustomInput
												validtype="text"
												required={false}
												feedback="schedule"
												maxLength="35"
												formControlProps={{
													fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
												}}
												inputProps={{
													value:scheduleData.sch_por_name?scheduleData.sch_por_name:'',
													onChange: handleSchChange('sch_por_name'),
													onBlur: (e)=>'B'===type?props.mergeSchProps(scheduleData):e.target.value && (e.target.value !== store.sr.sch_por_name)?store.setSr({sch_por_name:e.target.value}):null,
													style:{height:'30px'}
												}}
											/>
										</GridItem>
									</GridContainer>
								</GridItem>
							</GridContainer>
							{(scheduleData.sch_etd)&&
							<GridContainer>
								<GridItem lg={3} md={3} sm={3} xs={12} className={classes.gridLabel}>
									<InputLabel style={{ color: "#AAAAAA" }}>ETD</InputLabel>
								</GridItem>
								<GridItem lg={9} md={9} sm={9} xs={12}>
									<CalendarBox 
										className={classes.textField}
										id="sch_etd"
										format="yyyy-MM-dd"
										disabled={true}
										setValue={scheduleData.sch_etd?moment(scheduleData.sch_etd).format('YYYY-MM-DD'):null}
										//onChangeValue={date => fncOnChagneDate(date, 'sch_etd')}
										formControlProps={{fullWidth: true}}/>
								</GridItem>
							</GridContainer>}
						</CardBody>
					</Card>
				</GridItem>
				<GridItem lg={6} md={6} sm={6} xs={12}>
					<Card style={{marginBottom:'15px'}}>
						<InputLabel style={{ color: "#AAAAAA" }}>End</InputLabel>
						<CardBody>
							<GridContainer>
								<GridItem lg={3} md={3} sm={3} xs={12} className={classes.gridLabel}>
									<InputLabel style={{ color: "#AAAAAA" }}>POD</InputLabel>
								</GridItem>
								<GridItem lg={9} md={9} sm={9} xs={12}>
									<GridContainer>
										<GridItem lg={5} md={12} sm={12} xs={12}>
											<Autocomplete
												options = {store.sr_end_port_code?store.sr_end_port_code:[]}
												getOptionLabel = { option => option.label?option.label||'':'' }
												getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
												id="sch_pod"
												value={{label:store.sr_end_port_code && store.sr_end_port_code.find(v=>v.value === scheduleData.sch_pod)?
														store.sr_end_port_code.find(v=>v.value === scheduleData.sch_pod).label:''
														}}
												onChange={(e,option)=>handleSchChangePort('sch_pod',option?option.value:'')}
												onBlur={()=>'B'===type?props.mergeSchProps(scheduleData):scheduleData.sch_pod && (scheduleData.sch_pod !== store.sr.sch_pod)?
															store.setSr({sch_pod:scheduleData.sch_pod,sch_pod_name:scheduleData.sch_pod_name}):null}
												renderInput={
													params =>(
													<TextField
														{...params} label=""
														fullWidth
														required={('B'===type)?false:true}
														error={('B'===type)?false:scheduleData.sch_pod?false:true}
														helperText={('B'===type)?false:scheduleData.sch_pod?null:'필수'}
													/>)}
												/>
										</GridItem>
										<GridItem lg={7} md={12} sm={12} xs={12}>
											<CustomInput
												validtype="text"
												required={type ==="B"?false:true}
												feedback="schedule"
												labelText=""
												maxLength="35"
												formControlProps={{
													fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
												}}
												inputProps={{
													value:scheduleData.sch_pod_name?scheduleData.sch_pod_name:'',
													onChange: handleSchChange('sch_pod_name'),
													onBlur: (e)=>'B'===type?props.mergeSchProps(scheduleData):e.target.value && (e.target.value !== store.sr.sch_pod_name)?store.setSr({sch_pod_name:e.target.value}):null,
													style:{height:'30px'}
												}}
											/>
										</GridItem>
									</GridContainer>
								</GridItem>
							</GridContainer>
							<GridContainer>
								<GridItem lg={3} md={3} sm={3} xs={12} className={classes.gridLabel}>
									<InputLabel style={{ color: "#AAAAAA" }}>Place Of Delivery</InputLabel>
								</GridItem>
								<GridItem lg={9} md={9} sm={9} xs={12}>
									<GridContainer>
										<GridItem lg={5} md={12} sm={12} xs={12}>
											<Autocomplete
												options = {store.sr_end_port_code?store.sr_end_port_code:[]}
												getOptionLabel = { option => option.label?option.label||'':'' }
												getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
												id="sch_pld"
												value={{label:store.sr_end_port_code && store.sr_end_port_code.find(v=>v.value === scheduleData.sch_pld)?
														store.sr_end_port_code.find(v=>v.value === scheduleData.sch_pld).label:''
														}}
												onChange={(e,option)=>handleSchChangePort('sch_pld',option?option.value:'')}
												onBlur={()=>'B'===type?props.mergeSchProps(scheduleData):scheduleData.sch_pld && (scheduleData.sch_pld !== store.sr.sch_pld)?
															store.setSr({sch_pld:scheduleData.sch_pld,sch_pld_name:scheduleData.sch_pld_name}):null}
												renderInput={
													params =>(
														<TextField
															{...params} label=""
															fullWidth
															required={('B'===type)?false:true}
															error={('B'===type)?false:scheduleData.sch_pld?false:true}
															helperText={('B'===type)?false:scheduleData.sch_pld?null:'필수'}
														/>
													)
												}
											/>
										</GridItem>
										<GridItem lg={7} md={12} sm={12} xs={12}>
											<CustomInput
												validtype="text"
												required={false}
												feedback="schedule"
												maxLength="35"
												formControlProps={{
												fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
												}}
												inputProps={{
													value:scheduleData.sch_pld_name?scheduleData.sch_pld_name:'',
													onChange: handleSchChange('sch_pld_name'),
													onBlur: (e)=>'B'===type?props.mergeSchProps(scheduleData):e.target.value && (e.target.value !== store.sr.sch_pld_name)?store.setSr({sch_pld_name:e.target.value}):null,
													style:{height:'30px'}
												}}/>
										</GridItem>
									</GridContainer>
								</GridItem>
							</GridContainer>
							{(scheduleData.sch_eta)&&
							<GridContainer>
								<GridItem lg={3} md={3} sm={3} xs={12} className={classes.gridLabel}>
									<InputLabel style={{ color: "#AAAAAA" }}>ETA</InputLabel>
								</GridItem>
								<GridItem lg={9} md={9} sm={9} xs={12}>
									<CalendarBox 
										className={classes.textField}
										labelText =""
										id="sch_eta"
										format="yyyy-MM-dd"
										disabled={true}
										setValue={scheduleData.sch_eta?moment(scheduleData.sch_eta).format('YYYY-MM-DD'):null}
										//onChangeValue={date => fncOnChagneDate(date, 'sch_etd')}
										formControlProps={{fullWidth: true}}/>
								</GridItem>
							</GridContainer>}
						</CardBody>
					</Card>
				</GridItem>
			
				<GridItem lg={6} md={6} sm={6} xs={12}>
					<GridContainer>
						<GridItem lg={2} md={3} sm={3} xs={12} className={classes.gridLabel}>
						<InputLabel style={{ color: "#AAAAAA" }}>Final Des</InputLabel>
						</GridItem>
						<GridItem lg={10} md={9} sm={9} xs={12}>
							<GridContainer>
								<GridItem lg={5} md={5} sm={9} xs={12}>
									<Autocomplete
									options = {store.sr_end_port_code?store.sr_end_port_code:[]}
									getOptionLabel = { option => option.label?option.label||'':'' }
									getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
									id="sch_fld"
									value={{label:store.sr_end_port_code && store.sr_end_port_code.find(v=>v.value === scheduleData.sch_fld)?
											store.sr_end_port_code.find(v=>v.value === scheduleData.sch_fld).label:''
											}}
									onChange={(e,option)=>handleSchChangePort('sch_fld',option?option.value:'')}
									onBlur={()=>'B'===type?props.mergeSchProps(scheduleData):scheduleData.sch_fld && (scheduleData.sch_fld !== store.sr.sch_fld)?
												store.setSr({sch_fld:scheduleData.sch_fld,sch_fld_name:scheduleData.sch_fld_name}):null}
									renderInput={
										params =>(
										<TextField
											{...params} 
											label=""
											fullWidth
											required={false}
											// error={('B'===type)?false:scheduleData.sch_fld?false:true}
											// helperText={('B'===type)?false:scheduleData.sch_fld?null:'필수'}
										/>)}
									/>
								</GridItem>
								<GridItem lg={7} md={7} sm={9} xs={12}>
									<CustomInput
									validtype="text"
										required={false}
										feedback="schedule"
										labelText=""
										maxLength="35"
											id={type+"_sch_fld_name"}
										formControlProps={{
										fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
										}}
										inputProps={{
											value:scheduleData.sch_fld_name?scheduleData.sch_fld_name:'',
											onChange: handleSchChange('sch_fld_name'),
											onBlur: (e)=>'B'===type?props.mergeSchProps(scheduleData):e.target.value && (e.target.value !== store.sr.sch_fld_name)?store.setSr({sch_fld_name:e.target.value}):null,
										style:{height:'30px'}
										}}
									/>
								</GridItem>
							</GridContainer>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem lg={6} md={6} sm={6} xs={12}>
					<GridContainer>
						<GridItem lg={3} md={4} sm={3} xs={12} className={classes.gridLabel}>
							<InputLabel style={{ color: "#AAAAAA" }}>Place Of B/L Issue</InputLabel>
						</GridItem>
						<GridItem lg={9} md={8} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="schedule"
								labelText=""
								maxLength="35"
								id={type+"_sch_bl_issue_name"}
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:scheduleData.sch_bl_issue_name?scheduleData.sch_bl_issue_name:'',
									onChange: handleSchChange('sch_bl_issue_name'),
									onBlur: (e)=>'B'===type?props.mergeSchProps(scheduleData):e.target.value && (e.target.value !== store.sr.sch_bl_issue_name)?store.setSr({sch_bl_issue_name:e.target.value}):null,
									style:{height:'30px'}
								}}
							/>   
						</GridItem>
					</GridContainer>
				</GridItem>
			</GridContainer>
		</GridItem>
	);
}
//));
//export default ScheduleBody;

export default memo(observer(ScheduleBody),areEqual);

function areEqual(prevProps,nextProps) {
	
	return ('B'!== nextProps.type?(prevProps.schProps.schedule_bookmark_seq === nextProps.schProps.schedule_bookmark_seq
			&& prevProps.schProps.sch_vessel_name === nextProps.schProps.sch_vessel_name 
			&& prevProps.schProps.sch_vessel_voyage === nextProps.schProps.sch_vessel_voyage 
			&& prevProps.schProps.sch_por === nextProps.schProps.sch_por
			&& prevProps.schProps.sch_por_name === nextProps.schProps.sch_por_name
			&& prevProps.schProps.sch_etd === nextProps.schProps.sch_etd
			&& prevProps.schProps.sch_pod === nextProps.schProps.sch_pod
			&& prevProps.schProps.sch_pod_name === nextProps.schProps.sch_pod_name
			&& prevProps.schProps.sch_pld === nextProps.schProps.sch_pld
			&& prevProps.schProps.sch_pld_name === nextProps.schProps.sch_pld_name
			&& prevProps.schProps.sch_eta === nextProps.schProps.sch_eta
			&& prevProps.schProps.sch_fld === nextProps.schProps.sch_fld
			&& prevProps.schProps.sch_fld_name === nextProps.schProps.sch_fld_name 
			&& prevProps.schProps.sch_bl_issue_name === nextProps.schProps.sch_bl_issue_name):
			(prevProps.bodyProps === nextProps.bodyProps));
}

/*export default React.memo(ScheduleBody, (prevProps,nextProps) => prevProps.sch_vessel_name === nextProps.sch_vessel_name 
		&& prevProps.sch_vessel_voyage === nextProps.sch_vessel_voyage 
		&& prevProps.sch_por === nextProps.sch_por
		&& prevProps.sch_por_name === nextProps.sch_por_name
		&& prevProps.sch_etd === nextProps.sch_etd
		&& prevProps.sch_pod === nextProps.sch_pod
		&& prevProps.sch_pod_name === nextProps.sch_pod_name
		&& prevProps.sch_pld === nextProps.sch_pld
		&& prevProps.sch_pld_name === nextProps.sch_pld_name
		&& prevProps.sch_eta === nextProps.sch_eta
		&& prevProps.sch_fld === nextProps.sch_fld
		&& prevProps.sch_fld_name === nextProps.sch_fld_name 
		&& prevProps.sch_bl_issue === nextProps.sch_bl_issue);*/