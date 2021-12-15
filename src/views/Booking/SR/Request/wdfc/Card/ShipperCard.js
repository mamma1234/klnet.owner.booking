import React,{ useState, useEffect } from "react";
import {useSrStore}  from 'store/srStore.js';
import { makeStyles } from "@material-ui/core/styles";
import { Card, TextField, Collapse, IconButton, Divider, Avatar, Typography,CardHeader} from "@material-ui/core";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import {Autocomplete} from "@material-ui/lab";
import ShipperBody from './Body/ShipperBody.js';
import DialogBookmark from './Bookmark/Shipper.js';
import {DirectionsBoat, UnfoldLess, UnfoldMore,Bookmarks} from "@material-ui/icons";
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
	grid: {
		padding: '0px 10px !important',
	},
	gridLabel: {
		padding: '0px 10px !important',
		textAlign:'left',
		marginTop:'12px',
	},
	modalCloseButton:{
		float:'right',
		padding:'0',
		minWidth:'21px',
		heught:'21px'
	},
	modalTitle:{
		padding:'15px 24px 0 24px',
		textAlign:'center'
	},
	modal:{
		maxWidth:'80%'
	},
	tableLine:{
		height:'180px',overflow:'auto',borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'
	},
	tablecell:{
		paddingTop:'5px',paddingBottom:'5px',textAlign:'start'
	},
	tableHeadercell:{
		paddingTop:'10px',paddingBottom:'10px',textAlign:'start'
	}
}));

//export default function ShipperCard(props) { 
//const BookingCard = inject('UserStore')(observer(({ UserStore, ...props }) => {
//const BookingCard = (observer(({UserStore, ...props}) => {
function BookingCard(props) {
	const store =  useSrStore();
	const classes = styles();
	//const {open,shpProps,bookmark} = props; 
	const [shipperData,setShipperData] = useState({});
	const [viewBookmark,setViewBookmark] = useState(null);
	const [open,setOpen] = useState(false);
	//useEffect(() => { 
	//	setShipperData(shpProps);
	//}, [shpProps]);

	const fncSelectPortCode =(option)=>{
		if(option) {
			console.log(option)
			//props.mergeProps({...shipperData, ...option});
			//props.closeCard(true);
			
			store.setSr({
				label:option.label?option.label:store.sr.label,
				sch_scd:option.sch_scd?option.sch_scd:store.sr.sch_scd,
				sch_srd:option.sch_srd?option.sch_srd:store.sr.sch_srd,
				shipper_bookmark_name:option.shipper_bookmark_name,
				shipper_bookmark_seq:option.shipper_bookmark_seq,
				shp_address1: option.shp_address1?option.shp_address1:store.sr.shp_address1,
				shp_address2: option.shp_address1?option.shp_address2:store.sr.shp_address2,
				shp_address3: option.shp_address1?option.shp_address3:store.sr.shp_address3,
				shp_address4: option.shp_address1?option.shp_address4:store.sr.shp_address4,
				shp_address5: option.shp_address1?option.shp_address5:store.sr.shp_address5,
				shp_code: option.shp_code?option.shp_code:store.sr.shp_code,
				shp_country_code: option.shp_country_code?option.shp_country_code:store.sr.shp_country_code,
				shp_force: option.shp_force?option.shp_force:store.sr.shp_force,
				shp_name1: option.shp_name1?option.shp_name1:store.sr.shp_name1,
				shp_name2: option.shp_name1?option.shp_name2:store.sr.shp_name2,
				shp_un_code: option.shp_un_code?option.shp_un_code:store.sr.shp_un_code,
				shp_user_dept: option.shp_user_dept?option.shp_user_dept:store.sr.shp_user_dept,
				shp_user_email: option.shp_user_email?option.shp_user_email:store.sr.shp_user_email,
				shp_user_fax: option.shp_user_fax?option.shp_user_fax:store.sr.shp_user_fax,
				shp_user_name: option.shp_user_name?option.shp_user_name:store.sr.shp_user_name,
				shp_user_tel: option.shp_user_tel?option.shp_user_tel:store.sr.shp_user_tel,
				value: option.value?option.value:store.sr.value,
				shpopen:true});
		} else {
			//props.mergeProps({...shipperData, shipper_bookmark_name:'',shipper_bookmark_seq:''});
			store.setSr({
				label:null,
				sch_scd:null,
				sch_srd:null,
				shipper_bookmark_name:null,
				shipper_bookmark_seq:null,
				shp_address1:null,
				shp_address2:null,
				shp_address3:null,
				shp_address4:null,
				shp_address5:null,
				shp_code:null,
				shp_country_code:null,
				shp_force:null,
				shp_name1:null,
				shp_name2:null,
				shp_un_code:null,
				shp_user_dept:null,
				shp_user_email:null,
				shp_user_fax:null,
				shp_user_name:null,
				shp_user_tel:null,
				value:null,
			});
		}
	}

	return (
		<Card className={classes.paper} id="shipper">
			<CardHeader style={{padding:'0'}}
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						<DirectionsBoat fontSize="large"/>
					</Avatar>
				}
				action={
				<IconButton onClick={()=>store.setSr({shpopen:!store.sr.shpopen})}>
					{store.sr.shpopen? <UnfoldLess fontSize="large"/> : <UnfoldMore fontSize="large"/>}
				</IconButton>
				}
				title={
					<Typography variant='h5'>
						<GridContainer>
							<GridItem xs={4} sm={4} style={{marginTop:'8px'}}>Shipper
								<IconButton 
									onClick={()=>{ setViewBookmark(<DialogBookmark openBook={true} closeBook={()=>setViewBookmark(null)} type="B" {...props} />);}}>
									<Bookmarks fontSize="default" />
								</IconButton>
							</GridItem>
							<GridItem xs={8} sm={7}>
								<Autocomplete
									options = {store.sr_bookmark.shipperList?store.sr_bookmark.shipperList:[]}
									getOptionLabel = { option => option.shipper_bookmark_name }
									getOptionSelected={(option, value) => option.shipper_bookmark_name === value.shipper_bookmark_name}
									value = {{shipper_bookmark_name:store.sr_bookmark.shipperList && store.sr_bookmark.shipperList.find(v=>v.value === store.sr.shipper_bookmark_seq)
											?store.sr_bookmark.shipperList.find(v=>v.value === store.sr.shipper_bookmark_seq).shipper_bookmark_name:''}}
									id="shipper_bookmark"
									noOptionsText="Bookmark 등록하세요."
									onChange = {(e, option)=>fncSelectPortCode(option,'shipper_bookmark')}
									renderInput={params =>(<TextField inputProps={{maxLength:30}} {...params} label="Shipper Bookmark"  fullWidth />)}
								/>
							</GridItem>
						</GridContainer>
					</Typography>
				}
				// subheader="추가합니다"
			/>
			<CardBody style={{padding:'10px 0 0 0'}}>
				<Collapse in={store.sr.shpopen}>
					<Divider className={classes.divider}/>
					<ShipperBody type="M" {...props}/>
				</Collapse>
				{viewBookmark}
			</CardBody>    
		</Card>
	);
}
export default observer(BookingCard);