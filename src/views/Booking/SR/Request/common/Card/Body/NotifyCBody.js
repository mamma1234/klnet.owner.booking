import React,{ useState, useEffect } from "react";
import {useSrStore}  from 'store/srStore.js';
import { makeStyles } from "@material-ui/core/styles";
import {InputLabel,Divider} from "@material-ui/core";
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

//const NotifyCBody = (props) => { 
//const NotifyCBody = inject('UserStore')(observer(({ UserStore, ...props }) => { 
//const NotifyCBody = (observer(({UserStore, ...props}) => {
function NotifyCBody(props) {
	const classes = styles();
	const store =  useSrStore();
	const {notiCProps,type} = props; 
	    	
	const [notiBodyData,setNotiBodyData] = useState({'notify_bookmark_seq':'','notify_bookmark_name':'','c_noti_code':'','c_noti_name1':'',
				'c_noti_name2':'','c_noti_address1':'','c_noti_address2':'','c_noti_address3':'','c_noti_address4':'','c_noti_address5':'','c_noti_user_name':'',
				'c_noti_user_tel':'','c_noti_user_fax':'','c_noti_user_dep1':'','c_noti_user_email':''});

			  
	useEffect(() => { 
		setNotiBodyData(notiCProps);
	}, [notiCProps]);
	
    useEffect(() => { 
    	if('B' === type && props.bodyProps) {
    		setNotiBodyData(props.bodyProps);
    	}
	}, [props.bodyProps]);
		    
	const handleNotiChange = (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setNotiBodyData({...notiBodyData, [prop]:event.target.value});
		store.setSr({...notiBodyData, [prop]:event.target.value});
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
								required={notiBodyData.c_noti_user_tel?true:false}
								feedback="c_notify"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:notiBodyData.c_noti_name1?notiBodyData.c_noti_name1:'',
									onChange: handleNotiChange('c_noti_name1'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_noti_name1)?store.setSr({c_noti_name1:e.target.value}):store.setSr({c_noti_name1:''}),
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
								feedback="c_notify"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:notiBodyData.c_noti_name2?notiBodyData.c_noti_name2:'',
									onChange: handleNotiChange('c_noti_name2'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_noti_name2)?store.setSr({c_noti_name2:e.target.value}):null,
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
								required={notiBodyData.c_noti_user_tel?true:false}
								feedback="c_notify"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:notiBodyData.c_noti_address1?notiBodyData.c_noti_address1:'',
									onChange: handleNotiChange('c_noti_address1'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_noti_address1)?store.setSr({c_noti_address1:e.target.value}):null,
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
								feedback="c_notify"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:notiBodyData.c_noti_address2?notiBodyData.c_noti_address2:'',
									onChange: handleNotiChange('c_noti_address2'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_noti_address2)?store.setSr({c_noti_address2:e.target.value}):null,
									style:{height:'30px'}
								}}/>
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
								feedback="c_notify"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:notiBodyData.c_noti_address3?notiBodyData.c_noti_address3:'',
									onChange: handleNotiChange('c_noti_address3'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_noti_address3)?store.setSr({c_noti_address3:e.target.value}):null,
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
								feedback="c_notify"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:notiBodyData.c_noti_address4?notiBodyData.c_noti_address4:'',
									onChange: handleNotiChange('c_noti_address4'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_noti_address4)?store.setSr({c_noti_address4:e.target.value}):null,
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
								feedback="c_notify"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:notiBodyData.c_noti_address5?notiBodyData.c_noti_address5:'',
									onChange: handleNotiChange('c_noti_address5'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_noti_address5)?store.setSr({c_noti_address5:e.target.value}):null,
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
								required={notiBodyData.c_noti_user_tel?true:false}
								feedback="c_notify"
								maxLength="17"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:notiBodyData.c_noti_user_name?notiBodyData.c_noti_user_name:'',
									onChange: handleNotiChange('c_noti_user_name'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_noti_user_name)?store.setSr({c_noti_user_name:e.target.value}):null,
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
								feedback="c_notify"
								maxLength="35"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:notiBodyData.c_noti_user_tel?notiBodyData.c_noti_user_tel:'',
									onChange: handleNotiChange('c_noti_user_tel'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_noti_user_tel)?store.setSr({c_noti_user_tel:e.target.value}):null,
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
								required={notiBodyData.c_noti_user_tel?true:false}
								feedback="c_notify"
								maxLength="18"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:notiBodyData.c_noti_code?notiBodyData.c_noti_code:'',
									onChange: handleNotiChange('c_noti_code'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_noti_code)?store.setSr({c_noti_code:e.target.value}):null,
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
								required={notiBodyData.c_noti_user_tel?true:false}
								feedback="c_notify"
								maxLength="2"
								formControlProps={{
									fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
								}}
								inputProps={{
									value:notiBodyData.c_noti_country_code?notiBodyData.c_noti_country_code:'',
									onChange: handleNotiChange('c_noti_country_code'),
									onBlur: (e)=>e.target.value && (e.target.value !== store.sr.c_noti_country_code)?store.setSr({c_noti_country_code:e.target.value}):null,
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
//export default NotifyCBody;
export default React.memo(observer(NotifyCBody),areEqual);

function areEqual(prevProps,nextProps) {
	
	return ( 
			prevProps.notiCProps.c_noti_name1 === nextProps.notiCProps.c_noti_name1
			&& prevProps.notiCProps.c_noti_name2 === nextProps.notiCProps.c_noti_name2
			&& prevProps.notiCProps.c_noti_address1 === nextProps.notiCProps.c_noti_address1
			&& prevProps.notiCProps.c_noti_address2 === nextProps.notiCProps.c_noti_address2
			&& prevProps.notiCProps.c_noti_address3 === nextProps.notiCProps.c_noti_address3
			&& prevProps.notiCProps.c_noti_address4 === nextProps.notiCProps.c_noti_address4
			&& prevProps.notiCProps.c_noti_address5 === nextProps.notiCProps.c_noti_address5
			&& prevProps.notiCProps.c_noti_user_name === nextProps.notiCProps.c_noti_user_name
			&& prevProps.notiCProps.c_noti_user_tel === nextProps.notiCProps.c_noti_user_tel
			&& prevProps.notiCProps.c_noti_code === nextProps.notiCProps.c_noti_code 
			&& prevProps.notiCProps.c_noti_country_code === nextProps.notiCProps.c_noti_country_code
			&& prevProps.bodyProps === nextProps.bodyProps);
}