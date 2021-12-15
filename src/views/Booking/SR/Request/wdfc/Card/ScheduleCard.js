import React,{ useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, TextField, Collapse, IconButton, Divider, Avatar, Typography,CardHeader} from "@material-ui/core";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import {Autocomplete} from "@material-ui/lab";
import axios from 'axios';
import ScheduleBody from './Body/ScheduleBody.js';
import DialogBookmark from './Bookmark/Schedule.js';
import DialogSchedule from './Bookmark/SchedulePopup.js';
import {Schedule, UnfoldLess, UnfoldMore, Bookmarks,CalendarToday} from "@material-ui/icons";
import {observer} from 'mobx-react-lite';
import {useSrStore}  from 'store/srStore.js';
const styles = makeStyles((theme) => ({
	root: {
		width: '80%',
	},
	sr_title: {
		boxShadow:'unset'	  
	},
	paper: {
		marginTop: theme.spacing(3),
		padding:theme.spacing(2),
		marginBottom: theme.spacing(3),
		[theme.breakpoints.up(600+theme.spacing(3)*2)]: {
			marginTop: theme.spacing(4),
			marginBottom: theme.spacing(2),
			padding: theme.spacing(3),
		}
	},

	gridContainer: {
		padding:'30px'
	},
	divider: {
		marginTop:'10px',
		marginBottom:'20px',
		backgroundColor:'#00acc1'
	},
	box: {
		width: '100%',
		marginTop: theme.spacing(3),
		padding:theme.spacing(2),
		marginBottom: theme.spacing(3),
	},
	avatar: {
		backgroundColor: '#00ACC1',marginRight:'5px',
		[theme.breakpoints.between("xs", "sm")]: {
			width: theme.spacing(4),
			height: theme.spacing(4)
		},
		[theme.breakpoints.between("md", "lg", "xl")]: {
			width: theme.spacing(5),
			height: theme.spacing(5)
		}
	},
	headerCell: {
		textAlign: "left",
		backgroundColor: "#f2fefd",
		width:'150px',
		padding:'7px',
		// fontSize: '15px',
		// fontWeight:'bold'
	},
	dataCell: {
		textAlign: "left",
		padding:'7px',
	},
	textField: {
		paddingBottom: '15px',
	},
	grid: {
		padding: '0px 10px !important',
	},
	gridLabel: {
		padding: '0px 10px !important',
		textAlign:'left',
		marginTop:'12px',
	},
	cntrCard: {
		paddingTop:'0',
	},
	cntrClose: {
		padding: '0px 0px !important',
		textAlign:'end',
	},
	cntrPlus: {
		padding: '0px 0px !important',
		textAlign:'center',
	},
}));
//export default function ScheduleCard(props) { 
//const ScheduleCard = inject('UserStore')(observer(({ UserStore, ...props }) => { 
//const ScheduleCard = (observer(({UserStore, ...props}) => {
function ScheduleCard(props) { 	
	const store =  useSrStore();
	const classes = styles();
	//const {open,closeCard,schProps,bookmark} = props;	    
	const [scheduleData,setScheduleData] = useState({});

	const [views,setViews] = useState(null);
	
	const fncSelectPortCode =(option)=>{
		if(option) {
			//var list = {...scheduleData, ...option};
			//props.mergeProps(list);
			//props.closeCard(true);
			store.setSr({
				label: option.label,
				sch_bl_issue_name: option.sch_bl_issue_name?option.sch_bl_issue_name:store.sr.sch_bl_issue_name,
				sch_eta: option.sch_eta?option.sch_eta:store.sr.sch_eta,
				sch_etd: option.sch_etd?option.sch_etd:store.sr.sch_etd,
				sch_fdp: option.sch_fdp?option.sch_fdp:store.sr.sch_fdp,
				sch_fdp_name: option.sch_fdp_name?option.sch_fdp_name:store.sr.sch_fdp_name,
				sch_line_code: option.sch_line_code?option.sch_line_code:store.sr.sch_line_code,
				sch_pld: option.sch_pld?option.sch_pld:store.sr.sch_pld,
				sch_pld_name: option.sch_pld_name?option.sch_pld_name:store.sr.sch_pld_name,
				sch_pod: option.sch_pod?option.sch_pod:store.sr.sch_pod,
				sch_pod_name: option.sch_pod_name?option.sch_pod_name:store.sr.sch_pod_name,
				sch_pol: option.sch_pol?option.sch_pol:store.sr.sch_pol,
				sch_pol_name: option.sch_pol_name?option.sch_pol_name:store.sr.sch_pol_name,
				sch_por: option.sch_por?option.sch_por:store.sr.sch_por,
				sch_por_name: option.sch_por_name?option.sch_por_name:store.sr.sch_por_name,
				sch_vessel_code: option.sch_vessel_code?option.sch_vessel_code:store.sr.sch_vessel_code,
				sch_vessel_name: option.sch_vessel_name?option.sch_vessel_name:store.sr.sch_vessel_name,
				schedule_bookmark_name: option.schedule_bookmark_name,
				schedule_bookmark_seq: option.schedule_bookmark_seq,
				sch_por_name: option.sch_por_name?option.sch_por_name:store.sr.sch_por_name,
				sch_por_name: option.sch_por_name?option.sch_por_name:store.sr.sch_por_name,
				value:option.value,
				schopen:true});
		} else {
			//props.mergeProps({...scheduleData, schedule_bookmark_name:'',schedule_bookmark_seq:''});
			store.setSr({
				label: null,
				sch_bl_issue_name: null,
				sch_eta: null,
				sch_etd: null,
				sch_fdp: null,
				sch_fdp_name: null,
				sch_line_code: null,
				sch_pld: null,
				sch_pld_name: null,
				sch_pod: null,
				sch_pod_name: null,
				sch_pol: null,
				sch_pol_name: null,
				sch_por: null,
				sch_por_name: null,
				sch_vessel_code: null,
				sch_vessel_name: null,
				schedule_bookmark_name: null,
				schedule_bookmark_seq: null,
				sch_por_name: null,
				sch_por_name: null,
				value: null,
			});
		}
	}
	    
	    
	const onViewHandle =(mode) => {
		if(mode === 'B') {
			setViews(<DialogBookmark closeBook={()=>setViews(null)}  {...props} />);
		} else {
			setViews(<DialogSchedule closeBook={()=>setViews(null)}  
				schmerge={(data)=>{store.setSr({...data});setViews(null);}} {...props} />);
		}
	}
	return (
		<Card className={classes.paper} id="schedule">
			<CardHeader style={{padding:'0'}}
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						<Schedule fontSize="large"/>
					</Avatar>
				}
				action={
					<IconButton onClick={()=>store.setSr({schopen:!store.sr.schopen})}>
						{store.sr.schopen? <UnfoldLess fontSize="large" /> : <UnfoldMore fontSize="large"/>}
					</IconButton>
				}
				title={
					<Typography variant='h5'>
						<GridContainer>
						<GridItem xs={4} sm={4} style={{marginTop:'8px'}}>Schedule
							<IconButton onClick={()=>onViewHandle('B')}>
							<Bookmarks fontSize={'default'} />
							</IconButton>
							<IconButton onClick={()=>onViewHandle('C')}>
							<CalendarToday fontSize="default"/>
							</IconButton>
						</GridItem>
						<GridItem xs={8} sm={7}>
							<Autocomplete
								options = {store.sr_bookmark.scheduleList?store.sr_bookmark.scheduleList:[]}
								getOptionLabel = { option => option.schedule_bookmark_name }
								id="schedule_bookmark"
								noOptionsText="Bookmark 등록하세요."
								getOptionSelected={(option, value) => option.schedule_bookmark_name === value.schedule_bookmark_name}
								value = {{schedule_bookmark_name:store.sr_bookmark.scheduleList && store.sr_bookmark.scheduleList.find(v=>v.value === store.sr.schedule_bookmark_seq)
											?store.sr_bookmark.scheduleList.find(v=>v.value === store.sr.schedule_bookmark_seq).schedule_bookmark_name:''}}
								onChange={(e, option)=>fncSelectPortCode(option)}
								renderInput={
								params =>(<TextField inputProps={{maxLength:30}} {...params} label="schedule Bookmark"  fullWidth />)}
							/>
						</GridItem>
						</GridContainer>
					</Typography>
				}
			/>
			<CardBody style={{padding:'10px 0 0 0'}}>
				<Collapse in={store.sr.schopen}> 
					<Divider className={classes.divider}/>
					<ScheduleBody type="M" {...props}/>
				</Collapse>
				{views}
			</CardBody>
		</Card>
	);
}
	    		
export default observer(ScheduleCard);