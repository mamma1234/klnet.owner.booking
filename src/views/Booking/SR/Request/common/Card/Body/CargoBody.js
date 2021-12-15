import React,{ memo,useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputAdornment,FormHelperText,FormControl, InputLabel, Collapse, Divider,MenuItem,Select,TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
//import Button from "components/CustomButtons/Button.js";
//import CustomInput from "components/CustomInput/CustomInput.js";
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//import CalendarBox from "components/CustomInput/CustomCalendar.js";
//import {Autocomplete} from "@material-ui/lab";
//import moment from 'moment';
import axios from 'axios';
import CustomOutInput from "components/CustomInput/CustomOutInput.js"; 
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
		    backgroundColor:'#00acc1'
		  },
		  
	}));

//const CargoBody = (props) => { 
//const CargoBody = inject('UserStore')(observer(({ UserStore, ...props }) => {
//const CargoBody = (observer(({UserStore, ...props}) => {
function CargoBody(props) {
	const store =  useSrStore();	 
	const classes = styles();
	const {cargoProps,bookmark,type,packCode} = props; 
	const [open,setOpen] = React.useState(false);
	const [cargoData,setCargoData] = useState([]);
			  
	useEffect(() => {
		//if(cargoProps){ 
			setCargoData(cargoProps);
		//	if(bodyProps.mark_yn === 'Y' || bodyProps.goods_yn === 'Y'){
				//if(!open){
				//	setOpen(true); 
			//	}
			//} else {setOpen(false)}
		//}
		}, [cargoProps]);
	
	useEffect(() => { 
		if('B' === type && props.bodyProps) { 
			setCargoData(props.bodyProps);
			if((props.bodyProps && props.bodyProps.cargo_mark_bookmark_seq) || (props.bodyProps && props.bodyProps.cargo_goods_bookmark_seq)) {
				setOpen(true);
			}	
		}
	}, [props.bodyProps]);
		    
		   		    
	const handleCargoChange = (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setCargoData({...cargoData, [prop]:event.target.value});
		store.setSr({...cargoData, [prop]:event.target.value})
	}
	
	const getByte =(text)=>{
		return text.split('').map(s=>s.charCodeAt(0)).reduce((prev,c) => (prev +((c === 10)?2:((c>>7)?2:1))),0);
	}
	
	const textareaLimit = (prop,length) => (event: React.ChangeEvent<HTMLInputElement>) =>{
		let lines = event.target.value.split('\n');
		for(let i=0;i<lines.length;i++) {
			if( getByte(lines[i]) <= length)  continue;

			let j=0;
			const lineLen = lines[i].length;
			let space = lineLen;
			while(j++ <= lineLen) {
				var lengthData= lines[i].substring(0,j);
				if(getByte(lengthData) <= length) {
					space = lengthData.length;
				}
			}

			lines[i+1] = lines[i].substring(space+1) + (lines[i+1] || "");
			lines[i]=lines[i].substring(0,space);
		}
		setCargoData({...cargoData, [prop]:lines.join('\n')});
	}
	const onChangeMark =(value)=> {
		setOpen(true);
		axios.post("/shipper/getUserMarkBookmark",{user_no:store.sr.user_no?store.sr.user_no:'',seq:value},{}).then(res =>{
			props.mergeProps({...cargoData,mark_yn:'Y', ...res.data[0]});
		});
	}
	
	const onChangeStoreMark =(value)=> {
		axios.post("/shipper/getUserMarkBookmark",{user_no:store.sr.user_no?store.sr.user_no:'',seq:value},{}).then(res => {
			store.setSr({...res.data[0]});
		});
	}
	
	
	const onChangeGoods =(value)=> {
		setOpen(true);
		axios.post("/shipper/getUserGoodsBookmark",{user_no:store.sr.user_no?store.sr.user_no:'',seq:value},{}).then(res => {
			props.mergeProps({...cargoData,goods_yn:'Y', ...res.data[0]})
		});
	}
	
	const onChangeStoreGoods =(value)=> {
		axios.post("/shipper/getUserGoodsBookmark",{user_no:store.sr.user_no?store.sr.user_no:'',seq:value},{}).then(res => {
			store.setSr({...res.data[0]})
		});
	}
	
	
	return (
		<GridItem  lg={12} md={12} sm={12} xs={12}>
			<GridContainer>
			{(type==="B") &&
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={5} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Bookmark Name</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={7} md={9} sm={9} xs={12}>
							<CustomInput
								required={true}
								feedback={type==="B"?"cargo_b":"cargo"}
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:cargoData.cargo_bookmark_name?cargoData.cargo_bookmark_name:'',
									onChange: handleCargoChange('cargo_bookmark_name'),
									onBlur: (e)=>e.target.value?props.mergeProps(cargoData):null,
									style:{height:'30px'}
								}}
							/>
						</GridItem>
					</GridContainer>
				</GridItem>}
				<GridItem className={classes.grid} lg={2} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={5} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>HS CODE</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={7} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={type==="B"?false:true}
								feedback="cargo"
								maxLength="6"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:cargoData.cargo_hs_code?cargoData.cargo_hs_code:'',
									onChange: handleCargoChange('cargo_hs_code'),
									// onBlur: (e)=>e.target.value?'B'===type?props.mergeProps(cargoData):store.setSr(cargoData):null,
									onBlur: (e)=>'B'===type?props.mergeProps(cargoData):e.target.value && (e.target.value !== store.sr.cargo_hs_code)?store.setSr({cargo_hs_code:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Package</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<GridContainer>
								<GridItem className={classes.grid} lg={8} md={9} sm={9} xs={12}>
									<Autocomplete
										options = {store.sr_pack_code?store.sr_pack_code:[]}
										//getOptionLabel = { option => option.label?option.label||'':'' }
										getOptionLabel = { option => option.label?option.label+'['+store.sr_pack_code.find(v=>v.label === option.label).value+']'||'':'' }
										getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
										id="cargo_pack_type"
										value={{label:store.sr_pack_code && store.sr_pack_code.find(v=>v.value === cargoData.cargo_pack_type)?
												store.sr_pack_code.find(v=>v.value === cargoData.cargo_pack_type).label:''
											}}
										onChange ={(e,option)=>'B'===type?props.mergeProps({...cargoData,cargo_pack_type:option?option.value:''}):
											store.setSr({cargo_pack_type:option?option.value:''})}
										renderInput={
										params =>(
											<TextField
												{...params} label=""
												fullWidth
												required={('B'===type)?false:true}
												error={('B'===type)?false:cargoData.cargo_pack_type?false:true}
												helperText={('B'===type)?false:cargoData.cargo_pack_type?null:'필수'}
											/>
										)}
									/>
								</GridItem>
								<GridItem className={classes.grid} lg={4} md={9} sm={9} xs={12}>
									<CustomInput
										validtype="number"
										required={type==="B"?false:true}
										feedback="cargo"
										labelText=""
										maxLength="18"
										formControlProps={{
											fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
										}}
										inputProps={{
											value:cargoData.cargo_pack_qty?cargoData.cargo_pack_qty:'',
											onChange: handleCargoChange('cargo_pack_qty'),
											//onBlur: (e)=>e.target.value?'B'===type?props.mergeProps(cargoData):store.setSr(cargoData):null,
											onBlur: (e)=>'B'===type?props.mergeProps(cargoData):e.target.value && (e.target.value !== store.sr.cargo_pack_qty)?store.setSr({cargo_pack_qty:e.target.value}):null,
											style:{height:'30px'}
										}}
									/>
								</GridItem>
							</GridContainer>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Weight</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="number"
								required={type==="B"?false:true}
								feedback="cargo"
								labelText=""
								maxLength="18"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:cargoData.cargo_total_weight?cargoData.cargo_total_weight:'',
									endAdornment:<InputAdornment position="end">Kg</InputAdornment>,
									onChange: handleCargoChange('cargo_total_weight'),
									//onBlur: (e)=>e.target.value?'B'===type?props.mergeProps(cargoData):store.setSr(cargoData):null,
									onBlur: (e)=>'B'===type?props.mergeProps(cargoData):e.target.value && (e.target.value !== store.sr.cargo_total_weight)?store.setSr({cargo_total_weight:e.target.value}):null,
									style:{height:'30px'}
								}}
							/>
						</GridItem>
					</GridContainer>
				</GridItem> 
				<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Volume</InputLabel>
						</GridItem>
						<GridItem  className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="number"
								required={type==="B"?false:true}
								feedback="cargo"
								maxLength="18"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:cargoData.cargo_total_volume?cargoData.cargo_total_volume:'',
									endAdornment:<InputAdornment position="end">CBM</InputAdornment>,
									onChange: handleCargoChange('cargo_total_volume'),
									//onBlur: (e)=>e.target.value?'B'===type?props.mergeProps(cargoData):store.setSr(cargoData):null,
									onBlur: (e)=>'B'===type?props.mergeProps(cargoData):e.target.value && (e.target.value !== store.sr.cargo_total_volume)?store.setSr({cargo_total_volume:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
			</GridContainer>
			{type ==="B"?
			<>
			<GridContainer>
				<GridItem className={classes.grid} lg={12} md={12} sm={12} xs={12}>
					<InputLabel style={{ color: "#AAAAAA",marginTop:'15px' }}>Bookmark Link</InputLabel>
				</GridItem>
				<GridItem className={classes.grid} lg={12} md={12} sm={12} xs={12}>
					<Divider className={classes.divider} style={{marginTop:'0',marginBottom:'5px'}}/>
				</GridItem>
			</GridContainer>
			<GridContainer justify="space-between">
				<GridItem className={classes.grid} lg={6} md={6} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={4} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Mark</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={8} sm={9} xs={12}>
							<Autocomplete
								options = {store.sr_bookmark.markList?store.sr_bookmark.markList:[]}
								getOptionLabel = { option => option.cargo_mark_bookmark_name }
								id="cargo_bookmark"
								noOptionsText="Bookmark 등록하세요."
								getOptionSelected={(option, value) => option.cargo_bookmark_name === value.cargo_bookmark_name}
								value = {{cargo_mark_bookmark_name:store.sr_bookmark.markList && store.sr_bookmark.markList.find(v=>v.value === cargoData.cargo_mark_bookmark_seq)
										?store.sr_bookmark.markList.find(v=>v.value === cargoData.cargo_mark_bookmark_seq).cargo_mark_bookmark_name:''}}
								onChange = {(e, option)=>onChangeMark(option?option.cargo_mark_bookmark_seq:'')}
								renderInput={
									params =>(<TextField inputProps={{maxLength:30}} {...params} label="mark bookmark"  fullWidth />)}
							/>
						</GridItem>
						<GridItem className={classes.gridLabel} lg={12} md={12} sm={12} xs={12} style={{marginTop:'0'}}>
							<Collapse in={open}>
								<CustomOutInput
									labelText=""
									id="mark"
									formControlProps={{
										fullWidth: true
									}}
									inputProps={{
										multiline: true,disabled:true,
										rows: 5,
										value:cargoData.mark_desc?cargoData.mark_desc:''
									}}
									/>
							</Collapse>
						</GridItem>
					</GridContainer>
				</GridItem> 
				<GridItem className={classes.grid} lg={6} md={6} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={4} md={4} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Cargo & Description</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={8} md={8} sm={9} xs={12}>
							<Autocomplete
								options = {store.sr_bookmark.goodsList?store.sr_bookmark.goodsList:[]}
								getOptionLabel = { option => option.cargo_goods_bookmark_name }
								id="cargo_bookmark"
								noOptionsText="Bookmark 등록하세요."
								getOptionSelected={(option, value) => option.cargo_goods_bookmark_name === value.cargo_goods_bookmark_name}
								value = {{cargo_goods_bookmark_name:store.sr_bookmark.goodsList && store.sr_bookmark.goodsList.find(v=>v.value === cargoData.cargo_goods_bookmark_seq)
										?store.sr_bookmark.goodsList.find(v=>v.value === cargoData.cargo_goods_bookmark_seq).cargo_goods_bookmark_name:''}}
								onChange = {(e, option)=>onChangeGoods(option?option.cargo_goods_bookmark_seq:'')}
								renderInput={
									params =>(<TextField inputProps={{maxLength:30}} {...params} label="discription bookmark"  fullWidth />)}
								/>  
						</GridItem>
						<GridItem className={classes.gridLabel} lg={12} md={12} sm={12} xs={12} style={{marginTop:'0'}}>
							<Collapse in={open}>
								<CustomOutInput
									id="goods_desc"
									formControlProps={{
										fullWidth: true
									}}
									inputProps={{
										multiline: true,disabled:true,
										rows: 5,
										value:cargoData.goods_desc?cargoData.goods_desc:''
									}}/>
							</Collapse>
						</GridItem>
					</GridContainer>
				</GridItem>
			</GridContainer>
			</>:
			<GridContainer>
				<GridItem className={classes.grid} lg={5} md={4} sm={6} xs={12}>
					<GridContainer style={{marginBottom:'6px'}}>
						<GridItem className={classes.grid} lg={4} md={4} sm={4} xs={4} style={{marginTop:'26px'}}>
							<InputLabel style={{ color: "#AAAAAA" }}>Mark</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={7} md={7} sm={7} xs={7}>
							<Autocomplete
								options = {store.sr_bookmark.markList?store.sr_bookmark.markList:[]}
								getOptionLabel = { option => option.cargo_mark_bookmark_name }
								id="cargo_bookmark"
								noOptionsText="Bookmark 등록하세요."
								getOptionSelected={(option, value) => option.cargo_bookmark_name === value.cargo_bookmark_name}
								value = {{cargo_mark_bookmark_name:store.sr_bookmark.markList && store.sr_bookmark.markList.find(v=>v.value === store.sr.cargo_mark_bookmark_seq)
										?store.sr_bookmark.markList.find(v=>v.value === store.sr.cargo_mark_bookmark_seq).cargo_mark_bookmark_name:''}}
								onChange = {(e, option)=>onChangeStoreMark(option?option.cargo_mark_bookmark_seq:'')}
								renderInput={
									params =>(<TextField inputProps={{maxLength:30}} {...params} label="mark bookmark"  fullWidth />)}/>
						</GridItem>
					</GridContainer>
					
					<CustomOutInput
						labelText=""
						id="mark"
						formControlProps={{
							fullWidth: true
						}}
						inputProps={{
							multiline: true,
							rows: 5,
							value:cargoData.mark_desc?cargoData.mark_desc:'',
							onChange: textareaLimit('mark_desc',35),	  
							//onBlur: (e)=>e.target.value?'B'===type?props.mergeProps(cargoData):store.setSr(cargoData):null
							onBlur: (e)=>e.target.value && (e.target.value !== store.sr.mark_desc)?store.setSr({mark_desc:e.target.value}):null,
						}}
					/>
					<InputLabel style={{ color: "#AAAAAA" }}>
						line:{cargoData.mark_desc?cargoData.mark_desc.split("\n").length:0} {' / '}
						byte:{getByte(cargoData.mark_desc?cargoData.mark_desc.split("\n")[cargoData.mark_desc?cargoData.mark_desc.split("\n").length-1:0]:'')}
					</InputLabel>
				</GridItem>
				<GridItem className={classes.grid} lg={7} md={7} sm={7} xs={12}>
					<GridContainer style={{marginBottom:'6px'}}>
						<GridItem className={classes.grid} lg={4} md={4} sm={4} xs={4} style={{marginTop:'26px'}}>
							<InputLabel style={{ color: "#AAAAAA" }}>Cargo & Description</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={7} md={7} sm={7} xs={7}>
							<Autocomplete
								options = {store.sr_bookmark.goodsList?store.sr_bookmark.goodsList:[]}
								getOptionLabel = { option => option.cargo_goods_bookmark_name }
								id="cargo_bookmark"
								noOptionsText="Bookmark 등록하세요."
								getOptionSelected={(option, value) => option.cargo_goods_bookmark_name === value.cargo_goods_bookmark_name}
								value = {{cargo_goods_bookmark_name:store.sr_bookmark.goodsList && store.sr_bookmark.goodsList.find(v=>v.value === store.sr.cargo_goods_bookmark_seq)
										?store.sr_bookmark.goodsList.find(v=>v.value === store.sr.cargo_goods_bookmark_seq).cargo_goods_bookmark_name:''}}
								onChange = {(e, option)=>onChangeStoreGoods(option?option.cargo_goods_bookmark_seq:'')}
								renderInput={
									params =>(<TextField inputProps={{maxLength:30}} {...params} label="discription bookmark"  fullWidth />)}
							/> 
						</GridItem>
					</GridContainer>
					<CustomOutInput
						id="goods"
						formControlProps={{
							fullWidth: true,variant:'outlined',
						}}
						FormHelperTextProps={{feedid:'cargo'}}
						error={('B'!==type) && !cargoData.goods_desc?true:false}
						success={('B'!==type) && cargoData.goods_desc?true:false}
						helperText={('B'===type)?false:cargoData.goods_desc?null:'필수'}
						inputProps={{
							multiline: true,
							rows: 5,
							value:cargoData.goods_desc?cargoData.goods_desc:'',
							onChange: textareaLimit('goods_desc',80),
							//onBlur: (e)=>e.target.value?'B'===type?props.mergeProps(cargoData):store.setSr(cargoData):null	
							onBlur: (e)=>e.target.value && (e.target.value !== store.sr.goods_desc)?store.setSr({goods_desc:e.target.value}):null,	  
						}}
					/>
					<InputLabel style={{ color: "#AAAAAA" }}>
						line:{cargoData.goods_desc?cargoData.goods_desc.split("\n").length:0} {' / '}
						byte:{getByte(cargoData.goods_desc?cargoData.goods_desc.split("\n")[cargoData.goods_desc?cargoData.goods_desc.split("\n").length-1:0]:'')}
					</InputLabel>
				</GridItem>
			</GridContainer>}
		</GridItem>
	);
}
//));

