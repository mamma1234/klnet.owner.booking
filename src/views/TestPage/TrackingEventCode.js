import React,{ useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import cx from "classnames";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
//import CustomInput from "components/CustomInput/CustomInput";
import CustomInput from "components/CustomInput/CustomOutInput.js";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "components/CustomButtons/Button.js";
import MultiSelect from "components/CustomInput/CustomMultiSelect.js";
import SearchIcon from '@material-ui/icons/Search';
import CardIcon from "components/Card/CardIcon.js";
import DetailTable from "views/DemDet/Export/exportDetailTable.js";
import Assignment from "@material-ui/icons/Assignment";
import MuiAlert from '@material-ui/lab/Alert';
//import {CheckBoxSelection,Inject,MultiSelectComponent} from '@syncfusion/ej2-react-dropdowns';

import {Table,
		TableHead,
	    TableBody,
	    TableRow,
	    TableCell,
	    Checkbox,
	    Collapse,
	    Paper,
	    Box,
	    Grid,
	    TextField,
	    ButtonGroup,
	    Dialog,
	    DialogActions,
	    DialogContent,
	    DialogContentText,
	    Slide,
	    FormControl,
	    MenuItem,
	    InputLabel,
	    Select,
	    ListItemText,
	    Input,Radio,Snackbar
		} from '@material-ui/core';

import axios from 'axios';
import styles from "assets/jss/material-dashboard-pro-react/components/tableStyle";
const userStylesMain = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		//minWidth:120,
		//maxWidth:300,
		width:'100%'
	}
}))
const useStyles = makeStyles(styles);
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
		PaperProps: {
			style:{
				maxHeight:ITEM_HEIGHT*4.5+ITEM_PADDING_TOP,
				width:250,
			}
		}
}

