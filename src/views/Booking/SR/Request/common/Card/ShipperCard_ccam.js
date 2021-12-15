import React,{ useState, useEffect } from "react";
import {useSrStore}  from 'store/srStore.js';
import { makeStyles } from "@material-ui/core/styles";
import { Card, CircularProgress, MenuItem, FormControl, Select, InputLabel, FormControlLabel, Checkbox,TextField,Paper, Tooltip, TableContainer, Table, TableHead, TableRow, Chip, TableCell, TableFooter, TableBody,Box, Collapse, IconButton, FormLabel, Input, Dialog, Grid, Divider, Avatar, InputAdornment
,Typography,CardHeader,DialogTitle,DialogContent,DialogActions} from "@material-ui/core";
//import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
//import CustomInput from "components/CustomInput/CustomInput.js";
//import CustomInput2 from "components/CustomInput/CustomInputBooking.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import {Autocomplete} from "@material-ui/lab";
import moment from 'moment';
import axios from 'axios';
import Slide from "@material-ui/core/Slide";
import ShipperBody from './Body/ShipperCBody.js';
import DialogBookmark from './Bookmark/Shipper.js';
import {GolfCourse, Schedule, DirectionsBoat, Map, HowToVote, UnfoldLess, UnfoldMore, Add, Close, MoreVert, ViewComfy, ViewModule, ListAlt, LocalShipping,
    RemoveCircleOutline,AddCircleOutline,Bookmarks} from "@material-ui/icons";
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

//export default function ShipperCcamCard(props) { 
//const ShipperCcamCard = inject('UserStore')(observer(({ UserStore, ...props }) => { 
//const ShipperCcamCard = (observer(({UserStore, ...props}) => {
function ShipperCcamCard (props){
	
	const store =  useSrStore();
	const classes = styles();
	const {c_shpProps} = props; 
	const [shipperData,setShipperData] = useState({});
	const [viewBookmark,setViewBookmark] = React.useState(null);

			//const [bookmarkData,setBookmarkData] = React.useState({});
		    
	useEffect(() => { 
		setShipperData(c_shpProps);
	}, [c_shpProps]);

	const fncSelectPortCode =(option)=>{
		if(option) {
			var samc = {
				c_shipper_bookmark_seq:option.c_shipper_bookmark_seq,
				c_shipper_bookmark_name:option.c_shipper_bookmark_name,
				c_shp_code:option.shp_code?option.shp_code:store.c_sr.shp_code,
				c_shp_name1:option.shp_name1?option.shp_name1:store.sr.c_shp_name1,
				c_shp_name2:option.shp_name1?option.shp_name2:store.sr.c_shp_name2,
				c_shp_address1:option.shp_address1?option.shp_address1:store.sr.c_shp_address1,
				c_shp_address2:option.shp_address1?option.shp_address2:store.sr.c_shp_address2,
				c_shp_address3:option.shp_address1?option.shp_address3:store.sr.c_shp_address3,
				c_shp_address4:option.shp_address1?option.shp_address4:store.sr.c_shp_address4,
				c_shp_address5:option.shp_address1?option.shp_address5:store.sr.c_shp_address5,
				c_shp_user_name:option.shp_user_name?option.shp_user_name:store.sr.c_shp_user_name,
				c_shp_user_tel:option.shp_user_tel?option.shp_user_tel:store.sr.c_shp_user_tel,
				c_shp_country_code:option.shp_country_code?option.shp_country_code:store.sr.c_shp_country_code,
			}
			var list = {...shipperData, ...samc};
			//props.mergeProps(list);
			//props.closeCard(true);
			store.setSr({...samc,shpcopen:true});
		} else {
			//props.mergeProps({...shipperData, c_shipper_bookmark_seq:'',c_shipper_bookmark_name:''});
			store.setSr({
				c_shipper_bookmark_seq:null,
				c_shipper_bookmark_name:null,
				c_shp_code:null,
				c_shp_name1:null,
				c_shp_name2:null,
				c_shp_address1:null,
				c_shp_address2:null,
				c_shp_address3:null,
				c_shp_address4:null,
				c_shp_address5:null,
				c_shp_user_name:null,
				c_shp_user_tel:null,
				c_shp_country_code:null,
			});
		}
	}
	
    const onHandleCopyShipper =()=> {
    	store.setSr({c_shp_name1:store.sr.shp_name1,
    			c_shp_name2:store.sr.shp_name2,
    			c_shp_address1:store.sr.shp_address1,
    			c_shp_address2:store.sr.shp_address2,
    			c_shp_address3:store.sr.shp_address3,
    			c_shp_address4:store.sr.shp_address4,
    			c_shp_address5:store.sr.shp_address5});
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
					<IconButton onClick={()=>store.setSr({shpcopen:!store.sr.shpcopen})}>
						{store.sr.shpcopen? <UnfoldLess fontSize="large" /> : <UnfoldMore fontSize="large"/>}
					</IconButton>
				}
				title={
					<Typography variant='h5'>
						<GridContainer>
						<GridItem xs={4} sm={4} style={{marginTop:'8px'}}>Shipper
							<IconButton  onClick={()=>{
								setViewBookmark(<DialogBookmark openBook={true} closeBook={()=>setViewBookmark(null)} type="C" {...props} />);
							}}>
							<Bookmarks fontSize='default' />
							</IconButton></GridItem>
						<GridItem xs={8} sm={7}>
							<Autocomplete
								options = {store.sr_bookmark.shipperList?store.sr_bookmark.shipperList:[]}
								getOptionLabel = { option => option.shipper_bookmark_name }
								getOptionSelected={(option, value) => option.shipper_bookmark_name === value.shipper_bookmark_name}
								value = {{shipper_bookmark_name:store.sr_bookmark.shipperList && store.sr_bookmark.shipperList.find(v=>v.value === store.sr.c_shipper_bookmark_seq)
										?store.sr_bookmark.shipperList.find(v=>v.value === store.sr.c_shipper_bookmark_seq).shipper_bookmark_name:''}}
								onChange = {(e, option)=>fncSelectPortCode(option,'c_shipper_bookmark')}
								noOptionsText="Bookmark 등록하세요."
								renderInput={params =>(<TextField inputProps={{maxLength:30}} {...params} label="CCAM Shipper Bookmark"  fullWidth />)}
							/>
						</GridItem>
						</GridContainer>
					</Typography>
				}
			/>
			<CardBody style={{padding:'10px 0 0 0'}}>
				<GridContainer justify="flex-end">
					<GridItem  lg={2} md={2} sm={2} xs={3}>
						<Button simple style={{color:'#aaaaaa',paddingLeft:'26px',paddingBottom:'5px'}} onClick={()=>onHandleCopyShipper()}>COPY SHIPPER</Button>
					</GridItem>
				</GridContainer>
				<Collapse in={store.sr.shpcopen}>
					<Divider className={classes.divider}/>
					<ShipperBody type="C"  {...props}/>
				</Collapse>
				{viewBookmark}
			</CardBody>    
		</Card>
	);
}
//));

export default observer(ShipperCcamCard);