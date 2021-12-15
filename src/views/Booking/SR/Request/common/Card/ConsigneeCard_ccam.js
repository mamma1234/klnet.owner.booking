import React,{ useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, TextField, Collapse, IconButton, Divider, Avatar, Typography,CardHeader} from "@material-ui/core";
import Button from "components/CustomButtons/Button";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import {Autocomplete} from "@material-ui/lab";
import ConsigneeBody from './Body/ConsigneeCBody.js';
import DialogBookmark from './Bookmark/Consignee.js';
import {FolderShared, UnfoldLess, UnfoldMore, Bookmarks} from "@material-ui/icons";
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

//export default function ConsigneeCCard(props) { 
//const ConsigneeCCard = inject('UserStore')(observer(({ UserStore, ...props }) => {
//const ConsigneeCCard = (observer(({UserStore, ...props}) => {
function ConsigneeCCard(props) {
	const classes = styles();
	const store =  useSrStore();
	const {c_consProps} = props;
	const [viewBookmark,setViewBookmark] = React.useState(null);
	const [consigneeData,setConsigneeData] = useState({});

	useEffect(() => {
	    setConsigneeData(c_consProps);
	}, [c_consProps]);

	const fncSelectPortCode =(option)=>{
		if(option) {
			var samc = {
				c_consignee_bookmark_seq:option.consignee_bookmark_seq,
				c_consignee_bookmark_name:option.consignee_bookmark_name,
				c_cons_code:option.cons_code?option.cons_code:store.sr.c_cons_code,
				c_cons_name1:option.cons_name1?option.cons_name1:store.sr.c_cons_name1,
				c_cons_name2:option.cons_name1?option.cons_name2:store.sr.c_cons_name2,
				c_cons_address1:option.cons_address1?option.cons_address1:store.sr.c_cons_address1,
				c_cons_address2:option.cons_address1?option.cons_address2:store.sr.c_cons_address2,
				c_cons_address3:option.cons_address1?option.cons_address3:store.sr.c_cons_address3,
				c_cons_address4:option.cons_address1?option.cons_address4:store.sr.c_cons_address4,
				c_cons_address5:option.cons_address1?option.cons_address5:store.sr.c_cons_address5,
				c_cons_user_name:option.cons_user_name?option.cons_user_name:store.sr.c_cons_user_name,
				c_cons_user_tel:option.cons_user_tel?option.cons_user_tel:store.sr.c_cons_user_tel,
				c_cons_country_code:option.cons_country_code?option.cons_country_code:store.sr.c_cons_country_code,
			}
			//props.mergeProps({...consigneeData, ...samc});
			//props.closeCard(true);
			store.setSr({...samc,conscopen:true});
		} else {
			//props.mergeProps({...consigneeData, c_consignee_bookmark_seq:'',c_consignee_bookmark_name:''});
			store.setSr({
				c_consignee_bookmark_seq:null,
				c_consignee_bookmark_name:null,
				c_cons_code:null,
				c_cons_name1:null,
				c_cons_name2:null,
				c_cons_address1:null,
				c_cons_address2:null,
				c_cons_address3:null,
				c_cons_address4:null,
				c_cons_address5:null,
				c_cons_user_name:null,
				c_cons_user_tel:null,
				c_cons_country_code:null,
			});
		}
	}
	
	const onHandleCopyConsignee =()=> {
		store.setSr({	
			'c_cons_name1':store.sr.cons_name1,
			'c_cons_name2':store.sr.cons_name2,
			'c_cons_address1':store.sr.cons_address1,
			'c_cons_address2':store.sr.cons_address2,
			'c_cons_address3':store.sr.cons_address3,
			'c_cons_address4':store.sr.cons_address4,
			'c_cons_address5':store.sr.cons_address5
		});
	}
	return (
		<Card className={classes.paper} id="consignee">
			<CardHeader style={{padding:'0'}}
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						<FolderShared fontSize="large"/>
					</Avatar>
				}
				action={
					<IconButton onClick={()=>store.setSr({conscopen:!store.sr.conscopen})}>
						{store.sr.conscopen? <UnfoldLess fontSize="large" /> : <UnfoldMore fontSize="large"/>}
					</IconButton>
				}
				title={
					<Typography variant='h5'>
						<GridContainer>
							<GridItem xs={4} sm={4} style={{marginTop:'8px'}}>Consignee
								<IconButton  onClick={()=>setViewBookmark(<DialogBookmark openBook={true} closeBook={()=>setViewBookmark(null)} type="C" {...props} />)}>
									<Bookmarks fontSize="default" />
								</IconButton>
							</GridItem>
							<GridItem xs={8} sm={7}>
								<Autocomplete
									options = {store.sr_bookmark.consList?store.sr_bookmark.consList:[]}
									getOptionLabel = { option => option.consignee_bookmark_name }
									getOptionSelected={(option, value) => option.consignee_bookmark_name === value.consignee_bookmark_name}
									value = {{consignee_bookmark_name:store.sr_bookmark.consList && store.sr_bookmark.consList.find(v=>v.value === store.sr.c_consignee_bookmark_seq)
										?store.sr_bookmark.consList.find(v=>v.value === store.sr.c_consignee_bookmark_seq).consignee_bookmark_name:''}}
									noOptionsText="Bookmark 등록하세요."
									onChange = {(e, option)=>fncSelectPortCode(option,'c_cons_bookmark')}
									renderInput={params =>(<TextField inputProps={{maxLength:30}} {...params} label="CCAM Consignee Bookmark"  fullWidth />)}/>
							</GridItem>
						</GridContainer>
					</Typography>
				}
			/>
			<CardBody style={{padding:'10px 0 0 0'}}>
				<GridContainer justify="flex-end">
					<GridItem  lg={2} md={3} sm={3} xs={4}>
						<Button simple style={{color:'#aaaaaa',paddingLeft:'26px',paddingBottom:'5px'}} onClick={()=>onHandleCopyConsignee()}>COPY CONSIGNEE</Button>
					</GridItem>
				</GridContainer>
				<Collapse in={store.sr.conscopen}>
					<Divider className={classes.divider}/>
					<ConsigneeBody type="CM" mergeConsProps={(data)=>props.mergeProps(data)} consBodyProp={consigneeData} {...props}/>  
				</Collapse>
				{viewBookmark}
			</CardBody>
		</Card>
	);
}
//));

export default observer(ConsigneeCCard);