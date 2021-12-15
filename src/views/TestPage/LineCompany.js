import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from '@material-ui/core/Select';
// core components
import GridItem from "components/Grid/GridItem.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import Button from "components/CustomButtons/Button.js";
import Grid from '@material-ui/core/Grid';
import BackupIcon from "@material-ui/icons/Backup";
import SearchButton from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomSelect from "components/CustomInput/CustomSelect.js";
import {TextField} from '@material-ui/core';
import axios from 'axios';
import MaterialTable from 'material-table';
import {
	Autocomplete as Autocomplete,
	// Alert as MuiAlert
} from '@material-ui/lab';

const styles = {
  cardTitleBlack: {
	    textAlign: "left",
	    color: "#000000",
	    minHeight: "auto",
	    fontWeight: "300",
	    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
	    marginBottom: "3px",
	    textDecoration: "none",
	    "& small": {
	      color: "#777",
	      fontSize: "65%",
	      fontWeight: "400",
	      lineHeight: "1"
	    }
	  },
    gridStyle1: {
    	paddingTop:'1px',
    	paddingBottom:'1px',
    },
};

const useStyles = makeStyles(styles);

export default function LineCompany(props) {
    const classes = useStyles();
    const [lineCode,setLineCode] = useState([]);
    const [carrierCode,setCarrierCode] = useState("");
	const [klnetId,setKlnetId] = useState("");
	const [partnerCode,setPartnerCode] = useState("");
	
	const [selectData,setSelectData] = useState([]);

	useEffect(() => {
		if(props.userData){
			axios.post("/loc/getCustomLineCode",{}).then(res => setLineCode(res.data));
		}else {
			props.openLogin();
		}
		return () => {
			
		};
	}, []);
	const onSubmit = () => {
		setSelectData([]);
		if(props.userData){
			axios.post("/com/getLineCompany",{carrier_code:carrierCode, klnet_id: klnetId, partner_code: partnerCode}).then(res => 
				{
					if(res.data.length > 0 ) {
						
						setSelectData(res);
					}else {
						setSelectData([]);
					}
				}
			)
		}else {
			props.openLogin();
		}
	}
    const onCarrierChange = (e,data) => {
		if(data) {setCarrierCode(data.id);} else {setCarrierCode("");}
  	}
	return (	
		<div>
			<Card style={{marginBottom:'1px'}}>
				<CardHeader color="info" stats icon >
					<CardIcon color="info" style={{height:'55px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
					</CardIcon>
					<h4 className={classes.cardTitleBlack}>LINE COMPANY 관리</h4>
				</CardHeader>
				<CardBody style={{padding:'2px'}}>
					<GridItem>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} md={2}>
                                <Autocomplete
									options = {lineCode}
									getOptionLabel = { option => option.id + '\n' +option.nm }
									id="carrierCode"
									onChange={onCarrierChange}
									renderInput={params => (
										<TextField inputProps={{maxLength:4}} {...params} label="Carrier" fullWidth />
								)}/>
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<TextField id="klnetID" label={"KLNET ID"} onChange={event => setKlnetId(event.target.value.toUpperCase())} value={klnetId} //variant="outlined" size="small" 
									fullWidth />
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
							<TextField id="partnerCode" label={"PARTNER CODE"} onChange={event => setPartnerCode(event.target.value.toUpperCase())} value={partnerCode} //variant="outlined" size="small" 
									fullWidth />
							</Grid>
							<Grid item xs={12} sm={12} md={4}></Grid>
							<Grid item  xs={12} sm={12} md={2}>
								<SearchButton color="info" fullWidth onClick={onSubmit} >Search</SearchButton>
							</Grid>
							</Grid>
					</GridItem>
					
				</CardBody>
			</Card>
			<Grid item xs={12}>
				<MaterialTable
					// totalCount={selectData.length}
					options={{actionsColumnIndex: -1}}
					title=""
					columns={
						[{ width: '5%' ,title: 'No', field: 'num', editable:'never' }
						,{ width: '15%' ,title: 'CARRIER', field: 'line_code', editable:'onAdd',  editComponent: (props) => (
							<CustomInput
								labelText={
									<span>
									Carrier <small>(required)</small>
									</span>
								}
								id="lineCode"
								formControlProps={{
								fullWidth: true
								}}
								inputProps={{
									onChange:event => props.onChange(event.target.value.toUpperCase()),
									value:props.value,
									maxLength:4
								}}
							/>
							)}
							,{ width: '15%' ,title: 'KLNET ID', field: 'klnet_id', editable:'onAdd', editComponent: (props) => (
								<CustomInput
									labelText={
										<span>
										KLNET ID<small>(required)</small>
										</span>
									}
									id="klnet_id"
									formControlProps={{
									fullWidth: true
									}}
									inputProps={{
										onChange:event => props.onChange(event.target.value.toUpperCase()),
										value:props.value,
										maxLength:8
									}}
								/>
                            )}
                            ,{ width: '10%' ,title: 'USE YN', field: 'use_yn', editComponent: (props) => (
                                <CustomSelect
                                    id="use_yn"
                                    labelText = "USE YN"
                                    option = {["Y","N"]}
                                    inputProps={{
                                        onChange:e=>props.onChange(e.target.value),
                                        value:props.value,
                                        fullWidth:true}}
                                    formControlProps={{fullWidth: true}} />
                            )}
                            ,{ width: '10%' ,title: 'SHIPPER', field: 'shipper_yn', editComponent: (props) => (
                                <CustomSelect
                                    id="shipper_yn"
                                    labelText = "SHIPPER"
                                    option = {["Y","N"]}
                                    inputProps={{
                                        onChange:e=>props.onChange(e.target.value),
                                        value:props.value,
                                        fullWidth:true}}
                                    formControlProps={{fullWidth: true}} />
                            )}
                            ,{ width: '10%' ,title: 'FORWARDER', field: 'forwarder_yn', editComponent: (props) => (
                                <CustomSelect
                                    id="forwarder_yn"
                                    labelText = "FORWARDER YN"
                                    option = {["Y","N"]}
                                    inputProps={{
                                        onChange:e=>props.onChange(e.target.value),
                                        value:props.value,
                                        fullWidth:true}}
                                    formControlProps={{fullWidth: true}} />
                            )}
							,{ width: '15%', title: 'PARTNER CODE', field: 'partner_code', editable:'onAdd', editComponent: (props) => (
								<CustomInput
									labelText={
										<span>
										PARTNER CODE <small>(required)</small>
										</span>
									}
									id='partner_code'
									formControlProps={{
									fullWidth: true
									}}
									inputProps={{
										onChange:event => props.onChange(event.target.value.toUpperCase()),
										value:props.value,
										maxLength:30
									}}
								/>
								)}							
								,{ width: '15%', title: 'BUSINESS NUMBER', field: 'business_number', editComponent: (props) => (
									<CustomInput
                                        labelText={
                                            <span>
                                            BUSINESS NUMBER
                                            </span>
                                        }
                                        id='business_number'
                                        formControlProps={{
                                        fullWidth: true
                                        }}
                                        inputProps={{
                                            onChange:event => props.onChange(event.target.value.toUpperCase()),
                                            value:props.value?props.value:"",
                                            maxLength:10
                                        }}
                                    />
									)}	]
					}
					data={selectData.data}
					components={{
						Toolbar: props => (
                            <GridItem>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Grid>
                                        <Button
                                            variant="contained"
                                            color="info"
                                            size="sm"
                                            style={{lineHeight:"1",marginRight: 5}}
                                            onClick={() => props.actions[0].onClick()}
                                            startIcon={<BackupIcon/>}
                                            >add
                                        </Button>
                                        <label  style={{float:'right', padding:'5px'}}> Total : {selectData.length}</label>
                                    </Grid>
                                </Grid>
                            </GridItem>
						)
					}}
					editable={{
						onRowAdd: newData =>
							
							new Promise(resolve => {
								setTimeout(() => {
									resolve();
									if ( typeof newData.line_code === 'undefined' || '' === newData.line_code) {
										alert("Carrier를 입력해주세요.");
										return false;
									} else {
										if(newData.line_code.length !== 4) {
											alert("CarrierCode는 4자리만 입력가능합니다.");
											return false;
                                        }
                                        
									}
									// if ( undefined == newData.port_name || '' == newData.port_name ) {
									if ( typeof newData.klnet_id === 'undefined' || '' === newData.klnet_id ) {
										alert("KLNET ID 를 입력해주세요.");
										return false;
									} else {
										if(newData.klnet_id.length > 8 ) {
											alert("KLNET ID 는 8자리 까지 입력 가능합니다.");
											return false;
										}
									}
									// if (undefined == newData.iso_port_code || '' == newData.iso_port_code) {
									if ( typeof newData.partner_code === 'undefined' || '' === newData.partner_code) {
										alert("PARTNER CODE를 입력 해 주세요.");
										return false;
									} else {
										if(newData.partner_code.length > 30 ) {
											alert("PARTNER CODE는 30자리 까지 입력 가능합니다.");
											return false;
										}
                                    }
                                    axios.post('/com/checkLineCode',{param : newData.line_code}).then(
                                        res=> {
                                            if(res.statusText==="OK") {
                                                if(res.data !=="OK") {
                                                    alert("알 수 없는 LINE CODE 입니다.");
                                                    return false;    
                                                }
                                                axios.post("/com/insertLineCode",{data:newData}).then(res => {
                                                    if(res.data === 23505) {
                                                        alert("이미 등록있는 값 입니다.")
                                                    }else if (res.data==="OK"){
                                                        alert("저장되었습니다.")
                                                    }else {
                                                        alert("저장에 실패하였습니다."+res.data);
                                                    }
                                                });
                                            }else {
                                                alert("서버에 연결할 수 없습니다.");
                                                return false;
                                            }
                                        }
                                    )
								}, 600);
						}),
						onRowUpdate: (newData, oldData) =>
								
							new Promise(resolve => {
								setTimeout(() => {
									resolve();
									if (oldData) {
										axios.post("/com/updateLineCompany",{newData:newData,oldData:oldData}).then(res => {
											if(res.data===1) {
												setSelectData(prevState => {
													let data = [...prevState.data];
													data[data.indexOf(oldData)] = newData;
													return { ...prevState,data };
												});
											}else {
												alert(" 업데이트에 실패 하였습니다. ")
											}
											
										});
									}
									
								}, 600);
							}),
						onRowDelete: oldData =>
							new Promise(resolve => {
								setTimeout(() => {
									resolve();
									// 삭제 처리.
									axios.post("/com/deleteLineCompany",{ oldData:oldData}).then(
										res=> {
											if(res.data===1) {
												setSelectData(prevState => {
												let data = [...prevState.data];
												data.splice(data.indexOf(oldData), 1);
												return { ...prevState, data };
												});
												alert(" 삭제 하였습니다.")
											}else {
												alert(" 삭제에 실패 하였습니다. ")
											}
										}
									)
									
								}, 600);
						}),
					}}
				/>
			</Grid>
		</div>   
  );
}