export default function TrackingEventCode(props) {
	const classes = useStyles();
	const [lineCode, setLineCode] = useState([]);
	const [carrierCodeList,setCarrierCodeList] = useState([]);
	const [lineDataList, setLineDataList] = useState([]);
	const [lineData, setLineData] = useState([]);
	const [lineName, setLineName] = useState([]);
	
	const [code, setCode] = useState("");
	const [description, setDescription] = useState("");
	const [selectCarrier,setSelectCarrier] = useState("");
    const [open,setOpen] = useState(false);
    const [openAlter,setOpenAlter] = useState(false);
    
    const [selectedOptions,setSelectedOptions] = useState([]);
    
    const [masterCodeList,setMasterCodeList] = useState([]);
    const [eventCodeList,setEventCodeList] = useState([]);
    const [eventCarrierList,setEventCarrierList] = useState([]);
    const [selectMater,setSelectMater] = useState("");
    
    const getOptionLabel = option => `${"["+option.value+"] "+option.label}`;
    const handleToggleOption = selectedOptions => setSelectedOptions(selectedOptions);
    const handleClearOptions = () => setSelectedOptions([]);
    
    const [openMaster,setOpenMaster] = React.useState(false);
    const [masterData,setMasterData] = useState([]);
    const [masterId,setMasterId] = React.useState(null);
    
    const [severity, setSeverity] = React.useState("");
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [errMessage, setErrmessage] = React.useState("");
    
    const [searchData,setSearchData] =React.useState([]);
    
	function Alert(props) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	const handleAlertClose = (event, reason) => {
		if(reason ==='clickaway') {
			return;
		}
		setAlertOpen(false);
	  }
	
	function  alertMessage (message,icon) {
		setErrmessage(message);
		setSeverity(icon);
		setAlertOpen(true);
	}
    
    const handleSelectAll = isSelected => {
    	if(isSelected) {
    		setSelectedOptions(lineCode);
    	} else {
    		handleClearOptions();
    	}
    };

	
	const classesmain = userStylesMain();

	useEffect(() => {
    		//onLoadData();
    		onCarrierCode();
    		//onMasterCode();
    		onMasterEvent();
		    return () => {
		      console.log('cleanup');
		    };
	}, []);
	
	const onMasterEvent = () => {
		axios.post("/com/getMasterEventCode",{})
	      .then(res => {
	    	  setMasterCodeList(res.data);	 
	      });
		//getMasterEventCode
	}
	
	const onMasterCode = () => {
		axios.post("/com/getEventMasterCode",{})
	      .then(res => {
	    	  setMasterData(res.data);	  
	      })	
	}
	const onCarrierCode =() => {
		axios.post("/com/getEventCodeCarrier",{})
	      .then(res => {
	    	  setLineCode(res.data);	  
	      })
	}

	
	const submit =()=>{

		var carrierCode = [];
		selectedOptions.map((data) => carrierCode.push(data.value));
		axios.post("/com/getEventCarrierList",{line:carrierCode,code:code,des:description})
		  .then(setLineDataList([]))
	      .then(res => {
	    	  setSearchData([code,description]);
	    	  setLineDataList(res.data);
	    	  
	      })
	}

	
	const onMasterPopup = () => {
		axios.post("/com/getEventMasterCode",{})
	      .then(res => {
	    	  setMasterData(res.data);
	    	  setOpenMaster(!openMaster);
	      })	
	}
	
	const carrierAdd =(carrierCode)=>{
		axios.post("/com/setCarrierCodeAdd",{carrier:carrierCode})
	      .then(res => {
	    	  lineName.push(carrierCode);
	    	  alert(res.data);
	    	  submit();
	    	  onCarrierCode();
	    	  setOpen(false); 
	      })
	}
	
		
	function MasterBox (props) {
		
		const [masterCheck,setMasterCheck] = React.useState(null);
		const [openMasterEdit,setOpenMasterEdit] = React.useState(false);
		const [popupTitle,setPopupTitle] = React.useState("추가 할 데이터를 입력해주세요.");
		const [masterCode,setMasterCode] = React.useState(null);
		const [masterDes,setMasterDes] = React.useState(null);
		const [readOnly,setReadOnly] = React.useState(false);
		const [readOnly2,setReadOnly2] = React.useState(false);
		const [actionCode,setActionCode] = React.useState("");
		
		const onEditeView =(gb,e)=> {
			
			
			if(gb === "N") {//추가
				
				setActionCode("N"); //상태값 
				if(masterCode) {
					setMasterCode("");
					setMasterDes("");
				}
				setMasterCheck(null);
				setReadOnly(false);
				setReadOnly2(false);
				setPopupTitle("데이터를 추가 하시겠습니까?");
				setOpenMasterEdit(true); //팝업 오픈
				
			} else if(gb === "D") {//삭제
				setActionCode("D"); //상태값
				if(masterCheck && masterCode) {
					setActionCode("D");
					setPopupTitle("선택한 데이터를 삭제 하시겠습니까?");
					setReadOnly(true);
					setReadOnly2(true);
					setOpenMasterEdit(true);
				} else {
					alertMessage("삭제할 데이터를 선택해 주세요.",'error');
					setActionCode("");
					setMasterCheck(null);
					setActionCode("");
					setMasterCode("");
					setMasterDes("");
					setReadOnly(false);
					setReadOnly2(false);
					setOpenMasterEdit(false);
				}
			} else if(gb === "E") {
				setActionCode("E"); 
				if(masterCheck  && masterCode) { 
					setReadOnly(true);
					setReadOnly2(false);
					setPopupTitle("선택한 데이터를 수정 하시겠습니까?");
					setOpenMasterEdit(true);
				} else { 
					alertMessage("수정할 데이터를 선택해주세요.",'error');
					setOpenMasterEdit(false);
					setMasterCheck(null);
					setActionCode("");
					setMasterCode("");
					setMasterDes("");
					setReadOnly(false);
					setReadOnly2(false);
				}
			} else {
				alert("SYSTEM ERROR.");
				alertMessage("[ERROR]SYSTEM ERROR.",'error');
				setOpenMasterEdit(false);
				setMasterCheck(null);
				setActionCode("");
				setMasterCode("");
				setMasterDes("");
				setReadOnly(false);
				setReadOnly2(false);
			}
				
				
		} 
		
		const onChangeDate =(e,data)=>{
			
			if(!openMasterEdit) {
				setMasterCheck(e.target.value);
				setMasterCode(data[0]);
				setMasterDes(data[1]);
			} else {
				alertMessage("추가 또는 수정 시엔 선택할 수 없습니다.",'error');
				setMasterCheck(null);
				setMasterCode(null);
				setMasterDes(null);
				setOpenMasterEdit(!openMasterEdit);
			}
		}
		
		const onMasterSubmit =() => {
			
			if(actionCode === "D") {
				if(masterCode) {
					axios.post("/com/setMasterDelete",{code:masterCode})
				      .then(res => {
				    	  alertMessage("데이터 삭제가 되었습니다.",'success');
				    	  onMasterCode();
				      })
				} else {
					alertMessage("필수값이 누락 되었습니다.",'error');
				}
			} else if (actionCode === "E" || actionCode === "N") {
				if(masterCode) {
					axios.post("/com/setMasterUpdate",{code:masterCode,des:masterDes})
				      .then(res => {
				    	  if(actionCode === "E") {
				    		  alertMessage("데이터가 추가 되었습니다.",'success');
				    	  } else {
				    		  alertMessage("데이터가 수정 되었습니다.",'success');
				    	  }
				    	  onMasterCode();
				    	  
				      })
				} else {
					alertMessage("필수값이 누락 되었습니다.",'error');
				}
			} else {
				alertMessage("SYSTEM ERROR.",'error');
			}
			
		}
		
		const onMasterCancle = ()=> {
			setOpenMasterEdit(false);//팝업 
			setMasterCheck(null);
			setActionCode("");
			setMasterCode(null);
			setMasterDes(null);
			setReadOnly(false);
			setReadOnly2(false);
		}
		
		return(
			<Dialog
		        open={openMaster}
		        //TransitionComponent={Transition}
		        KeepMounted
		        onClose={()=> setOpenMaster(!openMaster)}
			    style={{height:'600px'}}
		      >
	      	<DialogContent style={{padding:'10px'}}>
	      	    <Card style={{margin:'0'}}>
	      	    	<CardHeader>
		      	    	<GridContainer justify="space-between">
		                	<GridItem xs={7} sm={7} md={7} style={{textAlignLast:'center',marginTop:'10px'}}>대표코드</GridItem>
		                	<GridItem xs={5} sm={4} md={5} style={{textAlignLast:'center'}}>
		                	    <ButtonGroup variant="text" >
		                    		<Button size="sm"  style={{padding:'6px'}} onClick={(e)=>onEditeView("N",e)}>NEW</Button>
		                    		<Button size="sm"  style={{padding:'6px'}} onClick={(e)=>onEditeView("E",e)}>EDIT</Button>
		                    		<Button size="sm"  style={{padding:'6px'}} onClick={(e)=>onEditeView("D",e)}>DELETE</Button>	
		                		</ButtonGroup>
		                	</GridItem>
	                	</GridContainer>
	      	    	</CardHeader>
	      	    	<CardBody>
	      	    		<Collapse in={openMasterEdit} timeout="auto" unmountOnExit>
		      	    		<div style={{padding:'10px',border:'1px solid silver'}}>
		      	    		    <div><h4 style={{marginTop:'0'}}>{popupTitle}</h4></div>
		      	    			<GridContainer style={{width:'100%',margin:'0'}}>
		      	    				<GridItem xs={4}>
		      	    					<TextField size ="small" variant="outlined" label="CODE" value={masterCode} disabled={readOnly}
		      	    					onChange={(e)=>setMasterCode(e.target.value)} InputProps={{readOnly:readOnly}}fullWidth />
		      	    				</GridItem>
		      	    				<GridItem xs={8}>
		      	    					<TextField size ="small" variant="outlined" label="DESCRIPTION" disabled={readOnly2} 
		      	    					value={masterDes} onChange={(e)=>setMasterDes(e.target.value)} fullWidth />
		      	    				</GridItem>	
		      	    			</GridContainer>
		      	    			<GridItem>
		      	    				 <ButtonGroup variant="text" >
			                    		<Button size="sm"  style={{padding:'6px'}} onClick={onMasterSubmit}>{actionCode === "D"?"삭제":"저장"}</Button>
			                    		<Button size="sm"  style={{padding:'6px'}} onClick={onMasterCancle}>취소</Button>
			                		</ButtonGroup>
		                		</GridItem>
		      	    		</div>
	      	    		</Collapse>
		      	    	<Table className={classes.table} style={{marginTop:'10px'}}>
				          <TableHead style={{border:'1px solid silver',backgroundColor:'silver'}}>
					      	<TableRow >
					      	   <TableCell style={{padding:'5px',borderRight:'1px solid #eeeeee'}}></TableCell>
						       <TableCell style={{padding:'5px',borderRight:'1px solid #eeeeee'}}>CODE</TableCell>
						       <TableCell style={{padding:'5px',borderRight:'1px solid #eeeeee'}}>DESCRIPTION</TableCell>
				            </TableRow>
				          </TableHead>
				        <TableBody style={{border:'1px solid silver'}}>
				          {masterData.map((data, key) => {
				            return (
				              <TableRow
				                key={"ms"+key}
				                //hover={hover} 
				                //onClick = { () => {setMasterId(data.event_code); }}
				                selected = { masterId === data.event_code }
				                classes = {{  selected: classes.selected }}
				              >
				              	  <TableCell  style={{padding:'3px',borderBottomWidth:'0'}}>
				              	  	<Radio checked={masterCheck === data.event_code}
				              	  		onChange={(e)=>onChangeDate(e,[data.event_code,data.description])}
				              	  	    value={data.event_code} style={{padding:'3px'}}
				              	  	    	/></TableCell>
					              <TableCell  style={{padding:'3px',borderBottomWidth:'0'}}>{data.event_code}</TableCell>
				                  <TableCell  style={{padding:'3px',borderBottomWidth:'0'}}>{data.description}</TableCell>
				              </TableRow>
				            );
				          })}
				        </TableBody>
				      </Table>
	      	    	</CardBody>
	      	    </Card>
	      	</DialogContent>
	      	<DialogActions>
	      		<Button size="sm" onClick={()=>setOpenMaster(!openMaster)} color="primary">닫기</Button>
	      	</DialogActions>
	      </Dialog> 		
		);
	}
	
	const onCarrierAddPopup = () => {
		
		axios.post("/com/getCarrierAddList",{})
	      .then(res => {
	    	  setCarrierCodeList(res.data); 
		      setOpen(!open);
	      });
		
		
	}
	
	
	function CarrierBox (props) {
		
		const [carrierCode, setCarrierCode] = React.useState("");
		const [addCode, setAddCode] = React.useState("");
		const [addDes, setAddDes] = React.useState("");
		const [addMaster, setAddMaster] = React.useState("");
		
		const addSubmit = () => {
			if(carrierCode && addCode) {
				axios.post("/com/setEventCodeRows",{line:carrierCode,code:addCode,des:addDes,master:addMaster})
			      .then(res => {
			    	  alert("신규 선사 "+carrierCode+" 데이터가 등록 되었습니다.");
			    	  onCarrierCode();
			    	  setOpen(!open);
			      })
			} else {
				alert("필수 입력값 (선사,이벤트 코드)이 누락 되었습니다.");
			}
		}
		
		return(
			<Dialog
		        open={open}
		        KeepMounted
		        onClose={()=> setOpen(!open)}
		      >
	      	<DialogContent>
	      		{selectCarrier?
	      		<DialogContentText>
	      			 Are you Want to ADD the Selected '{selectCarrier}' Line?
	      	    </DialogContentText>
	      			:null}
	      		
		      		<GridContainer>
		      			<GridItem xs={12} ms={12} md={12} >
				      		<Autocomplete
								options = {carrierCodeList}
								getOptionLabel = { option => option.id +' '+option.nm }
								id="carrierCode"
								onChange={(e,data)=>setCarrierCode(!data?'':data.id)}
								renderInput={params => (
									<TextField inputProps={{maxLength:4}} {...params} label="선사" variant="outlined" size ="small" fullWidth />
								)}
				      		    style={{marginBottom:'10px'}}
				      		/>
		      			</GridItem>
			  			<GridItem xs={12} ms={12} md={12} >
			  				<TextField variant="outlined" size="small" label="CODE"   onBlur={(event)=>setAddCode(event.target.value)} fullWidth />
			  			</GridItem>
			  			<GridItem xs={12} ms={12} md={12} style={{marginTop:'8px'}}>
			  				<TextField variant="outlined" size="small"  label="DESCRIPTION" onBlur={(event)=>setAddDes(event.target.value)} fullWidth />
			  			</GridItem>
			  			<GridItem xs={12} ms={12} md={12}>
						  	<FormControl size="small" variant="outlined"  className={classesmain.formControl} style={{marginLeft:'0',marginRight:'0'}}>
						  	<InputLabel>MASTER</InputLabel>
					      		<Select value={addMaster} onChange={(event)=>setAddMaster(event.target.value)}>
						      		{masterCodeList.map((data,key) =>
						      			<MenuItem  key={"masterPop"+key} value={data.event_code}>[{data.event_code}] {data.description}</MenuItem>
						      		)}
		
					      		</Select>
				      		</FormControl>
			  			</GridItem>
		  		</GridContainer>
		  		<div><h5>신규 선사 '{carrierCode}' 데이터를 등록 하시겠습니까?</h5></div>
	      	</DialogContent>
	      	<DialogActions>
	      		<Button size="sm" onClick={addSubmit} color="primary">agree</Button>
	      		<Button size="sm" onClick={()=>setOpen(!open)} color="primary">Disagree</Button>
	      		
	      	</DialogActions>
	      </Dialog> 		
		);
	}
		
	
  return (
		<div>
			<GridItem xs={12}>
				<Card style={{marginTop:'0',marginBottom:'5px'}}>
					<CardBody>
						<GridContainer>
							<GridItem xs={12} ms={4} md={4} style={{marginTop:'5px',marginBottom:'5px'}}>
								<MultiSelect
									items={lineCode}
									noOptionsText=""
								    getOptionLabel={getOptionLabel}
								    //getOptionDisabled={getOptionDisabled}
								    selectedValues={selectedOptions}
								    label="Carrier"
								    //placeholder="Placeholder for textbox"
								    selectAllLabel ="Select all"
								    onToggleOption={handleToggleOption}
								    onClearOptions={handleClearOptions}
								    onSelectAll={handleSelectAll}
								/>
							</GridItem>
							<GridItem xs={12} ms={2} md={2} style={{marginTop:'5px',marginBottom:'5px'}}>
								<TextField size ="small" id="CODE" label="CODE" variant="outlined"  onChange={(event)=>setCode(event.target.value.toUpperCase())} fullWidth />
							</GridItem>
							<GridItem xs={12} ms={2} md={2} style={{marginTop:'5px',marginBottom:'5px'}}>
								<TextField size ="small" id="DESCRIPTION" label="DESCRIPTION" variant="outlined"  onChange={(event)=>setDescription(event.target.value)} fullWidth />
							</GridItem>
						</GridContainer>
					</CardBody>
				</Card>
			</GridItem>
			<GridItem xs={12} style={{textAlign:'-webkit-right'}}>
				<GridItem xs={12} sm={3} md={3}>
					<ButtonGroup variant="text" >
						<Button color="info" onClick={onMasterPopup}>MASTER INFO</Button>
						<Button color="info" endIcon={<SearchIcon/>} onClick={submit}>Search</Button>
					</ButtonGroup>
					<MasterBox />
				</GridItem>
			</GridItem>
			<GridItem xs={12} >
				<Button size="sm" style={{backgroundColor:'#ff9800',padding:'5px'}} onClick={onCarrierAddPopup}>CARRIER ADD</Button>
				 <CarrierBox />
			</GridItem>
			<GridItem xs={12}>
			<EvnetCodeTable 
				hData={lineDataList}
			    searchData={searchData}
				token={props.userData}
				master={masterCodeList}
			    reflash = {submit}
			/>
		</GridItem>
			 <Snackbar open={alertOpen} autoHideDuration={2500} onClose={handleAlertClose}>
				<Alert 
					onClose={handleAlertClose}
					severity={severity}>
					{errMessage}
				</Alert>
			</Snackbar>	
		</div> 
  );
}

