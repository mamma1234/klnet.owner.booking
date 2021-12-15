import React,{ useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, Divider} from "@material-ui/core";
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

//const NotifyBody = (props) => { 
//const NotifyBody = inject('UserStore')(observer(({ UserStore, ...props }) => {
//const NotifyBody = (observer(({UserStore, ...props}) => {
function NotifyBody(props) {

	const classes = styles();
	const store =  useSrStore();
	const {type,notiProps} = props; 
	
	const [notiBodyData,setNotiBodyData] = useState({'notify_bookmark_seq':'','notify_bookmark_name':'','noti_code':'','noti_name1':'',
		'noti_name2':'','noti_address1':'','noti_address2':'','noti_address3':'','noti_address4':'','noti_address5':'','noti_user_name':'',
		'noti_user_tel':'','noti_user_fax':'','noti_user_dep1':'','noti_user_email':''});


	useEffect(() => { 
		setNotiBodyData(notiProps);
	}, [notiProps]);
	
	useEffect(() => { 
		if(('B' === type ||  'C' === type) && props.bodyProps) {
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
				{type ==="B"?
						<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
							<GridContainer>
								<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
								<InputLabel style={{ color: "#AAAAAA" }}>Bookmark Name</InputLabel>
								</GridItem>
								<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
									<CustomInput
									validtype="text"
										required={true}
										feedback={type==="B"?"notify_b":"notify"}
										labelText=""
										maxLength="35"
									formControlProps={{
										fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
									}}
									inputProps={{
										value:notiBodyData.notify_bookmark_name?notiBodyData.notify_bookmark_name:'',
										onChange: handleNotiChange('notify_bookmark_name'),
										onBlur: (e)=>e.target.value?props.mergeNotiProps(notiBodyData):null,
										style:{height:'30px'}
									}}
								/>
								</GridItem>
							</GridContainer>
							</GridItem>:<></>
				}<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
						<InputLabel style={{ color: "#AAAAAA" }}>Name1</InputLabel>
						</GridItem>
						<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
							validtype="text"
								required={type ==="B"?false:true}
								feedback="notify"
								labelText=""
								maxLength="35"
							formControlProps={{
								fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
							}}
							inputProps={{
								value:notiBodyData.noti_name1?notiBodyData.noti_name1:'',
								onChange: handleNotiChange('noti_name1'),
								onBlur: (e)=>('B'===type || 'C'===type)?props.mergeNotiProps(notiBodyData):e.target.value && (e.target.value !== store.sr.noti_name1)?store.setSr({noti_name1:e.target.value}):null,
								style:{height:'30px'}
							}}
						/>
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
								feedback="notify"
								labelText=""
								maxLength="35"
							formControlProps={{
								fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
							}}
							inputProps={{
								value:notiBodyData.noti_name2?notiBodyData.noti_name2:'',
								onChange: handleNotiChange('noti_name2'),
								onBlur: (e)=>('B'===type || 'C'===type)?props.mergeNotiProps(notiBodyData):e.target.value && (e.target.value !== store.sr.noti_name2)?store.setSr({noti_name2:e.target.value}):null,
								style:{height:'30px'}
							}}
						/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
					<GridContainer>
						<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
						<InputLabel style={{ color: "#AAAAAA" }}>Address1</InputLabel>
						</GridItem>
						<GridItem  className={classes.grid} lg={9} md={9} sm={9} xs={12}>
							<CustomInput
							validtype="text"
							required={false}
							feedback="notify"
							labelText=""
							maxLength="35"
							formControlProps={{
								fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
							}}
							inputProps={{
								value:notiBodyData.noti_address1?notiBodyData.noti_address1:'',
								onChange: handleNotiChange('noti_address1'),
								onBlur: (e)=>('B'===type || 'C'===type)?props.mergeNotiProps(notiBodyData):e.target.value && (e.target.value !== store.sr.noti_address1)?store.setSr({noti_address1:e.target.value}):null,
								style:{height:'30px'}
							}}
							
						/>
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
								feedback="notify"
								labelText=""
								maxLength="35"
							formControlProps={{
								fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
							}}
							inputProps={{
								value:notiBodyData.noti_address2?notiBodyData.noti_address2:'',
								onChange: handleNotiChange('noti_address2'),
								onBlur: (e)=>('B'===type || 'C'===type)?props.mergeNotiProps(notiBodyData):e.target.value && (e.target.value !== store.sr.noti_address2)?store.setSr({noti_address2:e.target.value}):null,
								style:{height:'30px'}
							}}
						/>
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
								feedback="notify"
								labelText=""
								maxLength="35"
							formControlProps={{
								fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
							}}
							inputProps={{
								value:notiBodyData.noti_address3?notiBodyData.noti_address3:'',
								onChange: handleNotiChange('noti_address3'),
								onBlur: (e)=>('B'===type || 'C'===type)?props.mergeNotiProps(notiBodyData):e.target.value && (e.target.value !== store.sr.noti_address3)?store.setSr({noti_address3:e.target.value}):null,
								style:{height:'30px'}
							}}
						/>
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
							feedback="notify"
							labelText=""
							maxLength="35"
							formControlProps={{
								fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
							}}
							inputProps={{
								value:notiBodyData.noti_address4?notiBodyData.noti_address4:'',
								onChange: handleNotiChange('noti_address4'),
								onBlur: (e)=>('B'===type || 'C'===type)?props.mergeNotiProps(notiBodyData):e.target.value && (e.target.value !== store.sr.noti_address4)?store.setSr({noti_address4:e.target.value}):null,
								style:{height:'30px'}
							}}
						/>
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
							feedback="notify"
							labelText=""
							maxLength="35"
							formControlProps={{
								fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
							}}
							inputProps={{
								value:notiBodyData.noti_address5?notiBodyData.noti_address5:'',
								onChange: handleNotiChange('noti_address5'),
								onBlur: (e)=>('B'===type || 'C'===type)?props.mergeNotiProps(notiBodyData):e.target.value && (e.target.value !== store.sr.noti_address5)?store.setSr({noti_address5:e.target.value}):null,
								style:{height:'30px'}
							}}
						/>
						</GridItem>
					</GridContainer>
				</GridItem>
			</GridContainer>
			{(type ==="C") &&
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
										feedback="notify"
										maxLength="35"
										formControlProps={{
											fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
										}}
										inputProps={{
											value:notiBodyData.noti_user_name?notiBodyData.noti_user_name:'',
											onChange: handleNotiChange('noti_user_name'),
											onBlur: (e)=>('B'===type || 'C'===type)?props.mergeNotiProps(notiBodyData):e.target.value && (e.target.value !== store.sr.noti_user_name)?store.setSr({noti_user_name:e.target.value}):null,
											style:{height:'30px'}
										}}
									/>
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
										feedback="notify"
										maxLength="35"
										formControlProps={{
											fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
										}}
										inputProps={{
											value:notiBodyData.noti_user_tel?notiBodyData.noti_user_tel:'',
											onChange: handleNotiChange('noti_user_tel'),
											onBlur: (e)=>('B'===type || 'C'===type)?props.mergeNotiProps(notiBodyData):e.target.value && (e.target.value !== store.sr.noti_user_tel)?store.setSr({noti_user_tel:e.target.value}):null,
											style:{height:'30px'}
										}}
									/>
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
										feedback="notify"
										maxLength="35"
										formControlProps={{
											fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
										}}
										inputProps={{
											value:notiBodyData.noti_code?notiBodyData.noti_code:'',
											onChange: handleNotiChange('noti_code'),
											onBlur: (e)=>('B'===type || 'C'===type)?props.mergeNotiProps(notiBodyData):e.target.value && (e.target.value !== store.sr.noti_code)?store.setSr({noti_code:e.target.value}):null,
											style:{height:'30px'}
										}}
									/>
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
										feedback="notify"
										maxLength="2"
										formControlProps={{
											fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
										}}
										inputProps={{
											value:notiBodyData.noti_country_code?notiBodyData.noti_country_code:'',
											onChange: handleNotiChange('noti_country_code'),
											onBlur: (e)=>('B'===type || 'C'===type)?props.mergeNotiProps(notiBodyData):e.target.value && (e.target.value !== store.sr.noti_country_code)?store.setSr({noti_country_code:e.target.value}):null,
											style:{height:'30px'}
										}}
									/>
								</GridItem>
							</GridContainer>
						</GridItem>
					</GridContainer>
				</>
			}
		</GridItem>
	);
}
//));

//export default NotifyBody;

export default React.memo(observer(NotifyBody),areEqual);

function areEqual(prevProps,nextProps) {
	
	return (('C'=== nextProps.type||'B'=== nextProps.type)?(prevProps.bodyProps === nextProps.bodyProps && prevProps.type === nextProps.type):(prevProps.notiProps.notify_bookmark_name === nextProps.notiProps.notify_bookmark_name 
			&& prevProps.notiProps.noti_name1 === nextProps.notiProps.noti_name1
			&& prevProps.notiProps.noti_name2 === nextProps.notiProps.noti_name2
			&& prevProps.notiProps.noti_address1 === nextProps.notiProps.noti_address1
			&& prevProps.notiProps.noti_address2 === nextProps.notiProps.noti_address2
			&& prevProps.notiProps.noti_address3 === nextProps.notiProps.noti_address3
			&& prevProps.notiProps.noti_address4 === nextProps.notiProps.noti_address4
			&& prevProps.notiProps.noti_address5 === nextProps.notiProps.noti_address5
			&& prevProps.notiProps.noti_user_name === nextProps.notiProps.noti_user_name
			&& prevProps.notiProps.noti_user_tel === nextProps.notiProps.noti_user_tel
			&& prevProps.notiProps.noti_code === nextProps.notiProps.noti_code 
			&& prevProps.notiProps.noti_country_code === nextProps.notiProps.noti_country_code));
}
/*export default React.memo(NotifyBody, (prevProps,nextProps) =>  
prevProps.notify_bookmark_name === nextProps.notify_bookmark_name 
&& prevProps.noti_name1 === nextProps.noti_name1
&& prevProps.noti_name2 === nextProps.noti_name2
&& prevProps.noti_address1 === nextProps.noti_address1
&& prevProps.noti_address2 === nextProps.noti_address2
&& prevProps.noti_address3 === nextProps.noti_address3
&& prevProps.noti_address4 === nextProps.noti_address4
&& prevProps.noti_address5 === nextProps.noti_address5
&& prevProps.noti_user_name === nextProps.noti_user_name
&& prevProps.noti_user_tel === nextProps.noti_user_tel
&& prevProps.noti_code === nextProps.noti_code 
&& prevProps.noti_country_code === nextProps.noti_country_code);*/