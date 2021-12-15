import React,{useState} from "react";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import { Card,TextField,Collapse, IconButton, Divider, Avatar, Typography,CardHeader} from "@material-ui/core";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import {Autocomplete} from "@material-ui/lab";
import BookingBody from './Body/BookingBody.js';
import DialogBookmark from './Bookmark/Booking.js';

import {AddToHomeScreen, UnfoldLess, UnfoldMore,Bookmarks} from "@material-ui/icons";
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

//export default function BookingCard(props) { console.log(">>>>BookingCard props:",props);
//const BookingCard = inject('UserStore')(observer(({ UserStore, ...props }) => { 
//const BookingCard = (observer(({UserStore, ...props}) => {
function BookingCard(props) {
	const store =  useSrStore();
	const classes = styles();
	const [viewBookmark,setViewBookmark] = useState(null);
    const [confirm,setConfirm] = useState([]);
   // const [term,setTerm] = React.useState([]);
        
   	const fncSelectPortCode =(option)=>{
		if(option) {
			//props.mergeProps({...bkgProps, ...option});
			//props.closeCard(true);

			const list = {
				bl_type: option.bl_type?option.bl_type:store.sr.bl_type,
				cargo_class: option.cargo_class?option.cargo_class:store.sr.cargo_class,
				document_no: option.document_no?option.document_no:store.sr.document_no,
				hbl_yn: option.hbl_yn?option.hbl_yn:store.sr.hbl_yn,
				invoice_no: option.invoice_no?option.invoice_no:store.sr.invoice_no,
				label: option.label?option.label:store.sr.label,
				lc_expiry_date: option.lc_expiry_date?option.lc_expiry_date:store.sr.lc_expiry_date,
				lc_no: option.lc_no?option.lc_no:store.sr.lc_no,
				lc_yn: option.lc_yn?option.lc_yn:store.sr.lc_yn,
				line_payment_type: option.line_payment_type?option.line_payment_type:store.sr.line_payment_type,
				org_bl_need_yn: option.org_bl_need_yn?option.org_bl_need_yn:store.sr.org_bl_need_yn,
				other_bookmark_name:option.other_bookmark_name,
				other_bookmark_seq:option.other_bookmark_seq,
				part_sr_qty: option.part_sr_qty?option.part_sr_qty:store.sr.part_sr_qty,
				po_no: option.po_no?option.po_no:store.sr.po_no,
				sc_no: option.sc_no?option.sc_no:store.sr.sc_no,
				sr_amount: option.sr_amount?option.sr_amount:store.sr.sr_amount,
				trans_service_code: option.trans_service_code?option.trans_service_code:store.sr.trans_service_code,
				remark1:option.remark1?option.remark1:store.sr.remark1,
				remark2:option.remark1?option.remark2:store.sr.remark2,
				remark3:option.remark1?option.remark3:store.sr.remark3,
				remark4:option.remark1?option.remark4:store.sr.remark4,
				remark5:option.remark1?option.remark5:store.sr.remark5,
				goods_desc: option.trans_service_code?fnc_transGoods(option.trans_service_code,store.sr.goods_desc):fnc_transGoods(store.sr.trans_service_code,store.sr.goods_desc)
			};
			const mergeData = Object.assign(store.sr,list);

			store.setSr({...mergeData,bkgopen:true});
		} else {
			//props.mergeProps({...bkgProps, other_bookmark_name:'',other_bookmark_seq:''});
			store.setSr({
				other_bookmark_name:null,
				other_bookmark_seq:null,
				bl_type:null,
				cargo_class:null,
				document_no:null,
				hbl_yn:null,
				invoice_no:null,
				label:null,
				lc_expiry_date:null,
				lc_no:null,
				lc_yn:null,
				line_payment_type:null,
				org_bl_need_yn:null,
				part_sr_qty:null,
				po_no:null,
				sc_no:null,
				sr_amount:null,
				trans_service_code:null,
				remark1:null,
				remark2:null,
				remark3:null,
				remark4:null,
				remark5:null,
			});
		}
	}
	const fnc_transGoods = (trans,goods) => { 
		
		let goods_data = goods;
		let returnValue;
			
		if("1" === trans) {
			if(goods) {
				var goodsSplit = goods_data.split('\n');
				if("SHIPPER'S LOAD. COUNT & SEAL" === goodsSplit[0]) {
					goodsSplit[0] = "SHIPPER'S LOAD. COUNT & SEAL";
					goodsSplit[1] = "SAID TO CONTAIN :";
					goods_data = goodsSplit.join('\n');
				} else if ("SAID TO CONTAIN :" === goodsSplit[0]) {
					goodsSplit[0] = "\n";
					goods_data = goodsSplit.join('\n');
				} else {
					goods_data = "\n\n"+goodsSplit.join('\n');
				}
				var goodsDesc = goods_data.split('\n');
				goodsDesc[0] = "SHIPPER'S LOAD. COUNT & SEAL";
				goodsDesc[1] = "SAID TO CONTAIN :";
				returnValue = goodsDesc.join('\n');					  
			} else {
				returnValue = "SHIPPER'S LOAD. COUNT & SEAL\nSAID TO CONTAIN :\n";
			}
		} else if("3" === trans) {
			if(goods) {
				var goodsSplit = goods_data.split('\n');
				if("SAID TO CONTAIN :" === goodsSplit[0]) {
					goodsSplit[0] = "SAID TO CONTAIN :";
				} else if ("SHIPPER'S LOAD. COUNT & SEAL" === goodsSplit[0]) {
				goodsSplit[0] ="SAID TO CONTAIN :";
				goodsSplit.splice(1,1);
				goods_data = goodsSplit.join('\n');
				} else {
					goods_data = "\n"+goodsSplit.join('\n');
				}
				var goodsDesc = goods_data.split('\n');
				goodsDesc[0] = "SAID TO CONTAIN :";
				returnValue = goodsDesc.join('\n');
			} else {
				returnValue = "SAID TO CONTAIN :\n";
			} 
		}else {
			returnValue = goods;
		}
		return returnValue;
	}
    
    const openCard =()=> {
		axios.post("/shipper/getUserBookingInfo",{user_no:props.userData?props.userData.user_no:'',bkg_no:''},{}).then(res => {
			setConfirm(res.data);
		});
		store.setSr({bkgopen:!store.sr.bkgopen});
    }

	return (
		<Card className={classes.paper} id="booking">
			<CardHeader style={{padding:'0'}}
				avatar={
				    <Avatar aria-label="recipe" className={classes.avatar}>
				      	<AddToHomeScreen fontSize="large"/>
				    </Avatar>
				}
				  action={
				    <IconButton onClick={()=>openCard()}>
				      {store.sr.bkgopen? <UnfoldLess fontSize="large" /> : <UnfoldMore fontSize="large"/>}
				    </IconButton>
				}
				title={
					<Typography variant='h5'>
						<GridContainer>
							<GridItem xs={4} sm={4} style={{marginTop:'8px'}}>Booking
								<IconButton  onClick={()=>setViewBookmark(<DialogBookmark closeBook={()=>setViewBookmark(null)} {...props} />)}>
									<Bookmarks fontSize="default"/>
								</IconButton>
							</GridItem>
							<GridItem xs={8} sm={7}>
								<Autocomplete
									options = {store.sr_bookmark.bookingList?store.sr_bookmark.bookingList:[]}
									getOptionLabel = { option => option.other_bookmark_name }
									id="booking_bookmark"
									noOptionsText="Bookmark 등록하세요."
									getOptionSelected={(option, value) => option.other_bookmark_name === value.other_bookmark_name}
									value = {{other_bookmark_name:store.sr_bookmark.bookingList && store.sr_bookmark.bookingList.find(v=>v.value === store.sr.other_bookmark_seq)
												?store.sr_bookmark.bookingList.find(v=>v.value === store.sr.other_bookmark_seq).other_bookmark_name:''}}
									onChange={(e, option)=>fncSelectPortCode(option)}
									renderInput={
									params =>(<TextField inputProps={{maxLength:30}} {...params} label="Booking Bookmark"  fullWidth />)}/>
							</GridItem>
						</GridContainer>
					</Typography>
				}
			/>
			<CardBody style={{padding:'10px 0 0 0'}}>
				<Collapse in={store.sr.bkgopen}>
					<Divider className={classes.divider}/>
					<BookingBody type="M" mergeProps={(data)=>store.setSr(data)} sameFlag ={false} confirm={confirm} {...props}/>		 		
				</Collapse> 
				{viewBookmark}
			</CardBody>
		</Card>	  
	);
}
//));
export default observer(BookingCard);

/*function areEqual(prevProps,nextProps) {
	return (prevProps.bkgProps.other_bookmark_seq===nextProps.bkgProps.other_bookmark_seq);
}*/
//export default React.memo(BookingCard,areEqual);