function EvnetCodeTable(props) {
	const classes = useStyles();
	const {hData,token,master,searchData} =props;
	
	console.log("Heads props:",props);
	
	const onRefalsh=()=> {
		props.reflash();
	}
	
	return (
			<div>
				<Table className={classes.table}>
					<TableBody>
						{hData.map((data,key) => {		
						   return(
								   <TableRow  key={key} >
										<TableCell style={{padding:'0'}}>
											<Tables
											    tableHead = {[data.carrier_code,data.carrier_name]}
											    token = {token}
											    reload = {onRefalsh}
											    master ={master}
											    search = {searchData}
											/>
									     </TableCell>
								    </TableRow>
							);
						})}
					</TableBody>
				</Table>
		</div>		
	);
}

function Tables(props) {
	  const classes = useStyles();
	  const [listData,setListData] = useState([]);
	  const [open, setOpen] = React.useState(false);
	  const [checked,setChecked ] = React.useState(false);
	  const [code,setCode ] = React.useState(null);
	  const [description,setDescription ] = React.useState(null);
	  const [selectCarrier,setSelectCarrier] = useState(null);
	  const [openRow,setOpenRow] = React.useState(false);
	  const [openNew,setOpenNew] = React.useState(false);
	  const [openDel,setOpenDel] = React.useState(false);
	  
	  const [selectedId,setSelectedId] = React.useState(null);
	  const [selectData,setSelectData] = React.useState([]);
	  
	  const [popUpState,setPopUpState] = React.useState(null);
	  const [popupComponent,setPopupComponent] = React.useState(null);
	  
	  const [masterCode,setMasterCode] = React.useState(null);
	  
	  const classesmain = userStylesMain();
	  
	  const {
	    tableHead,
	    tableData,
	    tableHeaderColor,
	    hover,
	    colorsColls,
	    coloredColls,
	    customCellClasses,
	    customClassesForCells,
	    striped,
	    tableShopping,
	    customHeadCellClasses,
	    customHeadClassesForCells,
	    token,eventCode,eventDes,
	    master,search
	  } = props;

	  useEffect(() => {
		      axios.post("/com/getEventCodeList",{line:tableHead[0],code:search[0],des:search[1]},{headers:token})
		      .then(res => {
		    	  setListData(res.data);
		      })

		    return () => {
		      console.log('cleanup');
		    };
	}, [tableHead]);
	  
    function reload(){
    	props.reload();
    }
	
	function RowsDialog (props) {
		const {carrier,data} = props;
		const classes = useStyles();	
		const [carrierCode, setCarrierCode] = React.useState("");
		
		const [popUpCode,setPopUpCode] = React.useState("");
		const [popUpDes,setPopUpDes] = React.useState("");
		
		const submit = () => {
			
			if(popUpState === "N") {
				
				if(popUpCode) {
					axios.post("/com/setEventCodeRows",{line:carrier,code:popUpCode,des:popUpDes,master:carrierCode})
				      .then(res => {
				    	  reload();
				    	  setOpen(false);
				      })
				} else {
					alert("필수 입력값이 누락 되었습니다.");
				}
				
			} else if (popUpState === "E") {
			    var orgCode = data[0];
				var code = "";
				var des = "";
				var master = "";
				
				if(!carrierCode && !popUpCode && !popUpDes) {
					alert("수정된 내용이 없습니다.");
					return false;
				} else {

					if(popUpCode) {
						code = popUpCode;
					} else {
						code = data[0]; 
					}
	
					if(popUpDes) {
						des = popUpDes;
					} else {
						des = data[1]; 
					}
	
					if(carrierCode) {
						master = carrierCode;
					} else {
						master = data[2]; 
					}
					
					if(carrier && orgCode && code && master) {
						 axios.post("/com/setEventCode",{
							  line:carrier,
							  ordcode:orgCode,
							  code:code,
							  des:des,
							  master:master
							  },{headers:token})
							  .then(res =>{alert("데이터를 수정하였습니다.");
							    reload();
							  	setOpen(false);
							  }).catch(err => alert(err));
					} else {
						alert("필수 입력값 누락 되었습니다.");
					}
				}
				 
			} else if (popUpState === "D") {

				axios.post("/com/setEventDeleteCode",{line:carrier,code:data[0]},{headers:token})
			      .then(res => {
			    	  console.log("delete message:",res.data); 
			    	  alert(res.data);
			    	  reload();
			    	  setOpen(false);
			      }).catch(err => {
			    	  alert(err);
			      });
			      
			} else {
				alert("시스템 에러가 발생하였습니다.");
			}
		}

		return (
			<Dialog
		        open={open}
		        //TransitionComponent={Transition}
		        KeepMounted
		        onClose={()=> setOpen(!open)}
		      >
		  	<DialogContent>
		  	    <div><h3>{carrier}</h3></div>
		  	    {popUpState === "N"?
		  	    <GridContainer>
		  			<GridItem xs={2} ms={2} md={2} style={{marginTop:'7px'}}>
		  				<TextField variant="outlined" size="small" label="CODE"   onBlur={(event)=>setPopUpCode(event.target.value)} fullWidth />
		  			</GridItem>
		  			<GridItem xs={4} ms={4} md={4} style={{marginTop:'7px'}}>
		  				<TextField variant="outlined" size="small"  label="DESCRIPTION" onBlur={(event)=>setPopUpDes(event.target.value)} fullWidth />
		  			</GridItem>
		  			<GridItem xs={6} ms={6} md={6}>
					  	<FormControl size="small" variant="outlined"  className={classesmain.formControl} >
					  	<InputLabel>MASTER</InputLabel>
				      		<Select value={carrierCode} onChange={(event)=>setCarrierCode(event.target.value)}>
					      		{master.map((data,key) =>
					      			<MenuItem  key={"masterPop"+key} value={data.event_code}>[{data.event_code}] {data.description}</MenuItem>
					      		)}
	
				      		</Select>
			      		</FormControl>
		  			</GridItem>
		  		</GridContainer>
		  	    :popUpState === "E"?
		  	    	<GridContainer>
			  			<GridItem xs={2} ms={2} md={2} style={{marginTop:'7px'}}>
			  				<TextField variant="outlined" size="small" label="CODE" defaultValue={data[0]}  onBlur={(event)=>setPopUpCode(event.target.value)} fullWidth />
			  			</GridItem>
			  			<GridItem xs={4} ms={4} md={4} style={{marginTop:'7px'}}>
			  				<TextField variant="outlined" size="small"  label="DESCRIPTION" defaultValue={data[1]}  onBlur={(event)=>setPopUpDes(event.target.value)} fullWidth />
			  			</GridItem>
			  			<GridItem xs={6} ms={6} md={6}>
						  	<FormControl size="small" variant="outlined"  className={classesmain.formControl} >
						  	<InputLabel>MASTER</InputLabel>
					      		<Select defaultValue={data[2]} onChange={(event)=>setCarrierCode(event.target.value)}>
						      		{master.map((data,key) =>
						      			<MenuItem  key={"masterPop"+key} value={data.event_code}>[{data.event_code}] {data.description}</MenuItem>
						      		)}
	
					      		</Select>
				      		</FormControl>
			  			</GridItem>
			  			</GridContainer>
			  		:
			  			<GridContainer>
			  			<GridItem xs={6} ms={6} md={6} style={{marginTop:'7px'}}>
			  				<TextField variant="outlined" size="small" label="CODE" value={data[0]} fullWidth />
			  			</GridItem>
			  			<GridItem xs={6} ms={6} md={6} style={{marginTop:'7px'}}>
			  				<TextField variant="outlined" size="small"  label="DESCRIPTION" value={data[1]} fullWidth />
			  			</GridItem>
			  			</GridContainer>
		  	    }   
		  		<div><h5>선택한 데이터를 {popUpState==="N"?"추가":popUpState==="E"?"수정":"삭제"} 하시겠습니까?</h5></div>
		  	</DialogContent>
		  	<DialogActions>
	  		    <Button size="sm" onClick={submit} color="primary">agree</Button>
		  		<Button size="sm" onClick={()=>setOpen(!open)} color="primary">Disagree</Button>
		  	</DialogActions>
		  </Dialog>		
		);
	}


	
	const onRowAdd = () => {
		setPopUpState("N");
		setOpen(true);
	}
	
	
	const onRowEdit = () => {
		if(selectedId && selectData[0] !== undefined && selectedId === selectData[0]) {
			setPopUpState("E");
			setOpen(!open);
		} else {
			alert("수정할 데이터를 선택해주세요.");
			setSelectedId(null);
			setSelectData([]);
		}
	}
	
	const onRowDelete = () => {
		if(selectedId && selectData[0] !== undefined && selectedId === selectData[0]) {
			setPopUpState("D");
			setOpen(!open);
		} else {
			alert("삭제할 데이터를 선택해주세요.");
			setSelectedId(null);
			setSelectData([]);
		}

	}
	
	  
	  return (
	    <Card style={{marginTop:'5px',marginBottom:'5px'}}>
	    	<CardHeader style={{padding:'0'}}>
		    	<GridContainer justify="space-between">
			    	<GridItem xs={7} sm={9} md={10} style={{textAlignLast:'center',marginTop:'10px'}} onClick={()=>setOpenRow(!openRow)}>{tableHead[0]} [{tableHead[1]}]</GridItem>
			    	<GridItem xs={5} sm={3} md={2} style={{textAlignLast:'center'}}>
			    	    <ButtonGroup variant="text" >
			        		<Button size="sm"  onClick={onRowAdd} style={{padding:'6px'}}>NEW</Button>
			        	    <Button size="sm"  onClick={onRowEdit} style={{padding:'6px'}}>EDITE</Button>
			        		<Button size="sm" onClick={onRowDelete} style={{padding:'6px'}}>DELETE</Button>
			    		</ButtonGroup>
			    	</GridItem>
			    </GridContainer>
			 </CardHeader>
			 <Collapse in={openRow} timeout="auto" unmountOnExit>
				 <CardBody style={{padding:'0 10px 5px'}}>
			     	<Table className={classes.table} style={{marginTop:'10px'}}>
				          <TableHead style={{border:'1px solid silver',backgroundColor:'silver'}}>
					          <TableRow>
				        		<TableCell style={{padding:'5px',borderRight:'1px solid #eeeeee'}}>CODE</TableCell>
				        		<TableCell style={{padding:'5px',borderRight:'1px solid #eeeeee'}}>DESCRIPTION</TableCell>
				        		<TableCell style={{padding:'5px',borderRight:'1px solid #eeeeee'}}>MASTER CODE</TableCell>
				        		<TableCell style={{padding:'5px'}}>MASTER DES</TableCell>
				        	</TableRow>
				          </TableHead>
				          <TableBody style={{border:'1px solid silver'}}>
					        	
					          {listData.map((data, key) => {
					            return (
					              <TableRow
					                key={"tr"+key}
					                hover={hover} 
					                onClick = { () => {setSelectedId(data.event_code); setSelectData([data.event_code,data.description,data.master_event_code]);}}
					                selected = { selectedId === data.event_code }
					                classes = {{ hover: classes.hover, selected: classes.selected }}
					              >
						              <TableCell  style={{padding:'3px',borderBottomWidth:'0'}}>{data.event_code}</TableCell>
					                  <TableCell  style={{padding:'3px',borderBottomWidth:'0'}}>{data.description}</TableCell>
					                  <TableCell  style={{padding:'3px',borderBottomWidth:'0'}}>{data.master_event_code}</TableCell> 
					                  <TableCell  style={{padding:'3px',borderBottomWidth:'0'}}>{data.master_des}</TableCell>
					              </TableRow>
					            );
					          })}
					          </TableBody>
					     </Table>
					</CardBody>
			   </Collapse>

	      <RowsDialog
	        carrier = {tableHead[0]}
	      	data = {selectData}
	      />
	    </Card>
	  );
	}


