import React,{ useState, useEffect } from "react";
import {useSrStore}  from 'store/srStore.js';
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel,Divider} from "@material-ui/core";
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//import {useStyles} from 'views/Pages/Booking/SR/styles';
import {observer} from 'mobx-react-lite'; 
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

//const ShipperCBody = (props) => { 
//const ShipperCBody = inject('UserStore')(observer(({ UserStore, ...props }) => { 
//const ShipperCBody = (observer(({UserStore, ...props}) => {
function ShipperCBody(props) {
	const classes = styles();
	const store =  useSrStore();
	const {shpCProps,type} = props; 
	
	const [shpBodyData,setShpBodyData] = useState({'shipper_bookmark_seq':'','shipper_bookmark_name':'','c_shp_code':'','c_shp_name1':'',
		'c_shp_name2':'','c_shp_address1':'','c_shp_address2':'','c_shp_address3':'','c_shp_address4':'','c_shp_address5':'','c_shp_user_name':'',
		'c_shp_user_tel':'','c_shp_user_fax':'','c_shp_user_dep1':'','c_shp_country_code':''});

		
	useEffect(() => { 
		setShpBodyData(shpCProps);
	}, [shpCProps]);
	
	useEffect(() => { 
		if('B' === type && props.bodyProps) {
			setShpBodyData(props.bodyProps);
		}
	}, [props.bodyProps]);
	
	const handleShpChange = (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setShpBodyData({...shpBodyData, [prop]:event.target.value});
		store.setSr({...shpBodyData, [prop]:event.target.value});
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
								feedback="c_shipper"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:shpBodyData.c_shp_name1?shpBodyData.c_shp_name1:'',
									onChange: handleShpChange('c_shp_name1'),
									//onBlur: (e)=>e.target.value?store.setSr(shpBodyData):null,
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_shp_name1)?store.setSr({c_shp_name1:e.target.value}):null,
									style:{height:'30px'}
								}}
							/>
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
								feedback="c_shipper"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:shpBodyData.c_shp_name2?shpBodyData.c_shp_name2:'',
									onChange: handleShpChange('c_shp_name2'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_shp_name2)?store.setSr({c_shp_name2:e.target.value}):null,
									style:{height:'30px'}
								}}
							/>
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
								feedback="c_shipper"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:shpBodyData.c_shp_address1?shpBodyData.c_shp_address1:'',
									onChange: handleShpChange('c_shp_address1'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_shp_address1)?store.setSr({c_shp_address1:e.target.value}):null,
									style:{height:'30px'}
								}}
							/>
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
								feedback="c_shipper"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:shpBodyData.c_shp_address2?shpBodyData.c_shp_address2:'',
									onChange: handleShpChange('c_shp_address2'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_shp_address2)?store.setSr({c_shp_address2:e.target.value}):null,
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
								feedback="c_shipper"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:shpBodyData.c_shp_address3?shpBodyData.c_shp_address3:'',
									onChange: handleShpChange('c_shp_address3'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_shp_address3)?store.setSr({c_shp_address3:e.target.value}):null,
									style:{height:'30px'}
								}}
							/>
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
								feedback="c_shipper"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:shpBodyData.c_shp_address4?shpBodyData.c_shp_address4:'',
									onChange: handleShpChange('c_shp_address4'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_shp_address4)?store.setSr({c_shp_address4:e.target.value}):null,
									style:{height:'30px'}
								}}
							/>
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
								feedback="c_shipper"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:shpBodyData.c_shp_address5?shpBodyData.c_shp_address5:'',
									onChange: handleShpChange('c_shp_address5'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_shp_address5)?store.setSr({c_shp_address5:e.target.value}):null,
									style:{height:'30px'}
								}}
							/>
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
								feedback="c_shipper"
								maxLength="17"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:shpBodyData.c_shp_user_name?shpBodyData.c_shp_user_name:'',
									onChange: handleShpChange('c_shp_user_name'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_shp_user_name)?store.setSr({c_shp_user_name:e.target.value}):null,
									style:{height:'30px'}
								}}
							/>
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
								feedback="c_shipper"
								labelText=""
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:shpBodyData.c_shp_user_tel?shpBodyData.c_shp_user_tel:'',
									onChange: handleShpChange('c_shp_user_tel'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_shp_user_tel)?store.setSr({c_shp_user_tel:e.target.value}):null,
									style:{height:'30px'}
								}}
							/>
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
								feedback="c_shipper"
								maxLength="18"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:shpBodyData.c_shp_code?shpBodyData.c_shp_code:'',
									onChange: handleShpChange('c_shp_code'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_shp_code)?store.setSr({c_shp_code:e.target.value}):null,
									style:{height:'30px'}
								}}
							/>
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
								feedback="c_shipper"
								maxLength="2"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:shpBodyData.c_shp_country_code?shpBodyData.c_shp_country_code:'',
									onChange: handleShpChange('c_shp_country_code'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_shp_country_code)?store.setSr({c_shp_country_code:e.target.value}):null,
									style:{height:'30px'}
								}}
							/>
						</GridItem>
					</GridContainer>
				</GridItem>
			</GridContainer>
		</GridItem>
	);
}
//));

//export default ShipperCBody;

export default React.memo(observer(ShipperCBody),areEqual);

function areEqual(prevProps,nextProps) {
	
	return ( prevProps.shpCProps.c_shp_name1 === nextProps.shpCProps.c_shp_name1
			&& prevProps.shpCProps.c_shp_name2 === nextProps.shpCProps.c_shp_name2
			&& prevProps.shpCProps.c_shp_address1 === nextProps.shpCProps.c_shp_address1
			&& prevProps.shpCProps.c_shp_address2 === nextProps.shpCProps.c_shp_address2
			&& prevProps.shpCProps.c_shp_address3 === nextProps.shpCProps.c_shp_address3
			&& prevProps.shpCProps.c_shp_address4 === nextProps.shpCProps.c_shp_address4
			&& prevProps.shpCProps.c_shp_address5 === nextProps.shpCProps.c_shp_address5
			&& prevProps.shpCProps.c_shp_user_name === nextProps.shpCProps.c_shp_user_name
			&& prevProps.shpCProps.c_shp_user_tel === nextProps.shpCProps.c_shp_user_tel
			&& prevProps.shpCProps.c_shp_code === nextProps.shpCProps.c_shp_code 
			&& prevProps.shpCProps.c_shp_country_code === nextProps.shpCProps.c_shp_country_code
			&& prevProps.bodyProps === nextProps.bodyProps);}