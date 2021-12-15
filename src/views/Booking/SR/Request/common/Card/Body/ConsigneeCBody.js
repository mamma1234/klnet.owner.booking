import React,{ useState, useEffect } from "react";
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

//const ConsigneeCBody=(props)=> { 
//const ConsigneeCBody = inject('UserStore')(observer(({ UserStore, ...props }) => {
//const ConsigneeCBody = (observer(({UserStore, ...props}) => {
function ConsigneeCBody(props) {

	const classes = styles();
	const store =  useSrStore();
	const {consCProps,type} = props; 
	
	const [consigneeData,setConsigneeData] = useState({'consignee_bookmark_seq':'','consignee_bookmark_name':'','c_cons_code':'','c_cons_name1':'',
		'c_cons_name2':'','c_cons_address1':'','c_cons_address2':'','c_cons_address3':'','c_cons_address4':'','c_cons_address5':'','c_cons_user_name':'',
		'c_cons_user_tel':'','c_cons_user_fax':'','c_cons_user_dep1':'','c_cons_user_email':''});

		
	useEffect(() => {
		setConsigneeData(consCProps);
	}, [consCProps]);
	
	useEffect(() => { 
		if('B' === type && props.bodyProps) {
			setConsigneeData(props.bodyProps);
		}
	}, [props.bodyProps]);
	
	const handleConsChange = (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setConsigneeData({...consigneeData, [prop]:event.target.value});
		store.setSr({...consigneeData, [prop]:event.target.value})
	}
	
	return (
		<GridItem className={classes.grid} lg={12} md={12} sm={12} xs={12}>
			<GridContainer>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>상호1</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="c_consignee"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.c_cons_name1?consigneeData.c_cons_name1:'',
									onChange: handleConsChange('c_cons_name1'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_cons_name1)?store.setSr({c_cons_name1:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>상호2</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="c_consignee"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.c_cons_name2?consigneeData.c_cons_name2:'',
									onChange: handleConsChange('c_cons_name2'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_cons_name2)?store.setSr({c_cons_name2:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>주소1</InputLabel>
						</GridItem>
						<GridItem  className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="c_consignee"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.c_cons_address1?consigneeData.c_cons_address1:'',
									onChange: handleConsChange('c_cons_address1'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_cons_address1)?store.setSr({c_cons_address1:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem> 
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>주소2</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="c_consignee"
								maxLength="35"
							formControlProps={{
								fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
							}}
							inputProps={{
								value:consigneeData.c_cons_address2?consigneeData.c_cons_address2:'',
								onChange: handleConsChange('c_cons_address2'),
								onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_cons_address2)?store.setSr({c_cons_address2:e.target.value}):null,
								style:{height:'30px'}
							}}
						/>
						</GridItem>
					</GridContainer>
				</GridItem> 
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>주소3</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="c_consignee"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.c_cons_address3?consigneeData.c_cons_address3:'',
									onChange: handleConsChange('c_cons_address3'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_cons_address3)?store.setSr({c_cons_address3:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>주소4</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="c_consignee"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.c_cons_address4?consigneeData.c_cons_address4:'',
									onChange: handleConsChange('c_cons_address4'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_cons_address4)?store.setSr({c_cons_address4:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>주소5</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="c_consignee"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.c_cons_address5?consigneeData.c_cons_address5:'',
									onChange: handleConsChange('c_cons_address5'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_cons_address5)?store.setSr({c_cons_address5:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
			</GridContainer>
			<Divider className={classes.divider}/>
			<GridContainer>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>담당자명</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="c_consignee"
								maxLength="17"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.c_cons_user_name?consigneeData.c_cons_user_name:'',
									onChange: handleConsChange('c_cons_user_name'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_cons_user_name)?store.setSr({c_cons_user_name:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>연락처</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="c_consignee"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.c_cons_user_tel?consigneeData.c_cons_user_tel:'',
									onChange: handleConsChange('c_cons_user_tel'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_cons_user_tel)?store.setSr({c_cons_user_tel:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>사업자코드</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="c_consignee"
								maxLength="18"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.c_cons_code?consigneeData.c_cons_code:'',
									onChange: handleConsChange('c_cons_code'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_cons_code)?store.setSr({c_cons_code:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
							<InputLabel style={{ color: "#AAAAAA" }}>국가코드</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
								validtype="text"
								required={false}
								feedback="c_consignee"
								maxLength="2"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:consigneeData.c_cons_country_code?consigneeData.c_cons_country_code:'',
									onChange: handleConsChange('c_cons_country_code'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_cons_country_code)?store.setSr({c_cons_country_code:e.target.value}):null,
									style:{height:'30px'}
								}}/>
						</GridItem>
					</GridContainer>
				</GridItem>
			</GridContainer>
		</GridItem>
	);
}
//));
//export default ConsigneeCBody;
export default React.memo(observer(ConsigneeCBody),areEqual);

function areEqual(prevProps,nextProps) {
	return (  
			prevProps.consCProps.c_cons_name1 === nextProps.consCProps.c_cons_name1 &&
			prevProps.consCProps.c_cons_name2 === nextProps.consCProps.c_cons_name2 &&
			prevProps.consCProps.c_cons_address1 === nextProps.consCProps.c_cons_address1 &&
			prevProps.consCProps.c_cons_address2 === nextProps.consCProps.c_cons_address2 &&
			prevProps.consCProps.c_cons_address3 === nextProps.consCProps.c_cons_address3 &&
			prevProps.consCProps.c_cons_address4 === nextProps.consCProps.c_cons_address4 &&
			prevProps.consCProps.c_cons_address5 === nextProps.consCProps.c_cons_address5 &&
			prevProps.consCProps.c_cons_user_name === nextProps.consCProps.c_cons_user_name &&
			prevProps.consCProps.c_cons_user_tel === nextProps.consCProps.c_cons_user_tel &&
			prevProps.consCProps.c_cons_code === nextProps.consCProps.c_cons_code  &&
			prevProps.consCProps.c_cons_country_code === nextProps.consCProps.c_cons_country_code
			&& prevProps.bodyProps === nextProps.bodyProps);}