import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import MaterialTable from 'material-table';
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

export default function TableList(props) {
	const classes = useStyles();
	const [searchLineCode,setSearchLineCode] = useState("");
	const [searchPortName,setSearchPortName] = useState("");
	const [searchCount, setSearchCount] = useState(0);
	const [store,setStore] = useState(props.store); // eslint-disable-line no-unused-vars
	const [selectData,setSelectData] = useState([]);
	useEffect(() => {
		if(props.userData){
			axios.post("/sch/getSchedulePortCodeList",{}).then(res => {
				setSelectData(res)
				setSearchCount(res.data.length);
			});
		}else {
			props.openLogin();
		}
		return () => {
			console.log('LINE CODE cleanup');
		};
	}, []);

	const onSubmit = () => {
		if(props.userData){
			axios.post("/sch/getSchedulePortCodeList",{data:{line_code:searchLineCode, port_name:searchPortName}}
			).then(res => {
				setSelectData(res)
				setSearchCount(res.data.length);
			});
		}else{
			props.openLogin();
		}
	}

	return (	
		<div>
			<Card style={{marginBottom:'1px'}}>
				<CardHeader color="info" stats icon >
					<CardIcon color="info" style={{height:'55px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
					</CardIcon>
					<h4 className={classes.cardTitleBlack}>Port Code MANAGEMENT</h4>
				</CardHeader>
				<CardBody style={{padding:'2px'}}>
					<GridItem>
						<Grid container>
							<Grid item xs={12} sm={12} md={2}>
								<TextField id="searchLineCode" label={"Line Code"} onChange={event => setSearchLineCode(event.target.value)} value={searchLineCode} //variant="outlined" size="small" 
									fullWidth />
							</Grid>
							<Grid item xs={12} sm={12} md={1}></Grid>
							<Grid item xs={12} sm={12} md={2}>
								<TextField id="searchPortName" label={"Port Name"} onChange={event => setSearchPortName(event.target.value)} value={searchPortName} //variant="outlined" size="small" 
									fullWidth />
							</Grid>
							<Grid item xs={12} sm={12} md={3}></Grid>
							<Grid item  xs={12} sm={12} md={4}>
								<SearchButton color="info" fullWidth onClick={onSubmit} >Search</SearchButton>
							</Grid>
							</Grid>
					</GridItem>
					
				</CardBody>
			</Card>
			<Grid item xs={12}>
				<MaterialTable
					totalCount={10}
					options={{actionsColumnIndex: -1}}
					title=""
					columns={
						[{ width: '5%' ,title: 'No', field: 'num', editable:'never' }
						,{ width: '25%' ,title: 'Line Code', field: 'line_code', editComponent: (props) => (
							<CustomInput
								labelText={
									<span>
									Line Code <small>(required)</small>
									</span>
								}
								id="lineCode"
								formControlProps={{
								fullWidth: true
								}}
								inputProps={{
									max:4,
									onChange:event => props.onChange(event.target.value),
									value:props.value
								}}
							/>
							)}
							,{ width: '30%' ,title: 'Port Name', field: 'port_name', editComponent: (props) => (
								<CustomInput
									labelText={
										<span>
										Port Name <small>(required)</small>
										</span>
									}
									id="portName"
									formControlProps={{
									fullWidth: true
									}}
									inputProps={{
										max:50,
										onChange:event => props.onChange(event.target.value),
										value:props.value
									}}
								/>
								)}
							,{ width: '30%', title: 'ISO Port Code', field: 'iso_port_code', editComponent: (props) => (
								<CustomInput
									labelText={
										<span>
										ISO Port Code <small>(required)</small>
										</span>
									}
									id='isoPortCode'
									formControlProps={{
									fullWidth: true
									}}
									inputProps={{
										maxLength:10,
										onChange:event => props.onChange(event.target.value),
										value:props.value
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
											<label  style={{float:'right', padding:'5px'}}> Total : {searchCount}</label>
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
									// if ( undefined == newData.line_code || '' == newData.line_code) {
									if ( typeof newData.line_code === 'undefined'|| '' === newData.line_code) {
										alert("선사코드를 입력해주세요.");
										return false;
									}
									// if ( undefined == newData.port_name || '' == newData.port_name ) {
									if ( typeof newData.port_name === 'undefined' || '' === newData.port_name ) {
										alert("포트 이름을 입력해주세요.");
										return false;
									}
									// if (undefined == newData.iso_port_code || '' == newData.iso_port_code) {
									if ( typeof newData.iso_port_code === 'undefined' || '' === newData.iso_port_code) {
										alert("ISO Port Code를 입력해주세요.");
										return false;
									}
									if(props.userData){ 
										axios.post("/sch/getSchedulePortCodeList",{data:newData}).then(res => {
											if ( res.data.length == 0) {
												axios.post("/sch/insertSchPortCode",{newData:newData}).then(res => {
													setSelectData(prevState => {
														let data = [];
														
														if( 0 < prevState.length ) {
															data = [...prevState.data];
														}
														data.push(newData);

														setSearchCount(data.length);
														return { ...prevState, data };
													});		
												})
												}else {
													alert("["+newData.port_name+"] 해당 포트는 이미 존재합니다. 등록 불가합니다.");
													// data[data.indexOf(newData)] = oldData;
													// return { ...prevState, data };
												}
										});
									}else{
										props.openLogin();
									}
								}, 600);
						}),
						onRowUpdate: (newData, oldData) =>
								
							new Promise(resolve => {
								setTimeout(() => {
									resolve();
									// if ( undefined == newData.line_code || '' == newData.line_code) {
									if ( typeof newData.line_code === 'undefined' || '' === newData.line_code) {
										alert("선사코드를 입력해주세요.");
										return false;
									}
									// if ( undefined == newData.port_name || '' == newData.port_name ) {
									if ( typeof newData.port_name === 'undefined' || '' === newData.port_name ) {
										alert("포트 이름을 입력해주세요.");
										return false;
									}
									// if (undefined == newData.iso_port_code || '' == newData.iso_port_code) {
									if (typeof newData.iso_port_code === 'undefined' || '' === newData.iso_port_code) {
										alert("ISO Port Code를 입력해주세요.");
										return false;
									} 
									if (oldData) {
										if(props.userData){
											axios.post("/sch/getSchedulePortCodeList",{data:newData}).then(res => {
												// 수정 처리.
												if ( res.data.length == 0) {
													
													alert("["+newData.port_name+"] 해당 포트가 존재하지 않습니다. 변경이 불가합니다.");
													// data[data.indexOf(newData)] = oldData;
													// return { ...prevState, data };
												} else {
													axios.post("/sch/updateSchPortCode",{ oldData:oldData, newData:newData});
													setSelectData(prevState => {
														let data = [...prevState.data];
														
														data[data.indexOf(oldData)] = newData;
														return { ...prevState, data };
													});
												}
											});
										}else {
											props.openLogin();
										}
									}
									
								}, 600);
							}),
						onRowDelete: oldData =>
							new Promise(resolve => {
								setTimeout(() => {
									resolve();
									setSelectData(prevState => {
										const data = [...prevState.data];
										data.splice(data.indexOf(oldData), 1);
										// 삭제 처리.
										if(props.userData){
											axios.post("/sch/deleteSchPortCode",{ oldData:oldData});
										}else{
											props.openLogin();
										}
										setSearchCount(data.length);
										return { ...prevState, data };
									});
								}, 600);
						}),
					}}
				/>
			</Grid>
		</div>   
  );
}
