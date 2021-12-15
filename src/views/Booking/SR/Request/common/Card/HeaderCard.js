import React,{ useEffect,useState, memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card,FormControl,TextField,IconButton,FormControlLabel,Switch,InputAdornment,CircularProgress,Backdrop } from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import {Autocomplete} from "@material-ui/lab";
import moment from 'moment';
import {Bookmarks} from "@material-ui/icons";
import DialogBookmark from './Bookmark/Total.js';
import axios from 'axios';
import {observer} from 'mobx-react-lite';
import {useStyles} from 'views/Booking/SR/styles';
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

//export default function HeaderCard(props) {
//const HeaderCard = inject('UserStore')(observer(({ UserStore, ...props }) => { 
//const HeaderCard = (observer(({UserStore, ...props}) => {
	
function HeaderCard(props) {
	const store =  useSrStore();
	const classes = styles();
	//const {bookmark} = props;
	const [viewBookmark,setViewBookmark] = useState(null);
	const [srNumber,setSrNumber] = useState("");
	const [progress,setProgress] = useState(null);

/*	useEffect(() => { console.log("_____________________HeaderCard lendering",store.sr.sr_random)
			setSrNumber(headerProps.sr_no);
	  }, [headerProps]);*/
	const trans_goods_descriptin = (transCode,goodsData) => {
	
		let returnValue;
		
		if("1" === transCode) {
			if(goodsData) {
				var goodsSplit = goodsData.split('\n');
				if("SHIPPER'S LOAD. COUNT & SEAL" === goodsSplit[0]) {
					goodsSplit[0] = "SHIPPER'S LOAD. COUNT & SEAL";
					goodsSplit[1] = "SAID TO CONTAIN :";
					goodsData = goodsSplit.join('\n');
				} else if ("SAID TO CONTAIN :" === goodsSplit[0]) {
					goodsSplit[0] = "\n";
					goodsData = goodsSplit.join('\n');
				} else {
					goodsData = "\n\n"+goodsSplit.join('\n');
				}
				var goodsDesc = goodsData.split('\n');
				goodsDesc[0] = "SHIPPER'S LOAD. COUNT & SEAL";
				goodsDesc[1] = "SAID TO CONTAIN :";
				returnValue = goodsDesc.join('\n');
			} else {
				returnValue = "SHIPPER'S LOAD. COUNT & SEAL\nSAID TO CONTAIN :\n";
			}
		} else if("3" === transCode) {
			if(goodsData) {
				var goodsSplit = goodsData.split('\n');
				if("SAID TO CONTAIN :" === goodsSplit[0]) {
					goodsSplit[0] = "SAID TO CONTAIN :";
				} else if ("SHIPPER'S LOAD. COUNT & SEAL" === goodsSplit[0]) {
					goodsSplit[0] ="SAID TO CONTAIN :";
					goodsSplit.splice(1,1);
					goodsData = goodsSplit.join('\n');
				} else {
					goodsData = "\n"+goodsSplit.join('\n');
				}
				var goodsDesc = goodsData.split('\n');
				goodsDesc[0] = "SAID TO CONTAIN :";
				returnValue = goodsDesc.join('\n');
			} else {
				returnValue = "SAID TO CONTAIN :\n";
			} 
		} else {
			returnValue =goodsData;
		}
		return returnValue;
	}
	const onCheckSR =() => {
		if(srNumber) {
			props.onDocNew(srNumber);
		} else {
			// SR 입력 유도 메시지
			props.alert(null,null,'info',true,false,'lg','SR 번호를 입력해주세요.',true,false);
		}
	}

	const fncSelectPortCode =(data)=>{
		if(data) {
			setProgress(<Backdrop className={classes.backdrop} open={true}>
  						<CircularProgress color="primary" />
		  				</Backdrop>);
			axios.post("/shipper/setUserSrBookmarkDataList",{user_no : props.userData?props.userData.user_no:'',seq:data.bookmark_seq},{}).then(res => { 
				//props.mergeProps({...headerProps,...res.data,'bookmark_seq':data.bookmark_seq,'bookmark_name':data.bookmark_name});
				const list = {
					bl_type: res.data.bl_type?res.data.bl_type:store.sr.bl_type,
					c_cons_address1: res.data.c_cons_address1?res.data.c_cons_address1:store.sr.c_cons_address1,
					c_cons_address2: res.data.c_cons_address1?res.data.c_cons_address2:store.sr.c_cons_address2,
					c_cons_address3: res.data.c_cons_address1?res.data.c_cons_address3:store.sr.c_cons_address3,
					c_cons_address4: res.data.c_cons_address1?res.data.c_cons_address4:store.sr.c_cons_address4,
					c_cons_address5: res.data.c_cons_address1?res.data.c_cons_address5:store.sr.c_cons_address5,
					c_cons_name1: res.data.c_cons_name1?res.data.c_cons_name1:store.sr.c_cons_name1,
					c_cons_name2: res.data.c_cons_name1?res.data.c_cons_name2:store.sr.c_cons_name2,
					c_consignee_bookmark_name: res.data.c_consignee_bookmark_name,
					c_consignee_bookmark_seq: res.data.c_consignee_bookmark_seq,
					c_noti_address1: res.data.c_noti_address1?res.data.c_noti_address1:store.sr.c_noti_address1,
					c_noti_address2: res.data.c_noti_address1?res.data.c_noti_address2:store.sr.c_noti_address2,
					c_noti_address3: res.data.c_noti_address1?res.data.c_noti_address3:store.sr.c_noti_address3,
					c_noti_address4: res.data.c_noti_address1?res.data.c_noti_address4:store.sr.c_noti_address4,
					c_noti_address5: res.data.c_noti_address1?res.data.c_noti_address5:store.sr.c_noti_address5,
					c_noti_name1:  res.data.c_noti_name1?res.data.c_noti_name1:store.sr.c_noti_name1,
					c_noti_name2:  res.data.c_noti_name1?res.data.c_noti_name2:store.sr.c_noti_name2,
					c_notify_bookmark_name: res.data.c_notify_bookmark_name,
					c_notify_bookmark_seq: res.data.c_notify_bookmark_seq,
					c_shipper_bookmark_name: res.data.c_shipper_bookmark_name,
					c_shipper_bookmark_seq: res.data.c_shipper_bookmark_seq,
					c_shp_address1: res.data.c_shp_address1?res.data.c_shp_address1:store.sr.c_shp_address1,
					c_shp_address2: res.data.c_shp_address1?res.data.c_shp_address2:store.sr.c_shp_address2,
					c_shp_address3: res.data.c_shp_address1?res.data.c_shp_address3:store.sr.c_shp_address3,
					c_shp_address4: res.data.c_shp_address1?res.data.c_shp_address4:store.sr.c_shp_address4,
					c_shp_address5: res.data.c_shp_address1?res.data.c_shp_address5:store.sr.c_shp_address5,
					c_shp_name1:  res.data.c_shp_name1?res.data.c_shp_name1:store.sr.c_shp_name1,
					c_shp_name2:  res.data.c_shp_name1?res.data.c_shp_name2:store.sr.c_shp_name2,
					cargo_bookmark_name: res.data.cargo_bookmark_name,
					cargo_bookmark_seq: res.data.cargo_bookmark_seq,
					cargo_hs_code: res.data.cargo_hs_code?res.data.cargo_hs_code:store.sr.cargo_hs_code,
					cargo_pack_qty: res.data.cargo_pack_qty?res.data.cargo_pack_qty:store.sr.cargo_pack_qty,
					cargo_pack_type: res.data.cargo_pack_type?res.data.cargo_pack_type:store.sr.cargo_pack_type,
					cargo_total_volume: res.data.cargo_total_volume?res.data.cargo_total_volume:store.sr.cargo_total_volume,
					cargo_total_weight: res.data.cargo_total_weight?res.data.cargo_total_weight:store.sr.cargo_total_weight,
					cons_address1: res.data.cons_address1?res.data.cons_address1:store.sr.cons_address1,
					cons_address2: res.data.cons_address1?res.data.cons_address2:store.sr.cons_address2,
					cons_address3: res.data.cons_address1?res.data.cons_address3:store.sr.cons_address3,
					cons_address4: res.data.cons_address1?res.data.cons_address4:store.sr.cons_address4,
					cons_address5: res.data.cons_address1?res.data.cons_address5:store.sr.cons_address5,
					cons_name1: res.data.cons_name1?res.data.cons_name1:store.sr.cons_name1,
					cons_name2: res.data.cons_name1?res.data.cons_name2:store.sr.cons_name2,
					consignee_bookmark_name: res.data.consignee_bookmark_name,
					consignee_bookmark_seq: res.data.consignee_bookmark_seq,
					goodlist: res.data.goodlist?res.data.goodlist:store.sr.goodlist,
					hbl_yn: res.data.hbl_yn?res.data.hbl_yn:store.sr.hbl_yn,
					line_address1: res.data.line_address1?res.data.line_address1:store.sr.line_address1,
					line_address2: res.data.line_address1?res.data.line_address2:store.sr.line_address2,
					line_address3: res.data.line_address1?res.data.line_address3:store.sr.line_address3,
					line_address4: res.data.line_address1?res.data.line_address4:store.sr.line_address4,
					line_address5: res.data.line_address1?res.data.line_address5:store.sr.line_address5,
					line_bookmark_name:res.data.line_bookmark_name,
					line_bookmark_seq:res.data.line_bookmark_seq,
					line_name1: res.data.line_name1?res.data.line_name1:store.sr.cons_name1,
					line_name2: res.data.line_name1?res.data.line_name2:store.sr.line_name2,
					line_payment_type: res.data.line_payment_type?res.data.line_payment_type:store.sr.line_payment_type,
					line_user_dept: res.data.line_user_dept?res.data.line_user_dept:store.sr.line_user_dept,
					line_user_email: res.data.line_user_email?res.data.line_user_email:store.sr.line_user_email,
					line_user_name: res.data.line_user_name?res.data.line_user_name:store.sr.line_user_name,
					line_user_tel: res.data.line_user_tel?res.data.line_user_tel:store.sr.line_user_tel,
					marklist: res.data.marklist?res.data.marklist:store.sr.marklist,
					noti_address1: res.data.noti_address1?res.data.noti_address1:store.sr.noti_address1,
					noti_address2: res.data.noti_address1?res.data.noti_address2:store.sr.noti_address2,
					noti_address3: res.data.noti_address1?res.data.noti_address3:store.sr.noti_address3,
					noti_address4: res.data.noti_address1?res.data.noti_address4:store.sr.noti_address4,
					noti_address5: res.data.noti_address1?res.data.noti_address5:store.sr.noti_address5,
					noti_name1:  res.data.noti_name1?res.data.noti_name1:store.sr.noti_name1,
					noti_name2:  res.data.noti_name1?res.data.noti_name2:store.sr.noti_name2,
					sc_no: res.data.sc_no?res.data.sc_no:store.sr.sc_no,
					sch_barge_onboard_date: res.data.sch_barge_onboard_date?res.data.sch_barge_onboard_date:store.sr.sch_barge_onboard_date,
					sch_bl_issue_name: res.data.sch_bl_issue_name?res.data.sch_bl_issue_name:store.sr.sch_bl_issue_name,
					sch_fdp: res.data.sch_fdp?res.data.sch_fdp:store.sr.sch_fdp,
					sch_fdp_name: res.data.sch_fdp_name?res.data.sch_fdp_name:store.sr.sch_fdp_name,
					sch_feeder_vessel_name: res.data.sch_feeder_vessel_name?res.data.sch_feeder_vessel_name:store.sr.sch_feeder_vessel_name,
					sch_feeder_vessel_voyage: res.data.sch_feeder_vessel_voyage?res.data.sch_feeder_vessel_voyage:store.sr.sch_feeder_vessel_voyage,
					sch_pld: res.data.sch_pld?res.data.sch_pld:store.sr.sch_pld,
					sch_pld_name: res.data.sch_pld_name?res.data.sch_pld_name:store.sr.sch_pld_name,
					sch_pod: res.data.sch_pod?res.data.sch_pod:store.sr.sch_pod,
					sch_pod_name: res.data.sch_pod_name?res.data.sch_pod_name:store.sr.sch_pod_name,
					sch_pol: res.data.sch_pol?res.data.sch_pol:store.sr.sch_pol,
					sch_pol_name: res.data.sch_pol_name?res.data.sch_pol_name:store.sr.sch_pol_name,
					sch_por: res.data.sch_por?res.data.sch_por:store.sr.sch_por,
					sch_por_name: res.data.sch_por_name?res.data.sch_por_name:store.sr.sch_por_name,
					sch_vessel_name: res.data.sch_vessel_name?res.data.sch_vessel_name:store.sr.sch_vessel_name,
					sch_vessel_voyage: res.data.sch_vessel_voyage?res.data.sch_vessel_voyage:store.sr.sch_vessel_voyage,
					notify_bookmark_name: res.data.notify_bookmark_name,
					notify_bookmark_seq: res.data.notify_bookmark_seq,
					other_bookmark_name: res.data.other_bookmark_name,
					other_bookmark_seq: res.data.other_bookmark_seq,
					schedule_bookmark_name: res.data.schedule_bookmark_name,
					schedule_bookmark_seq: res.data.schedule_bookmark_seq,
					shipper_bookmark_name: res.data.shipper_bookmark_name,
					shipper_bookmark_seq: res.data.shipper_bookmark_seq,
					shp_address1: res.data.shp_address1?res.data.shp_address1:store.sr.shp_address1,
					shp_address2: res.data.shp_address1?res.data.shp_address2:store.sr.shp_address2,
					shp_address3: res.data.shp_address1?res.data.shp_address3:store.sr.shp_address3,
					shp_address4: res.data.shp_address1?res.data.shp_address4:store.sr.shp_address4,
					shp_address5: res.data.shp_address1?res.data.shp_address5:store.sr.shp_address5,
					shp_name1:  res.data.shp_name1?res.data.shp_name1:store.sr.shp_name1,
					shp_name2:  res.data.shp_name1?res.data.shp_name2:store.sr.shp_name2,
					trans_service_code: res.data.trans_service_code?res.data.trans_service_code:store.sr.trans_service_code,
					sr_amount:res.data.sr_amount?res.data.sr_amount:store.sr.sr_amount,
					sch_eta: res.data.sch_eta?res.data.sch_eta:store.sr.sch_eta,
					sch_etd: res.data.sch_etd?res.data.sch_etd:store.sr.sch_etd,
					sch_vessel_code: res.data.sch_vessel_code?res.data.sch_vessel_code:store.sr.sch_vessel_code,
					sch_line_code:res.data.sch_line_code?res.data.sch_line_code:store.sr.sch_line_code,
					po_no:res.data.po_no?res.data.po_no:store.sr.po_no,
					part_sr_qty:res.data.part_sr_qty?res.data.part_sr_qty:store.sr.part_sr_qty,
					org_bl_need_yn:res.data.org_bl_need_yn?res.data.org_bl_need_yn:store.sr.org_bl_need_yn,
					mark_yn:res.data.mark_yn?res.data.mark_yn:store.sr.mark_yn,
					mark_desc:res.data.mark_desc?res.data.mark_desc:store.sr.mark_desc,
					invoice_no: res.data.invoice_no?res.data.invoice_no:store.sr.invoice_no,
					label: res.data.label?res.data.label:store.sr.label,
					lc_expiry_date: res.data.lc_expiry_date?res.data.lc_expiry_date:store.sr.lc_expiry_date,
					lc_no: res.data.lc_no?res.data.lc_no:store.sr.lc_no,
					lc_yn: res.data.lc_yn?res.data.lc_yn:store.sr.lc_yn,
					cargo_attached_yn: res.data.cargo_attached_yn?res.data.cargo_attached_yn:store.sr.cargo_attached_yn,
					cargo_class: res.data.cargo_class?res.data.cargo_class:store.sr.cargo_class,
					cargo_coastal_yn: res.data.cargo_coastal_yn?res.data.cargo_coastal_yn:store.sr.cargo_coastal_yn,
					cargo_frozen_temp: res.data.cargo_frozen_temp?res.data.cargo_frozen_temp:store.sr.cargo_frozen_temp,
					cargo_frozen_temp_unit: res.data.cargo_frozen_temp_unit?res.data.cargo_frozen_temp_unit:store.sr.cargo_frozen_temp_unit,
					cargo_handling_code: res.data.cargo_handling_code?res.data.cargo_handling_code:store.sr.cargo_handling_code,
					cargo_handling_frozen: res.data.cargo_handling_frozen?res.data.cargo_handling_frozen:store.sr.cargo_handling_frozen,
					cargo_item_hs_code: res.data.cargo_item_hs_code?res.data.cargo_item_hs_code:store.sr.cargo_item_hs_code,
					cargo_temp: res.data.cargo_temp?res.data.cargo_temp:store.sr.cargo_temp,
					cargo_temp_unit: res.data.cargo_temp_unit?res.data.cargo_temp_unit:store.sr.cargo_temp_unit,
					cargo_weight: res.data.cargo_weight?res.data.cargo_weight:store.sr.cargo_weight,
					document_no: res.data.document_no?res.data.document_no:store.sr.document_no,
					goods_desc: res.data.goods_desc?trans_goods_descriptin(res.data.trans_service_code,res.data.goods_desc):trans_goods_descriptin(store.sr.trans_service_code,store.sr.goods_desc),
					goods_yn: res.data.goods_yn?res.data.goods_yn:store.sr.goods_yn,
					c_cons_user_name:res.data.c_cons_user_name?res.data.c_cons_user_name:store.sr.c_cons_user_name,
					c_cons_user_tel:res.data.c_cons_user_tel?res.data.c_cons_user_tel:store.sr.c_cons_user_tel,
					c_cons_country_code:res.data.c_cons_country_code?res.data.c_cons_country_code:store.sr.c_cons_country_code,
					c_cons_code:res.data.c_cons_code?res.data.c_cons_code:store.sr.c_cons_code,
					c_noti_user_name:res.data.c_noti_user_name?res.data.c_noti_user_name:store.sr.c_noti_user_name,
					c_noti_user_tel:res.data.c_noti_user_tel?res.data.c_noti_user_tel:store.sr.c_noti_user_tel,
					c_noti_country_code:res.data.c_noti_country_code?res.data.c_noti_country_code:store.sr.c_noti_country_code,
					c_noti_code:res.data.c_noti_code?res.data.c_noti_code:store.sr.c_noti_code,
					c_shp_user_name:res.data.c_shp_user_name?res.data.c_shp_user_name:store.sr.c_shp_user_name,
					c_shp_user_tel:res.data.c_shp_user_tel?res.data.c_shp_user_tel:store.sr.c_shp_user_tel,
					c_shp_country_code:res.data.c_shp_country_code?res.data.c_shp_country_code:store.sr.c_shp_country_code,
					c_shp_code:res.data.c_shp_code?res.data.c_shp_code:store.sr.c_shp_code,
					sch_bl_issue_name:res.data.sch_bl_issue_name?res.data.sch_bl_issue_name:store.sr.sch_bl_issue_name,

					// cntrlist:[],
				}


				store.setSr({...list,'bookmark_seq':data.bookmark_seq,'bookmark_name':data.bookmark_name});
				props.allOpenProps(true);
				setProgress(null)});	  
		} else {
			//props.mergeProps({...headerProps,'bookmark_seq':'','bookmark_name':''});
			store.setSr({
				bookmark_seq:null,
				bookmark_name:null,
				bl_type: null,
				c_cons_address1: null,
				c_cons_address2: null,
				c_cons_address3: null,
				c_cons_address4: null,
				c_cons_address5: null,
				c_cons_name1: null,
				c_cons_name2: null,
				c_consignee_bookmark_name: null,
				c_consignee_bookmark_seq: null,
				c_noti_address1: null,
				c_noti_address2: null,
				c_noti_address3: null,
				c_noti_address4: null,
				c_noti_address5: null,
				c_noti_name1: null,
				c_noti_name2: null,
				c_notify_bookmark_name: null,
				c_notify_bookmark_seq: null,
				c_shipper_bookmark_name: null,
				c_shipper_bookmark_seq: null,
				c_shp_address1: null,
				c_shp_address2: null,
				c_shp_address3: null,
				c_shp_address4: null,
				c_shp_address5: null,
				c_shp_name1: null,
				c_shp_name2: null,
				cargo_bookmark_name: null,
				cargo_bookmark_seq: null,
				cargo_hs_code: null,
				cargo_pack_qty: null,
				cargo_pack_type: null,
				cargo_total_volume: null,
				cargo_total_weight: null,
				cons_address1: null,
				cons_address2: null,
				cons_address3: null,
				cons_address4: null,
				cons_address5: null,
				cons_name1: null,
				cons_name2: null,
				consignee_bookmark_name: null,
				consignee_bookmark_seq: null,
				goodlist:[],
				hbl_yn: null,
				line_address1: null,
				line_address2: null,
				line_address3: null,
				line_address4: null,
				line_address5: null,
				line_bookmark_name: null,
				line_bookmark_seq: null,
				line_name1: null,
				line_name2: null,
				line_payment_type: null,
				line_user_dept: null,
				line_user_email: null,
				line_user_name: null,
				line_user_tel: null,
				marklist: [],
				noti_address1: null,
				noti_address2: null,
				noti_address3: null,
				noti_address4: null,
				noti_address5: null,
				noti_name1: null,
				noti_name2: null,
				sc_no: null,
				sch_barge_onboard_date: null,
				sch_bl_issue_name: null,
				sch_fdp: null,
				sch_fdp_name: null,
				sch_feeder_vessel_name: null,
				sch_feeder_vessel_voyage: null,
				sch_pld: null,
				sch_pld_name: null,
				sch_pod: null,
				sch_pod_name: null,
				sch_pol: null,
				sch_pol_name: null,
				sch_por: null,
				sch_por_name: null,
				sch_vessel_name: null,
				sch_vessel_voyage: null,
				notify_bookmark_name: null,
				notify_bookmark_seq:null,
				other_bookmark_name:null,
				other_bookmark_seq:null,
				schedule_bookmark_name:null,
				schedule_bookmark_seq:null,
				shipper_bookmark_name:null,
				shipper_bookmark_seq:null,
				shp_address1:null,
				shp_address2:null,
				shp_address3:null,
				shp_address4:null,
				shp_address5:null,
				shp_name1:null,
				shp_name2:null,
				trans_service_code:null,
				sr_amount:null,
				sch_eta: null,
				sch_vessel_code:null,
				sch_line_code:null,
				po_no:null,
				part_sr_qty:null,
				org_bl_need_yn:null,
				mark_yn:null,
				mark_desc:null,
				invoice_no: null,
				label: null,
				lc_expiry_date: null,
				lc_no: null,
				lc_yn: null,
				cargo_attached_yn: null,
				cargo_class: null,
				cargo_coastal_yn: null,
				cargo_frozen_temp: null,
				cargo_frozen_temp_unit: null,
				cargo_handling_code: null,
				cargo_handling_frozen: null,
				cargo_item_hs_code: null,
				cargo_temp: null,
				cargo_temp_unit: null,
				cargo_weight: null,
				document_no: null,
				goods_desc: null,
				goods_yn: null,
				c_cons_user_name:null,
				c_cons_user_tel:null,
				c_cons_country_code:null,
				c_cons_code:null,
				c_noti_user_name:null,
				c_noti_user_tel:null,
				c_noti_country_code:null,
				c_noti_code:null,
				c_shp_user_name:null,
				c_shp_user_tel:null,
				c_shp_country_code:null,
				c_shp_code:null,
				sch_bl_issue_name:null,
			});
		}
	}

	
	return (
		<Card className={classes.sr_title}>
			{progress}
			<GridContainer justify="space-between">
				<GridItem lg={6} md={6} sm={7} xs={12}>
					<GridContainer>
						<GridItem lg={6} md={6} sm={6} xs={12}>
							{!store.sr.sr_random?
							<CustomInput
								labelText="S/R Number *"
								id="sr_number_input"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'13px',marginBottom:'0'}
								}}
								labelProps={{style:{top:'0'}}}
								inputProps={{
									value:srNumber?srNumber:'',
									disabled:false,
									endAdornment:
										<InputAdornment position="end">
											<Button color="info" size="sm" onClick={()=>onCheckSR()}>중복확인</Button>
										</InputAdornment>,
									onChange: event => setSrNumber(event.target.value)
								}}
							/>:
							<CustomInput
								labelText="S/R Number *"
								id="sr_number_auto"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'13px',marginBottom:'0'}
								}}
								labelProps={{style:{top:'0'}}}
								inputProps={{
									value:store.sr.sr_no?store.sr.sr_no:'',
									disabled:true
								}}
							/>}
							<FormControlLabel
								control={
									<Switch
										checked={store.sr.sr_random?true:false}
										onChange={event => store.setSr({sr_random:event.target.checked})} //props.onChange(event.target.checked)}
										value="checkedA"
										classes={{
										switchBase: classes.switchBase,
										checked: classes.switchChecked,
										thumb: classes.switchIcon,
										track: classes.switchBar
										}}
									/>
								}
								classes={{label: classes.label}}
								style={{marginLeft:'0',height:'28px'}}
								label="Auto Sr Number"
							/>
						</GridItem>
						<GridItem lg={4} md={4} sm={4} xs={12}>
							<FormControl fullWidth style={{marginBottom:'10px'}}>
								<CalendarBox
									labelText ="S/R Date"
									id="sr_date"
									format="yyyy-MM-dd"
									setValue={store.sr.sr_date?moment(store.sr.sr_date).format('YYYY-MM-DD'):new Date()}
									autoOk
									disabled={true}
									formControlProps={{fullWidth: true}} 
								/>
							</FormControl>
						</GridItem>
						{(store.sr.status_cus_kr && store.sr.status_cus_kr !== 'ERROR') &&
						<GridItem lg={2} md={2} sm={2} xs={12}>
							<CustomInput
								labelText="Status"
								id="status"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'13px',marginBottom:'10px'}
								}}
								labelProps={{style:{top:'0'}}}
								inputProps={{
									value:store.sr.status_cus_kr?store.sr.status_cus_kr:'',
									disabled:true
								}}
							/>
						</GridItem>}
					</GridContainer>
				</GridItem>	 
				<GridItem lg={4} md={6} sm={4} xs={12}>
					<GridContainer>
						<GridItem lg={10} md={10} sm={10} xs={10}>
							<FormControl fullWidth style={{marginBottom:'10px'}}>
								<Autocomplete
									options = {store.sr_bookmark.totalList?store.sr_bookmark.totalList:[]}
									getOptionLabel = { option => option.bookmark_name }
									id="sr_bookmark"
									getOptionSelected={(option, value) => option.bookmark_name === value.bookmark_name}
									value = {{bookmark_name:store.sr_bookmark.totalList && store.sr_bookmark.totalList.find(v=>v.value === store.sr.bookmark_seq)
										?store.sr_bookmark.totalList.find(v=>v.value === store.sr.bookmark_seq).bookmark_name:''}}
									onChange = {(e, option)=>fncSelectPortCode(option,'bookmark_seq')}
									renderInput={
										params =>(<TextField inputProps={{maxLength:30}} {...params} label="Total Bookmark" fullWidth />)}
									/>
							</FormControl>
						</GridItem>
						<GridItem lg={2} md={2} sm={2} xs={2} style={{marginTop:'10px'}}>
							<IconButton  onClick={()=>{setViewBookmark(<DialogBookmark closeBook={()=>setViewBookmark(null)}  {...props} />);}}>
								<Bookmarks fontSize="default"/>
							</IconButton>
						</GridItem>
					</GridContainer>
				</GridItem>
			</GridContainer>
			{viewBookmark}
		</Card>
	);
} 
//));
//export default observer(HeaderCard);

function areEqual(prevProps,nextProps) {
	return (prevProps.headerProps.sr_no===nextProps.headerProps.sr_no && 
			prevProps.headerProps.sr_random===nextProps.headerProps.sr_random &&
			prevProps.headerProps.sr_date===nextProps.headerProps.sr_date && 
			prevProps.headerProps.status_cus_kr===nextProps.headerProps.status_cus_kr &&
			prevProps.headerProps.bookmark_seq===nextProps.headerProps.bookmark_seq);
}
export default memo(observer(HeaderCard),areEqual);