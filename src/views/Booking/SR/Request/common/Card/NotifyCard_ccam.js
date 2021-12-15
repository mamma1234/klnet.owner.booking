import React,{ useState, useEffect } from "react";
import {useSrStore}  from 'store/srStore.js';
import { makeStyles } from "@material-ui/core/styles";
import { Card,TextField,Collapse, IconButton, Divider, Avatar,Typography,CardHeader} from "@material-ui/core";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import {Autocomplete} from "@material-ui/lab";
import NotifyBody from './Body/NotifyCBody.js';
import DialogBookmark from './Bookmark/Notify.js';
import {Assessment, UnfoldLess, UnfoldMore,Bookmarks} from "@material-ui/icons";
import {blackColor,hexToRgb} from "assets/jss/material-dashboard-pro-react.js";
import {observer} from 'mobx-react-lite';	
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
		backgroundColor: '#00ACC1',
		marginRight:'5px',
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

//export default function NotifyCCard(props) { 
//const NotifyCCard = inject('UserStore')(observer(({ UserStore, ...props }) => {
//const NotifyCCard = (observer(({UserStore, ...props}) => {
function NotifyCCard (props) {
	const classes = styles();
	const store =  useSrStore();
	const {open,closeCard,c_notiProps,bookmark} = props;
	const [notifyData,setNotifyData] = useState({});
	const [viewBookmark,setViewBookmark] = React.useState(null);

	useEffect(() => {
		setNotifyData(c_notiProps);
		}, [c_notiProps]);

	const fncSelectPortCode =(option)=>{
		if(option) {
			var samc = {
					'c_notify_bookmark_seq':option.notify_bookmark_seq,
					'c_notify_bookmark_name':option.notify_bookmark_name,
					'c_noti_code':option.noti_code?option.noti_code:store.sr.c_noti_code,
					'c_noti_name1':option.noti_name1?option.noti_name1:store.sr.c_noti_name1,
					'c_noti_name2':option.noti_name1?option.noti_name2:store.sr.c_noti_name2,
					'c_noti_address1':option.noti_address1?option.noti_address1:store.sr.c_noti_address1,
					'c_noti_address2':option.noti_address1?option.noti_address2:store.sr.c_noti_address2,
					'c_noti_address3':option.noti_address1?option.noti_address3:store.sr.c_noti_address3,
					'c_noti_address4':option.noti_address1?option.noti_address4:store.sr.c_noti_address4,
					'c_noti_address5':option.noti_address1?option.noti_address5:store.sr.c_noti_address5,
					'c_noti_user_name':option.noti_user_name?option.noti_user_name:store.sr.c_noti_user_name,
					'c_noti_user_tel':option.noti_user_tel?option.noti_user_tel:store.sr.c_noti_user_tel,
					'c_noti_country_code':option.noti_country_code?option.noti_country_code:store.sr.c_noti_country_code}
			//var list = {...notifyData, ...samc};
			//props.mergeProps(list);
			//props.closeCard(true);
			store.setSr({...samc,noticopen:true});
		} else {
			//props.mergeProps({...notifyData, c_notify_bookmark_seq:'',c_notify_bookmark_name:''});
			store.setSr({
				c_notify_bookmark_seq:null,
				c_notify_bookmark_name:null,
				c_noti_code :null,
				c_noti_name1 :null,
				c_noti_name2 :null,
				c_noti_address1 :null,
				c_noti_address2 :null,
				c_noti_address3 :null,
				c_noti_address4 :null,
				c_noti_address5 :null,
				c_noti_user_name :null,
				c_noti_user_tel :null,
				c_noti_country_code :null,
			});
		}
	}

	const onHandleSameNoti =()=> {
		//props.mergeProps({...notifyData,c_noti_name1:'SAME AS CONSIGNEE',c_noti_name2:'',c_noti_address1:'',c_noti_address2:'',c_noti_address3:'',c_noti_address4:'',c_noti_address5:''});
		store.setSr({c_noti_name1:'SAME AS CONSIGNEE',c_noti_name2:'',c_noti_address1:'',c_noti_address2:'',c_noti_address3:'',c_noti_address4:'',c_noti_address5:''});
	}

	const onHandleCopyNoti =()=> {
		store.setSr({c_noti_name1:store.sr.noti_name1,
						c_noti_name2:store.sr.noti_name2,
						c_noti_address1:store.sr.noti_address1,
						c_noti_address2:store.sr.noti_address2,
						c_noti_address3:store.sr.noti_address3,
						c_noti_address4:store.sr.noti_address4,
						c_noti_address5:store.sr.noti_address5});
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
					<IconButton onClick={()=>store.setSr({noticopen:!store.sr.noticopen})}>
						{store.sr.noticopen? <UnfoldLess fontSize="large" /> : <UnfoldMore fontSize="large"/>}
					</IconButton>
				}
				title={
					<Typography variant='h5'>
						<GridContainer>
							<GridItem xs={4} sm={4} style={{marginTop:'8px'}}>Notify
								<IconButton  
									onClick={()=>{setViewBookmark(<DialogBookmark openBook={true} closeBook={()=>setViewBookmark(null)} type="C" {...props} />);}}>
									<Bookmarks fontSize="default"/>
								</IconButton>
							</GridItem>
							<GridItem xs={8} sm={7}>
								<Autocomplete
									options = {store.sr_bookmark.notiList?store.sr_bookmark.notiList:[]}
									getOptionLabel = { option => option.notify_bookmark_name }
									getOptionSelected={(option, value) => option.notify_bookmark_name === value.notify_bookmark_name}
									value = {{notify_bookmark_name:store.sr_bookmark.notiList && store.sr_bookmark.notiList.find(v=>v.value === store.sr.c_notify_bookmark_seq)
										?store.sr_bookmark.notiList.find(v=>v.value === store.sr.c_notify_bookmark_seq).notify_bookmark_name:''}}
									onChange = {(e, option)=>fncSelectPortCode(option,'c_noti_bookmark')}
									noOptionsText="Bookmark 등록하세요."
									renderInput={params =>(<TextField inputProps={{maxLength:30}} {...params} label="CCAM Notify Bookmark"  fullWidth />)}
								/>
							</GridItem>
						</GridContainer>
					</Typography>
				}
				// subheader="추가합니다"
			/>
			<CardBody style={{padding:'10px 0 0 0'}}>
				<Collapse in={store.sr.noticopen}>
					<GridContainer justify="flex-end">
						<GridItem className={classes.grid} lg={2} md={3} sm={3} xs={6}>
							<Button simple  color="info" style={{paddingLeft:'26px',paddingBottom:'5px'}} onClick={()=>onHandleSameNoti()}>SAME AS CONSINEE</Button>  
						</GridItem> 
						<GridItem lg={2} md={2} sm={2} xs={3}>
							<Button simple style={{color:'#aaaaaa',paddingLeft:'26px',paddingBottom:'5px'}} onClick={()=>onHandleCopyNoti()}>COPY NOTIFY</Button>
						</GridItem>
					</GridContainer>
					<Divider className={classes.divider}/>
					<NotifyBody type="M" mergeNotiProps={(data)=>props.mergeProps(data)} bodyProps={notifyData} {...props}/>	
				</Collapse>
				{viewBookmark} 
			</CardBody>
		</Card>
	);
}
//));

export default observer(NotifyCCard);