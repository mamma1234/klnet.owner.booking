import React,{ useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, FormControlLabel, Checkbox,TextField,Collapse, IconButton, Divider, Avatar, Typography,CardHeader} from "@material-ui/core";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import {Autocomplete} from "@material-ui/lab";
import NotifyBody from './Body/NotifyBody.js';
import DialogBookmark from './Bookmark/Notify.js';
import {Assessment, UnfoldLess, UnfoldMore, Check,Bookmarks} from "@material-ui/icons";
import {blackColor,hexToRgb} from "assets/jss/material-dashboard-pro-react.js";
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

	checkedIcon: {
		width: "20px",
		height: "20px",
		border: "1px solid rgba(" + hexToRgb(blackColor) + ", .54)",
		borderRadius: "3px"
	},
	uncheckedIcon: {
		width: "0px",
		height: "0px",
		padding: "9px",
		border: "1px solid rgba(" + hexToRgb(blackColor) + ", .54)",
		borderRadius: "3px"
	},
}));

//export default function NotifyCard(props) { 
//const NotifyCard = inject('UserStore')(observer(({ UserStore, ...props }) => {
//const NotifyCard = (observer(({UserStore, ...props}) => {
	
function NotifyCard(props) {
	const store =  useSrStore();
	const classes = styles();
	//const {open,closeCard,notiProps,bookmark} = props;
	const [notifyData,setNotifyData] = useState({});
	const [viewBookmark,setViewBookmark] = useState(null);
	const [open,setOpen] = useState(false);
	//useEffect(() => {
	//   	setNotifyData(notiProps);
	//}, [notiProps]);
	const fncSelectPortCode =(option)=>{
		if(option) {
			store.setSr({
				label:option.label?option.label:store.sr.label,
				noti_address1:option.noti_address1?option.noti_address1:store.sr.noti_address1,
				noti_address2:option.noti_address1?option.noti_address2:store.sr.noti_address2,
				noti_address3:option.noti_address1?option.noti_address3:store.sr.noti_address3,
				noti_address4:option.noti_address1?option.noti_address4:store.sr.noti_address4,
				noti_address5:option.noti_address1?option.noti_address5:store.sr.noti_address5,
				noti_code:option.noti_code?option.noti_code:store.sr.noti_code,
				noti_country_code:option.noti_country_code?option.noti_country_code:store.sr.noti_country_code,
				noti_name1:option.noti_name1?option.noti_name1:store.sr.noti_name1,
				noti_name2:option.noti_name1?option.noti_name2:store.sr.noti_name2,
				noti_user_dept:option.noti_user_dept?option.noti_user_dept:store.sr.noti_user_dept,
				noti_user_email:option.noti_user_email?option.noti_user_email:store.sr.noti_user_email,
				noti_user_fax:option.noti_user_fax?option.noti_user_fax:store.sr.noti_user_fax,
				noti_user_name:option.noti_user_name?option.noti_user_name:store.sr.noti_user_name,
				noti_user_tel:option.noti_user_tel?option.noti_user_tel:store.sr.noti_user_tel,
				notify_bookmark_name:option.notify_bookmark_name,
				notify_bookmark_seq:option.notify_bookmark_seq,
				noti_user_tel:option.value?option.value:store.sr.value,
				notiopen:true,
			});
		} else {
			//props.mergeProps({...notifyData, notify_bookmark_seq:'',notify_bookmark_name:''});
			store.setSr({
				label:null,
				noti_address1:null,
				noti_address2:null,
				noti_address3:null,
				noti_address4:null,
				noti_address5:null,
				noti_code:null,
				noti_country_code:null,
				noti_name1:null,
				noti_name2:null,
				noti_user_dept:null,
				noti_user_email:null,
				noti_user_fax:null,
				noti_user_name:null,
				noti_user_tel:null,
				notify_bookmark_name:null,
				notify_bookmark_seq:null,
				noti_user_tel:null,
			});
		}
	}
	return (
		<Card className={classes.paper} id="notify">
			<CardHeader style={{padding:'0'}}
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						<Assessment fontSize="large"/>
					</Avatar>
				}
				action={
					<IconButton onClick={()=>store.setSr({notiopen:!store.sr.notiopen})}>
						{store.sr.notiopen? <UnfoldLess fontSize="large" /> : <UnfoldMore fontSize="large"/>}
					</IconButton>
				}
				title={
					<Typography variant='h5'>
						<GridContainer>
							<GridItem xs={4} sm={4} style={{marginTop:'8px'}}>Notify
								<IconButton  
									onClick={()=>{setViewBookmark(<DialogBookmark openBook={true} closeBook={()=>setViewBookmark(null)}  type="B" {...props} />);}}>
									<Bookmarks fontSize="default"/>
								</IconButton>
							</GridItem>
							<GridItem xs={8} sm={7}>
								<Autocomplete
									options = {store.sr_bookmark.notiList?store.sr_bookmark.notiList:[]}
									getOptionLabel = { option => option.notify_bookmark_name }
									id="noti_bookmark"
									noOptionsText="Bookmark 등록하세요."
									getOptionSelected={(option, value) => option.notify_bookmark_name === value.notify_bookmark_name}
									value = {{notify_bookmark_name:store.sr_bookmark.notiList && store.sr_bookmark.notiList.find(v=>v.value === store.sr.notify_bookmark_seq)
										?store.sr_bookmark.notiList.find(v=>v.value === store.sr.notify_bookmark_seq).notify_bookmark_name:''}}
									onChange = {(e, option)=>fncSelectPortCode(option,'noti_bookmark')}
									renderInput={params =>(<TextField inputProps={{maxLength:30}} {...params} label="Notify Bookmark"  fullWidth />)}
								/>
							</GridItem>
						</GridContainer>
					</Typography>
				}
			/>
			<CardBody style={{padding:'10px 0 0 0'}}>
				<GridContainer justify="flex-end">
					<GridItem className={classes.grid} lg={2} md={3} sm={3} xs={6}>
						<FormControlLabel
							control={
								<Checkbox
									tabIndex={-1}
									onClick={(e) =>store.setSr({sameflag:e.target.checked})}//props.onSames(!props.same)

									checked={store.sr.sameflag?true:false}
									checkedIcon={
										<Check className={classes.checkedIcon} />
									}
									icon={<Check className={classes.uncheckedIcon} />}
									classes={{
										checked: classes.checked,
										root: classes.checkRoot
									}}
								/>
							}
							classes={{
								label: classes.label,
								root: classes.labelRoot
							}}
							style={{marginRight:'0'}}
							label="SAME AS CONSINEE"
						/>
					</GridItem>
				</GridContainer>
				<Collapse in={store.sr.notiopen?true:false}>
					<Divider className={classes.divider}/>
					<NotifyBody type="M"  {...props}/>	
				</Collapse>
				{viewBookmark}
			</CardBody>
		</Card>
	);
}
//));
export default observer(NotifyCard);