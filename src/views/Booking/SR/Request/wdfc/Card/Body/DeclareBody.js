import React,{  useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, MenuItem, FormControl, Select, InputLabel, IconButton, InputAdornment,TextField} from "@material-ui/core";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInputBooking.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { Close,AddCircleOutline} from "@material-ui/icons";
//import {useStyles} from 'views/Pages/Booking/SR/styles';
import {Autocomplete} from "@material-ui/lab";
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

const DeclareBody = (props) => { //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>declare")
	const loadYn =[{value:'N',label:'N'},{value:'Y',label:'Y'}];
	const classes = styles();
	const {bodyProps,index,packCode} = props;
	const store =  useSrStore();
	const [declare,setDeclare] = useState(bodyProps);
	
    useEffect(() => {
    	// if(bodyProps){
		// 	setDeclare({...bodyProps, declare_div_load_yn:bodyProps.declare_div_load_yn?bodyProps.declare_div_load_yn:'N' });
		// 	// setDeclare({...loadFormData,'bookmark_checked':loadFormData.bookmark_checked?loadFormData.bookmark_checked:props.checked?'Y':'N','declare_div_load_yn':loadFormData.declare_div_load_yn?loadFormData.declare_div_load_yn:'N'});
		// }
		setDeclare({
			...bodyProps, 
			declare_div_load_yn:bodyProps.declare_div_load_yn?bodyProps.declare_div_load_yn:'N',
			declare_pack_type:'GT'
		});

	}, [bodyProps]);
    
	
    const handleDeclareChange = (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
    	if(props === 'declare_pack_set_code'){
    		setDeclare({...declare, [prop]:event.target.value.toUpperCase()});
			store.setSr({...declare, [prop]:event.target.value.toUpperCase()});
    	} else {
    		setDeclare({...declare, [prop]:event.target.value});
			store.setSr({...declare, [prop]:event.target.value});
    	}
    }
	return (
		<Card style={{marginBottom:'10px'}}>
            <CardBody className={classes.cntrCard}>
            	<GridContainer>
            		<GridItem className={classes.cntrPlus} lg={1} md={1} sm={1} xs={1} style={{marginTop:'auto',marginBottom:'auto'}}>
                		<IconButton style={{padding:'0'}} onClick={()=>props.onAddDcr()}>
  	                  		<AddCircleOutline fontSize="large"/>
  	                  	</IconButton>
            		</GridItem>
            		<GridItem lg={11} md={11} sm={11} xs={11}>
            			<GridContainer>
            				<GridItem className={classes.cntrClose} lg={12} md={12} sm={12} xs={12}>
                				<IconButton style={{padding: '5px 0 0 0'}}  onClick={()=>props.onRemoveDcr(index)}>
									<Close />
								</IconButton>
            				</GridItem>
	                		<GridItem className={classes.grid} lg={4} md={4} sm={6} xs={12}>
								<GridContainer>
									<GridItem className={classes.gridLabel} lg={4} md={4} sm={3} xs={12}>
										<InputLabel style={{ color: "#AAAAAA" }}>수출면장번호</InputLabel>
									</GridItem>
									<GridItem className={classes.grid} lg={8} md={8} sm={9} xs={12}>
										<CustomInput
											validtype="text"
											required={true}
											feedback="declare"
											maxLength="19"
											formControlProps={{
												fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
											}}
											inputProps={{
												value:declare.declare_num?declare.declare_num:'',
												onChange: handleDeclareChange('declare_num'),
												onBlur: (e)=>e.target.value?props.mergeDeclareProps(declare):null,
												style:{height:'30px'}
											}}
										/>
									</GridItem>
								</GridContainer>
							</GridItem> 
							<GridItem className={classes.grid} lg={5} md={4} sm={6} xs={12}>
								<GridContainer>
									<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
										<InputLabel style={{ color: "#AAAAAA" }}>포장유형,개수</InputLabel>
									</GridItem>
									<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
					                  	<GridContainer>
					                  		<GridItem className={classes.grid} lg={8} md={9} sm={9} xs={12}>
						                  		<Autocomplete
													options = {props.packCode?props.packCode:[]}
													getOptionLabel = { option => option.label?option.label+'['+props.packCode.find(v=>v.label === option.label).value+']'||'':'' }
													getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
													id="declare_pack_type"
													value={{label:props.packCode && props.packCode.find(v=>v.value === declare.declare_pack_type)?
															props.packCode.find(v=>v.value === declare.declare_pack_type).label:''
														}}
													//onChange={(e,option)=>{props.mergeCntrProps({...cntr,cntr_carton_code:option?option.value:''})}}
													onChange={(e,option)=>{setDeclare({...declare,declare_pack_type:option?option.value:''});props.mergeDeclareProps({...declare,declare_pack_type:option?option.value:''})}}
													renderInput={
														params =>(
															<TextField
																{...params} label=""
																fullWidth
																required={true}
																error={declare.declare_pack_type?false:true}
																helperText={declare.declare_pack_type?null:'필수'}
															/>
														)
													}
												/>
					                  		</GridItem>
					                  		<GridItem className={classes.grid} lg={4} md={9} sm={9} xs={12}>
						                  		<CustomInput
						                  			validtype="number"
							                  		required={true}
								                    feedback="container"
									                maxLength="18"
									                formControlProps={{
									                  	fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
									                }}
									                inputProps={{
														value:declare.declare_pack_num?declare.declare_pack_num:'',
														onChange: handleDeclareChange('declare_pack_num'),
														onBlur: (e)=>e.target.value?props.mergeDeclareProps(declare):null,
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
									<GridItem className={classes.gridLabel} lg={4} md={4} sm={3} xs={12}>
										<InputLabel style={{ color: "#AAAAAA" }}>중량</InputLabel>
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
												value:declare.declare_weight?declare.declare_weight:'',
												endAdornment:<InputAdornment position="end">Kg</InputAdornment>,
												onChange: handleDeclareChange('declare_weight'),
												onBlur: (e)=>e.target.value?props.mergeDeclareProps(declare):null,
												style:{height:'30px'}
											}}
										/>
									</GridItem>
								</GridContainer>
							</GridItem>
				            <GridItem className={classes.grid} lg={5} md={4} sm={6} xs={12}>
								<GridContainer>
									<GridItem className={classes.gridLabel} lg={3} md={3} sm={3} xs={12}>
										<InputLabel style={{ color: "#AAAAAA" }}>동시포장유형,개수</InputLabel>
									</GridItem>
									<GridItem className={classes.grid} lg={9} md={9} sm={9} xs={12}>
										<GridContainer>
											<GridItem className={classes.grid} lg={8} md={9} sm={9} xs={12}>
												<Autocomplete
													options = {props.packCode?props.packCode:[]}
													getOptionLabel = { option => option.label?option.label+'['+props.packCode.find(v=>v.label === option.label).value+']'||'':'' }
													getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
													id="declare_pack_set_type"
													value={{label:props.packCode && props.packCode.find(v=>v.value === declare.declare_pack_set_type)?
															props.packCode.find(v=>v.value === declare.declare_pack_set_type).label:''
														}}
													onChange={(e,option)=>{setDeclare({...declare,declare_pack_set_type:option?option.value:''});
																props.mergeDeclareProps({...declare,declare_pack_set_type:option?option.value:''})}}
													renderInput={
														params =>(
															<TextField
																{...params}
																fullWidth
																required={declare.declare_pack_set_num ?true:false}
																error={declare.declare_pack_set_num && !declare.declare_pack_set_type?true:false}
																helperText={declare.declare_pack_set_num && !declare.declare_pack_set_type?'필수':null}
															/>
														)
													}
												/>
											</GridItem>
											<GridItem className={classes.grid} lg={4} md={9} sm={9} xs={12}>
												<CustomInput
													validtype="number"
													required={declare.declare_pack_set_type?true:false}
													feedback="container"
													maxLength="4"
													formControlProps={{
														fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
													}}
													inputProps={{
														value:declare.declare_pack_set_num?declare.declare_pack_set_num:'',
														onChange: handleDeclareChange('declare_pack_set_num'),
														onBlur: (e)=>e.target.value?props.mergeDeclareProps(declare):null,
														style:{height:'30px'}
													}}
												/>
											</GridItem>
										</GridContainer>
									</GridItem>
								</GridContainer>
							</GridItem>		
							<GridItem className={classes.grid} lg={2} md={4} sm={6} xs={12}>
								<GridContainer>
									<GridItem className={classes.gridLabel} lg={7} md={4} sm={3} xs={12}>
										<InputLabel style={{ color: "#AAAAAA" }}>분할선적여부</InputLabel>
									</GridItem>
									<GridItem className={classes.grid} lg={5} md={8} sm={9} xs={12}>
										<Autocomplete
											options = {loadYn?loadYn:[]}
											getOptionLabel = { option => option.label?option.label||'':'' }
											getOptionSelected={(option, value) => option.label?option.label:'' === value.label?value.label:''}
											id="declare_div_load_yn"
											value={{label:loadYn && loadYn.find(v=>v.value === declare.declare_div_load_yn)?
													loadYn.find(v=>v.value === declare.declare_div_load_yn).label:''
												}}
											onChange={(e,option)=>{setDeclare({...declare,declare_div_load_yn:option?option.value:''});
																   props.mergeDeclareProps({...declare,declare_div_load_yn:option?option.value:''});}}
											renderInput={
												params =>(
													<TextField
														{...params}
														fullWidth
													/>
												)
											}
										/>
									</GridItem>
								</GridContainer>
							</GridItem> 
							<GridItem className={classes.grid} lg={2} md={4} sm={6} xs={12}>
								<GridContainer>
									<GridItem className={classes.gridLabel} lg={7} md={4} sm={3} xs={12}>
										<InputLabel style={{ color: "#AAAAAA" }}>분할선적차수</InputLabel>
									</GridItem>
									<GridItem className={classes.grid} lg={5} md={8} sm={9} xs={12}>
										<CustomInput
											validtype="number"
											required={"Y" === declare.declare_div_load_yn?true:false}
											feedback="declare"
											maxLength="2"
											formControlProps={{
												fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
											}}
											inputProps={{
												value:declare.declare_div_load_no?declare.declare_div_load_no:'',
												onChange: handleDeclareChange('declare_div_load_no'),
												onBlur: (e)=>e.target.value?props.mergeDeclareProps(declare):null,
												style:{height:'30px'}
											}}
										/>
									</GridItem>
								</GridContainer>
							</GridItem>
							<GridItem className={classes.grid} lg={3} md={4} sm={6} xs={12}>
								<GridContainer>
									<GridItem className={classes.gridLabel} lg={5} md={4} sm={3} xs={12}>
										<InputLabel style={{ color: "#AAAAAA" }}>동시포장코드</InputLabel>
									</GridItem>
									<GridItem className={classes.grid} lg={7} md={8} sm={9} xs={12}>
										<CustomInput
											validtype="english"
											required={false}
											feedback="declare"
											maxLength="1"
											formControlProps={{
												fullWidth: true,style:{paddingTop:'0',marginBottom:'10px'}
											}}
											inputProps={{
												value:declare.declare_pack_set_code?declare.declare_pack_set_code:'',
												onChange: handleDeclareChange('declare_pack_set_code'),
												onBlur: (e)=>e.target.value?props.mergeDeclareProps(declare):null,
												style:{height:'30px'}
											}}
										/>
									</GridItem>
								</GridContainer>
							</GridItem>	
            			</GridContainer>
            		</GridItem>
            	</GridContainer>
            </CardBody>
		</Card>
	);
}
export default React.memo(DeclareBody, (prevProps,nextProps) => 
	prevProps.bodyProps === nextProps.bodyProps && 
	prevProps.packCode === nextProps.packCode
);