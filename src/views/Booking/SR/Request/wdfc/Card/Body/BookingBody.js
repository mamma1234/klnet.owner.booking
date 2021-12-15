import React,{ useState, useEffect,memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormHelperText, InputLabel, MenuItem,Select,TextField} from "@material-ui/core";

//import Button from "components/CustomButtons/Button.js";
//import CustomInput from "components/CustomInput/CustomInput.js";
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//import CalendarBox from "components/CustomInput/CustomCalendar.js";
import {Autocomplete} from "@material-ui/lab";
//import moment from 'moment';
//import axios from 'axios';
//import {useStyles} from 'views/Pages/Booking/SR/styles';
//import {observer} from 'mobx-react-lite';

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

//const BookingBody = (props) => { 
//const BookingBody = inject('UserStore')(observer(({ UserStore, ...props }) => { 
//const BookingBody = (observer(({UserStore, ...props}) => {
function BookingBody(props) {	//console.log("bkgProps:",props)
	const store =  useSrStore();
	const classes = styles();
	const {bkgProps,type,confirm} = props;
	const [bookingData,setBookingData] = useState({});
	const blType =[{value:'1',label:'ORIGINAL B/L'},{value:'2',label:'SURRENDER B/L'}];
	const hblYn = [{value:'Y',label:'Y'},{value:'N',label:'N'}];
	const PayType = [{value:'P',label:'PREPAID'},{value:'C',label:'COLLECTED'}];
	useEffect(() => {
		setBookingData(bkgProps);
	}, [bkgProps]);
		    
	useEffect(() => { 
		if('B' === type && props.bodyProps) {
			setBookingData(props.bodyProps);
		}
	}, [props.bodyProps]);		
		
            
	const handleOtherChange = (prop) => (event: React.ChangeEvent<HTMLInputElement>) => { 
		    	
		//store.setSr({...bookingData, [prop]:event.target.value});line_payment_type
		 
		setBookingData({...bookingData, [prop]:event.target.value});
		store.setSr({...bookingData, [prop]:event.target.value});
		    	
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
		}
		
		return returnValue;
	}
		
		    		  
	const onChangeBookingProps = (value)=>{ 
		if(value) {
			var msg = "선택한 부킹 정보로 연계 하시겠습니까?"
			props.alert(mergeConfirmBooking,'Are you sure?','warning',true,true,'lg',msg,true,true,onCancleProps(value));

			function  mergeConfirmBooking() {
				var list ={res_bkg_no:value.res_bkg_no,sc_no:value.sc_no,trans_service_code:value.trans_service_code,
					sch_pol:value.sch_pol,sch_pol_name:value.sch_pol_name,sch_pod:value.sch_pod,sch_pod_name:value.sch_pod_name,
					sch_pld:value.sch_pld,sch_pld_name:value.sch_pld_name,sch_por:value.sch_por,sch_por_name:value.sch_por_name,
					sch_vessel_name:value.sch_vessel_name,sch_vessel_voyage:value.sch_vessel_voyage,sch_fdp:value.sch_fdp,
					sch_fdp_name:value.sch_fdp_name,sch_eta:value.sch_eta,sch_etd:value.sch_etd,shp_name1:value.shp_name1,line_code:value.line_code,
					shp_name2:value.shp_name2,shp_address1:value.shp_address1,shp_address2:value.shp_address2,shp_address3:value.shp_address3,
					shp_address4:value.shp_address4,shp_address5:value.shp_address5,cons_name1:value.cons_name1,cons_name2:value.cons_name2,
					cons_address1:value.cons_address1,cons_address2:value.cons_address2,cons_address3:value.cons_address3,cons_address4:value.cons_address4,
					cons_address5:value.cons_address5,'bk_link':'Y','bkglist':[{value:value.value,res_bkg_no:value.res_bkg_no}]}


				//console.log(">>>props.samec:",props.samec);

				if(store.sr.sameflag) {
					list = {...list,'noti_name1':value.cons_name1,'noti_name2':value.cons_name2,'noti_address1':value.cons_address1,
					'noti_address2':value.cons_address2,'noti_address3':value.cons_address3,
					'noti_address4':value.cons_address4,'noti_address5':value.cons_address5}
				}
				
				//props.mergeBkgProps({...bookingData,...list});
				store.setSr({...bookingData,...list});
			}

			function  onCancleProps () {
				//props.mergeBkgProps({...bookingData,res_bkg_no:value.res_bkg_no,'bk_link':'N','bkglist':[{value:value.value,res_bkg_no:value.res_bkg_no}]});
				store.setSr({...bookingData,res_bkg_no:value.res_bkg_no,'bk_link':'N','bkglist':[{value:value.value,res_bkg_no:value.res_bkg_no}]});
			}
		} else {
			//props.mergeBkgProps({...bookingData,res_bkg_no:'','bk_link':'N','bkglist':[{}]});
			store.setSr({...bookingData,res_bkg_no:'','bk_link':'N','bkglist':[{}]});
		}
	}
						
			  
			
	return (
		<GridItem className={classes.grid} lg={12} md={12} sm={12} xs={12}>
			<GridContainer>
			{type ==="B"?
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={4} md={5} sm={5} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Bookmark Name</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={8} md={7} sm={7} xs={12}>
							<CustomInput
							labelText=""
							id="other_bookmark_name"
							formControlProps={{
								fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
							}}
							inputProps={{
								value:bookingData.other_bookmark_name?bookingData.other_bookmark_name:'',
								onChange: handleOtherChange('other_bookmark_name'),
								onBlur: (e)=>e.target.value?props.mergeBkgProps(bookingData):null,
								style:{height:'30px'}
							}}/>
						</GridItem>
					</GridContainer>
				</GridItem>:
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}> {/*1200px lg 992 md 768 sm xs*/}
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={4} md={5} sm={5} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Booking Number</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={8} md={7} sm={7} xs={12}>
							<Autocomplete
								className={classes.textField}
								options = {store.sr_confirm?store.sr_confirm:[]}
								getOptionLabel = { option => option.sr_status?option.res_bkg_no+" [ SR"+option.sr_status+"]":option.res_bkg_no }
								getOptionSelected = {(option,value) => option.res_bkg_no === value.res_bkg_no}
								noOptionsText = "Not Found Confirm Bookings"
								id="res_bkg_no"
								//value={bookingData.res_bkg_no?bookingData.bkglist[0]:{res_bkg_no:null,value:null}}
								value={{res_bkg_no:bookingData.res_bkg_no?bookingData.res_bkg_no:'',value:bookingData.res_bkg_no?bookingData.res_bkg_no:''}}
								//onChange={(e, selectedOptions)=>{selectedOptions?setBookingData({...bookingData,...selectedOptions}):setBookingData({...bookingData,res_bkg_no:'',value:''}); console.log("select p:",selectedOptions)}}
								onChange={(e,selectedOptions)=>onChangeBookingProps(selectedOptions)}
								//onBlur ={(e)=>e.target.value && (e.target.value !== store.sr.res_bkg_no)?
											//store.setSr({res_bkg_no:e.target.value}):null}
								onBlur ={(e)=>'B'===type?props.mergeBkgProps(bookingData):e.target.value && (e.target.value !== store.sr.res_bkg_no)?store.setSr({res_bkg_no:e.target.value}):null}
								renderInput={
									params =>(<TextField 
												inputProps={{maxLength:30}} {...params} label="" fullWidth 
												error={('B'===type)?false:bookingData.res_bkg_no?false:true}
												helperText={('B'===type)?false:bookingData.res_bkg_no?null:'필수'}
												FormHelperTextProps={{feedid:'booking'}}/>)}/>
						</GridItem>
					</GridContainer>
				</GridItem>}
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={4} md={5} sm={5} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>S/C Number</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={8} md={7} sm={7} xs={12}>
							<CustomInput
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:bookingData.sc_no?bookingData.sc_no:'',	   
									onChange: handleOtherChange('sc_no'),
									onBlur: (e)=>'B'===type?props.mergeBkgProps(bookingData):e.target.value && (e.target.value !== store.sr.sc_no)?store.setSr({sc_no:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={4} md={5} sm={5} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>B/L Type</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={8} md={7} sm={7} xs={12}>
							<Autocomplete
								options = {blType?blType:[]}
								getOptionLabel = { option => option.label?option.label||'':'' }
								getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
								id="bl_type"
								value={{label:blType && blType.find(v=>v.value === bookingData.bl_type)?
											blType.find(v=>v.value === bookingData.bl_type).label:''
									}}
								onChange={(e,option)=>'B'===type?props.mergeBkgProps({...bookingData,bl_type:option?option.value:''}):store.setSr({bl_type:option?option.value:''})}
								renderInput={
								params =>(
									<TextField
										inputProps={{maxLength:30}}
										{...params} label=""
										fullWidth
										required={('B'===type)?false:true}
										error={('B'===type)?false:bookingData.bl_type?false:true}
										helperText={('B'===type)?false:bookingData.bl_type?null:'필수'}/>)}/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={4} md={5} sm={5} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Term</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={8} md={7} sm={7} xs={12}>
							<Autocomplete
								options = {store.sr_term_code?store.sr_term_code:[]}
								getOptionLabel = { option => option.label?option.label||'':'' }
								getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
								id="trans_service_code"
								value={{label:store.sr_term_code && store.sr_term_code.find(v=>v.value === bookingData.trans_service_code)?
										store.sr_term_code.find(v=>v.value === bookingData.trans_service_code).label:''
									}}
								onChange={(e,option)=>'B'===type?props.mergeBkgProps({...bookingData,trans_service_code:option?option.value:''}):
										store.setSr({trans_service_code:option?option.value:'',goods_desc:fnc_transGoods(option?option.value:'',store.sr.goods_desc?store.sr.goods_desc:'')})}
								renderInput={
								params =>(
									<TextField
										inputProps={{maxLength:1}}
										{...params} label=""
										fullWidth
										required={('B'===type)?false:true}
										error={('B'===type)?false:bookingData.trans_service_code?false:true}
										helperText={('B'===type)?false:bookingData.trans_service_code?null:'필수'}/>)}/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={4} md={5} sm={5} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>House B/L</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={8} md={7} sm={7} xs={12}>
							<Autocomplete
								options = {hblYn?hblYn:[]}
								getOptionLabel = { option => option.label?option.label||'':'' }
								getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
								id="hbl_yn"
								value={{label:hblYn && hblYn.find(v=>v.value === bookingData.hbl_yn)?
										hblYn.find(v=>v.value === bookingData.hbl_yn).label:''
									}}
								onChange={(e,option)=>'B'===type?props.mergeBkgProps({...bookingData,hbl_yn:option?option.value:''}):store.setSr({hbl_yn:option?option.value:''})}
								renderInput={
								params =>(
									<TextField
										inputProps={{maxLength:1}}
										{...params} label=""
										fullWidth
										required={('B'===type)?false:true}
										error={('B'===type)?false:bookingData.hbl_yn?false:true}
										helperText={('B'===type)?false:bookingData.hbl_yn?null:'필수'}/>)}/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={4} md={5} sm={5} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Ocean Freight</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={8} md={7} sm={7} xs={12}>
							<Autocomplete
								options = {PayType?PayType:[]}
								getOptionLabel = { option => option.label?option.label||'':'' }
								getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
								id="line_payment_type"
								value={{label:PayType && PayType.find(v=>v.value === bookingData.line_payment_type)?
										PayType.find(v=>v.value === bookingData.line_payment_type).label:''
										}}
								onChange={(e,option)=>'B'===type?props.mergeBkgProps({...bookingData,line_payment_type:option?option.value:''}):store.setSr({line_payment_type:option?option.value:''})}
								renderInput={ params =>(
									<TextField
										inputProps={{maxLength:1}}
										{...params} label=""
										fullWidth
										required={('B'===type)?false:true}
										error={('B'===type)?false:bookingData.line_payment_type?false:true}
										helperText={('B'===type)?false:bookingData.line_payment_type?null:'필수'}/>)}/>
							
						</GridItem>
					</GridContainer>
				</GridItem>
			</GridContainer>
		</GridItem>
	);
}
//));
//export default BookingBody;

export default memo(observer(BookingBody),areEqual);

function areEqual(prevProps,nextProps) {  
	return (prevProps.bkgProps.other_bookmark_name === nextProps.bkgProps.other_bookmark_name
			&& prevProps.bkgProps.other_bookmark_seq === nextProps.bkgProps.other_bookmark_seq
			&& prevProps.bkgProps.sc_no === nextProps.bkgProps.sc_no 
			&& prevProps.bkgProps.bl_type === nextProps.bkgProps.bl_type
			&& prevProps.bkgProps.hbl_yn === nextProps.bkgProps.hbl_yn 
			&& prevProps.bkgProps.trans_service_code === nextProps.bkgProps.trans_service_code
			&& prevProps.bkgProps.line_payment_type === nextProps.bkgProps.line_payment_type
			&& prevProps.bodyProps === nextProps.bodyProps);
}


/*export default React.memo(BookingBody, (prevProps,nextProps) => prevProps.sc_no === nextProps.sc_no 
		&& prevProps.bl_type === nextProps.bl_type
		&& prevProps.hbl_yn === nextProps.hbl_yn 
		&& prevProps.line_payment_type === nextProps.line_payment_type);*/