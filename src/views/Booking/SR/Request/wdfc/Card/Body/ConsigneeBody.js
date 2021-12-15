import React,{ useState, useEffect, memo } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { InputLabel,Divider} from "@material-ui/core";
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//import {useStyles} from 'views/Pages/Booking/SR/styles';
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

//const ConsigneeBod=(props)=> { 
//const ConsigneeBody = inject('UserStore')(observer(({ UserStore, ...props }) => {	
//const ConsigneeBody = (observer(({UserStore, ...props}) => {
function ConsigneeBody(props) {

	const classes = styles();
	const store =  useSrStore();
	const {consProps,type} = props;
	
	const [consigneeData,setConsigneeData] = useState({'consignee_bookmark_seq':'','consignee_bookmark_name':'','cons_code':'','cons_name1':'',
		'cons_name2':'','cons_address1':'','cons_address2':'','cons_address3':'','cons_address4':'','cons_address5':'','cons_user_name':'',
		'cons_user_tel':'','cons_user_fax':'','cons_user_dep1':'','cons_user_email':''});

		useEffect(() => {
			setConsigneeData(consProps);
		}, [consProps]);
		
		useEffect(() => { 
			if(('B' === type ||  'C' === type) && props.bodyProps) {
				setConsigneeData(props.bodyProps);
			}
		}, [props.bodyProps]);
		
	const handleConsChange = (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setConsigneeData({...consigneeData, [prop]:event.target.value});
		store.setSr({...consigneeData, [prop]:event.target.value});
	}
	
	return (
		<GridItem className={classes.grid} lg={12} md={12} sm={12} xs={12}>
			<GridContainer>
			{(type ==="B")&&
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Bookmark Name</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={type ==="B"?true:false}
								feedback={type==="B"?"consignee_b":"consignee"}
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.consignee_bookmark_name?consigneeData.consignee_bookmark_name:'',
									onChange: handleConsChange('consignee_bookmark_name'),
									onBlur: (e)=>e.target.value?props.mergeConsProps(consigneeData):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>}
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Name1</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={type ==="B"?false:true}
								feedback="consignee"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.cons_name1?consigneeData.cons_name1:'',
									onChange: handleConsChange('cons_name1'),
									onBlur: (e)=>('B'===type || 'C'===type)?props.mergeConsProps(consigneeData):e.target.value && (e.target.value !== store.sr.cons_name1)?store.setSr({cons_name1:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Name2</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="consignee"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.cons_name2?consigneeData.cons_name2:'',
									onChange: handleConsChange('cons_name2'),
									onBlur: (e)=>('B'===type || 'C'===type)?props.mergeConsProps(consigneeData):e.target.value && (e.target.value !== store.sr.cons_name2)?store.setSr({cons_name2:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Address1</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={type ==="B"?false:true}
								feedback="consignee"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.cons_address1?consigneeData.cons_address1:'',
									onChange: handleConsChange('cons_address1'),
									onBlur: (e)=>('B'===type || 'C'===type)?props.mergeConsProps(consigneeData):e.target.value && (e.target.value !== store.sr.cons_address1)?store.setSr({cons_address1:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem> 
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Address2</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="consignee"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.cons_address2?consigneeData.cons_address2:'',
									onChange: handleConsChange('cons_address2'),
									onBlur: (e)=>('B'===type || 'C'===type)?props.mergeConsProps(consigneeData):e.target.value && (e.target.value !== store.sr.cons_address2)?store.setSr({cons_address2:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem> 
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Address3</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="consignee"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.cons_address3?consigneeData.cons_address3:'',
									onChange: handleConsChange('cons_address3'),
									onBlur: (e)=>('B'===type || 'C'===type)?props.mergeConsProps(consigneeData):e.target.value && (e.target.value !== store.sr.cons_address3)?store.setSr({cons_address3:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Address4</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="consignee"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.cons_address4?consigneeData.cons_address4:'',
									onChange: handleConsChange('cons_address4'),
									onBlur: (e)=>('B'===type || 'C'===type)?props.mergeConsProps(consigneeData):e.target.value && (e.target.value !== store.sr.cons_address4)?store.setSr({cons_address4:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Address5</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="consignee"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.cons_address5?consigneeData.cons_address5:'',
									onChange: handleConsChange('cons_address5'),
									onBlur: (e)=>('B'===type || 'C'===type)?props.mergeConsProps(consigneeData):e.target.value && (e.target.value !== store.sr.cons_address5)?store.setSr({cons_address5:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
			</GridContainer>
			{(type ==="C")&&
			<>
			<Divider className={classes.divider}/>
			<GridContainer>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>User Name</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="consignee"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.cons_user_name?consigneeData.cons_user_name:'',
									onChange: handleConsChange('cons_user_name'),
									onBlur: (e)=>('B'===type || 'C'===type)?props.mergeConsProps(consigneeData):e.target.value && (e.target.value !== store.sr.cons_user_name)?store.setSr({cons_user_name:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Tel Number</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="consignee"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.cons_user_tel?consigneeData.cons_user_tel:'',
									onChange: handleConsChange('cons_user_tel'),
									onBlur: (e)=>('B'===type || 'C'===type)?props.mergeConsProps(consigneeData):e.target.value && (e.target.value !== store.sr.cons_user_tel)?store.setSr({cons_user_tel:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Code</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="consignee"
								labelText=""
								maxLength="35"
							formControlProps={{
								fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
							}}
							inputProps={{
								value:consigneeData.cons_code?consigneeData.cons_code:'',
								onChange: handleConsChange('cons_code'),
								onBlur: (e)=>('B'===type || 'C'===type)?props.mergeConsProps(consigneeData):e.target.value && (e.target.value !== store.sr.cons_country_code)?store.setSr({cons_country_code:e.target.value}):null,
								style:{height:'30px'}
							}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>Country</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="consignee"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.cons_country_code?consigneeData.cons_country_code:'',
									onChange: handleConsChange('cons_country_code'),
									onBlur: (e)=>('B'===type || 'C'===type)?props.mergeConsProps(consigneeData):e.target.value && (e.target.value !== store.sr.cons_country_code)?store.setSr({cons_country_code:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
			</GridContainer>
			</>}
		</GridItem>
	);
}
//));
//export default ConsigneeBody;

export default memo(observer(ConsigneeBody),areEqual);

function areEqual(prevProps,nextProps) {
	return (  ('C'=== nextProps.type||'B'=== nextProps.type)?(prevProps.bodyProps === nextProps.bodyProps):(
			prevProps.consProps.consignee_bookmark_name === nextProps.consProps.consignee_bookmark_name &&
			prevProps.consProps.cons_name1 === nextProps.consProps.cons_name1 &&
			prevProps.consProps.cons_name2 === nextProps.consProps.cons_name2 &&
			prevProps.consProps.cons_address1 === nextProps.consProps.cons_address1 &&
			prevProps.consProps.cons_address2 === nextProps.consProps.cons_address2 &&
			prevProps.consProps.cons_address3 === nextProps.consProps.cons_address3 &&
			prevProps.consProps.cons_address4 === nextProps.consProps.cons_address4 &&
			prevProps.consProps.cons_address5 === nextProps.consProps.cons_address5 &&
			prevProps.consProps.cons_user_name === nextProps.consProps.cons_user_name &&
			prevProps.consProps.cons_user_tel === nextProps.consProps.cons_user_tel &&
			prevProps.consProps.cons_code === nextProps.consProps.cons_code  &&
			prevProps.consProps.cons_country_code === nextProps.consProps.cons_country_code));
}
/*export default React.memo(ConsigneeBod, (prevProps,nextProps) =>  
prevProps.consProps.consignee_bookmark_name === nextProps.consProps.consignee_bookmark_name
&& prevProps.consProps.cons_name1 === nextProps.consProps.cons_name1
&& prevProps.consProps.cons_name2 === nextProps.consProps.cons_name2
&& prevProps.consProps.cons_address1 === nextProps.consProps.cons_address1
&& prevProps.consProps.cons_address2 === nextProps.consProps.cons_address2
&& prevProps.consProps.cons_address3 === nextProps.consProps.cons_address3
&& prevProps.consProps.cons_address4 === nextProps.consProps.cons_address4
&& prevProps.consProps.cons_address5 === nextProps.consProps.cons_address5
&& prevProps.consProps.cons_user_name === nextProps.consProps.cons_user_name
&& prevProps.consProps.cons_user_tel === nextProps.consProps.cons_user_tel
&& prevProps.consProps.cons_code === nextProps.consProps.cons_code 
&& prevProps.consProps.cons_country_code === nextProps.consProps.cons_country_code);*/