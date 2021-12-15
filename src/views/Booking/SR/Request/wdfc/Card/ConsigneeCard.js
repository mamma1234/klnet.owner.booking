import React,{ useState, useEffect } from "react";
import {useSrStore}  from 'store/srStore.js';
import { makeStyles } from "@material-ui/core/styles";
import { Card, TextField, Collapse, IconButton, Divider, Avatar, Typography,CardHeader} from "@material-ui/core";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import {Autocomplete} from "@material-ui/lab";
import ConsigneeBody from './Body/ConsigneeBody.js';
import DialogBookmark from './Bookmark/Consignee.js';
import { FolderShared, UnfoldLess, UnfoldMore,Bookmarks} from "@material-ui/icons";
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

//export default function ConsigneeCard(props) { 
//const ConsigneeCard = inject('UserStore')(observer(({ UserStore, ...props }) => { 
//const ConsigneeCard = (observer(({UserStore, ...props}) => {
function ConsigneeCard(props) {
	const classes = styles();
	const store =  useSrStore();
	//const {open,closeCard,consProps,bookmark} = props;
	const [viewBookmark,setViewBookmark] = React.useState(null);
	//const [consigneeData,setConsigneeData] = useState({});
	const [open,setOpen] = React.useState(false);
//	useEffect(() => {
//	    setConsigneeData(consProps);
//	}, [consProps]);
	    	    

	const fncSelectPortCode =(option)=>{
		if(option) {
			const list = {
				cons_code: option.cons_code?option.cons_code:store.sr.cons_code,
				cons_country_code: option.cons_country_code?option.cons_country_code:store.sr.cons_country_code,
				cons_user_dept: option.cons_user_dept?option.cons_user_dept:store.sr.cons_user_dept,
				cons_user_email: option.cons_user_email?option.cons_user_email:store.sr.cons_user_email,
				label: option.label?option.label:store.sr.label,
				cons_user_fax: option.cons_user_fax?option.cons_user_fax:store.sr.cons_user_fax,
				cons_user_name: option.cons_user_name?option.cons_user_name:store.sr.cons_user_name,
				cons_user_tel: option.cons_user_tel?option.cons_user_tel:store.sr.cons_user_tel,
				consignee_bookmark_name: option.consignee_bookmark_name,
				consignee_bookmark_seq:option.consignee_bookmark_seq,
				cons_name1:option.cons_name1?option.cons_name1:store.sr.cons_name1,
				cons_name2:option.cons_name1?option.cons_name2:store.sr.cons_name2,
				cons_address1:option.cons_address1?option.cons_address1:store.sr.cons_address1,
				cons_address2:option.cons_address1?option.cons_address2:store.sr.cons_address2,
				cons_address3:option.cons_address1?option.cons_address3:store.sr.cons_address3,
				cons_address4:option.cons_address1?option.cons_address4:store.sr.cons_address4,
				cons_address5:option.cons_address1?option.cons_address5:store.sr.cons_address5,
			};
			const mergeData = Object.assign(store.sr,list);
			store.setSr({...mergeData,consopen:true})
			//setOpen(false);
		} else {
			store.setSr({
				consignee_bookmark_name:null,
				consignee_bookmark_seq:null,
				cons_code:null,
				cons_country_code:null,
				cons_user_dept:null,
				cons_user_dept:null,
				cons_user_email:null,
				label:null,
				cons_user_fax:null,
				cons_user_name:null,
				cons_user_tel:null,
				cons_name1:null,
				cons_name2:null,
				cons_address1:null,
				cons_address2:null,
				cons_address3:null,
				cons_address4:null,
				cons_address5:null,
			});
		}
	}

	return (
	    <Card className={classes.paper} id="consignee">
	    	<CardHeader style={{padding:'0'}}
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						<FolderShared fontSize="large"/>
					</Avatar>}
				action={
					<IconButton onClick={()=>store.setSr({consopen:!store.sr.consopen})}>
						{store.sr.consopen? <UnfoldLess fontSize="large" /> : <UnfoldMore fontSize="large"/>}
					</IconButton>}
				title={
					<Typography variant='h5'>
						<GridContainer>
							<GridItem xs={4} sm={4} style={{marginTop:'8px'}}>Consignee
								<IconButton  onClick={()=>setViewBookmark(<DialogBookmark closeBook={()=>setViewBookmark(null)} type="B" {...props} />)}>
									<Bookmarks fontSize="default"/>
								</IconButton>
							</GridItem>
							<GridItem xs={8} sm={7}>
								<Autocomplete
									options = {store.sr_bookmark.consList?store.sr_bookmark.consList:[]}
									getOptionLabel = { option => option.consignee_bookmark_name }
									id="cons_bookmark"
									noOptionsText="Bookmark 등록하세요."
									getOptionSelected={(option, value) => option.consignee_bookmark_name === value.consignee_bookmark_name}
									value = {{consignee_bookmark_name:store.sr_bookmark.consList && store.sr_bookmark.consList.find(v=>v.value === store.sr.consignee_bookmark_seq)
											?store.sr_bookmark.consList.find(v=>v.value === store.sr.consignee_bookmark_seq).consignee_bookmark_name:''}}
									onChange = {(e, option)=>fncSelectPortCode(option,'cons_bookmark')}
									renderInput={params =>(<TextField inputProps={{maxLength:30}} {...params} label="Consignee Bookmark"  fullWidth />)}/>
							</GridItem>
						</GridContainer>
					</Typography>
				}
			/>
			<CardBody style={{padding:'10px 0 0 0'}}>
				<Collapse in={store.sr.consopen}>
					<Divider className={classes.divider}/>
					<ConsigneeBody
						type="M" //mergeConsProps={(data)=>props.mergeProps(data)} consBodyProp={consigneeData} 
						{...props}/>  
				</Collapse>
				{viewBookmark}
			</CardBody>
		</Card>
	);
}
export default observer(ConsigneeCard);