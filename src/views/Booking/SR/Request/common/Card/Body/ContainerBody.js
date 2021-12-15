import React,{ memo,useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, MenuItem, FormHelperText, FormControl, Select, InputLabel,  IconButton, InputAdornment, TextField, Chip} from "@material-ui/core";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import {Close, AddCircleOutline} from "@material-ui/icons";
import {Autocomplete} from "@material-ui/lab";
import {useSrStore}  from 'store/srStore.js';
//import {useStyles} from 'views/Pages/Booking/SR/styles';
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
	tableText: {
		color: "#666",
		fontSize: "16px",
		lineHeight: "1",
	}
}));

const ContainerBody = (props) => {  //console.log("______________________________cntr detail lendering")
	const classes = styles();
	const {bodyProps,index} = props;
	const store =  useSrStore();
	const [cntr,setCntr] = useState(bodyProps);
	
    useEffect(() => {
    	if(bodyProps){
			setCntr(bodyProps);
		}
	}, [bodyProps]);
    
	
    const handleCntrChange = (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
    	if(prop === 'cntr_no') {
    		setCntr({...cntr, [prop]:event.target.value.toUpperCase()});
			store.setSr({...cntr, [prop]:event.target.value.toUpperCase()})
    	} else {
    		setCntr({...cntr, [prop]:event.target.value});
			store.setSr({...cntr, [prop]:event.target.value})
    	}
    	
    }
    
/*    const mergeDetailProps = ()=> {
    	props.mergeCntrProps(cntr,index);
    }*/

    const verifyType =[{value:'SM1',label:'방법1'},{value:'SM2',label:'방법2'}];
    
	return (
		<Card style={{marginBottom:'10px'}}>
            <CardBody className={classes.cntrCard}>
            	<GridContainer>
            		<GridItem className={classes.cntrPlus} lg={1} md={1} sm={1} xs={1} style={{marginTop:'auto',marginBottom:'auto'}}>
                		<IconButton style={{padding:'0'}} onClick={()=>props.onAddCntr()}>
  	                  		<AddCircleOutline fontSize='large'  />
  	                  	</IconButton>
            		</GridItem>
            		<GridItem lg={11} md={11} sm={11} xs={11}>
            			<GridContainer>
            				<GridItem className={classes.cntrClose} lg={12} md={12} sm={12} xs={12}>
                				<IconButton style={{padding: '5px 0 0 0'}}  onClick={()=>props.onRemoveCntr(index)}><Close /></IconButton>
            				</GridItem>
                			<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
			            		<GridContainer>
				                	<GridItem className={classes.gridLabel} lg={4} md={4} sm={3} xs={12}>
				                		<InputLabel style={{ color: "#AAAAAA" }}>Cntr No</InputLabel>
				                    </GridItem>
				                    <GridItem className={classes.grid} lg={8} md={8} sm={9} xs={12}>
					                  	<CustomInput
					                  		validtype="text"
						                    required={true}
						                    feedback="container"
							                maxLength="11"
											formControlProps={{
											fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
											}}
											inputProps={{
											value:cntr.cntr_no?cntr.cntr_no:'',
											onChange: handleCntrChange('cntr_no'),
											onBlur: (e)=>e.target.value?props.mergeCntrProps(cntr):null,
											style:{height:'30px'}
											}}
					    	  			/>
				                  	</GridItem>
				               	</GridContainer>
			            	</GridItem> 
			            	<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
			            		<GridContainer>
				                	<GridItem className={classes.gridLabel} lg={4} md={4} sm={3} xs={12}>
				                		<InputLabel style={{ color: "#AAAAAA" }}>Seal No</InputLabel>
				                    </GridItem>
				                    <GridItem className={classes.grid} lg={8} md={8} sm={9} xs={12}>
					                  	<CustomInput
											validtype="text"
											required={true}
											feedback="container"
											maxLength="10"
											formControlProps={{
											fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
											}}
											inputProps={{
											value:cntr.cntr_seal?cntr.cntr_seal:'',
											onChange: handleCntrChange('cntr_seal'),
											onBlur: (e)=>e.target.value?props.mergeCntrProps(cntr):null,
												style:{height:'30px'}
											}}
										/>
				                  	</GridItem>
				               	</GridContainer>
			            	</GridItem>
			            	<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
			            		<GridContainer>
				                	<GridItem className={classes.gridLabel} lg={4} md={4} sm={3} xs={12}>
				                		<InputLabel style={{ color: "#AAAAAA" }}>Size/Type</InputLabel>
				                    </GridItem>
				                    <GridItem className={classes.grid} lg={8} md={8} sm={9} xs={12}>
					                    <Autocomplete
											options = {props.cntrCode?props.cntrCode:[]}
											//   getOptionLabel = { option => option.label?option.label+'['+option.cntr_code+']':'' }
											getOptionLabel = { option => option.label?option.label+'['+props.cntrCode.find(v=>v.label === option.label).value+']'||'':'' }
											getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
											id="cntr_code"
											//   value={{label:props.cntrCode && props.cntrCode.find(v=>v.value === cntr.cntr_code)?
											// 		  props.cntrCode.find(v=>v.value === cntr.cntr_code).label:''
											//         }}
											value={{label:props.cntrCode && props.cntrCode.find(v=>v.value === cntr.cntr_code)?
												props.cntrCode.find(v=>v.value === cntr.cntr_code).label:''
											}}
											onChange={(e,option)=>{setCntr({...cntr,cntr_code:option?option.value:''});props.mergeCntrProps({...cntr,cntr_code:option?option.value:''})}}
											renderInput={
												params =>(
												<TextField
													{...params} label=""
													fullWidth
													required={true}
													error={cntr.cntr_code?false:true}
													helperText={cntr.cntr_code?null:'필수'}
												/>
											)}
										/>
										{/* 
										<Autocomplete
										options = {store.sr_pack_code?store.sr_pack_code:[]}
										//getOptionLabel = { option => option.label?option.label||'':'' }
										
										
										id="cargo_pack_type"
										
										onChange ={(e,option)=>'B'===type?props.mergeCargoProps({...cargoData,cargo_pack_type:option?option.value:''}):
											store.setSr({cargo_pack_type:option?option.value:''})}
										renderInput={
											params =>(
											<TextField
												{...params} label=""
												fullWidth
												required={('B'===type)?false:true}
												error={('B'===type)?false:cargoData.cargo_pack_type?false:true}
												helperText={('B'===type)?false:cargoData.cargo_pack_type?null:'필수'}
											/>)}
										/> */}
					                    
				                  	</GridItem>
								</GridContainer>
							</GridItem> 
			            	<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
			            		<GridContainer>
				                	<GridItem className={classes.gridLabel} lg={4} md={4} sm={3} xs={12}>
				                		<InputLabel style={{ color: "#AAAAAA" }}>Weight</InputLabel>
				                    </GridItem>
				                    <GridItem className={classes.grid} lg={8} md={8} sm={9} xs={12}>
					                    <CustomInput
					                        validtype="number"
						                    required={true}
						                    feedback="container"
							                maxLength="18"
							                formControlProps={{
							                  fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
							                }}
							                inputProps={{
							                   value:cntr.cntr_weight?cntr.cntr_weight:'',
							                   endAdornment:<InputAdornment position="end">Kg</InputAdornment>,
									           onChange: handleCntrChange('cntr_weight'),
									           onBlur: (e)=>e.target.value?props.mergeCntrProps(cntr):null,
							                  style:{height:'30px'}
							                }}
						    	  		/>
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
													options = {props.packCode?props.packCode:[]}
													getOptionLabel = { option => option.label?option.label+'['+props.packCode.find(v=>v.label === option.label).value+']'||'':'' }
													getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
													id="cntr_carton_code"
													value={{label:props.packCode && props.packCode.find(v=>v.value === cntr.cntr_carton_code)?
															props.packCode.find(v=>v.value === cntr.cntr_carton_code).label:''
														}}
													//onChange={(e,option)=>{props.mergeCntrProps({...cntr,cntr_carton_code:option?option.value:''})}}
													onChange={(e,option)=>{setCntr({...cntr,cntr_carton_code:option?option.value:''});props.mergeCntrProps({...cntr,cntr_carton_code:option?option.value:''})}}
													renderInput={
														params =>(
														<TextField
															{...params} label=""
															fullWidth
															
															required={true}
															error={cntr.cntr_carton_code?false:true}
															helperText={cntr.cntr_carton_code?null:'필수'}
														/>
													)}
												/>
											</GridItem>
											<GridItem className={classes.grid} lg={4} md={9} sm={9} xs={12}>
												<CustomInput
													validtype="number"
													required={true}
													feedback="container"
													maxLength="2"
													formControlProps={{
														fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
													}}
													inputProps={{
														value:cntr.cntr_carton_qty?cntr.cntr_carton_qty:'',
														onChange: handleCntrChange('cntr_carton_qty'),
														onBlur: (e)=>e.target.value?props.mergeCntrProps(cntr):null,
														style:{height:'30px'}
													}}
												/>
											</GridItem>
										</GridContainer>
									</GridItem>
								</GridContainer>
		            		</GridItem>
		            	</GridContainer>
		            	{(!props.vsl_type || (props.vsl_type && "41" === props.vsl_type)) &&
		            	<GridContainer style={{border:'2px dotted #00acc1'}}>
							<GridItem className={classes.grid} lg={2} md={2} sm={2} xs={2} style={{marginTop:'auto',marginBottom:'auto'}} >
								<GridContainer>								 
									<GridItem className={classes.cntrPlus}lg={12} md={12} sm={12} xs={12} >
										<Chip variant="outlined" className={classes.tableText} label="VGM" color="default"/>
									</GridItem>
								</GridContainer>
							</GridItem>
							<GridItem className={classes.grid} lg={10} md={10} sm={10} xs={10}>
								<GridContainer>
									<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
										<GridContainer>
											<GridItem className={classes.gridLabel} lg={4} md={4} sm={3} xs={12}>
												<InputLabel style={{ color: "#AAAAAA" }}>Verifying</InputLabel>
											</GridItem>
											<GridItem className={classes.grid} lg={8} md={8} sm={9} xs={12}>
												<Autocomplete
													options = {verifyType?verifyType:[]}
													getOptionLabel = { option => option.label?option.label||'':'' }
													getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
													id="cntr_verifying_type"
													value={{label:verifyType && verifyType.find(v=>v.value === cntr.cntr_verifying_type)?
															verifyType.find(v=>v.value === cntr.cntr_verifying_type).label:''
															}}
													onChange={(e,option)=>{setCntr({...cntr,cntr_verifying_type:option?option.value:''});props.mergeCntrProps({...cntr,cntr_verifying_type:option?option.value:''})}}
													renderInput={
													params =>(
														<TextField
															{...params} label=""
															fullWidth
															required={props.vsl_type && "41" === props.vsl_type?true:false}
															error={props.vsl_type && "41" === props.vsl_type && !cntr.cntr_verifying_type?true:false}
															helperText={props.vsl_type && "41" === props.vsl_type && !cntr.cntr_verifying_type?'필수':null}
														/>
													)}
												/>
											</GridItem>
										</GridContainer>
		            				</GridItem> 
									<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
										<GridContainer>
											<GridItem className={classes.gridLabel} lg={4} md={4} sm={3} xs={12}>
												<InputLabel style={{ color: "#AAAAAA" }}>Bkg No</InputLabel>
											</GridItem>
											<GridItem className={classes.grid} lg={8} md={8} sm={9} xs={12}>
												<CustomInput
													validtype="text"
													required={props.vsl_type && "41" === props.vsl_type?true:false}
													feedback="container"
													maxLength="35"
													formControlProps={{
														fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
													}}
													inputProps={{
														value:cntr.cntr_res_bkg_no?cntr.cntr_res_bkg_no:'',
														onChange: handleCntrChange('cntr_res_bkg_no'),
														onBlur: (e)=>e.target.value?props.mergeCntrProps(cntr):null,
														style:{height:'30px'}
													}}
												/>
											</GridItem>
										</GridContainer>
									</GridItem>
									<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
										<GridContainer>
											<GridItem className={classes.gridLabel} lg={4} md={4} sm={3} xs={12}>
												<InputLabel style={{ color: "#AAAAAA" }}>PIC Name</InputLabel>
											</GridItem>
											<GridItem className={classes.grid} lg={8} md={8} sm={9} xs={12}>
												<CustomInput
													validtype="text"
													required={props.vsl_type && "41" === props.vsl_type?true:false}
													feedback="container"
													maxLength="35"
													formControlProps={{
														fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
													}}
													inputProps={{
														value:cntr.cntr_auth_user_name?cntr.cntr_auth_user_name:'',
														onChange: handleCntrChange('cntr_auth_user_name'),
														onBlur: (e)=>e.target.value?props.mergeCntrProps(cntr):null,
														style:{height:'30px'}
													}}/>
											</GridItem>
										</GridContainer>
									</GridItem>
									<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
										<GridContainer>
											<GridItem className={classes.gridLabel} lg={5} md={4} sm={3} xs={12}>
												<InputLabel style={{ color: "#AAAAAA" }}>Total Weight</InputLabel>
											</GridItem>
											<GridItem className={classes.grid} lg={7} md={8} sm={9} xs={12}>
												<CustomInput
													validtype="number"
													required={props.vsl_type && "41" === props.vsl_type?true:false}
													feedback="container"
													maxLength="18"
													formControlProps={{
													fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
													}}
													inputProps={{
													endAdornment:<InputAdornment position="end">Kg</InputAdornment>,
													value:cntr.cntr_total_weight?cntr.cntr_total_weight:'',
													onChange: handleCntrChange('cntr_total_weight'),
													onBlur: (e)=>e.target.value?props.mergeCntrProps(cntr):null,
													style:{height:'30px'}
													}}
												/>
											</GridItem>
										</GridContainer>
									</GridItem>
								</GridContainer>
							</GridItem>
            			</GridContainer>}
            		</GridItem>
            	</GridContainer>
            </CardBody>
		</Card>
	);
}

//export default ContainerBody;
		
export default memo(ContainerBody, (prevProps,nextProps) => 
	prevProps.cntrCode === nextProps.cntrCode
	&& prevProps.packCode === nextProps.packCode
	&& prevProps.vsl_type === nextProps.vsl_type
	&& prevProps.bodyProps === nextProps.bodyProps
);