//export default CargoBody;

export default memo(observer(CargoBody),areEqual);

function areEqual(prevProps,nextProps) {
	
	return (  'B'===nextProps.type?(prevProps.bodyProps ===  nextProps.bodyProps):
			(prevProps.cargoProps.cargo_mark_bookmark_seq === nextProps.cargoProps.cargo_mark_bookmark_seq &&
			prevProps.cargoProps.cargo_goods_bookmark_seq === nextProps.cargoProps.cargo_goods_bookmark_seq &&
			prevProps.cargoProps.cargo_hs_code === nextProps.cargoProps.cargo_hs_code &&
			prevProps.cargoProps.cargo_pack_type === nextProps.cargoProps.cargo_pack_type &&
			prevProps.cargoProps.cargo_pack_qty === nextProps.cargoProps.cargo_pack_qty &&
			prevProps.cargoProps.cargo_total_weight === nextProps.cargoProps.cargo_total_weight &&
			prevProps.cargoProps.cargo_total_volume === nextProps.cargoProps.cargo_total_volume &&
			prevProps.cargoProps.mark_desc === nextProps.cargoProps.mark_desc  &&
			prevProps.cargoProps.goods_desc === nextProps.cargoProps.goods_desc));
}
/*
export default React.memo(CargoBody, (prevProps,nextProps) => 
prevProps.cargo_bookmark_name === nextProps.cargo_bookmark_name
&& prevProps.cargo_hs_code === nextProps.cargo_hs_code
&& prevProps.cargo_pack_type === nextProps.cargo_pack_type
&& prevProps.cargo_pack_qty === nextProps.cargo_pack_qty
&& prevProps.cargo_total_volume === nextProps.cargo_total_volume
&& prevProps.cargo_total_weight === nextProps.cargo_total_weight
&& prevProps.cargo_mark_bookmark_seq === nextProps.cargo_mark_bookmark_seq
&& prevProps.cargo_goods_bookmark_seq === nextProps.cargo_goods_bookmark_seq
&& prevProps.mark_desc === nextProps.mark_desc 
&& prevProps.goods_desc === nextProps.goods_desc);*/